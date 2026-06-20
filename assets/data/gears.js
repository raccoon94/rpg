// Gear catalog split into individual weapon items.
var GEAR_CATALOG_VERSION = '20260618';
var GEAR_DUST_ICON = '🧩';
var GEAR_DUST_BY_GRADE = {N:1, R:3, SR:10, SSR:35, UR:100};
var GEAR_CRIT_SCALE = {N:1/16, R:1/8, SR:1/4, SSR:1/2, UR:1};
var GEAR_TYPE_INFO = {
  sword:{name:'검', role:'밸런스형', icon:'⚔️', desc:'공격력과 안정성이 균형 잡힌 무기'},
  gun:{name:'총', role:'공격형', icon:'🔫', desc:'빠른 공격속도와 원거리 화력이 강한 무기'},
  staff:{name:'지팡이', role:'공격/회복형', icon:'🔮', desc:'마법 공격과 회복 보조를 겸비한 무기'},
  dualblade:{name:'쌍검', role:'크리티컬형', icon:'🗡️', desc:'공격속도와 치명타에 특화된 무기'},
  hammer_shield:{name:'망치+방패', role:'탱커형', icon:'🛡️', desc:'체력과 방어력이 높은 안정형 무기'}
};
var GEAR_GRADE_SCALE = {N:.20, R:.40, SR:.60, SSR:.80, UR:1};
var GEAR_BASE_STATS = {
  sword:[
    {atk:520,hp:650,def:90,spd:18,crit:25,critDmg:160},
    {atk:470,hp:580,def:80,spd:20,crit:30,critDmg:170},
    {atk:430,hp:520,def:70,spd:22,crit:35,critDmg:180}
  ],
  hammer_shield:[
    {atk:300,hp:1300,def:220,spd:8,crit:15,critDmg:90},
    {atk:280,hp:1200,def:200,spd:10,crit:20,critDmg:100},
    {atk:260,hp:1100,def:180,spd:12,crit:25,critDmg:110}
  ],
  gun:[
    {atk:620,hp:280,def:35,spd:35,crit:25,critDmg:140},
    {atk:580,hp:250,def:30,spd:38,crit:30,critDmg:150},
    {atk:540,hp:220,def:25,spd:40,crit:35,critDmg:160}
  ],
  staff:[
    {atk:600,hp:320,def:40,spd:25,crit:25,critDmg:140,heal:400},
    {atk:560,hp:280,def:35,spd:30,crit:30,critDmg:150,heal:450},
    {atk:520,hp:250,def:30,spd:35,crit:35,critDmg:160,heal:500}
  ],
  dualblade:[
    {atk:560,hp:260,def:25,spd:30,crit:25,critDmg:250},
    {atk:520,hp:230,def:20,spd:35,crit:30,critDmg:280},
    {atk:480,hp:200,def:15,spd:40,crit:35,critDmg:300}
  ]
};
var GEAR_NAMES = {
  N:{
    sword:['견습생의 검','철제 장검','용병의 검'],
    gun:['훈련용 권총','사냥꾼 권총','자동 권총'],
    staff:['신입 마도사의 지팡이','수정 지팡이','초보 마도사의 지팡이'],
    dualblade:['수련용 단검','쌍날 단검','그림자 단검'],
    hammer_shield:['견습생 망치방패','수습 수호망치','철벽 망치방패']
  },
  R:{
    sword:['용사의 검','수호자의 검','정의의 검'],
    gun:['연발식 권총','장교용 리볼버','기동 자동총'],
    staff:['견습 마법봉','정령의 지팡이','빛의 지팡이'],
    dualblade:['신속의 쌍검','암살자의 쌍검','암흑의 쌍검'],
    hammer_shield:['기사단 망치방패','수호자 망치방패','견고한 망치방패']
  },
  SR:{
    sword:['암흑의 검','성검 엑스칼리버','파멸의 재판자'],
    gun:['데저트 이글','스톰 체이서','드래곤 스트라이커'],
    staff:['성스러운 지팡이','천계의 축복 지팡이','별빛의 치유 지팡이'],
    dualblade:['새도우 댄서','이클립스 쌍검','심연의 나이프'],
    hammer_shield:['수호자의 거대망치','요새의 수호망치','대지의 분쇄자']
  },
  SSR:{
    sword:['천검 엑스칼리버','성검 아르카디아','종말의 검'],
    gun:['천벌의 리볼버','폭풍추적자','드래곤 버스터'],
    staff:['현자의 지팡이','천계의 성유물','별빛 심판자'],
    dualblade:['죽음의 춤','신속의 쌍검','심연의 쌍검'],
    hammer_shield:['대지의 수호망치','천공의 요새','거신 파괴망치']
  },
  UR:{
    sword:['멸천검','성검 아르카디아','종말의 검'],
    gun:['천벌의 리볼버','폭풍추적자','드래곤 버스터'],
    staff:['현자의 지팡이','천계의 성유물','별빛 심판자'],
    dualblade:['죽음의 춤','신속의 쌍검','심연의 쌍검'],
    hammer_shield:['대지의 수호망치','천공의 요새','거신 파괴망치']
  }
};
var GEAR_TYPES = ['sword','gun','staff','dualblade','hammer_shield'];
var GEAR_POOL = [];
['N','R','SR','SSR','UR'].forEach(grade=>{
  GEAR_TYPES.forEach(type=>{
    (GEAR_NAMES[grade][type]||[]).forEach((name, idx)=>{
      const base = GEAR_BASE_STATS[type][idx];
      const scale = GEAR_GRADE_SCALE[grade] || 1;
      GEAR_POOL.push({
        id:`${grade}_${type}_${idx+1}`.toLowerCase(),
        name, grade, type, variant:idx+1,
        img:`assets/gear/items/gear_${grade.toLowerCase()}_${type}_${idx+1}.png`,
        role:GEAR_TYPE_INFO[type].role,
        desc:GEAR_TYPE_INFO[type].desc,
        atk:Math.round(base.atk*scale),
        hp:Math.round(base.hp*scale),
        def:Math.round(base.def*scale),
        spd:base.spd*scale,
        crit:+(base.crit * (GEAR_CRIT_SCALE[grade] || 1)).toFixed(2),
        critDmg:Math.round(base.critDmg*scale),
        heal:Math.round((base.heal||0)*scale)
      });
    });
  });
});
