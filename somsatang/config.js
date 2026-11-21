// 솜사탕(Candy Cotton) 설정 — 엔진(../script.js)이 이 페이지 기준으로 읽는다
const CONFIG = {
  googleMapLangCodes: { en: "en", ko: "ko", ja: "ja", zh: "zh-CN" },

  locations: {
    // 구글맵 Plus Code 8Q9972Q9+JXR (수원천로406번길 15-6)
    home: { lat: 37.2891125, lng: 127.0198906 },
    // 선택: 아래 키를 넣으면 지도 아래에 해당 버튼이 생긴다
    station: { lat: 37.265961, lng: 127.00011, title: "Suwon Station" },
    airportBusStop: { lat: 37.3050001, lng: 127.0032746, title: "Hanil Town Airport Bus Stop" },
    airportT1Stop: { lat: 37.4482, lng: 126.452 },
    airportT2Stop: { lat: 37.467, lng: 126.4361 },
  },

  texts: {
    infoContents: {
      en: "<strong>솜사탕(Candy Cotton)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>Check-in: From 4:00 PM<br>Check-out: Until 11:00 AM",
      ko: "<strong>솜사탕(Candy Cotton)</strong><br>경기도 수원시 장안구 수원천로406번길 15-6<br>1층 101호 (연무동)<br>체크인: 오후 4시부터<br>체크아웃: 오전 11시까지",
      ja: "<strong>솜사탕(Candy Cotton)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>チェックイン: 午後4時から<br>チェックアウト: 午前11時まで",
      zh: "<strong>솜사탕(Candy Cotton)</strong><br>15-6, Suwoncheon-ro 406beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do<br>(Yeonmu-dong, 1F Unit 101)<br>入住时间: 下午4点起<br>退房时间: 上午11点前",
    },
    stationInfo: {
      en: "<strong>Suwon Station</strong><br>Take bus #35 or #7-1 from Yeokjeon Market stop to Janganmun",
      ko: "<strong>수원역</strong><br>역전시장 정류장에서 35·7-1번 버스 탑승 → 장안문 하차",
      ja: "<strong>水原駅</strong><br>駅前市場停留所で35・7-1番バスに乗車 → 長安門で下車",
      zh: "<strong>水原站</strong><br>在站前市场站乘坐35路·7-1路公交车 → 长安门下车",
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
    airportBusInfo: {
      en: "<strong>Hanil Town Stop (Airport Bus)</strong><br>Get off bus #4000 from Incheon Airport<br>About 10 min by taxi to the accommodation",
      ko: "<strong>한일타운 정류장 (공항버스)</strong><br>인천공항 4000번 하차<br>숙소까지 택시로 약 10분",
      ja: "<strong>ハンイルタウン停留所 (空港バス)</strong><br>仁川空港発4000番で下車<br>宿泊先までタクシーで約10分",
      zh: "<strong>韩一城站 (机场巴士)</strong><br>仁川机场4000路在此下车<br>乘出租车约10分钟到住宿",
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

  parkingLocations: [
    {
      lat: 37.2880796,
      lng: 127.0195998,
      type: "paid",
      title: {
        en: "Yeonmu-dong Public Parking (24h, max ₩7,000/day)",
        ko: "연무동공영주차장 (24시간, 1일 최대 7,000원)",
        ja: "練武洞公営駐車場 (24時間, 1日最大7,000ウォン)",
        zh: "练武洞公营停车场 (24小时, 每日最高7,000韩元)",
      },
      address: {
        en: "57, Gyeongsu-daero 743beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do",
        ko: "경기도 수원시 장안구 경수대로743번길 57",
        ja: "57, Gyeongsu-daero 743beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do",
        zh: "57, Gyeongsu-daero 743beon-gil, Jangan-gu, Suwon-si, Gyeonggi-do",
      },
    },
    {
      lat: 37.2897152,
      lng: 127.0161814,
      type: "paid",
      title: {
        en: "Hwahongmun Public Parking (24h, max ₩7,000/day)",
        ko: "화홍문공영주차장 (24시간, 1일 최대 7,000원)",
        ja: "華虹門公営駐車場 (24時間, 1日最大7,000ウォン)",
        zh: "华虹门公营停车场 (24小时, 每日最高7,000韩元)",
      },
      address: {
        en: "280, Paldal-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
        ko: "경기도 수원시 장안구 팔달로 280",
        ja: "280, Paldal-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
        zh: "280, Paldal-ro, Jangan-gu, Suwon-si, Gyeonggi-do",
      },
    },
  ],

  // 사진 슬라이드 — 키는 lang 파일의 data-category 와 맞춘다. 사진은 ./assets/img/<키>/ 에
  slides: {
    direction: [],
    aircon: [
      { src: './assets/img/aircon/01_remote_holder.jpg', type: 'image', caption: {
        ko: "에어컨·TV 리모컨은 문 옆 벽의 리모컨 꽂이에 있어요\n(흰색: 에어컨 / 검정색: TV)",
        en: "The AC and TV remotes are in the holder on the wall next to the door\n(White: AC / Black: TV)",
        ja: "エアコン・TVのリモコンはドア横の壁のリモコン入れにあります\n（白: エアコン / 黒: TV）",
        zh: "空调和电视遥控器在门旁墙上的遥控器收纳盒里\n（白色: 空调 / 黑色: 电视）" } },
      { src: './assets/img/aircon/02_ac_remote.jpg', type: 'image', caption: {
        ko: "1) 왼쪽 위 전원 버튼으로 켜기\n2) 모드 버튼으로 냉방 선택\n3) 온도 버튼을 위·아래로 눌러 온도 조절\n💡 권장 온도 24-26°C",
        en: "1) Turn on with the power button (top left)\n2) Select Cool with the Mode (모드) button\n3) Press the Temp (온도) button up/down to adjust\n💡 Recommended: 24-26°C",
        ja: "1) 左上の電源ボタンでオン\n2) モード(모드)ボタンで冷房を選択\n3) 温度(온도)ボタンを上下に押して調整\n💡 推奨温度 24-26°C",
        zh: "1) 按左上方电源按钮开机\n2) 用模式(모드)按钮选择制冷\n3) 上下按温度(온도)按钮调节\n💡 建议温度 24-26°C" } },
    ],
    washer: [
      { src: './assets/img/washer/01_washer_dryer.jpg', type: 'image', caption: {
        ko: "아래쪽이 세탁기, 위쪽이 건조기입니다. 자유롭게 사용하세요 :)",
        en: "Bottom is the washer, top is the dryer. Feel free to use them :)",
        ja: "下が洗濯機、上が乾燥機です。ご自由にお使いください :)",
        zh: "下面是洗衣机，上面是烘干机。可随意使用 :)" } },
      { src: './assets/img/washer/02_control_dial.jpg', type: 'image', caption: {
        ko: "1) 왼쪽 전원 버튼 누르기\n2) 가운데 다이얼을 돌려 코스 선택\n3) 오른쪽 ▷|| 버튼으로 시작\n(세탁기·건조기 사용법이 같아요)",
        en: "1) Press the power button on the left\n2) Turn the center dial to choose a course\n3) Press ▷|| on the right to start\n(The washer and dryer work the same way)",
        ja: "1) 左の電源ボタンを押す\n2) 中央のダイヤルを回してコースを選択\n3) 右の ▷|| ボタンでスタート\n（洗濯機・乾燥機とも同じ使い方です）",
        zh: "1) 按左侧电源按钮\n2) 转动中间旋钮选择程序\n3) 按右侧 ▷|| 按钮开始\n（洗衣机和烘干机用法相同）" } },
      { src: './assets/img/washer/03_detergent.jpg', type: 'image', caption: {
        ko: "세제와 건조기용 섬유유연제 시트는 세탁기 옆 선반에 있어요",
        en: "Detergent and dryer sheets are on the shelf next to the washer",
        ja: "洗剤と乾燥機用の柔軟剤シートは洗濯機横の棚にあります",
        zh: "洗涤剂和烘干机用柔顺片在洗衣机旁边的架子上" } },
      { src: './assets/img/washer/04_drying_rack.jpg', type: 'image', caption: {
        ko: "건조기에 넣기 어려운 옷은 미니 빨래건조대를 사용하세요",
        en: "Use the mini drying rack for clothes that can't go in the dryer",
        ja: "乾燥機に入れられない衣類はミニ物干しラックをお使いください",
        zh: "不适合烘干的衣物请使用迷你晾衣架" } },
    ],
    boiler: [
      { src: './assets/img/boiler/01_thermostat.jpg', type: 'image', caption: {
        ko: "보일러 온도조절기 (나비엔)\n1) 오른쪽 전원 버튼으로 켜기 (초록 불)\n2) 기능선택 다이얼: 실내(방 온도) / 온돌(바닥 온도) / 온수전용(온수만)\n3) 난방조절 다이얼을 + 쪽으로 돌리면 더 따뜻해져요\n💡 외출 시에는 난방조절 다이얼을 '외출'로\n📶 온도조절기 위 스티커의 QR코드로 Wi-Fi에 바로 연결할 수 있어요",
        en: "Boiler thermostat (Navien)\n1) Turn on with the power button on the right (green light)\n2) Function dial: Indoor (실내, room temp) / Ondol (온돌, floor temp) / Hot water only (온수전용)\n3) Turn the heating dial toward + for more heat\n💡 When going out, set the heating dial to Away (외출)\n📶 Scan the QR code on the sticker above the thermostat to connect to Wi-Fi",
        ja: "ボイラー温度調節器（ナビエン）\n1) 右の電源ボタンでオン（緑のランプ）\n2) 機能選択ダイヤル: 室内(실내) / オンドル(온돌、床の温度) / お湯のみ(온수전용)\n3) 暖房調節ダイヤルを＋側に回すと暖かくなります\n💡 外出時は暖房調節ダイヤルを「外出(외출)」に\n📶 温度調節器の上のステッカーのQRコードでWi-Fiに接続できます",
        zh: "锅炉温控器（Navien）\n1) 按右侧电源按钮开机（绿灯亮）\n2) 功能选择旋钮: 室内(실내) / 地暖(온돌) / 仅热水(온수전용)\n3) 将供暖调节旋钮转向＋会更暖和\n💡 外出时请将供暖调节旋钮转到“外出(외출)”\n📶 扫描温控器上方贴纸的二维码即可连接Wi-Fi" } },
    ],
    tv: [
      { src: './assets/img/tv/01_remote.jpg', type: 'image', caption: {
        ko: "왼쪽 위 전원 버튼으로 TV를 켜세요\nYouTube·Netflix·쿠팡플레이 버튼으로 바로 볼 수 있어요",
        en: "Turn on the TV with the power button (top left)\nUse the YouTube, Netflix and Coupang Play buttons to watch right away",
        ja: "左上の電源ボタンでTVをオンにしてください\nYouTube・Netflix・Coupang Playボタンですぐに視聴できます",
        zh: "按左上方电源按钮打开电视\n可直接按YouTube、Netflix、Coupang Play按钮观看" } },
      { src: './assets/img/tv/02_router_box.jpg', type: 'image', caption: {
        ko: "책 모양 정리함 안에 Wi-Fi 공유기와 TV 셋톱박스가 있어요",
        en: "The Wi-Fi router and TV set-top box are inside the book-shaped box",
        ja: "本の形の収納ボックスの中にWi-Fiルーターとセットトップボックスがあります",
        zh: "Wi-Fi路由器和电视机顶盒在书本造型的收纳盒里" } },
      { src: './assets/img/tv/03_router_power.jpg', type: 'image', caption: {
        ko: "Wi-Fi·TV가 안 될 때는 빨간색 LGU+ 태그가 붙은 전원선을 뽑았다가 다시 꽂고 잠시 기다려 주세요",
        en: "If Wi-Fi or TV isn't working, unplug the power cable with the red LGU+ tag, plug it back in, and wait a moment",
        ja: "Wi-Fi・TVが使えない時は、赤いLGU+タグの付いた電源ケーブルを抜いて差し直し、少しお待ちください",
        zh: "Wi-Fi或电视无法使用时，请拔下贴有红色LGU+标签的电源线，重新插上后稍等片刻" } },
    ],
  },

  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

export default CONFIG;
