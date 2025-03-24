// config.js 모듈 임포트
import CONFIG from "./config.js";

// 전역 변수 정의
let map;
let marker;
let infoWindow;
let currentLang = "en";
let polylinePath;
let stationMarker;
let parkingMarkers = [];

// 페이지 로드 시 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  // 초기 콘텐츠 로드
  loadLanguageContent(currentLang);

  // 언어 선택 기능
  setupLanguageSelector();

  // 초기 맵 로드를 위한 스크립트 추가
  loadGoogleMapsScript(currentLang);

  // 버튼 생성
  createButtons();
});

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
    const response = await fetch(`./${lang}.html`);
    const html = await response.text();
    document.getElementById("content-container").innerHTML = html;

    // 현재 언어에 맞는 컨텐츠 활성화
    document.querySelectorAll(".language-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`content-${lang}`).classList.add("active");

    // 현재 언어 업데이트
    currentLang = lang;

    // 언어에 맞게 버튼 텍스트 업데이트
    updateButtonTexts();
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
  if (!stationMarker) {
    // 수원역 마커 생성
    stationMarker = new google.maps.Marker({
      position: CONFIG.locations.suwonStation,
      map: map,
      title: "Suwon Station",
      animation: google.maps.Animation.DROP,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
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

// 구글 맵 경로 열기 함수
function openGoogleMapsDirections() {
  const suwonStation = CONFIG.locations.suwonStation;
  const home = CONFIG.locations.home;

  const url = `https://www.google.com/maps/dir/?api=1&origin=${suwonStation.lat},${suwonStation.lng}&destination=${home.lat},${home.lng}&travelmode=transit&hl=${CONFIG.googleMapLangCodes[currentLang]}`;
  window.open(url, "_blank");
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
    content: CONFIG.texts.infoContents[currentLang],
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
    infoWindow.setContent(CONFIG.texts.infoContents[lang]);
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

  // 맵 객체 초기화
  const mapDiv = document.getElementById("map");
  if (mapDiv) {
    mapDiv.innerHTML = "";
  }

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
  if (parkingMarkers.length === 0) {
    // 주차장 마커 생성
    CONFIG.parkingLocations.forEach((location) => {
      // 마커 색상 설정 (무료는 초록색, 유료는 파란색)
      const iconUrl =
        location.type === "free"
          ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title[currentLang],
        animation: google.maps.Animation.DROP,
        icon: { url: iconUrl },
      });

      // 정보 창 생성
      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>${location.title[currentLang]}</strong>`,
      });

      // 마커 클릭 시 정보 창 열기
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // 마커 배열에 추가
      parkingMarkers.push({ marker, infoWindow });
    });

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
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" width="20" height="20" style="margin-right: 5px;">
        <span>${CONFIG.texts.parkingLegend.free[currentLang]}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" width="20" height="20" style="margin-right: 5px;">
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
