// 맵 객체를 전역 변수로 선언
let map;
let marker;
let infoWindow;
let currentLang = "en"; // 기본 언어는 영어

// 언어 코드 매핑
const googleMapLangCodes = {
  en: "en",
  ko: "ko",
  ja: "ja",
  zh: "zh-CN",
};

// 각 언어에 맞는 정보 창 내용
const infoContents = {
  en: "<strong>Accommodation Name</strong><br>123-45 ○○-dong, ○○-gu, Seoul<br>Check-in: 3:00 PM - 10:00 PM",
  ko: "<strong>숙소 이름</strong><br>서울시 ○○구 ○○동 123-45<br>체크인: 오후 3시 ~ 오후 10시",
  ja: "<strong>宿泊施設名</strong><br>ソウル市○○区○○洞123-45<br>チェックイン: 午後3時～午後10時",
  zh: "<strong>住宿名称</strong><br>首尔市○○区○○洞123-45<br>入住时间: 下午3点 - 下午10点",
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
});

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
