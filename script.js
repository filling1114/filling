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

      // 정보 창 생성
      const parkingInfoWindow = new google.maps.InfoWindow({
        content: `<strong>${location.title[currentLang]}</strong>`,
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
    { src: './assets/img/direction/01_building_exterior.jpg?v=2', type: 'image', caption: { ko: '골목에서 보이는 건물 모습입니다', en: 'Building view from the alley', ja: '路地から見える建物の様子です', zh: '从巷子里看到的建筑外观' } },
    { src: './assets/img/direction/02_building_entrance.jpg?v=2', type: 'image', caption: { ko: '36번 주소판이 있는 입구입니다', en: 'Entrance with address number 36', ja: '36番の住所プレートがある入口です', zh: '有36号地址牌的入口' } },
    { src: './assets/img/direction/03_address_sign.jpg?v=2', type: 'image', caption: { ko: '도로명 주소 안내판을 확인하세요', en: 'Check the street address sign', ja: '道路名住所の案内板を確認してください', zh: '请确认路名地址指示牌' } },
    { src: './assets/img/direction/04_stairs_entrance.jpg?v=2', type: 'image', caption: { ko: '계단을 따라 지하로 내려가세요', en: 'Go down the stairs to the basement', ja: '階段に沿って地下へ降りてください', zh: '沿楼梯下到地下' } },
    { src: './assets/img/direction/05_room_b102_sign.jpg', type: 'image', caption: { ko: '벽에 B102 표시를 확인하세요', en: 'Look for the B102 sign on the wall', ja: '壁のB102表示を確認してください', zh: '请确认墙上的B102标识' } },
    { src: './assets/img/direction/06_front_door.jpg', type: 'image', caption: { ko: 'WELCOME 매트가 있는 현관문입니다', en: 'Front door with WELCOME mat', ja: 'WELCOMEマットのある玄関ドアです', zh: '有WELCOME地垫的大门' } },
  ],
  boiler: [
    { src: './assets/img/boiler/01_controller_on.jpg', type: 'image', caption: { ko: '우측 위 화살표로 온도를 조절하세요', en: 'Adjust temperature with the upper-right arrows', ja: '右上の矢印で温度を調整してください', zh: '用右上方箭头调节温度' } },
  ],
  tv: [
    { src: './assets/img/tv/01_monitor.jpg', type: 'image', caption: { ko: 'TV 모니터입니다', en: 'TV monitor', ja: 'TVモニターです', zh: '电视显示器' } },
    { src: './assets/img/tv/02_remote_settopbox.jpg', type: 'image', caption: { ko: '검정색 리모컨의 좌측 맨 위 빨간색 버튼이 TV 전원 버튼입니다', en: 'The red button at the top-left of the black remote is the TV power button', ja: '黒いリモコンの左上の赤いボタンがTV電源ボタンです', zh: '黑色遥控器左上方的红色按钮是电视电源按钮' } },
    { src: './assets/img/tv/04_settopbox_back_closeup.jpg', type: 'image', caption: { ko: '붉은색 전원 표시등 왼쪽에 TV 전원 버튼이 있습니다. 리모컨으로 켜지지 않을 때 눌러주세요', en: 'TV power button is to the left of the red power indicator. Press it if the remote doesn\'t work', ja: '赤い電源ランプの左側にTV電源ボタンがあります。リモコンで電源が入らない時に押してください', zh: '红色电源指示灯左侧有电视电源按钮。遥控器无法开机时请按此按钮' } },
    { src: './assets/img/tv/08_remote_side.jpg', type: 'image', caption: { ko: '측면 위쪽 버튼이 외부입력입니다. HDMI 3을 선택하면 TV를 볼 수 있습니다. + TV - 버튼으로 음량을 조절하세요', en: 'Top side button is external input. Select HDMI 3 to watch TV. Use + TV - buttons to adjust volume', ja: '側面上部のボタンが外部入力です。HDMI 3を選択するとTVが見られます。+ TV - ボタンで音量を調整してください', zh: '侧面上方按钮是外部输入。选择HDMI 3即可看电视。用 + TV - 按钮调节音量' } },
    { src: './assets/img/tv/09_cable_box.jpg', type: 'image', caption: { ko: 'TV 뒤쪽 케이블 정리함', en: 'Cable management box behind TV', ja: 'テレビ裏のケーブル整理ボックス', zh: '电视后面的线缆整理盒' } },
    { src: './assets/img/tv/10_cable_box_closeup.jpg', type: 'image', caption: { ko: 'Wi-Fi가 안 잡힐 때는 DC in 케이블을 뽑았다가 다시 꽂아주세요', en: 'If Wi-Fi is not working, unplug the DC in cable and plug it back in', ja: 'Wi-Fiが繋がらない時はDC inケーブルを抜いて再度差し込んでください', zh: 'Wi-Fi无法连接时，请拔出DC in线缆后重新插入' } },
  ],
  washer: [
    { src: './assets/img/washer/01_washer_dryer_full.jpg', type: 'image', caption: { ko: '아래쪽이 세탁기, 위쪽이 건조기입니다', en: 'Bottom is the washer, top is the dryer', ja: '下が洗濯機、上が乾燥機です', zh: '下面是洗衣机，上面是烘干机' } },
    { src: './assets/img/washer/02_washer_closeup.jpg', type: 'image', caption: { ko: 'Midea 세탁기입니다', en: 'Midea washing machine', ja: 'Midea洗濯機です', zh: 'Midea洗衣机' } },
    { src: './assets/img/washer/03_washer_button.jpg', type: 'image', caption: { ko: '다이얼을 눌러 전원을 켜세요', en: 'Press the dial to turn on', ja: 'ダイヤルを押して電源を入れてください', zh: '按旋钮开机' } },
    { src: './assets/img/washer/04_detergent_slot.jpg', type: 'image', caption: { ko: '세제는 세탁기 뒤에 있습니다', en: 'Detergent is behind the washer', ja: '洗剤は洗濯機の後ろにあります', zh: '洗涤剂在洗衣机后面' } },
    { src: './assets/img/washer/07_washer_inside.jpg', type: 'image', caption: { ko: '왼쪽이 세탁세제, 오른쪽이 섬유유연제입니다', en: 'Left is laundry detergent, right is fabric softener', ja: '左が洗剤、右が柔軟剤です', zh: '左边是洗衣液，右边是柔顺剂' } },
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
  captionEl.textContent = item.caption[currentLang] || '';

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
