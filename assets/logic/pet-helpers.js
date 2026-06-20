// Pet helper logic split from index.html.
function petBuffText(p){ const b=PET_BUFF[p.buff]||PET_BUFF.atk; return p.stats || `${b.icon} ${b.label} +${Math.round((b.val[p.grade]||0)*100)}%`; }
function petStatChipsHtml(p){
  const raw = (p.stats || petBuffText(p) || '').split('·').map(x=>x.trim()).filter(Boolean);
  return `<div class="petStatChips">${raw.map(s=>`<span class="petStatChip">${s}</span>`).join('')}</div>`;
}
function petSkillTitle(p){
  const s = p.skill || '';
  const cut = s.indexOf(':');
  return cut > -1 ? s.slice(0, cut).trim() : '펫 스킬';
}
function petSkillBody(p){
  const s = p.skill || '자동으로 전투 보조 효과를 발동합니다.';
  const cut = s.indexOf(':');
  return cut > -1 ? s.slice(cut + 1).trim() : s;
}
function petDetailPanelHtml(p){
  const b = PET_BUFF[p.buff] || PET_BUFF.atk;
  const bonus = petBonusProfile(p);
  const autoBuff = petBonusSummary(bonus);
  return `<div class="petDetailPanel">
    <div class="petDetailGrid">
      <div class="petInfoPill">펫 공격력<b>${petAttackPower(p).toLocaleString()}</b></div>
      <div class="petInfoPill">대표 효과<b>${b.icon} ${b.label} +${Math.round((b.val[p.grade]||0)*100)}%</b></div>
    </div>
    ${petStatChipsHtml(p)}
    <div class="petSkillBox"><b>자동 적용 버프</b><br>${autoBuff || '배치 영웅에게 적용되는 버프가 없습니다.'}</div>
    <div class="petSkillBox"><b>${petSkillTitle(p)}</b><br>${petSkillBody(p)}</div>
  </div>`;
}
function petVisual(p, cls='petListImg'){
  const safe = (p.emoji||'🐾').replace(/'/g,'');
  return p.img ? `<img class="${cls}" src="${p.img}${AV}" alt="${p.name}" onerror="this.onerror=null;this.outerHTML='<span class=&quot;hp-emoji&quot; style=&quot;font-size:26px&quot;>${safe}</span>'">` : `<span class="hp-emoji" style="font-size:26px">${safe}</span>`;
}
function activePet(){ return (G.activePet>=0 && G.pets[G.activePet]) ? G.pets[G.activePet] : null; }
function petGrowthMult(p){ return p ? 1 + (petLevel(p)-1)*0.012 + petAscCount(p)*0.12 : 1; }
function petVal(p){ const b=p ? PET_BUFF[p.buff] : null; return b ? (b.val[p.grade]||0) : 0; }
function petPct(chunk){
  const m = String(chunk||'').match(/([+-]?\d+(?:\.\d+)?)%/);
  return m ? Math.abs(parseFloat(m[1])) / 100 : 0;
}
function petBonusProfile(p){
  const out = {atk:0, magic:0, hp:0, def:0, crit:0, critDmg:0, gold:0, speed:0, heal:0, skill:0, cooldown:0, damage:0, damageReduce:0, evasion:0, attr:0};
  if(!p) return out;
  const chunks = `${p.stats||''} · ${petSkillBody(p)||''}`.split(/[·,]/).map(x=>x.trim()).filter(Boolean);
  chunks.forEach(s=>{
    const v = petPct(s);
    if(!v) return;
    const enemy = /적/.test(s);
    if(/마법\s*공격력/.test(s)) out.magic += v;
    else if(/공격력/.test(s) && !enemy) out.atk += v;
    if(/HP\s*회복|체력\s*회복|회복/.test(s)) out.heal += v;
    else if(/체력|HP/.test(s)) out.hp += v;
    if(/방어력/.test(s) && !enemy) out.def += v;
    if(/치명타\s*확률/.test(s)) out.crit += v;
    if(/치명타\s*피해/.test(s)) out.critDmg += v;
    if(/골드\s*획득/.test(s)) out.gold += v;
    if(/공격속도/.test(s) && !enemy) out.speed += v;
    if(/스킬\s*피해/.test(s)) out.skill += v;
    if(/쿨타임\s*감소/.test(s)) out.cooldown += v;
    if(/속성\s*피해|화상\s*피해|감전\s*피해|저주\s*피해/.test(s)) out.attr += v;
    if(/피해\s*증가/.test(s)) out.damage += v;
    if(/피해\s*감소|받는\s*피해/.test(s)) out.damageReduce += v;
    if(/회피율/.test(s)) out.evasion += v;
  });
  return out;
}
function petBonusSummary(bonus){
  const labels = [
    ['atk','공격력'], ['magic','마법 공격력'], ['hp','체력'], ['def','방어력'], ['crit','치명타 확률'],
    ['critDmg','치명타 피해'], ['gold','골드 획득'], ['speed','공격속도'], ['heal','회복량'],
    ['skill','스킬 피해'], ['cooldown','스킬 쿨타임 감소'], ['attr','속성/상태 피해'],
    ['damage','피해 증가'], ['damageReduce','피해 감소'], ['evasion','회피율']
  ];
  return labels.filter(([k])=>bonus[k]>0).map(([k,label])=>`${label} +${Math.round(bonus[k]*100)}%`).join(' · ');
}
function petPartyBonus(){ return petBonusProfile(activePet()); }
function petHeroAtkMult(h){
  const b = petPartyBonus();
  const magicCls = ['mage','healer','magic'].includes(h?.cls);
  return 1 + b.atk + (magicCls ? b.magic : 0);
}
function petAtkMult(){ return 1; }
function petCritBonus(){ return petPartyBonus().crit; }
function petCritDmgBonus(){ return petPartyBonus().critDmg; }
function petHpMult(){ return 1 + petPartyBonus().hp; }
function petDefMult(){ return 1 + petPartyBonus().def; }
function petGoldMult(){ return 1 + petPartyBonus().gold; }
function petSpeedMult(){ return 1 + petPartyBonus().speed; }
function petHealMult(){ return 1 + petPartyBonus().heal; }
function petSkillDmgMult(){ return 1 + petPartyBonus().skill; }
function petCooldownMult(){ return Math.max(0.35, 1 - petPartyBonus().cooldown); }
function petDamageMult(){ const b=petPartyBonus(); return 1 + b.damage + b.attr; }
function petDamageTakenMult(){ const b=petPartyBonus(); return Math.max(0.25, 1 - b.damageReduce); }
function petEvasionBonus(){ return Math.min(0.60, petPartyBonus().evasion); }

