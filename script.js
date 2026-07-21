// config.js 모듈 임포트
import CONFIG from "./config.js";

// 전역 변수 정의
let map;
let marker;
let infoWindow;
let currentLang = "en";
let polylinePath;
let stationMarker;
let airportBusMarker;
let airportBusPolyline;
let parkingMarkers = [];

// 페이지 로드 시 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  // 초기 콘텐츠 로드
  loadLanguageContent(currentLang);

  // 언어 선택 기능
  setupLanguageSelector();

  // 바로가기 탭 설정
  setupQuickNav();

  // 초기 맵 로드를 위한 스크립트 추가
  loadGoogleMapsScript(currentLang);

  // 버튼 생성
  createButtons();
});

// ===== 바로가기 탭 (Quick Nav) =====
const NAV_LABELS = {
  map:        { en: "Map", ko: "위치", ja: "地図", zh: "地图" },
  directions: { en: "Directions", ko: "오시는 길", ja: "行き方", zh: "交通" },
  checkin:    { en: "Check-in", ko: "체크인", ja: "チェックイン", zh: "入住" },
  appliances: { en: "Appliances", ko: "가전", ja: "家電", zh: "家电" },
};

const NAV_TARGETS = {
  map: ".section-map",
  directions: "#content-container .directions",
  checkin: "#content-container .checkin-section",
  appliances: "#content-container .appliances-section",
};

const LANG_SHORT = { en: "EN", ko: "한", ja: "日", zh: "中" };

function setupQuickNav() {
  const nav = document.getElementById("quickNav");
  if (!nav) return;

  // 탭 클릭 → 해당 섹션으로 스크롤
  nav.querySelectorAll(".quick-nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(NAV_TARGETS[tab.dataset.nav]);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 언어 드롭다운
  const langBtn = document.getElementById("quickNavLangBtn");
  const langMenu = document.getElementById("quickNavLangMenu");
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.hidden = !langMenu.hidden;
  });
  document.addEventListener("click", () => {
    langMenu.hidden = true;
  });
  langMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      langMenu.hidden = true;
      // 헤더의 언어 버튼과 동일한 전환 로직 재사용
      const headerBtn = document.querySelector(`.language-btn[data-lang="${btn.dataset.lang}"]`);
      if (headerBtn) headerBtn.click();
    });
  });

  // 탭 가로 오버플로 표시 (페이드 + 화살표)
  const tabs = nav.querySelector(".quick-nav-tabs");
  const moreBtn = document.getElementById("quickNavMore");
  tabs.addEventListener("scroll", updateQuickNavOverflow);
  window.addEventListener("resize", updateQuickNavOverflow);
  moreBtn.addEventListener("click", () => {
    tabs.scrollBy({ left: 120, behavior: "smooth" });
  });
  updateQuickNavOverflow();

  // 스크롤 시 현재 섹션 탭 강조
  let navTicking = false;
  window.addEventListener("scroll", () => {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      updateActiveNavTab();
      navTicking = false;
    });
  });
  updateActiveNavTab();
}

function updateQuickNavOverflow() {
  const wrap = document.querySelector(".quick-nav-tabs-wrap");
  if (!wrap) return;
  const tabs = wrap.querySelector(".quick-nav-tabs");
  wrap.classList.toggle("has-overflow-left", tabs.scrollLeft > 4);
  wrap.classList.toggle(
    "has-overflow-right",
    tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 4
  );
}

// 활성 탭이 스크롤 영역 밖에 있으면 가로 스크롤로 노출
function ensureTabVisible(tab) {
  const tabs = tab.parentElement;
  const left = tab.offsetLeft;
  const right = left + tab.offsetWidth;
  if (left < tabs.scrollLeft) {
    tabs.scrollTo({ left: left - 8, behavior: "smooth" });
  } else if (right > tabs.scrollLeft + tabs.clientWidth) {
    tabs.scrollTo({ left: right - tabs.clientWidth + 8, behavior: "smooth" });
  }
}

function updateActiveNavTab() {
  const nav = document.getElementById("quickNav");
  if (!nav) return;
  const threshold = nav.offsetHeight + 90;
  let activeKey = "map";
  Object.keys(NAV_TARGETS).forEach((key) => {
    const el = document.querySelector(NAV_TARGETS[key]);
    if (el && el.getBoundingClientRect().top <= threshold) activeKey = key;
  });
  nav.querySelectorAll(".quick-nav-tab").forEach((tab) => {
    const isActive = tab.dataset.nav === activeKey;
    if (isActive && !tab.classList.contains("active")) ensureTabVisible(tab);
    tab.classList.toggle("active", isActive);
  });
}

function updateQuickNavLabels(lang) {
  const nav = document.getElementById("quickNav");
  if (!nav) return;
  nav.querySelectorAll(".quick-nav-tab").forEach((tab) => {
    const label = tab.querySelector(".quick-nav-label");
    if (label) label.textContent = NAV_LABELS[tab.dataset.nav][lang];
  });
  const langBtn = document.getElementById("quickNavLangBtn");
  if (langBtn) langBtn.textContent = `${LANG_SHORT[lang]} ▾`;
  // 라벨 길이가 바뀌므로 오버플로 표시 갱신
  updateQuickNavOverflow();
}

// 언어 선택기 설정 함수
function setupLanguageSelector() {
  document.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // 활성 버튼 상태 변경
      document.querySelectorAll(".language-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // 언어 콘텐츠 로드
      const lang = this.getAttribute("data-lang");
      loadLanguageContent(lang);

      // 맵 언어 변경 및 정보 창 업데이트
      changeMapLanguage(lang);
    });
  });
}

// 버튼 생성 함수
function createButtons() {
  createTransitButton();
  createParkingButton();
}

// 언어별 HTML 콘텐츠 로드 함수
async function loadLanguageContent(lang) {
  try {
    const response = await fetch(`./lang/${lang}.html`);
    const html = await response.text();
    document.getElementById("content-container").innerHTML = html;

    // 현재 언어에 맞는 컨텐츠 활성화
    document.querySelectorAll(".language-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`content-${lang}`).classList.add("active");

    // 현재 언어 업데이트
    currentLang = lang;

    // 헤더 부제 및 섹션 제목 다국어 업데이트
    const subtitleTexts = { en: "Guest Guide", ko: "게스트 가이드", ja: "ゲストガイド", zh: "宾客指南" };
    const locationTexts = { en: "Location", ko: "위치", ja: "場所", zh: "位置" };
    const subtitleEl = document.getElementById("site-subtitle");
    if (subtitleEl) subtitleEl.textContent = subtitleTexts[lang];
    const locationEl = document.getElementById("section-title-location");
    if (locationEl) locationEl.textContent = locationTexts[lang];

    // 언어에 맞게 버튼 텍스트 업데이트
    updateButtonTexts();

    // 바로가기 탭 라벨 업데이트
    updateQuickNavLabels(lang);
  } catch (error) {
    console.error("언어 파일을 불러오는 중 오류 발생:", error);
  }
}

// 버튼 텍스트 업데이트 함수
function updateButtonTexts() {
  // 대중교통 버튼 업데이트
  const transitButton = document.querySelector(".transit-button");
  if (transitButton) {
    const stationVisible =
      stationMarker !== null && stationMarker !== undefined;
    const transitButtonState = stationVisible ? "hide" : "show";
    transitButton.textContent =
      CONFIG.texts.transitButton[transitButtonState][currentLang];
  }

  // 공항버스 정류장 버튼 업데이트
  const airportBusButton = document.querySelector(".airport-bus-button");
  if (airportBusButton) {
    const airportBusVisible =
      airportBusMarker !== null && airportBusMarker !== undefined;
    const airportBusButtonState = airportBusVisible ? "hide" : "show";
    airportBusButton.textContent =
      CONFIG.texts.airportBusButton[airportBusButtonState][currentLang];
  }

  // 구글 맵 버튼 업데이트
  const googleMapsButton = document.querySelector(".google-maps-button");
  if (googleMapsButton) {
    googleMapsButton.textContent = CONFIG.texts.googleMapsButton[currentLang];
  }

  // 주차장 버튼 업데이트
  const parkingButton = document.querySelector(".parking-button");
  if (parkingButton) {
    const parkingVisible = parkingMarkers.length > 0;
    const parkingButtonState = parkingVisible ? "hide" : "show";
    parkingButton.textContent =
      CONFIG.texts.parkingButton[parkingButtonState][currentLang];
  }
}

// 대중교통 경로 버튼 생성 함수
function createTransitButton() {
  const container = document.createElement("div");
  container.className = "transit-button-container";

  // 대중교통 경로 버튼
  const transitButton = document.createElement("button");
  transitButton.className = "transit-button";
  transitButton.textContent = CONFIG.texts.transitButton.show[currentLang];
  transitButton.addEventListener("click", toggleStationView);
  container.appendChild(transitButton);

  // 공항버스 정류장 버튼
  const airportBusButton = document.createElement("button");
  airportBusButton.className = "transit-button airport-bus-button";
  airportBusButton.textContent = CONFIG.texts.airportBusButton.show[currentLang];
  airportBusButton.addEventListener("click", toggleAirportBusView);
  container.appendChild(airportBusButton);

  // 구글 맵으로 보기 버튼 추가
  const googleMapsButton = document.createElement("button");
  googleMapsButton.className = "google-maps-button";
  googleMapsButton.textContent = CONFIG.texts.googleMapsButton[currentLang];
  googleMapsButton.addEventListener("click", openGoogleMapsDirections);
  container.appendChild(googleMapsButton);

  // 맵 컨테이너 아래에 버튼 추가
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    mapContainer.parentNode.insertBefore(container, mapContainer.nextSibling);
  }
}

// 수원역 표시/숨김 토글 함수
function toggleStationView() {
  if (typeof google === "undefined" || !map) return;
  if (!stationMarker) {
    // 수원역 마커 생성
    stationMarker = new google.maps.Marker({
      position: CONFIG.locations.suwonStation,
      map: map,
      title: "Suwon Station",
      animation: google.maps.Animation.DROP,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    // 수원역 정보 창 생성
    const stationInfoWindow = new google.maps.InfoWindow({
      content: CONFIG.texts.stationInfo[currentLang],
    });

    // 마커 클릭 시 정보 창 열기
    stationMarker.addListener("click", () => {
      stationInfoWindow.open(map, stationMarker);
    });

    // 자동으로 정보 창 열기
    stationInfoWindow.open(map, stationMarker);

    // 직선 경로 표시
    polylinePath = new google.maps.Polyline({
      path: [CONFIG.locations.suwonStation, CONFIG.locations.home],
      geodesic: true,
      strokeColor: "#2ea1ff",
      strokeOpacity: 0.7,
      strokeWeight: 3,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 3,
          },
          offset: "50%",
        },
      ],
    });

    polylinePath.setMap(map);

    // 지도 범위 조정
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(stationMarker.getPosition());
    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);
  } else {
    // 수원역 마커 숨기기
    stationMarker.setMap(null);
    stationMarker = null;

    // 경로 제거
    if (polylinePath) {
      polylinePath.setMap(null);
      polylinePath = null;
    }

    // 숙소 위치로 지도 중심 이동
    map.setCenter(CONFIG.locations.home);
    map.setZoom(16);
  }

  // 버튼 텍스트 업데이트
  updateButtonTexts();
}

// 공항버스 정류장(한일타운) 표시/숨김 토글 함수
function toggleAirportBusView() {
  if (typeof google === "undefined" || !map) return;
  if (!airportBusMarker) {
    // 정류장 마커 생성
    airportBusMarker = new google.maps.Marker({
      position: CONFIG.locations.hanilTownStop,
      map: map,
      title: "Hanil Town Airport Bus Stop",
      animation: google.maps.Animation.DROP,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      },
    });

    // 정류장 정보 창 생성
    const airportBusInfoWindow = new google.maps.InfoWindow({
      content: CONFIG.texts.airportBusInfo[currentLang],
    });

    // 마커 클릭 시 정보 창 열기
    airportBusMarker.addListener("click", () => {
      airportBusInfoWindow.open(map, airportBusMarker);
    });

    // 자동으로 정보 창 열기
    airportBusInfoWindow.open(map, airportBusMarker);

    // 정류장 → 숙소 도보 경로 직선 표시
    airportBusPolyline = new google.maps.Polyline({
      path: [CONFIG.locations.hanilTownStop, CONFIG.locations.home],
      geodesic: true,
      strokeColor: "#2fa84f",
      strokeOpacity: 0.7,
      strokeWeight: 3,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 3,
          },
          offset: "50%",
        },
      ],
    });

    airportBusPolyline.setMap(map);

    // 지도 범위 조정
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(airportBusMarker.getPosition());
    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);
  } else {
    // 마커 숨기기
    airportBusMarker.setMap(null);
    airportBusMarker = null;

    // 경로 제거
    if (airportBusPolyline) {
      airportBusPolyline.setMap(null);
      airportBusPolyline = null;
    }

    // 숙소 위치로 지도 중심 이동
    map.setCenter(CONFIG.locations.home);
    map.setZoom(16);
  }

  // 버튼 텍스트 업데이트
  updateButtonTexts();
}

// 구글 맵 경로 열기 함수
function openGoogleMapsDirections() {
  const suwonStation = CONFIG.locations.suwonStation;
  const home = CONFIG.locations.home;

  const url = `https://www.google.com/maps/dir/?api=1&origin=${suwonStation.lat},${suwonStation.lng}&destination=${home.lat},${home.lng}&travelmode=transit&hl=${CONFIG.googleMapLangCodes[currentLang]}`;
  window.open(url, "_blank");
}

// 숙소 InfoWindow content 생성 — 기존 안내 + 구글맵 링크
function buildHomeInfoContent(lang) {
  const home = CONFIG.locations.home;
  const gmapUrl = `https://www.google.com/maps/search/?api=1&query=${home.lat},${home.lng}`;
  const linkLabel = {
    en: "📍 Open in Google Maps",
    ko: "📍 Google Maps에서 열기",
    ja: "📍 Google Mapsで開く",
    zh: "📍 在 Google 地图中打开",
  }[lang] || "📍 Open in Google Maps";

  return `
    ${CONFIG.texts.infoContents[lang]}
    <div style="margin-top:8px;">
      <a href="${gmapUrl}" target="_blank" rel="noopener"
         style="color:#1a73e8;text-decoration:none;font-size:13px;">
        ${linkLabel}
      </a>
    </div>
  `;
}

// 맵 초기화 함수 - 전역 객체에 할당하여 Google Maps API가 접근할 수 있게 함
window.initMap = function () {
  // 지도 생성
  map = new google.maps.Map(document.getElementById("map"), {
    center: CONFIG.locations.home,
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    language: CONFIG.googleMapLangCodes[currentLang], // 현재 언어 설정
  });

  // 숙소 위치에 마커 추가
  marker = new google.maps.Marker({
    position: CONFIG.locations.home,
    map: map,
    title: "Accommodation Location",
    animation: google.maps.Animation.DROP,
  });

  // 정보 창 생성
  infoWindow = new google.maps.InfoWindow({
    content: buildHomeInfoContent(currentLang),
  });

  // 마커 클릭 시 정보 창 열기
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  // 페이지 로드 시 정보 창 자동으로 열기
  infoWindow.open(map, marker);
};

// 맵 언어 변경 함수
function changeMapLanguage(lang) {
  // 현재 언어 저장
  currentLang = lang;

  // 정보 창 내용 업데이트
  if (infoWindow) {
    infoWindow.setContent(buildHomeInfoContent(lang));
  }

  // 주차장 마커 정보 업데이트
  updateParkingMarkers();

  // 맵 API를 다시 로드하여 언어 변경
  loadGoogleMapsScript(lang);
}

// 구글 맵 API 스크립트 로드 함수
function loadGoogleMapsScript(lang) {
  // 이미 로드된 스크립트 제거
  const oldScript = document.querySelector(
    'script[src*="maps.googleapis.com/maps/api/js"]'
  );
  if (oldScript) {
    oldScript.remove();
  }

  // 맵 객체 초기화 — 재로드 완료 전까지 옛 지도에 마커가 찍히지 않도록 상태 리셋
  map = null;
  stationMarker = null;
  polylinePath = null;
  airportBusMarker = null;
  airportBusPolyline = null;
  airportStopMarker = null;
  airportStopInfoWindow = null;
  parkingMarkers = [];
  const mapDiv = document.getElementById("map");
  if (mapDiv) {
    mapDiv.innerHTML = "";
  }

  // 토글 버튼 문구를 초기 상태(표시하기)로 되돌림
  updateButtonTexts();

  // 새로운 언어로 구글 맵 API 스크립트 로드
  const googleMapLang = CONFIG.googleMapLangCodes[lang] || "en";
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.googleMapsApiKey}&callback=initMap&language=${googleMapLang}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

// 주차장 표시 토글 버튼 생성 함수
function createParkingButton() {
  const container = document.createElement("div");
  container.className = "parking-button-container";

  const parkingButton = document.createElement("button");
  parkingButton.className = "parking-button";
  parkingButton.textContent = CONFIG.texts.parkingButton.show[currentLang];
  parkingButton.addEventListener("click", toggleParkingView);

  container.appendChild(parkingButton);

  // 버튼을 맵 컨테이너 아래에 추가
  const transitButtonContainer = document.querySelector(
    ".transit-button-container"
  );
  if (transitButtonContainer) {
    transitButtonContainer.parentNode.insertBefore(
      container,
      transitButtonContainer.nextSibling
    );
  }
}

// 주차장 표시/숨김 토글 함수
function toggleParkingView() {
  if (typeof google === "undefined" || !map) return;
  if (parkingMarkers.length === 0) {
    // 숙소 InfoWindow 닫기 (주차장 마커가 가려지지 않도록)
    if (infoWindow) {
      infoWindow.close();
    }

    // 주차장 마커 생성
    CONFIG.parkingLocations.forEach((location) => {
      const iconUrl =
        location.type === "free"
          ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

      const parkingMarker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title[currentLang],
        animation: google.maps.Animation.DROP,
        icon: { url: iconUrl },
      });

      // 정보 창 생성 — 주소 + 구글맵 링크 포함
      const address = location.address ? location.address[currentLang] : "";
      const gmapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      const parkingInfoWindow = new google.maps.InfoWindow({
        content: `
          <div style="min-width:200px;line-height:1.5;">
            <strong>${location.title[currentLang]}</strong>
            ${address ? `<div style="margin-top:4px;color:#555;font-size:13px;">${address}</div>` : ""}
            <div style="margin-top:8px;">
              <a href="${gmapUrl}" target="_blank" rel="noopener"
                 style="color:#1a73e8;text-decoration:none;font-size:13px;">
                📍 Google Maps에서 열기
              </a>
            </div>
          </div>
        `,
      });

      // 마커 클릭 시 정보 창 열기
      parkingMarker.addListener("click", () => {
        parkingInfoWindow.open(map, parkingMarker);
      });

      // 마커 배열에 추가
      parkingMarkers.push({ marker: parkingMarker, infoWindow: parkingInfoWindow });
    });

    // 숙소 + 주차장 모두 보이도록 지도 범위 조정
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(marker.getPosition());
    parkingMarkers.forEach((item) => {
      bounds.extend(item.marker.getPosition());
    });
    map.fitBounds(bounds);

    // 주차장 범례 추가
    addParkingLegend();
  } else {
    // 주차장 마커 제거
    parkingMarkers.forEach((item) => {
      item.marker.setMap(null);
      if (item.infoWindow) {
        item.infoWindow.close();
      }
    });

    // 주차장 마커 배열 초기화
    parkingMarkers = [];

    // 범례 제거
    const legend = document.querySelector(".parking-legend");
    if (legend) {
      legend.remove();
    }

    // 숙소 위치로 복귀 및 InfoWindow 다시 열기
    map.setCenter(CONFIG.locations.home);
    map.setZoom(16);
    if (infoWindow) {
      infoWindow.open(map, marker);
    }
  }

  // 버튼 텍스트 업데이트
  updateButtonTexts();
}

// 범례 추가 함수
function addParkingLegend() {
  // 이미 범례가 있는지 확인
  if (document.querySelector(".parking-legend")) {
    return;
  }

  const legend = document.createElement("div");
  legend.className = "parking-legend";

  const legendContent = `
    <div style="background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin-top: 10px;">
      <div style="margin-bottom: 8px; font-weight: bold;">${CONFIG.texts.parkingLegend.title[currentLang]}</div>
      <div style="display: flex; align-items: center;">
        <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" width="20" height="20" style="margin-right: 5px;">
        <span>${CONFIG.texts.parkingLegend.paid[currentLang]}</span>
      </div>
    </div>
  `;

  legend.innerHTML = legendContent;

  // 맵에 범례 추가
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
}

// 언어 변경 시 주차장 마커 업데이트 함수
function updateParkingMarkers() {
  // 주차장 마커가 있을 경우에만 마커와 범례 업데이트
  if (parkingMarkers.length > 0) {
    parkingMarkers.forEach((item, index) => {
      const location = CONFIG.parkingLocations[index];
      item.marker.setTitle(location.title[currentLang]);
      item.infoWindow.setContent(
        `<strong>${location.title[currentLang]}</strong>`
      );
    });

    // 범례 제거 후 다시 추가 (언어 업데이트)
    const legend = document.querySelector(".parking-legend");
    if (legend) {
      legend.remove();
      addParkingLegend();
    }
  }
}

// ===== Slide Modal =====
const SLIDE_DATA = {
  direction: [
    { src: './assets/img/direction/01_building_exterior.jpg?v=3', type: 'image', caption: { ko: '골목에서 보이는 건물 모습입니다', en: 'Building view from the alley', ja: '路地から見える建物の様子です', zh: '从巷子里看到的建筑外观' } },
    { src: './assets/img/direction/02_building_entrance.jpg?v=3', type: 'image', caption: { ko: '36번 주소판이 있는 입구입니다', en: 'Entrance with address number 36', ja: '36番の住所プレートがある入口です', zh: '有36号地址牌的入口' } },
    { src: './assets/img/direction/03_address_sign.jpg?v=3', type: 'image', caption: { ko: '도로명 주소 안내판을 확인하세요', en: 'Check the street address sign', ja: '道路名住所の案内板を確認してください', zh: '请确认路名地址指示牌' } },
    { src: './assets/img/direction/04_stairs_entrance.jpg?v=3', type: 'image', caption: { ko: '계단을 따라 내려가세요', en: 'Go down the stairs', ja: '階段に沿って降りてください', zh: '沿楼梯下去' } },
    { src: './assets/img/direction/05_room_b102_sign.jpg', type: 'image', caption: { ko: '벽에 B102 표시를 확인하세요', en: 'Look for the B102 sign on the wall', ja: '壁のB102表示を確認してください', zh: '请确认墙上的B102标识' } },
    { src: './assets/img/direction/06_front_door.jpg', type: 'image', caption: { ko: 'WELCOME 매트가 있는 현관문입니다', en: 'Front door with WELCOME mat', ja: 'WELCOMEマットのある玄関ドアです', zh: '有WELCOME地垫的大门' } },
  ],
  boiler: [
    { src: './assets/img/boiler/01_hotwater_mode.jpg', type: 'image', caption: {
      ko: '온도조절기는 화장실 문 옆에 있어요 — 온수모드 (온수만 사용)\n1) 난방/외출 버튼을 눌러 온수 설정 온도만 표시\n2) ⬇️⬆️ 화살표로 원하는 온도 설정',
      en: 'The thermostat is next to the bathroom door — Hot water mode (hot water only)\n1) Press the house-icon button until only the hot water temperature is shown\n2) Set the temperature with the ⬇️⬆️ arrows',
      ja: '温度調節器はトイレのドアの横にあります — お湯モード（お湯のみ）\n1) 家アイコンのボタンを押してお湯の設定温度のみ表示\n2) ⬇️⬆️ 矢印で希望の温度を設定',
      zh: '温控器在卫生间门旁边 — 热水模式（仅用热水）\n1) 按房子图标按钮，使屏幕只显示热水设定温度\n2) 用 ⬇️⬆️ 箭头设定温度' } },
    { src: './assets/img/boiler/02_heating_mode.jpg', type: 'image', caption: {
      ko: '난방모드 (온수+난방)\n1) 난방/외출 버튼으로 난방모드(온돌/실내) 선택\n2) ⬇️⬆️ 화살표로 원하는 온도 설정\n3) \'연소\' 아이콘·녹색 가동 램프가 켜지면 자동으로 온도 유지\n💡 가스비 절약을 위해 온돌모드 권장',
      en: 'Heating mode (hot water + floor heating)\n1) Select a heating mode (Ondol/Indoor) with the house-icon button\n2) Set the temperature with the ⬇️⬆️ arrows\n3) The flame icon and green lamp turn on; the set temperature is kept automatically\n💡 Ondol mode recommended to save on gas',
      ja: '暖房モード（お湯＋床暖房）\n1) 家アイコンのボタンで暖房モード（オンドル/室内）を選択\n2) ⬇️⬆️ 矢印で希望の温度を設定\n3) 「燃焼」アイコンと緑のランプが点灯し、自動で温度を維持\n💡 ガス代節約のためオンドルモード推奨',
      zh: '供暖模式（热水＋地暖）\n1) 用房子图标按钮选择供暖模式（地暖/室内）\n2) 用 ⬇️⬆️ 箭头设定温度\n3) "燃烧"图标和绿色运行灯亮起后，自动保持设定温度\n💡 为节省燃气费，建议使用地暖模式' } },
  ],
  tv: [
    { src: './assets/img/tv/01_monitor.jpg', type: 'image', caption: { ko: '리모컨으로 켜세요. YouTube와 Netflix를 사용할 수 있어요', en: 'Turn on with the remote. YouTube and Netflix are available', ja: 'リモコンで電源を入れてください。YouTubeとNetflixが利用できます', zh: '用遥控器开机。可使用YouTube和Netflix' } },
    { src: './assets/img/tv/02_remote_settopbox.jpg', type: 'image', caption: { ko: '검정색 리모컨의 좌측 맨 위 빨간색 버튼이 TV 전원 버튼입니다', en: 'The red button at the top-left of the black remote is the TV power button', ja: '黒いリモコンの左上の赤いボタンがTV電源ボタンです', zh: '黑色遥控器左上方的红色按钮是电视电源按钮' } },
    { src: './assets/img/tv/04_settopbox_back_closeup.jpg?v=2', type: 'image', caption: { ko: '붉은색 전원 표시등 왼쪽에 TV 전원 버튼이 있습니다. 리모컨으로 켜지지 않을 때 눌러주세요', en: 'TV power button is to the left of the red power indicator. Press it if the remote doesn\'t work', ja: '赤い電源ランプの左側にTV電源ボタンがあります。リモコンで電源が入らない時に押してください', zh: '红色电源指示灯左侧有电视电源按钮。遥控器无法开机时请按此按钮' } },
    { src: './assets/img/tv/08_remote_side.jpg', type: 'image', caption: { ko: '측면 위쪽 버튼이 외부입력입니다. HDMI 3을 선택하면 TV를 볼 수 있습니다. + TV - 버튼으로 음량을 조절하세요', en: 'Top side button is external input. Select HDMI 3 to watch TV. Use + TV - buttons to adjust volume', ja: '側面上部のボタンが外部入力です。HDMI 3を選択するとTVが見られます。+ TV - ボタンで音量を調整してください', zh: '侧面上方按钮是外部输入。选择HDMI 3即可看电视。用 + TV - 按钮调节音量' } },
    { src: './assets/img/tv/09_cable_box.jpg?v=2', type: 'image', caption: { ko: 'TV 뒤쪽 케이블 정리함', en: 'Cable management box behind TV', ja: 'テレビ裏のケーブル整理ボックス', zh: '电视后面的线缆整理盒' } },
    { src: './assets/img/tv/10_cable_box_closeup.jpg?v=2', type: 'image', caption: { ko: 'Wi-Fi가 안 잡힐 때는 DC in 케이블을 뽑았다가 다시 꽂아주세요', en: 'If Wi-Fi is not working, unplug the DC in cable and plug it back in', ja: 'Wi-Fiが繋がらない時はDC inケーブルを抜いて再度差し込んでください', zh: 'Wi-Fi无法连接时，请拔出DC in线缆后重新插入' } },
  ],
  projector: [
    { src: './assets/img/projector/01_remote.jpg', type: 'image', caption: {
      ko: '1) 전원 버튼을 누르세요\n2) 홈 키를 누르고 메뉴 화면이 뜰 때까지 기다리세요\n3) 화살표로 원하는 채널을 선택하세요\n4) 확인 버튼을 누르고 재미있게 시청하세요\n💡 빔 프로젝터를 향해 버튼을 누르면 리모컨 작동이 훨씬 잘됩니다',
      en: '1) Press the power button\n2) Press the home key and wait for the menu to appear\n3) Choose a channel with the arrows\n4) Press the OK (확인) button and enjoy\n💡 The remote works much better when pointed at the projector',
      ja: '1) 電源ボタンを押してください\n2) ホームキーを押してメニュー画面が出るまで待ってください\n3) 矢印でチャンネルを選んでください\n4) 確認ボタンを押して楽しくご視聴ください\n💡 プロジェクターに向けてボタンを押すと、リモコンがよく効きます',
      zh: '1) 按电源按钮\n2) 按主页键，等待菜单画面出现\n3) 用箭头选择频道\n4) 按确认按钮，尽情观看\n💡 将遥控器对准投影仪按键，操作会更灵敏' } },
    { src: './assets/img/projector/03_white_table.jpg', type: 'image', caption: {
      ko: '빔 화면 "상하좌우" 조정시 화이트 테이블을 미세하게 움직이는게 가장 확실하고 빠른 방법으로 추천드립니다😅😅😅',
      en: 'To adjust the screen position ("up/down/left/right"), gently nudging the white table is the surest and fastest way 😅😅😅',
      ja: '画面の「上下左右」を調整するには、白いテーブルを少しずつ動かすのが一番確実で早い方法です😅😅😅',
      zh: '调整画面"上下左右"位置时，最可靠、最快的方法就是轻轻微调白色桌子的位置😅😅😅' } },
    { src: './assets/img/projector/02_focus_ring.jpg', type: 'image', caption: {
      ko: '화면이 흐릿하면 렌즈 위쪽의 초점 링(Focus Ring)을 좌우로 천천히 돌려 초점을 맞추세요\n💡 리모컨으로 켜지지 않으면 본체 뒷면의 전원 스위치가 ON인지 확인하세요',
      en: 'If the picture is blurry, slowly turn the focus ring above the lens to sharpen it\n💡 If the remote does not turn it on, check that the power switch on the back is ON',
      ja: '画面がぼやける場合は、レンズ上部のフォーカスリングをゆっくり回してピントを合わせてください\n💡 リモコンで電源が入らない場合は、本体背面の電源スイッチがONか確認してください',
      zh: '画面模糊时，请慢慢转动镜头上方的对焦环调整焦距\n💡 遥控器无法开机时，请确认机身背面的电源开关是否为ON' } },
  ],
  trash: [
    { src: './assets/img/trash/01_outdoor_spot.jpg', type: 'image', caption: {
      ko: '객실 내 분리수거함이 꽉 찼을 경우 숙소 외부에 버리실 수 있어요 :)\n1) 싱크대 개수대 아래쪽에 여분의 비닐봉투가 있어요\n2) 화살표 방향(체크 표시 위치)에 놔두시면 돼요 ^^',
      en: 'If the recycling bin in the room is full, you can take it outside :)\n1) Extra plastic bags are under the kitchen sink\n2) Leave the bags where the arrows (check marks) point :)',
      ja: '客室内の分別ゴミ箱がいっぱいになったら、外に出すことができます :)\n1) キッチンシンクの下に予備のビニール袋があります\n2) 矢印の方向（チェック印の場所）に置いてください ^^',
      zh: '房间内的分类垃圾桶满了的话，可以拿到住宿外面丢弃 :)\n1) 厨房水槽下方有备用塑料袋\n2) 放在箭头所指（打勾标记）的位置即可 ^^' } },
  ],
  dehumidifier: [
    { src: './assets/img/dehumidifier/01_panel.jpg', type: 'image', caption: {
      ko: '빨간 표시는 물탱크 만수를 뜻해요\n계속해서 뽀송뽀송함을 유지하시려면 물을 비워서 사용하시는 걸 추천드려요 👍',
      en: 'The red light means the water tank is full\nTo keep the air nice and dry, please empty the tank before use 👍',
      ja: '赤いランプはタンク満水のサインです\n快適な空気を保つために、水を捨ててからご使用ください 👍',
      zh: '红色指示灯表示水箱已满\n为保持室内干爽，建议倒掉水后继续使用 👍' } },
    { src: './assets/img/dehumidifier/02_drain.jpg', type: 'image', caption: {
      ko: '물 비우는 방법\n1) 물탱크 하단 홈에 손을 넣고 부드럽게 당겨 꺼내세요\n2) 화살표가 가리키는 물탱크 배수구를 확인하세요\n3) 물탱크를 기울여 물을 비우세요\n4) 물탱크를 다시 제습기에 올바르게 장착하세요\n⚠️ 물통 안 흰색 플로터(만수 감지 센서)는 버리지 마세요',
      en: 'How to empty the tank\n1) Put your hand in the groove at the bottom and gently pull the tank out\n2) Check the drain hole where the arrow points\n3) Tilt the tank to pour out the water\n4) Put the tank back in place correctly\n⚠️ Do not remove the white float (full-tank sensor) inside the tank',
      ja: '水の捨て方\n1) タンク下部の溝に手を入れてゆっくり引き出してください\n2) 矢印が指すタンクの排水口を確認してください\n3) タンクを傾けて水を捨ててください\n4) タンクを元どおりに取り付けてください\n⚠️ タンク内の白いフロート（満水センサー）は捨てないでください',
      zh: '倒水方法\n1) 手伸入水箱底部凹槽，轻轻拉出水箱\n2) 确认箭头所指的水箱排水口\n3) 倾斜水箱倒掉水\n4) 将水箱正确装回除湿机\n⚠️ 请勿取出水箱内的白色浮子（满水感应器）' } },
  ],
  washer: [
    { src: './assets/img/washer/01_washer_dryer_full.jpg', type: 'image', caption: { ko: '아래쪽이 세탁기, 위쪽이 건조기입니다\n🛏️ 건조기 안에 침구가 들어있을 수 있어요! 사용 전 잠시만 깨끗한 곳으로 옮겨주시면 감사하겠습니다 :)', en: 'Bottom is the washer, top is the dryer\n🛏️ Bedding may be inside the dryer! Please move it to a clean spot before use — thank you! :)', ja: '下が洗濯機、上が乾燥機です\n🛏️ 乾燥機の中に寝具が入っていることがあります！ご使用前にきれいな場所へ移してください :)', zh: '下面是洗衣机，上面是烘干机\n🛏️ 烘干机内可能放有寝具！使用前请先移到干净的地方，谢谢 :)' } },
    { src: './assets/img/washer/02_washer_closeup.jpg', type: 'image', caption: { ko: 'Midea 세탁기입니다', en: 'Midea washing machine', ja: 'Midea洗濯機です', zh: 'Midea洗衣机' } },
    { src: './assets/img/washer/03_washer_button.jpg', type: 'image', caption: { ko: '다이얼을 눌러 전원을 켜세요', en: 'Press the dial to turn on', ja: 'ダイヤルを押して電源を入れてください', zh: '按旋钮开机' } },
    { src: './assets/img/washer/04_detergent_slot.jpg', type: 'image', caption: { ko: '세제는 세탁기 뒤에 있습니다', en: 'Detergent is behind the washer', ja: '洗剤は洗濯機の後ろにあります', zh: '洗涤剂在洗衣机后面' } },
    { src: './assets/img/washer/13_dryer_panel.jpg', type: 'image', caption: { ko: '건조기 조작 패널입니다', en: 'Dryer control panel', ja: '乾燥機の操作パネルです', zh: '烘干机控制面板' } },
  ]
};

// 슬라이드 모달 상태
let slideCurrentIndex = 0;
let slideCurrentData = [];
let touchStartX = 0;
let touchEndX = 0;

// 슬라이드 모달 열기
function openSlideModal(category, startIndex = 0) {
  const data = SLIDE_DATA[category];
  if (!data || data.length === 0) return;

  slideCurrentData = data;
  slideCurrentIndex = startIndex;

  const modal = document.getElementById('slideModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  renderSlide();
}

// 슬라이드 모달 닫기
function closeSlideModal() {
  const modal = document.getElementById('slideModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // 비디오 정지
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  slideCurrentData = [];
  slideCurrentIndex = 0;
}

// 현재 슬라이드 렌더링
function renderSlide() {
  const item = slideCurrentData[slideCurrentIndex];
  if (!item) return;

  const mediaEl = document.querySelector('.slide-media');
  const captionEl = document.querySelector('.slide-caption');
  const counterEl = document.querySelector('.slide-counter');

  // 미디어 렌더링
  if (item.type === 'video') {
    mediaEl.innerHTML = `<video src="${item.src}" muted playsinline controls></video>`;
  } else {
    mediaEl.innerHTML = `<img src="${item.src}" alt="${item.caption[currentLang] || ''}" draggable="false">`;
  }

  // 캡션 렌더링
  const captionText = item.caption[currentLang] || '';
  captionEl.textContent = captionText;
  captionEl.classList.toggle('multiline', captionText.includes('\n'));

  // 카운터 렌더링
  counterEl.textContent = `${slideCurrentIndex + 1} / ${slideCurrentData.length}`;

  // 네비게이션 버튼 표시/숨김
  document.querySelector('.slide-prev').style.visibility = slideCurrentIndex > 0 ? 'visible' : 'hidden';
  document.querySelector('.slide-next').style.visibility = slideCurrentIndex < slideCurrentData.length - 1 ? 'visible' : 'hidden';
}

// 이전 슬라이드
function slidePrev() {
  if (slideCurrentIndex > 0) {
    // 비디오 정지
    const video = document.querySelector('.slide-media video');
    if (video) video.pause();
    slideCurrentIndex--;
    renderSlide();
  }
}

// 다음 슬라이드
function slideNext() {
  if (slideCurrentIndex < slideCurrentData.length - 1) {
    // 비디오 정지
    const video = document.querySelector('.slide-media video');
    if (video) video.pause();
    slideCurrentIndex++;
    renderSlide();
  }
}

// 슬라이드 모달 이벤트 리스너 설정
function setupSlideModal() {
  const modal = document.getElementById('slideModal');
  if (!modal) return;

  // 닫기 버튼
  modal.querySelector('.slide-close').addEventListener('click', closeSlideModal);

  // 오버레이 클릭
  modal.querySelector('.slide-modal-overlay').addEventListener('click', closeSlideModal);

  // 이전/다음 버튼
  modal.querySelector('.slide-prev').addEventListener('click', slidePrev);
  modal.querySelector('.slide-next').addEventListener('click', slideNext);

  // 키보드 이벤트
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeSlideModal();
        break;
      case 'ArrowLeft':
        slidePrev();
        break;
      case 'ArrowRight':
        slideNext();
        break;
    }
  });

  // 터치 스와이프 지원
  const content = modal.querySelector('.slide-modal-content');

  content.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  content.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideNext();
      } else {
        slidePrev();
      }
    }
  }, { passive: true });
}

// appliance-card 클릭 이벤트 바인딩 (콘텐츠 로드 후 호출)
function bindSlideCardEvents() {
  // appliance-card 클릭 이벤트
  document.querySelectorAll('.appliance-card[data-category]').forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      if (SLIDE_DATA[category]) {
        openSlideModal(category);
      }
    });
  });

  // direction 사진 보기 버튼 클릭 이벤트
  document.querySelectorAll('.direction-photo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openSlideModal('direction');
    });
  });

  // 체크인 섹션 사진 클릭 → 해당 사진으로 슬라이드 열기
  document.querySelectorAll('.checkin-step-image img').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      // direction 데이터에서 해당 사진 인덱스 찾기
      const idx = SLIDE_DATA.direction.findIndex(item => src.includes(item.src.split('/').pop()));
      openSlideModal('direction', idx >= 0 ? idx : 0);
    });
  });

  // 공항버스 승차장 링크 클릭 → 지도로 이동 + 위치 표시
  document.querySelectorAll('.airport-stop-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showAirportStop(link.dataset.stop);
    });
  });
}

// 인천공항 승차장(T1/T2) 지도 표시
let airportStopMarker;
let airportStopInfoWindow;

function showAirportStop(stopKey) {
  // 지도 섹션으로 스크롤
  const mapSection = document.querySelector('.section-map');
  if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 언어 전환으로 지도가 재로드 중이면 잠시 후 한 번 재시도
  if (typeof google === 'undefined' || !map) {
    setTimeout(() => {
      if (typeof google !== 'undefined' && map) showAirportStop(stopKey);
    }, 1500);
    return;
  }

  const position =
    stopKey === 't2' ? CONFIG.locations.airportT2Stop : CONFIG.locations.airportT1Stop;
  const info = CONFIG.texts.airportStopInfo[stopKey === 't2' ? 't2' : 't1'][currentLang];

  // 기존 마커 재사용
  if (airportStopMarker) {
    airportStopMarker.setPosition(position);
  } else {
    airportStopMarker = new google.maps.Marker({
      map: map,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      },
    });
  }

  if (airportStopInfoWindow) airportStopInfoWindow.close();
  airportStopInfoWindow = new google.maps.InfoWindow({ content: info });
  airportStopInfoWindow.open(map, airportStopMarker);

  // 승차장 위치로 지도 이동
  map.setCenter(position);
  map.setZoom(16);
}

// DOMContentLoaded 시 슬라이드 모달 설정
document.addEventListener('DOMContentLoaded', () => {
  setupSlideModal();
});

// 기존 loadLanguageContent 이후 카드 이벤트 바인딩을 위한 MutationObserver
const contentContainer = document.getElementById('content-container');
if (contentContainer) {
  const observer = new MutationObserver(() => {
    bindSlideCardEvents();
  });
  observer.observe(contentContainer, { childList: true, subtree: true });
}
