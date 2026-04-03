// 설정 및 상수 정의
const CONFIG = {
  // 구글 맵 언어 코드
  googleMapLangCodes: {
    en: "en",
    ko: "ko",
    ja: "ja",
    zh: "zh-CN",
  },

  // 지역 설정
  locations: {
    home: { lat: 37.3011821, lng: 127.0114124 },
    suwonStation: { lat: 37.265961, lng: 127.00011 },
  },

  // 각 언어별 텍스트 정의
  texts: {
    infoContents: {
      en: "<strong>채움</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>Check-in: From 3:00 PM<br>Check-out: Until 11:00 AM",
      ko: "<strong>채움</strong><br>경기도 수원시 장안구 송원로86번길 36<br>일양빌라B동 B102호<br>체크인: 오후 3시부터<br>체크아웃: 오전 11시까지",
      ja: "<strong>채움</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>チェックイン: 午後3時から<br>チェックアウト: 午前11時まで",
      zh: "<strong>채움</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>入住时间: 下午3点起<br>退房时间: 上午11点前",
    },
    stationInfo: {
      en: "<strong>Suwon Station</strong><br>Take bus #35 to Gyoyukcheongsageori Stop",
      ko: "<strong>수원역</strong><br>35번 버스 탑승 → 교육청사거리 하차",
      ja: "<strong>水原駅</strong><br>35番バスに乗車 → 教育庁交差点で下車",
      zh: "<strong>水原站</strong><br>乘坐35路公交车 → 教育厅十字路口下车",
    },
    transitButton: {
      show: {
        en: "Show Suwon Station",
        ko: "수원역 표시하기",
        ja: "水原駅を表示",
        zh: "显示水原站",
      },
      hide: {
        en: "Hide Suwon Station",
        ko: "수원역 숨기기",
        ja: "水原駅を隠す",
        zh: "隐藏水原站",
      },
    },
    googleMapsButton: {
      en: "View Route in Google Maps",
      ko: "구글 맵에서 경로 보기",
      ja: "Googleマップでルートを見る",
      zh: "在Google地图中查看路线",
    },
    parkingButton: {
      show: {
        en: "Show Parking Locations",
        ko: "주차장 표시하기",
        ja: "駐車場を表示",
        zh: "显示停车场",
      },
      hide: {
        en: "Hide Parking Locations",
        ko: "주차장 숨기기",
        ja: "駐車場を隠す",
        zh: "隐藏停车场",
      },
    },
    parkingLegend: {
      title: {
        en: "Parking Legend",
        ko: "주차장 범례",
        ja: "駐車場の凡例",
        zh: "停车场图例",
      },
      paid: {
        en: "Paid Parking",
        ko: "유료 주차장",
        ja: "有料駐車場",
        zh: "收费停车场",
      },
    },
  },

  // 주차장 위치 정보
  parkingLocations: [
    {
      lat: 37.3037564,
      lng: 127.0100865,
      type: "paid",
      title: {
        en: "Jangan-gu Office Parking (₩7,000/day)",
        ko: "장안구청주차장 (1일 7,000원)",
        ja: "長安区庁駐車場 (1日7,000ウォン)",
        zh: "长安区厅停车场 (每日7,000韩元)",
      },
    },
  ],

  // API 키
  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

// 외부에서 사용할 수 있도록 내보내기
export default CONFIG;
