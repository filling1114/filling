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
    home: { lat: 37.290236, lng: 127.017845 },
    suwonStation: { lat: 37.265961, lng: 127.00011 },
  },

  // 각 언어별 텍스트 정의
  texts: {
    infoContents: {
      en: "<strong>채움</strong><br>15-10, Suwoncheon-ro 407beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>Check-in: From 3:00 PM<br>Check-out: Until 11:00 AM",
      ko: "<strong>채움</strong><br>경기도 수원시 장안구 수원천로407번길 15-10<br>체크인: 오후 3시부터<br>체크아웃: 오전 11시까지",
      ja: "<strong>채움</strong><br>韓国京畿道水原市長安区水原川路407番街15-10<br>チェックイン: 午後3時から<br>チェックアウト: 午前11時まで",
      zh: "<strong>채움</strong><br>韩国京畿道水原市长安区水原川路407番街15-10<br>入住时间: 下午3点起<br>退房时间: 上午11点前",
    },
    stationInfo: {
      en: "<strong>Suwon Station</strong><br>Take bus #13 or #35 to Janganmun Bus Stop",
      ko: "<strong>수원역</strong><br>13번, 35번 버스 탑승 후 장안문 정류장 하차",
      ja: "<strong>水原駅</strong><br>13番、35番バスに乗車し、長安門停留所で下車",
      zh: "<strong>水原站</strong><br>乘坐13路或35路公交车，在长安门站下车",
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
      free: {
        en: "Free Parking",
        ko: "무료 주차장",
        ja: "無料駐車場",
        zh: "免费停车场",
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
      lat: 37.290376,
      lng: 127.017603,
      type: "free",
      title: {
        en: "Free Parking",
        ko: "무료 주차장",
        ja: "無料駐車場",
        zh: "免费停车场",
      },
    },
    {
      lat: 37.290418,
      lng: 127.01754,
      type: "free",
      title: {
        en: "Free Parking",
        ko: "무료 주차장",
        ja: "無料駐車場",
        zh: "免费停车场",
      },
    },
    {
      lat: 37.290206,
      lng: 127.017583,
      type: "free",
      title: {
        en: "Free Parking",
        ko: "무료 주차장",
        ja: "無料駐車場",
        zh: "免费停车场",
      },
    },
    {
      lat: 37.289627,
      lng: 127.01625,
      type: "paid",
      title: {
        en: "Paid Parking (₩7,000/night)",
        ko: "유료 주차장 (7,000원/1박)",
        ja: "有料駐車場 (7,000ウォン/泊)",
        zh: "收费停车场 (7,000韩元/晚)",
      },
    },
  ],

  // API 키
  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

// 외부에서 사용할 수 있도록 내보내기
export default CONFIG;
