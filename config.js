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
    station: { lat: 37.265961, lng: 127.00011, title: "Suwon Station" },
    airportBusStop: { lat: 37.3050001, lng: 127.0032746, title: "Hanil Town Airport Bus Stop" },
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

  // 사진 슬라이드 (경로는 이 숙소 페이지 기준)
  slides: {
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
      { src: './assets/img/dehumidifier/01_dehumidifier.jpg', type: 'image', caption: {
        ko: '쾌적한 휴식을 위해 아래 사항을 안내해 드립니다.\n• 제습기 24시간 가동: 쾌적한 실내를 위해 연속 배수로 항시 작동 중입니다.',
        en: 'For a comfortable stay, please note the following.\n• Dehumidifier running 24/7: It runs continuously with direct drainage to keep the room pleasant.',
        ja: '快適にお過ごしいただくため、以下をご案内いたします。\n• 除湿機24時間稼働：連続排水で常時運転し、室内を快適に保っています。',
        zh: '为了让您舒适休息，谨此说明以下事项。\n• 除湿机24小时运行：采用连续排水方式全天候运转，保持室内干爽舒适。' } },
      { src: './assets/img/dehumidifier/02_earplugs.jpg', type: 'image', caption: {
        ko: '• 야구장 함성 소리: KT위즈파크(도보 3분) 경기 시 열정적인 함성이 들릴 수 있습니다.\n이 소리가 누군가에겐 백색소음과 열정이지만, 누군가에겐 소음일 수 있기에 편안한 수면을 돕는 귀마개를 준비해 두었습니다.\n게스트님의 편안하고 단단한 숙면을 언제나 응원합니다! 🌙',
        en: '• Cheers from the ballpark: KT Wiz Park is a 3-minute walk away, so you may hear enthusiastic cheering during games.\nFor some it is white noise and excitement, for others simply noise — so we have prepared earplugs to help you sleep comfortably.\nWishing you a restful and sound sleep! 🌙',
        ja: '• 野球場の歓声：KTウィズパーク（徒歩3分）の試合中は、熱のこもった歓声が聞こえることがあります。\nこの音は、ある方には心地よいホワイトノイズや熱気でも、ある方には騒音になり得るため、安眠をサポートする耳栓をご用意しました。\nゲスト様がぐっすりとお休みになれますよう、心より応援しております！🌙',
        zh: '• 棒球场的呐喊声：KT Wiz Park（步行3分钟）比赛时，可能会听到热情的加油呐喊声。\n这声音对有些人是白噪音与激情，对有些人却可能是噪音，因此我们准备了助您安睡的耳塞。\n祝您睡得安稳香甜！🌙' } },
    ],
    washer: [
      { src: './assets/img/washer/01_washer_dryer_full.jpg', type: 'image', caption: { ko: '아래쪽이 세탁기, 위쪽이 건조기입니다\n🛏️ 건조기 안에 침구가 들어있을 수 있어요! 사용 전 잠시만 깨끗한 곳으로 옮겨주시면 감사하겠습니다 :)', en: 'Bottom is the washer, top is the dryer\n🛏️ Bedding may be inside the dryer! Please move it to a clean spot before use — thank you! :)', ja: '下が洗濯機、上が乾燥機です\n🛏️ 乾燥機の中に寝具が入っていることがあります！ご使用前にきれいな場所へ移してください :)', zh: '下面是洗衣机，上面是烘干机\n🛏️ 烘干机内可能放有寝具！使用前请先移到干净的地方，谢谢 :)' } },
      { src: './assets/img/washer/02_washer_closeup.jpg', type: 'image', caption: { ko: 'Midea 세탁기입니다', en: 'Midea washing machine', ja: 'Midea洗濯機です', zh: 'Midea洗衣机' } },
      { src: './assets/img/washer/03_washer_button.jpg', type: 'image', caption: { ko: '다이얼을 눌러 전원을 켜세요', en: 'Press the dial to turn on', ja: 'ダイヤルを押して電源を入れてください', zh: '按旋钮开机' } },
      { src: './assets/img/washer/04_detergent_slot.jpg', type: 'image', caption: { ko: '세제는 세탁기 뒤에 있습니다', en: 'Detergent is behind the washer', ja: '洗剤は洗濯機の後ろにあります', zh: '洗涤剂在洗衣机后面' } },
      { src: './assets/img/washer/13_dryer_panel.jpg', type: 'image', caption: { ko: '건조기 조작 패널입니다', en: 'Dryer control panel', ja: '乾燥機の操作パネルです', zh: '烘干机控制面板' } },
    ]
  },

  // API 키
  googleMapsApiKey: "AIzaSyAawtOUOZm0honfXoXNsYoW7lRtAkqv8zk",
};

// 외부에서 사용할 수 있도록 내보내기
export default CONFIG;
