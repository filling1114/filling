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
    hanilTownStop: { lat: 37.3050001, lng: 127.0032746 },
    airportT1Stop: { lat: 37.4482, lng: 126.452 },
    airportT2Stop: { lat: 37.467, lng: 126.4361 },
  },

  // 각 언어별 텍스트 정의
  texts: {
    infoContents: {
      en: "<strong>베이스가든(Base Garden)</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>Check-in: From 4:00 PM<br>Check-out: Until 11:00 AM",
      ko: "<strong>베이스가든(Base Garden)</strong><br>경기도 수원시 장안구 송원로86번길 36<br>일양빌라B동 B102호<br>체크인: 오후 4시부터<br>체크아웃: 오전 11시까지",
      ja: "<strong>베이스가든(Base Garden)</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>チェックイン: 午後4時から<br>チェックアウト: 午前11時まで",
      zh: "<strong>베이스가든(Base Garden)</strong><br>36, Songwon-ro 86beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Ilyang Villa B-dong B102)<br>入住时间: 下午4点起<br>退房时间: 上午11点前",
    },
    stationInfo: {
      en: "<strong>Suwon Station</strong><br>Take bus #35 to Gyoyukcheongsageori Stop",
      ko: "<strong>수원역</strong><br>35번 버스 탑승 → 교육청사거리 하차",
      ja: "<strong>水原駅</strong><br>35番バスに乗車 → 教育庁交差点で下車",
      zh: "<strong>水原站</strong><br>乘坐35路公交车 → 教育厅十字路口下车",
    },
    airportBusInfo: {
      en: "<strong>Hanil Town Stop (Airport Bus)</strong><br>Get off bus #4000 from Incheon Airport<br>10 min walk to the accommodation",
      ko: "<strong>한일타운 정류장 (공항버스)</strong><br>인천공항 4000번 하차<br>숙소까지 도보 10분",
      ja: "<strong>ハンイルタウン停留所 (空港バス)</strong><br>仁川空港発4000番で下車<br>宿泊先まで徒歩10分",
      zh: "<strong>韩一城站 (机场巴士)</strong><br>仁川机场4000路在此下车<br>步行10分钟到住宿",
    },
    airportStopInfo: {
      t1: {
        en: "<strong>T1 Bus Stop 8A</strong><br>Outside 1F arrivals, near Exit 8<br>Follow the '8A' signs and board bus #4000",
        ko: "<strong>1터미널 승차장 8A</strong><br>1층 도착층 밖 8번 출구 인근<br>'8A' 표지판을 따라가 4000번을 타세요",
        ja: "<strong>第1ターミナル乗り場 8A</strong><br>1階到着ロビー外、8番出口付近<br>「8A」の標識に沿って4000番に乗車",
        zh: "<strong>T1乘车处 8A</strong><br>一层到达层外，8号出口附近<br>跟随'8A'指示牌，乘坐4000路",
      },
      t2: {
        en: "<strong>T2 Bus Stop 36</strong><br>B1 Transportation Center bus terminal<br>Follow the 'Bus Terminal' signs and board bus #4000",
        ko: "<strong>2터미널 승차장 36번</strong><br>지하 1층 교통센터 버스터미널<br>'버스터미널' 표지판을 따라가 36번 홈에서 4000번을 타세요",
        ja: "<strong>第2ターミナル乗り場 36番</strong><br>地下1階交通センターのバスターミナル<br>「バスターミナル」の標識に沿って36番ホームで4000番に乗車",
        zh: "<strong>T2乘车处 36号</strong><br>地下一层交通中心巴士客运站<br>跟随'巴士客运站'指示牌，在36号站台乘坐4000路",
      },
    },
    airportBusButton: {
      show: {
        en: "Show Airport Bus Stop",
        ko: "공항버스 정류장 표시하기",
        ja: "空港バス停留所を表示",
        zh: "显示机场巴士站",
      },
      hide: {
        en: "Hide Airport Bus Stop",
        ko: "공항버스 정류장 숨기기",
        ja: "空港バス停留所を隠す",
        zh: "隐藏机场巴士站",
      },
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
      address: {
        en: "101, Songwon-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
        ko: "경기도 수원시 장안구 송원로 101",
        ja: "101, Songwon-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
        zh: "101, Songwon-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
      },
    },
  ],

  // API 키
  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

// 외부에서 사용할 수 있도록 내보내기
export default CONFIG;
