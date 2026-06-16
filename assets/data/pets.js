// Pet data split from index.html. Images can be swapped here without touching UI code.
// ---- Pet catalog and buffs ----
var PET_CATALOG_VERSION = '20260615';
var PET_IMG = 'assets/pet/catalog_20260615/';
var PET_POOL = [
  {name:'아기 고양이', emoji:'🐱', buff:'gold', grade:'N', img:PET_IMG+'pet_n_cat.png', stats:'체력 +5% · 공격력 +4% · 방어력 +4%', skill:'반짝반짝 발견: 10초 동안 골드 획득량 +10%'},
  {name:'아기 토끼', emoji:'🐰', buff:'hp', grade:'N', img:PET_IMG+'pet_n_rabbit.png', stats:'체력 +5% · HP 회복 +5% · 골드 획득량 +5%', skill:'당근 냠냠: 8초 동안 체력 +8%'},
  {name:'아기 부엉이', emoji:'🦉', buff:'crit', grade:'N', img:PET_IMG+'pet_n_owl.png', stats:'공격력 +5% · 치명타 확률 +3% · 치명타 피해 +5%', skill:'밤의 지혜: 10초 동안 치명타 확률 +8%'},
  {name:'아기 다람쥐', emoji:'🐿️', buff:'def', grade:'N', img:PET_IMG+'pet_n_squirrel.png', stats:'방어력 +6% · 피해 감소 +4% · 골드 획득량 +5%', skill:'도토리 비축: 8초 동안 방어력 +10%'},
  {name:'아기 슬라임', emoji:'💧', buff:'heal', grade:'N', img:PET_IMG+'pet_n_slime.png', stats:'HP 회복 +6% · 방어력 +4% · 피해 감소 +4%', skill:'점액 재생: 10초 동안 체력 +8%'},

  {name:'바람 여우', emoji:'🦊', buff:'atk', grade:'R', img:PET_IMG+'pet_r_wind_fox.png', stats:'체력 +10% · 공격력 +6% · 방어력 +6% · 치명타 확률 +4%', skill:'질풍의 가호: 10초 동안 공격력 +12%'},
  {name:'화염 코알라', emoji:'🐨', buff:'atk', grade:'R', img:PET_IMG+'pet_r_fire_koala.png', stats:'공격력 +8% · 화염속성 피해 +8% · 치명타 피해 +6% · 피해 감소 +4%', skill:'화염 폭주: 8초 동안 속성 피해 +15%'},
  {name:'번개 까마귀', emoji:'🐦‍⬛', buff:'crit', grade:'R', img:PET_IMG+'pet_r_thunder_raven.png', stats:'공격력 +7% · 번개속성 피해 +10% · 치명타 확률 +5% · 방어력 +5%', skill:'번개 낙인: 10초 동안 번개속성 피해 +12%'},
  {name:'대지 거북이', emoji:'🐢', buff:'def', grade:'R', img:PET_IMG+'pet_r_earth_turtle.png', stats:'체력 +12% · 방어력 +10% · 피해 감소 +6% · 치명타 피해 +4%', skill:'대지의 보호막: 10초 동안 받는 피해 -15%'},
  {name:'신비한 아르마딜로', emoji:'🦔', buff:'crit', grade:'R', img:PET_IMG+'pet_r_arc_armadillo.png', stats:'공격력 +7% · 치명타 확률 +6% · 피해 감소 +5% · 치명타 피해 +6%', skill:'마력 순환: 10초 동안 치명타 피해 +12%'},

  {name:'기계 골렘', emoji:'🤖', buff:'def', grade:'SR', img:PET_IMG+'pet_sr_mecha_golem.png', stats:'방어력 +12% · 체력 +8% · 공격력 +6%', skill:'오버드라이브: 10초 동안 받는 피해 -20%'},
  {name:'그림자 박쥐', emoji:'🦇', buff:'crit', grade:'SR', img:PET_IMG+'pet_sr_shadow_bat.png', stats:'치명타 확률 +6% · 치명타 피해 +8% · 공격력 +6%', skill:'어둠의 일격: 8초 동안 치명타 피해 +20%'},
  {name:'아쿠아 해달', emoji:'🦦', buff:'speed', grade:'SR', img:PET_IMG+'pet_sr_aqua_otter.png', stats:'스킬 쿨타임 감소 +5% · 공격속도 +6% · 치명타 확률 +6%', skill:'물의 축복: 10초 동안 MP 회복 +20%'},
  {name:'암석 사마귀', emoji:'🦂', buff:'atk', grade:'SR', img:PET_IMG+'pet_sr_rock_scorpion.png', stats:'공격력 +8% · 대지속성 피해 +6% · 치명타 확률 +6%', skill:'대지 분쇄: 8초 동안 스킬 피해량 +20%'},
  {name:'요정 나비', emoji:'🦋', buff:'heal', grade:'SR', img:PET_IMG+'pet_sr_fairy_butterfly.png', stats:'HP 회복 +8% · 공격속도 +4% · 회피율 +6%', skill:'바람의 날갯짓: 8초 동안 HP 회복 +15%'},
  {name:'번개 모요', emoji:'🦊', buff:'atk', grade:'SR', img:PET_IMG+'pet_sr_thunder_moyo.png', stats:'공격속도 +5% · 번개속성 피해 +8% · 치명타 확률 +6%', skill:'전격 폭풍: 8초 동안 적 전체 번개 피해'},
  {name:'숲의 고슴도치', emoji:'🦔', buff:'hp', grade:'SR', img:PET_IMG+'pet_sr_forest_hedgehog.png', stats:'체력 +10% · 회피율 +5% · 공격력 +6%', skill:'가시 방어막: 8초 동안 받는 피해 -20%'},
  {name:'유령 고양이', emoji:'🐈', buff:'magic', grade:'SR', img:PET_IMG+'pet_sr_ghost_cat.png', stats:'공격력 +8% · 치명타 확률 +5% · 암흑속성 피해 +6%', skill:'혼령의 장난: 8초 동안 적 공격력 -20%'},
  {name:'태양 사자', emoji:'🦁', buff:'crit', grade:'SR', img:PET_IMG+'pet_sr_sun_lion.png', stats:'치명타 확률 +8% · 치명타 피해 +12% · 공격력 +6%', skill:'태양의 가호: 10초 동안 치명타 피해 +25%'},
  {name:'빙결 펭귄', emoji:'🐧', buff:'def', grade:'SR', img:PET_IMG+'pet_sr_ice_penguin.png', stats:'방어력 +10% · 빙결속성 피해 +8% · 체력 +6%', skill:'빙결 파동: 8초 동안 적 전체 빙결 확률 +30%'},

  {name:'별빛 고래', emoji:'🐳', buff:'skill', grade:'SSR', img:PET_IMG+'pet_ssr_star_whale.png', stats:'체력 +15% · 공격력 +10% · 치명타 확률 +10%', skill:'별의 치유: 10초 동안 받는 피해 -20%, 체력 +15%'},
  {name:'시간의 수호자', emoji:'⏳', buff:'speed', grade:'SSR', img:PET_IMG+'pet_ssr_time_keeper.png', stats:'스킬 쿨타임 감소 +12% · 치명타 확률 +7% · 공격력 +8%', skill:'시간 역행: 8초 동안 스킬 쿨타임 감소 +30%, 공격속도 +20%'},
  {name:'화산 도마뱀', emoji:'🦎', buff:'atk', grade:'SSR', img:PET_IMG+'pet_ssr_volcano_lizard.png', stats:'공격력 +15% · 화염속성 피해 +15% · 치명타 피해 +10%', skill:'용암 폭발: 10초 동안 화염속성 피해 +20%, 공격력 +15%'},
  {name:'유령 사신', emoji:'💀', buff:'magic', grade:'SSR', img:PET_IMG+'pet_ssr_ghost_reaper.png', stats:'공격력 +15% · 암흑속성 피해 +15% · 치명타 확률 +10%', skill:'영혼 수확: 10초 동안 암흑속성 피해 +20%, 공격력 +15%'},
  {name:'금빛 여우', emoji:'🦊', buff:'gold', grade:'SSR', img:PET_IMG+'pet_ssr_gold_fox.png', stats:'골드 획득량 +20% · 공격속도 +7% · 치명타 확률 +5%', skill:'황금의 축복: 10초 동안 골드 획득량 +30%, 공격속도 +20%'},
  {name:'천둥 군주 볼테온', emoji:'🐺', buff:'atk', grade:'SSR', img:PET_IMG+'pet_ssr_thunder_bolteon.png', stats:'체력 +20% · 공격력 +20% · 공격속도 +15%', skill:'전격 폭발: 10초 동안 번개속성 피해 +20%, 치명타 확률 +15%'},
  {name:'대지 수호 골렘', emoji:'🪨', buff:'def', grade:'SSR', img:PET_IMG+'pet_ssr_earth_golem.png', stats:'체력 +25% · 방어력 +25% · 피해 감소 +20%', skill:'대지의 보호막: 10초 동안 받는 피해 -25%, 방어력 +20%'},
  {name:'바람 정령 실피드', emoji:'🧚', buff:'speed', grade:'SSR', img:PET_IMG+'pet_ssr_wind_sylphid.png', stats:'공격속도 +20% · 회피율 +15% · 바람속성 피해 +25%', skill:'질풍의 노래: 10초 동안 공격속도 +30%, 회피율 +20%'},
  {name:'빛의 성기사 아우렐', emoji:'🛡️', buff:'hp', grade:'SSR', img:PET_IMG+'pet_ssr_light_aurel.png', stats:'방어력 +20% · 피해 감소 +15% · 치명타 피해 +15%', skill:'신성한 수호: 10초 동안 받는 피해 -20%, 치명타 피해 +20%'},
  {name:'심연 마도사 겔루스', emoji:'🧙', buff:'magic', grade:'SSR', img:PET_IMG+'pet_ssr_abyss_gellus.png', stats:'공격력 +20% · 치명타 피해 +15% · 암흑속성 피해 +25%', skill:'암흑 폭풍: 10초 동안 암흑속성 피해 +20%, 스킬 피해량 +15%'},

  {name:'불사신 수호자', emoji:'🦁', buff:'atk', grade:'UR', img:PET_IMG+'pet_ur_immortal_guardian.png', stats:'체력 +30% · 공격력 +30% · 방어력 +25% · 화염속성 피해 +20% · 공격속도 +15% · 치명타 확률 +20%', skill:'영혼의 불꽃: 10초 동안 아군 전체 화염속성 피해 +35%, 화상 피해 +20%'},
  {name:'아이스 드래곤', emoji:'🐉', buff:'atk', grade:'UR', img:PET_IMG+'pet_ur_ice_dragon.png', stats:'체력 +30% · 공격력 +35% · 방어력 +20% · 빙결속성 피해 +20% · 공격속도 +15% · 치명타 확률 +10%', skill:'빙하의 분노: 10초 동안 아군 전체 빙결속성 피해 +35%, 적 전체 공격속도 -20%'},
  {name:'신성한 루미엘', emoji:'🧚', buff:'hp', grade:'UR', img:PET_IMG+'pet_ur_holy_lumiel.png', stats:'체력 +30% · 공격력 +35% · 치명타 확률 +25% · 치명타 피해 +25% · 공격속도 +20% · 피해 감소 +15%', skill:'천상의 축복: 10초 동안 아군 전체 치명타 피해 +35%, 치명타 확률 +20%'},
  {name:'파멸의 이그니스', emoji:'😈', buff:'magic', grade:'UR', img:PET_IMG+'pet_ur_ruin_ignis.png', stats:'공격력 +35% · 화염속성 피해 +30% · 치명타 확률 +20% · 치명타 피해 +25% · 공격속도 +15% · 피해 증가 +15%', skill:'혼돈의 심연: 10초 동안 아군 전체 화염속성 피해 +35%, 적 전체 저주 피해 +20%'},
  {name:'생명의 가디언', emoji:'🌿', buff:'heal', grade:'UR', img:PET_IMG+'pet_ur_life_guardian.png', stats:'체력 +35% · 자연속성 피해 +20% · 치명타 확률 +15% · 공격속도 +15% · 체력 회복 +25%', skill:'자연의 울림: 10초 동안 아군 전체 자연속성 피해 +35%, 체력 회복 +30%'},
  {name:'번개의 제왕 라이덴스', emoji:'🐺', buff:'speed', grade:'UR', img:PET_IMG+'pet_ur_thunder_raimense.png', stats:'체력 +30% · 번개속성 피해 +25% · 치명타 피해 +20% · 공격속도 +20% · 감전 피해 +20%', skill:'천둥 강림: 10초 동안 아군 전체 번개속성 피해 +35%, 감전 피해 +8%'},
  {name:'대지의 거신 가이아', emoji:'🪨', buff:'def', grade:'UR', img:PET_IMG+'pet_ur_earth_gaia.png', stats:'체력 +35% · 방어력 +35% · 대지속성 피해 +20% · 피해 감소 +15% · 공격속도 +15%', skill:'대지의 진노: 10초 동안 아군 전체 대지속성 피해 +35%, 방어력 +20%, 피해 감소 +20%'},
  {name:'바람의 실피리아', emoji:'🧚', buff:'speed', grade:'UR', img:PET_IMG+'pet_ur_wind_sylphia.png', stats:'체력 +25% · 공격속도 +25% · 회피율 +20% · 바람속성 피해 +25% · 치명타 확률 +15% · 치명타 피해 +26%', skill:'순풍의 가호: 10초 동안 아군 전체 바람속성 피해 +35%, 공격속도 +20%, 치명타 확률 +15%'},
];
var PET_BUFF = {
  atk:   {label:'공격력',   icon:'⚔️', val:{N:0.04,R:0.07,SR:0.08,SSR:0.15,UR:0.35}},
  crit:  {label:'치명타율', icon:'🎯', val:{N:0.03,R:0.06,SR:0.08,SSR:0.10,UR:0.20}},
  gold:  {label:'골드 획득', icon:'<span class="goldIcon"></span>', val:{N:0.05,R:0.08,SR:0.12,SSR:0.20,UR:0.35}},
  hp:    {label:'체력',     icon:'❤️', val:{N:0.05,R:0.10,SR:0.10,SSR:0.20,UR:0.30}},
  def:   {label:'방어력',   icon:'🛡️', val:{N:0.04,R:0.10,SR:0.12,SSR:0.25,UR:0.35}},
  heal:  {label:'HP 회복',  icon:'✚', val:{N:0.06,R:0.08,SR:0.08,SSR:0.15,UR:0.25}},
  speed: {label:'공격속도', icon:'⚡', val:{N:0.03,R:0.05,SR:0.06,SSR:0.20,UR:0.25}},
  magic: {label:'마법 공격력', icon:'🔮', val:{N:0.05,R:0.07,SR:0.08,SSR:0.20,UR:0.35}},
  skill: {label:'스킬 피해량', icon:'✦', val:{N:0.04,R:0.06,SR:0.08,SSR:0.12,UR:0.20}},
};


