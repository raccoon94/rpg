// Hero data split from index.html. Keep this file data-only so UI changes stay separate.
// ---- Hero costume catalog ----
var HEROES = [
  { id:'lin', name:'린', emoji:'🔫', cls:'gun', attr:'바람', aura:'#7fd0ff', bonus:0.20, fx:'water', fxEmoji:'🌀',
    costumes:[
      { id:'lin_default', name:'기본', img:'assets/char/base/lin_base.png', sd:'assets/char/sd_custom/sd_viola.png', price:0, desc:'총잡이 기본 복장' },
      { id:'lin_summer_event', name:'물총 축제', img:'assets/char/event/lin_summer_cutout.png', sd:'assets/char/sd_custom/sd_viola.png', price:1800, aura:'#38d5ff', bonus:0.08, fxEmoji:'💦', scene:'assets/bg/beach.png', artScale:1.70, artX:'-9%', desc:'여름 이벤트 복장 · 바람과 물총 축제' },
    ]},
  { id:'rubia', name:'루비아', emoji:'🔥', cls:'magic', attr:'화염', aura:'#ff6b6b', bonus:0.20, fx:'flame', fxEmoji:'🔥',
    costumes:[
      { id:'rubia_default', name:'기본', img:'assets/char/base/sapphira_base.png', sd:'assets/char/sd_custom/sd_ceres.png', price:0, desc:'마법사 기본 복장' },
      { id:'rubia_summer_event', name:'홍련 비치', img:'assets/char/event/rubia_summer_cutout.png', sd:'assets/char/sd_custom/sd_ceres.png', price:1800, aura:'#ff6b6b', bonus:0.08, fxEmoji:'🔥', scene:'assets/bg/beach.png', artScale:1.12, desc:'여름 이벤트 복장 · 홍련 마법사의 해변 축제' },
    ]},
  { id:'sapphira', name:'사피라', emoji:'⚔️', cls:'sword', attr:'물/얼음', aura:'#5b9bff', bonus:0.22, fx:'water', fxEmoji:'💧',
    costumes:[
      { id:'sapphira_default', name:'기본', img:'assets/char/base/silvia_base.png', sd:'assets/char/sd_custom/sd_linea.png', price:0, desc:'전사 기본 복장' },
      { id:'sapphira_summer_event', name:'아쿠아 블레이드', img:'assets/char/event/sapphira_summer_cutout.png', sd:'assets/char/sd_custom/sd_linea.png', price:1800, aura:'#22d3ee', bonus:0.08, fxEmoji:'🌊', scene:'assets/bg/beach.png', desc:'여름 이벤트 복장 · 물/얼음 검사의 해변 장비' },
    ]},
  { id:'silvia', name:'실비아', emoji:'🛡️', cls:'tanker', attr:'빛', aura:'#ffe08a', bonus:0.25, fx:'feather', fxEmoji:'✨',
    costumes:[
      { id:'silvia_default', name:'기본', img:'assets/char/base/rubia_base.png', sd:'assets/char/sd_custom/sd_amelia.png', price:0, desc:'성기사 기본 복장' },
      { id:'silvia_summer_event', name:'선샤인 가드', img:'assets/char/event/silvia_summer_cutout.png', sd:'assets/char/sd_custom/sd_amelia.png', price:1800, aura:'#ffe08a', bonus:0.08, fxEmoji:'✨', scene:'assets/bg/beach.png', artScale:1.08, desc:'여름 이벤트 복장 · 빛의 수호자 해변 장비' },
    ]},
  { id:'kael', name:'카엘', emoji:'🔥', cls:'warrior', attr:'화염', aura:'#ff5b3f', bonus:0.20, fx:'flame', fxEmoji:'🔥',
    costumes:[
      { id:'kael_default', name:'기본', img:'assets/char/base/kael_base.png', sd:'assets/char/sd_custom/sd_draka.png', price:0, desc:'화염 전사 기본 복장' },
      { id:'kael_summer_event', name:'용염 서퍼', img:'assets/char/event/kael_summer_cutout.png', sd:'assets/char/sd_custom/sd_draka.png', price:1800, aura:'#ff7a3d', bonus:0.08, fxEmoji:'🔥', scene:'assets/bg/beach.png', artScale:1.05, desc:'여름 이벤트 복장 · 뜨거운 해변의 화염검' },
    ]},
  { id:'emeria', name:'에메리아', emoji:'🌿', cls:'healer', attr:'자연', aura:'#74d680', bonus:0.18, fx:'leaf', fxEmoji:'🌿',
    costumes:[
      { id:'emeria_default', name:'기본', img:'assets/char/base/emeria_base.png', sd:'assets/char/sd_custom/sd_foret.png', price:0, desc:'자연 힐러 기본 복장' },
      { id:'emeria_summer_event', name:'블로섬 비치', img:'assets/char/event/emeria_summer_cutout.png', sd:'assets/char/sd_custom/sd_foret.png', price:1800, aura:'#8ee8a8', bonus:0.08, fxEmoji:'🌸', scene:'assets/bg/beach.png', artScale:1.42, desc:'여름 이벤트 복장 · 꽃향기 가득한 해변 축제' },
    ]},
  { id:'kaira', name:'카이라', emoji:'🗡️', cls:'assassin', attr:'암흑', aura:'#ff4d6d', bonus:0.20, fx:'dark', fxEmoji:'🌑',
    costumes:[
      { id:'kaira_default', name:'기본', img:'assets/char/base/kaira_base.png', sd:'assets/char/sd_custom/sd_noxia.png', price:0, desc:'암살자 기본 복장' },
      { id:'kaira_summer_event', name:'나이트 워터', img:'assets/char/event/kaira_summer_cutout.png', sd:'assets/char/sd_custom/sd_noxia.png', price:1800, aura:'#45b7ff', bonus:0.08, fxEmoji:'💧', scene:'assets/bg/beach.png', desc:'여름 이벤트 복장 · 물결 속 암살자의 휴가' },
    ]},
  { id:'kairon', name:'카이론', emoji:'⚔️', cls:'knight', attr:'물/얼음', aura:'#4f8cff', bonus:0.22, fx:'ice', fxEmoji:'❄️',
    costumes:[
      { id:'kairon_default', name:'기본', img:'assets/char/base/kairon_base.png', sd:'assets/char/sd_custom/sd_lumiel.png', price:0, desc:'빙결 기사 기본 복장' },
      { id:'kairon_summer_event', name:'블루 썸머', img:'assets/char/event/kairon_summer_cutout.png', sd:'assets/char/sd_custom/sd_lumiel.png', price:1800, aura:'#4f8cff', bonus:0.08, fxEmoji:'💧', scene:'assets/bg/beach.png', artScale:1.42, desc:'여름 이벤트 복장 · 푸른 검의 해변 장비' },
    ]},
];

// ---- Hero summon pool ----
var HERO_POOL = [
  {name:"린", emoji:"🔫", cls:"gunner", grade:"SR", atk:50},
  {name:"루비아", emoji:"🔥", cls:"mage", grade:"SR", atk:50},
  {name:"실비아", emoji:"🛡️", cls:"tanker", grade:"SR", atk:50},
  {name:"사피라", emoji:"⚔️", cls:"warrior", grade:"SR", atk:50},
  {name:"카엘", emoji:"🔥", cls:"warrior", grade:"SR", atk:50},
  {name:"에메리아", emoji:"🌿", cls:"healer", grade:"SR", atk:50},
  {name:"카이라", emoji:"🗡️", cls:"assassin", grade:"SR", atk:50},
  {name:"카이론", emoji:"⚔️", cls:"knight", grade:"SR", atk:50},
];

// ---- World prologue ----
var WORLD = {
  title:"여명의 끝, 아스트라이아",
  prologue:[
    {who:"", text:"별이 떨어지던 밤, 하늘에 균열이 열렸다."},
    {who:"", text:"균열에서 쏟아지는 마수에 맞서, 사람들은 모험가의 도시 '루멘'에 길드를 세웠다."},
    {who:"", text:"'{이름}' — 너는 오늘, 길드 명부에 그 이름을 올렸다. 신참 파티의 리더로서."},
    {who:"린", text:"…네가 새 리더? 흐음. 눈은 나쁘지 않네."},
    {who:"린", text:"좋아, 첫 동료는 나야. 빠르고 정확하게 — 따라와. 세계의 끝을 막으러."},
    {who:"", text:"— 동료들과 유대를 쌓고, 종말의 별 '노바'로부터 세계를 지켜라."},
    {who:"", text:"(하늘의 균열 너머 — 거대한 무언가가 이쪽을 내려다보고 있다)"},
    {who:"???", text:"……또, 막아서는가. 부질없는 것을."},
  ],
};

// ---- Hero skill catalog ----
var CHAR_SKILLS = {
  '린':    { color:'#7fd0ff', skills:[
    {name:'게일 드로우',    fx:'🌀', mult:5, desc:'바람을 실은 고속 사격 · 짧은 회피 · 치명타↑'},
    {name:'스톰 버스트',    fx:'🌪️', mult:6, desc:'폭풍 탄환 폭발 · 적 공격속도 감소'},
    {name:'윈드 스텝',      fx:'🌀', mult:4, desc:'바람처럼 이동 후 강화 사격 · 공격속도↑'},
    {name:'실버 스톰',      fx:'💨', mult:9, desc:'전방 질풍 탄막 · 방어 무시 · 보스 추가피해'},
  ]},
  '루비아':{ color:'#ff6b6b', skills:[
    {name:'파이어 볼',       fx:'🔥', mult:5, desc:'화염 구체 발사 · 단일 피해'},
    {name:'플레임 서클',     fx:'✴️', mult:6, desc:'마법진 전개 · 지속 피해'},
    {name:'버닝 임팩트',     fx:'💥', mult:7, desc:'강력한 폭발 · 광역 피해'},
    {name:'크림슨 노바',     fx:'🌋', mult:9, desc:'주변 화염 폭발 · 광역 피해'},
  ]},
  '사피라':{ color:'#5b9bff', skills:[
    {name:'루나 크레스트 슬래시', fx:'🌙', mult:5, desc:'반월 검기 · 단일 연속베기'},
    {name:'아쿠아 블레이드 러시', fx:'🌊', mult:6, desc:'물의 검 돌진 · 다단히트'},
    {name:'사파이어 가드',       fx:'🛡️', mult:4, desc:'방어 태세 · 반격 강화'},
    {name:'오션 브레이커',       fx:'💥', mult:9, desc:'바다를 가르는 일격 · 광역 폭발'},
  ]},
  '실비아':{ color:'#ffe08a', skills:[
    {name:'아이기스 베리어', fx:'🛡️', mult:4, desc:'빛의 방벽 · 아군 보호'},
    {name:'라이트 브레이크', fx:'✨', mult:6, desc:'신성한 해머 강타 · 도발/제어'},
    {name:'세인트 카운터',   fx:'✝️', mult:5, desc:'반격의 빛 · 받은 피해 반사'},
    {name:'오로라 발키리',   fx:'🌟', mult:9, desc:'빛의 심판 · 광역 진압'},
  ]},
  '카엘':{ color:'#ff5b3f', skills:[
    {name:'열화 베기', fx:'🔥', mult:6, desc:'화염 검격 · 화상 부여'},
    {name:'불꽃 돌진', fx:'💥', mult:7, desc:'전방 돌진 · 기절'},
    {name:'용염 폭발', fx:'🌋', mult:8, desc:'주변 폭발 · 피해 증가'},
    {name:'불멸의 의지', fx:'🛡️', mult:5, desc:'공격력/방어력 상승'},
  ]},
  '에메리아':{ color:'#74d680', skills:[
    {name:'블레싱 리프', fx:'🌿', mult:4, desc:'지속 회복'},
    {name:'에메랄드 오라', fx:'✨', mult:5, desc:'공격력/방어력 증가'},
    {name:'플라워 생츄어리', fx:'🌸', mult:5, desc:'피해 감소와 회복'},
    {name:'월드 트리 프레이어', fx:'🌳', mult:8, desc:'광역 회복과 속도 증가'},
  ]},
  '카이라':{ color:'#ff4d6d', skills:[
    {name:'쉐도우 팽', fx:'✖', mult:6, desc:'그림자 돌진 · 출혈'},
    {name:'블러드 스텝', fx:'🩸', mult:5, desc:'회피 증가 · 치명타 확정'},
    {name:'크림슨 댄스', fx:'🗡️', mult:8, desc:'초고속 연속 베기'},
    {name:'나이트메어 이그제큐션', fx:'🌑', mult:9, desc:'후방 암살 · 보스 약화'},
  ]},
  '카이론':{ color:'#4f8cff', skills:[
    {name:'프로스트 크레센트', fx:'❄️', mult:6, desc:'냉기의 초승달 검기'},
    {name:'빙영 스텝', fx:'🧊', mult:6, desc:'서리 그림자 이동 · 회피 증가'},
    {name:'아이스 가디언', fx:'🛡️', mult:5, desc:'빙결 방어막 · 방어력 강화와 재생'},
    {name:'빙천의 심판', fx:'❄️', mult:10, desc:'거대한 얼음 검성 강림'},
  ]},
};


