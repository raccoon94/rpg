// Stat and attribute logic split from index.html.
function roleStatMult(h, key){ return (ROLE_STAT_MULT[h?.cls] && ROLE_STAT_MULT[h.cls][key]) || 1; }
const GAME_ATTRIBUTES = ['대지','자연','화염','물/얼음','빛','암흑','번개','바람'];
const ATTRIBUTE_ADVANTAGE = {
  '화염':'자연', '자연':'대지', '대지':'번개', '번개':'물/얼음',
  '물/얼음':'화염', '빛':'암흑', '암흑':'바람', '바람':'빛'
};
const ATTRIBUTE_SYNERGY = {
  '화염':'바람', '바람':'번개', '번개':'물/얼음', '물/얼음':'대지',
  '대지':'자연', '자연':'빛', '빛':'암흑', '암흑':'화염'
};
const ATTRIBUTE_MAP = {
  '대지':'대지', '땅':'대지', '자연':'자연', '숲':'자연',
  '불':'화염', '화염':'화염',
  '얼음':'물/얼음', '빙결':'물/얼음', '물':'물/얼음', '물/얼음':'물/얼음', '청람':'물/얼음',
  '빛':'빛', '어둠':'암흑', '암흑':'암흑',
  '번개':'번개', '전기':'번개', '바람':'바람'
};
function normalizeAttrName(attr){ return ATTRIBUTE_MAP[String(attr||'').trim()] || '대지'; }
function splitAttrs(raw){
  return String(raw||'대지').split(/[,·]/).map(normalizeAttrName).filter((v,i,a)=>GAME_ATTRIBUTES.includes(v) && a.indexOf(v)===i);
}
function heroAttributes(h){
  const data = charData(typeof h==='string' ? h : h?.name);
  const skin = HEROES.find(x=>x.name===(typeof h==='string' ? h : h?.name));
  return splitAttrs(data.attr || skin?.attr || '대지');
}
function partyAttributes(){
  const attrs = partyHeroes().flatMap(heroAttributes);
  return attrs.filter((v,i,a)=>a.indexOf(v)===i);
}
function partyAttributeCounts(){
  const counts = {};
  partyHeroes().forEach(h=>{
    const attr = heroAttributes(h)[0] || '대지';
    counts[attr] = (counts[attr]||0) + 1;
  });
  return counts;
}
function attrMatchupInfo(){
  const monAttr = monsterAttribute();
  const advantaged = partyHeroes().filter(h=>ATTRIBUTE_ADVANTAGE[heroAttributes(h)[0] || '대지'] === monAttr);
  const bonus = advantaged.length ? 0.20 + Math.max(0, advantaged.length-1)*0.05 : 0;
  return { monster:monAttr, heroes:advantaged.map(h=>h.name), bonus };
}
function attrSynergyInfo(){
  const counts = partyAttributeCounts();
  const attrs = Object.keys(counts);
  let sameStacks = 0;
  attrs.forEach(a=>{ if(counts[a]>=2) sameStacks += counts[a]-1; });
  const seenPairs = new Set();
  let pairStacks = 0;
  attrs.forEach(a=>{
    const b = ATTRIBUTE_SYNERGY[a];
    if(attrs.includes(b)){
      const key = [a,b].sort().join('|');
      if(!seenPairs.has(key)){
        seenPairs.add(key);
        pairStacks += Math.min(counts[a]||0, counts[b]||0);
      }
    }
  });
  const bonus = sameStacks*0.08 + pairStacks*0.05;
  return { sameStacks, pairStacks, bonus, counts };
}
function heroEquipSum(h){ const e=h.equip||{무기:0,방어구:0,장신구:0}; return e.무기+e.방어구+e.장신구; }
function heroAffinity(h){ return G.affinity[h.name]||0; }
function heroLevel(h){ return Math.max(1, Math.min(HERO_MAX_LEVEL, h.level||1)); }
function heroCap(h){ return Math.max(10, Math.min(HERO_MAX_LEVEL, h.cap||10)); }
function heroAscCount(h){ return Math.max(0, Math.floor(heroCap(h)/10)-1); }
function heroGradeMult(h){ return HERO_GRADE_MULT[h.grade] || 1; }
function heroRawAtk(h){
  const mult = heroGradeMult(h);
  return Math.round(((h.atk||50) * mult + (heroLevel(h)-1) * 12 * mult + heroAscCount(h) * 120 * mult) * roleStatMult(h, 'atk'));
}
function heroEffAtk(h){ return Math.round(heroRawAtk(h) * (1 + heroEquipSum(h)*0.10) * (1 + heroAffinity(h)*0.003)); } // 레벨/초월/등급 + 장비 +10%/단계, 호감도 +0.3%/포인트
function heroMaxHp(h){
  const mult = heroGradeMult(h);
  const role = roleStatMult(h, 'hp');
  return Math.round((520 + heroLevel(h)*72 + heroAscCount(h)*680 + (h.atk||50)*5) * mult * role * (1 + (h.equip?.방어구||0)*0.16) * petHpMult());
}
function gearDefTotal(){ return (G.gear.방어구||0) * 6; }
function gearCritDmgMult(){ return 1 + (G.gear.악세||0) * 0.02; }
function heroDef(h){
  const mult = heroGradeMult(h);
  const role = roleStatMult(h, 'def');
  return Math.round((28 + heroLevel(h)*5 + heroAscCount(h)*55 + (h.equip?.방어구||0)*38 + (h.equip?.장신구||0)*14 + gearDefTotal()) * mult * role * petDefMult());
}
function ensureHeroHp(h){
  if(!h || !h.uid) return 0;
  if(!G.heroHp) G.heroHp = {};
  const max = heroMaxHp(h);
  if(G.heroHp[h.uid]==null || G.heroHp[h.uid] > max) G.heroHp[h.uid] = max;
  return G.heroHp[h.uid];
}
function livingPartyHeroes(){ return partyHeroes().filter(h=>ensureHeroHp(h)>0); }
function healPartyFull(){
  if(!G.heroHp) G.heroHp = {};
  partyHeroes().forEach(h=>{ G.heroHp[h.uid] = heroMaxHp(h); });
  renderHeroRow();
}
function heroLevelCost(h){ return Math.floor(180 * Math.pow(heroLevel(h), 1.45) * heroGradeMult(h)); }
function heroMatKey(h){ return HERO_MAT[h.name] || 'chaos'; }
function heroTransCost(h){
  const gradeUp = heroLevel(h)>=HERO_MAX_LEVEL && h.grade!=='UR';
  const base = gradeUp ? (h.grade==='SR'?45:90) : (8 + heroCap(h)*2);
  const dust = gradeUp ? (h.grade==='SR'?80:160) : (6 + heroCap(h));
  return { mat:base, dust, gold:Math.floor(heroLevelCost(h) * (gradeUp?10:5)), gradeUp };
}
function heroDismantleReward(h){
  const base = HERO_DUST_BY_GRADE[h.grade] || 1;
  return Math.max(1, Math.floor(base + heroLevel(h)*0.4 + heroAscCount(h)*base*0.5));
}
function heroIsMaxed(h){ return h.grade==='UR' && heroLevel(h)>=HERO_MAX_LEVEL && heroCap(h)>=HERO_MAX_LEVEL; }
function newHeroUid(){ return 'h'+Date.now().toString(36)+Math.random().toString(36).slice(2,8); }
function partyHeroes(){
  const ids = Array.isArray(G.party) ? G.party : [];
  const placed = Array.from({length:5}, (_,i)=> G.heroes.find(h=>h.uid===ids[i]) || null);
  if(Array.isArray(G.party)) return placed.filter(Boolean);
  return [...G.heroes].sort((a,b)=>heroEffAtk(b)-heroEffAtk(a)).slice(0,5);
}
function partySlots(){
  if(!Array.isArray(G.party)) G.party = [];
  return Array.from({length:5}, (_,i)=> G.heroes.find(h=>h.uid===G.party[i]) || null);
}
function heroAtkTotal(){ return partyHeroes().reduce((s,h)=>s+heroEffAtk(h),0); }
function gearAtkTotal(){ return (G.gear.무기||0) * 8; }
// 직업 시너지: 파티(상위5명)에 같은 직업이 많을수록 공격력 보너스
function synergyInfo(){
  const cnt = {};
  partyHeroes().forEach(h=>{ cnt[h.cls]=(cnt[h.cls]||0)+1; });
  let best=0, bestCls=null;
  for(const c in cnt){ if(cnt[c]>best){ best=cnt[c]; bestCls=c; } }
  const bonus = best>=5?0.40 : best>=4?0.25 : best>=3?0.15 : 0;
  return { count:best, cls:bestCls, bonus };
}
function synergyMult(){ return 1 + synergyInfo().bonus; }
function attrSynergyMult(){ return 1 + attrSynergyInfo().bonus; }
function guildMult(){ return (G.guild && G.guild.joined) ? 1.10 : 1; }  // 길드 가입 시 공격력 +10%
function totalAtk(){ return Math.round((G.atk + heroAtkTotal() + gearAtkTotal()) * skinMult() * synergyMult() * attrSynergyMult() * petAtkMult() * guildMult()); }
const HUNT_MAX_LEVEL = 1000;
const SPEED_MAX_LEVEL = 100;
const SPECIAL_MAX_LEVEL = 50;
function huntCost(base, level){ return Math.floor(base + Math.pow(level, 2) * base * 0.08); }
function huntCostMany(base, level, maxLevel, amount){
  let total = 0, n = 0;
  while(n < amount && level + n < maxLevel){
    total += huntCost(base, level + n);
    n++;
  }
  return {total, n};
}
function specialCost(level){ return Math.floor(25 + Math.pow(level, 1.7) * 8); }
function specialCostMany(level, maxLevel, amount){
  let total = 0, n = 0;
  while(n < amount && level + n < maxLevel){
    total += specialCost(level + n);
    n++;
  }
  return {total, n};
}
function passMult(){ return G.adPass ? 1.5 : 1; }            // 광고 패스 자동사냥 1.5배
function tapMult(){ return 1.5 * (1 + (G.tapPower-1)*0.10); } // 터치 공격력 배수
function autoMult(){ return (1 + (G.autoPower-1)*0.08) * passMult(); }  // 자동 공격력 배수
function autoInterval(){ return Math.max(100, 600 - (G.autoSpeed-1)*5); } // 공격속도 (ms)
function huntCritBonus(){ return ((G.critChance||1)-1) * (0.50/(SPECIAL_MAX_LEVEL-1)); }
function critDmgUpgradeMult(){ return 1 + ((G.critDmgPower||1)-1) * (1.00/(SPECIAL_MAX_LEVEL-1)); }
function totalCritRate(){ return Math.min(.95, G.critRate + petCritBonus() + huntCritBonus()); }
function totalCritDmgMult(){ return G.critDmg * critDmgUpgradeMult() * gearCritDmgMult(); }
function bossPowerBonus(){ return ((G.bossPower||1)-1) * (1.00/(SPECIAL_MAX_LEVEL-1)); }
function bossDmgMult(){ return isBoss ? 1 + bossPowerBonus() : 1; }
function attrDmgMult(){ return 1 + ((G.attrPower||1)-1) * (0.75/(SPECIAL_MAX_LEVEL-1)); }
function attrMatchupMult(){ return 1 + attrMatchupInfo().bonus; }
function dunRaidMult(){ return (typeof dunMode!=='undefined' && dunMode && typeof dunMatchupMult==='function') ? dunMatchupMult() : 1; }
function huntDamageMult(){ return bossDmgMult() * attrDmgMult() * attrMatchupMult() * dunRaidMult(); }

