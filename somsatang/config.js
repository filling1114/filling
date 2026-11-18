// 솜사탕(Somsatang) 설정 — 엔진(../script.js)이 이 페이지 기준으로 읽는다
const CONFIG = {
  googleMapLangCodes: { en: "en", ko: "ko", ja: "ja", zh: "zh-CN" },

  locations: {
    // 구글맵 Plus Code 8Q9972Q9+JXR (수원천로406번길 15-6)
    home: { lat: 37.2891125, lng: 127.0198906 },
    // 선택: 아래 키를 넣으면 지도 아래에 해당 버튼이 생긴다
    station: { lat: 37.265961, lng: 127.00011, title: "Suwon Station" },
    // airportBusStop: { lat: ..., lng: ..., title: "OO Airport Bus Stop" },
    // airportT1Stop / airportT2Stop: lang 파일에 .airport-stop-link 를 쓸 때만
  },

  texts: {
    infoContents: {
      en: "<strong>솜사탕(Somsatang)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>Check-in: From 4:00 PM<br>Check-out: Until 11:00 AM",
      ko: "<strong>솜사탕(Somsatang)</strong><br>경기도 수원시 장안구 수원천로406번길 15-6<br>1층 101호 (연무동)<br>체크인: 오후 4시부터<br>체크아웃: 오전 11시까지",
      ja: "<strong>솜사탕(Somsatang)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>チェックイン: 午後4時から<br>チェックアウト: 午前11時まで",
      zh: "<strong>솜사탕(Somsatang)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>入住时间: 下午4点起<br>退房时间: 上午11点前",
    },
    stationInfo: {
      en: "<strong>Suwon Station</strong><br>Take bus #35 or #13 from Maesan Market stop to Janganmun",
      ko: "<strong>수원역</strong><br>매산시장 정류장에서 35·13번 버스 탑승 → 장안문 하차",
      ja: "<strong>水原駅</strong><br>梅山市場停留所で35・13番バスに乗車 → 長安門で下車",
      zh: "<strong>水原站</strong><br>在梅山市场站乘坐35路·13路公交车 → 长安门下车",
    },
    transitButton: {
      show: { en: "Show Suwon Station", ko: "수원역 표시하기", ja: "水原駅を表示", zh: "显示水原站" },
      hide: { en: "Hide Suwon Station", ko: "수원역 숨기기", ja: "水原駅を隠す", zh: "隐藏水原站" },
    },
    googleMapsButton: {
      en: "View Route in Google Maps",
      ko: "구글 맵에서 경로 보기",
      ja: "Googleマップでルートを見る",
      zh: "在Google地图中查看路线",
    },
    // airportBusStop / parkingLocations 를 쓰면 베이스가든 config.js 의
    // airportBusButton·airportBusInfo·parkingButton·parkingLegend 를 같이 넣는다
  },

  parkingLocations: [],

  // 사진 슬라이드 — 키는 lang 파일의 data-category 와 맞춘다. 사진은 ./assets/img/<키>/ 에
  slides: {
    direction: [],
  },

  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

export default CONFIG;
