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
  return `<div class="petDetailPanel">
    <div class="petDetailGrid">
      <div class="petInfoPill">전투력<b>${petPower(p).toLocaleString()}</b></div>
      <div class="petInfoPill">대표 효과<b>${b.icon} ${b.label} +${Math.round(petVal(p)*100)}%</b></div>
    </div>
    ${petStatChipsHtml(p)}
    <div class="petSkillBox"><b>${petSkillTitle(p)}</b><br>${petSkillBody(p)}</div>
  </div>`;
}
function petVisual(p, cls='petListImg'){
  const safe = (p.emoji||'🐾').replace(/'/g,'');
  return p.img ? `<img class="${cls}" src="${p.img}${AV}" alt="${p.name}" onerror="this.onerror=null;this.outerHTML='<span class=&quot;hp-emoji&quot; style=&quot;font-size:26px&quot;>${safe}</span>'">` : `<span class="hp-emoji" style="font-size:26px">${safe}</span>`;
}
function activePet(){ return (G.activePet>=0 && G.pets[G.activePet]) ? G.pets[G.activePet] : null; }
function petGrowthMult(p){ return p ? 1 + (petLevel(p)-1)*0.012 + petAscCount(p)*0.12 : 1; }
function petVal(p){ const b=p ? PET_BUFF[p.buff] : null; return b ? (b.val[p.grade]||0) * petGrowthMult(p) : 0; }
function petAtkMult(){ const p=activePet(); return (p&&p.buff==='atk') ? 1+petVal(p) : 1; }
function petCritBonus(){ const p=activePet(); return (p&&p.buff==='crit') ? petVal(p) : 0; }
function petHpMult(){ const p=activePet(); return (p&&p.buff==='hp') ? 1+petVal(p) : 1; }
function petDefMult(){ const p=activePet(); return (p&&p.buff==='def') ? 1+petVal(p) : 1; }
function petGoldMult(){ const p=activePet(); return (p&&p.buff==='gold') ? 1+petVal(p) : 1; }

