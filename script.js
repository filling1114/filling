// 맵 객체를 전역 변수로 선언
let map;
let marker;
let infoWindow;
let currentLang = "en"; // 기본 언어는 영어
let polylinePath;
let stationMarker;

// 언어 코드 매핑
const googleMapLangCodes = {
  en: "en",
  ko: "ko",
  ja: "ja",
  zh: "zh-CN",
};

// 각 언어에 맞는 정보 창 내용
const infoContents = {
  en: "<strong>채움</strong><br> 15-10, Suwoncheon-ro 407beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>Check-in: 3:00 PM - 10:00 PM",
  ko: "<strong>채움</strong><br>경기도 수원시 장안구 수원천로407번길 15-10<br>체크인: 오후 3시 ~ 오후 10시",
  ja: "<strong>채움</strong><br>韩国京畿道水原市长安区水原川路407番街15-10<br>チェックイン: 午後3時 ~ 午後10時",
  zh: "<strong>채움</strong><br>韓国京畿道水原市長安区水原川路407番ギル15-10<br>入住时间: 下午3点 - 下午10点",
};

// 역 정보 창 내용
const stationInfoContents = {
  en: "<strong>Suwon Station</strong><br>Take bus #11, #13, or #36 to Suwoncheon Bus Stop",
  ko: "<strong>수원역</strong><br>11번, 13번, 36번 버스 탑승 후 수원천 정류장 하차",
  ja: "<strong>水原駅</strong><br>11番、13番、36番バスに乗車し、水原川バス停で下車",
  zh: "<strong>水原站</strong><br>乘坐11路、13路或36路公交车，在水原川站下车",
};

// 페이지 로드 시 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", function () {
  // 초기 콘텐츠 로드
  loadLanguageContent(currentLang);

  // 언어 선택 기능
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

  // 초기 맵 로드를 위한 스크립트 추가
  loadGoogleMapsScript("en");

  // 대중교통 경로 버튼 추가
  createTransitButton();
});

// 대중교통 경로 버튼 생성 함수
function createTransitButton() {
  const transitButtonContainer = document.createElement("div");
  transitButtonContainer.className = "transit-button-container";

  const transitButton = document.createElement("button");
  transitButton.className = "transit-button";
  transitButton.textContent = "수원역에서 대중교통 경로 보기";
  transitButton.addEventListener("click", toggleStationView);

  transitButtonContainer.appendChild(transitButton);

  // 구글 맵으로 보기 버튼 추가
  const googleMapsButton = document.createElement("button");
  googleMapsButton.className = "google-maps-button";
  googleMapsButton.textContent = "구글 맵에서 경로 보기";
  googleMapsButton.addEventListener("click", openGoogleMapsDirections);

  transitButtonContainer.appendChild(googleMapsButton);

  // 맵 컨테이너 아래에 버튼 추가
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    mapContainer.parentNode.insertBefore(
      transitButtonContainer,
      mapContainer.nextSibling
    );
  }

  // 버튼 스타일 추가
  const style = document.createElement("style");
  style.textContent = `
    .transit-button-container {
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .transit-button, .google-maps-button {
      padding: 10px 15px;
      background-color: #2ea1ff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .transit-button:hover, .google-maps-button:hover {
      background-color: #1a91eb;
    }
  `;
  document.head.appendChild(style);
}

// 수원역 표시/숨김 토글 함수
function toggleStationView() {
  if (!stationMarker) {
    // 수원역 마커 생성
    const suwonStation = { lat: 37.265961, lng: 127.00011 };
    stationMarker = new google.maps.Marker({
      position: suwonStation,
      map: map,
      title: "Suwon Station",
      animation: google.maps.Animation.DROP,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    // 수원역 정보 창 생성
    const stationInfoWindow = new google.maps.InfoWindow({
      content: stationInfoContents[currentLang],
    });

    // 마커 클릭 시 정보 창 열기
    stationMarker.addListener("click", () => {
      stationInfoWindow.open(map, stationMarker);
    });

    // 자동으로 정보 창 열기
    stationInfoWindow.open(map, stationMarker);

    // 직선 경로 표시
    const accommodationLocation = { lat: 37.290497, lng: 127.017775 };
    polylinePath = new google.maps.Polyline({
      path: [suwonStation, accommodationLocation],
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

    // 버튼 텍스트 변경
    document.querySelector(".transit-button").textContent =
      getTransitButtonText(currentLang, true);
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
    const accommodationLocation = { lat: 37.290497, lng: 127.017775 };
    map.setCenter(accommodationLocation);
    map.setZoom(16);

    // 버튼 텍스트 변경
    document.querySelector(".transit-button").textContent =
      getTransitButtonText(currentLang, false);
  }
}

// 구글 맵 경로 열기 함수
function openGoogleMapsDirections() {
  const suwonStation = { lat: 37.265961, lng: 127.00011 };
  const accommodationLocation = { lat: 37.290497, lng: 127.017775 };

  const url = `https://www.google.com/maps/dir/?api=1&origin=${suwonStation.lat},${suwonStation.lng}&destination=${accommodationLocation.lat},${accommodationLocation.lng}&travelmode=transit&hl=${googleMapLangCodes[currentLang]}`;

  window.open(url, "_blank");
}

// 언어별 버튼 텍스트 가져오기
function getTransitButtonText(lang, isShowing) {
  if (isShowing) {
    // 역이 보이는 상태일 때
    const hideTexts = {
      en: "Hide Suwon Station",
      ko: "수원역 숨기기",
      ja: "水原駅を隠す",
      zh: "隐藏水原站",
    };
    return hideTexts[lang] || hideTexts.en;
  } else {
    // 역이 숨겨진 상태일 때
    const showTexts = {
      en: "Show Suwon Station",
      ko: "수원역 표시하기",
      ja: "水原駅を表示",
      zh: "显示水原站",
    };
    return showTexts[lang] || showTexts.en;
  }
}

// 구글 맵 버튼 텍스트 업데이트
function updateGoogleMapsButtonText(lang) {
  const googleMapsButton = document.querySelector(".google-maps-button");
  if (googleMapsButton) {
    const buttonTexts = {
      en: "View Route in Google Maps",
      ko: "구글 맵에서 경로 보기",
      ja: "Googleマップでルートを見る",
      zh: "在Google地图中查看路线",
    };
    googleMapsButton.textContent = buttonTexts[lang] || buttonTexts.en;
  }
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
    if (stationMarker) {
      document.querySelector(".transit-button").textContent =
        getTransitButtonText(lang, true);
    } else {
      document.querySelector(".transit-button").textContent =
        getTransitButtonText(lang, false);
    }

    // 구글 맵 버튼 텍스트 업데이트
    updateGoogleMapsButtonText(lang);
  } catch (error) {
    console.error("언어 파일을 불러오는 중 오류 발생:", error);
  }
}

// 맵 초기화 함수
function initMap() {
  const accommodationLocation = { lat: 37.290497, lng: 127.017775 };

  // 지도 생성
  map = new google.maps.Map(document.getElementById("map"), {
    center: accommodationLocation,
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    language: googleMapLangCodes[currentLang], // 현재 언어 설정
  });

  // 숙소 위치에 마커 추가
  marker = new google.maps.Marker({
    position: accommodationLocation,
    map: map,
    title: "Accommodation Location",
    animation: google.maps.Animation.DROP,
  });

  // 정보 창 생성
  infoWindow = new google.maps.InfoWindow({
    content: infoContents[currentLang],
  });

  // 마커 클릭 시 정보 창 열기
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  // 페이지 로드 시 정보 창 자동으로 열기
  infoWindow.open(map, marker);
}

// 맵 언어 변경 함수
function changeMapLanguage(lang) {
  // 현재 언어 저장
  currentLang = lang;

  // 정보 창 내용 업데이트
  if (infoWindow) {
    infoWindow.setContent(infoContents[lang]);
  }

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
  const googleMapLang = googleMapLangCodes[lang] || "en";
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk&callback=initMap&language=${googleMapLang}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
