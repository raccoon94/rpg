// Character hall UI split from index.html.
function renderHome(){
  const skin = skinObj(); const bh = bestHero();
  document.getElementById('homeName').textContent = pName();   // 모험가(플레이어) 이름
  document.getElementById('homeLv').textContent = G.plv;
  updateHomeRes();
}
// 캐릭터 화면(코스튬 풀일러) 렌더
function renderCharLeftArt(hero){
  const selected = hero || selectedCharHero();
  const skin = skinObj();
  const artEl = document.getElementById('homeArtFull');
  artEl.classList.remove('petArtMode');
  const art = selected ? heroDisplayArt(selected) : '';
  const key = selected ? 'hero:'+selected.uid+':'+(art||selected.name)+':'+heroDisplayScale(selected)+':'+heroDisplayOffsetX(selected) : 'char:'+skin.id;
  if(artEl.dataset.key !== key){
    artEl.dataset.key = key;
    artEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = (art || skin.img) + AV;
    if(!selected && skin.bg){ img.style.objectFit='cover'; img.style.objectPosition='center 14%'; }
    else { img.style.objectFit='contain'; img.style.objectPosition='center top'; }
    if(selected){
      img.style.transform = `translateX(${heroDisplayOffsetX(selected)}) scale(${heroDisplayScale(selected)})`;
      img.style.transformOrigin = 'left top';
    }
    img.onerror = function(){ artEl.innerHTML = `<div class="homeEmoji">${selected ? selected.emoji : skin.emoji}</div>`; };
    artEl.appendChild(img);
  }
  document.getElementById('charView').classList.toggle('fullArt', !selected && !!skin.bg);
  const scene = selected ? heroDisplayScene(selected) : (skin.scene || 'assets/bg/home.png');
  const sc = document.getElementById('homeScene');
  sc.style.backgroundImage = `url('${scene}${AV}')`;
  sc.style.backgroundSize='cover'; sc.style.backgroundPosition='center'; sc.style.backgroundRepeat='no-repeat';
  const col = selected ? heroCls(selected).color : skin.aura;
  document.getElementById('charView').style.setProperty('--glow', col);
  document.getElementById('cvName').textContent = selected ? selected.name : skin.name;
  document.getElementById('cvLv').textContent = selected ? heroLevel(selected) : G.plv;
}
function syncCharHallTabs(){
  document.querySelectorAll('#charHallTabs button').forEach(btn=>btn.classList.toggle('active', btn.dataset.hallTab===charHallTab));
  const costumeBtn = document.getElementById('homeChange');
  if(costumeBtn) costumeBtn.style.display = charHallTab==='hero' ? 'block' : 'none';
}
function setCharHallTab(tab){
  charHallTab = tab;
  heroDetailIdx = null;
  if(tab==='gear') renderCharGear();
  else if(tab==='pet') renderCharPet();
  else renderChar();
}
function charGearMeta(k){
  return {
    '무기': {emo:'🗡️', title:'무기', label:'공격력', unit:'', value:lv=>lv*8, next:lv=>(lv+1)*8, desc:'전투 영웅의 기본 공격력을 끌어올리는 핵심 장비'},
    '방어구': {emo:'🛡️', title:'방어구', label:'방어력', unit:'', value:lv=>lv*6, next:lv=>(lv+1)*6, desc:'영웅이 받는 피해를 줄이는 방어 장비'},
    '악세': {emo:'💍', title:'악세', label:'치명타공격력', unit:'%', value:lv=>lv*2, next:lv=>(lv+1)*2, desc:'치명타 피해를 높여 폭발력을 더하는 장신구'}
  }[k];
}
function renderCharGearLeft(){
  const meta = charGearMeta(selectedCharGear) || charGearMeta('무기');
  const lv = G.gear[selectedCharGear] || 0;
  const artEl = document.getElementById('homeArtFull');
  artEl.classList.remove('petArtMode');
  const key = `gear:${selectedCharGear}:${lv}`;
  if(artEl.dataset.key !== key){
    artEl.dataset.key = key;
    artEl.innerHTML = `<div class="charShowcase gearShowcase">
      <div class="gearBig">${meta.emo}</div>
      <div class="showcaseTitle">${meta.title} +${lv}</div>
      <div class="showcaseSub">${meta.label} +${meta.value(lv).toLocaleString()}${meta.unit}<br>${meta.desc}</div>
    </div>`;
  }
  document.getElementById('charView').classList.remove('fullArt');
  const sc = document.getElementById('homeScene');
  sc.style.backgroundImage = `url('assets/bg/home.png${AV}')`;
  sc.style.backgroundSize='cover'; sc.style.backgroundPosition='center'; sc.style.backgroundRepeat='no-repeat';
  document.getElementById('charView').style.setProperty('--glow', '#ffd866');
  document.getElementById('cvName').textContent = `${meta.title} 장비`;
  document.getElementById('cvLv').textContent = lv;
}
function renderCharGearList(){
  const box = document.getElementById('charHeroList');
  if(!box) return;
  let h = `<h3>장비 목록</h3><div class="card small">왼쪽 일러스트는 선택한 장비를 보여줘요. 강화는 전체 전투 능력에 적용됩니다.</div>`;
  ['무기','방어구','악세'].forEach(k=>{
    const meta = charGearMeta(k);
    const lv = G.gear[k] || 0;
    const one = gearCostMany(k, 1);
    const ten = gearCostMany(k, 10);
    const active = selectedCharGear===k;
    h += `<div class="charHeroItem" onclick="selectCharGear('${k}')" style="${active?'border-color:#ffd866;box-shadow:0 0 12px #ffd86644':''}">
      <div class="heroFace" style="border-color:#ffd866;background:radial-gradient(circle,#ffd86644,#15172c)">${meta.emo}</div>
      <div class="heroMeta">
        <div class="heroName">${meta.title} +${lv}</div>
        <div class="heroPower">${meta.label} +${meta.value(lv).toLocaleString()}${meta.unit} → +${meta.next(lv).toLocaleString()}${meta.unit}</div>
      </div>
    </div>
    <div class="card" style="margin-top:-4px">
      <div class="gearBtns" style="width:100%">
        <button class="btn gold" onclick="selectedCharGear='${k}';upgradeGear('${k}',1)" ${G.gold<one.total?'disabled':''}><span class="goldIcon"></span>${one.total.toLocaleString()} +1</button>
        <button class="btn gold" onclick="selectedCharGear='${k}';upgradeGear('${k}',10)" ${G.gold<ten.total?'disabled':''}><span class="goldIcon"></span>${ten.total.toLocaleString()} +10</button>
      </div>
    </div>`;
  });
  box.innerHTML = h;
}
function selectCharGear(k){
  selectedCharGear = k;
  renderCharGear();
}
function renderCharGear(){
  charHallTab = 'gear';
  syncCharHallTabs();
  renderCharGearLeft();
  renderCharGearList();
}
function renderCharPetLeft(){
  if(G.pets.length && (!G.pets[selectedCharPetIdx] || selectedCharPetIdx<0)) selectedCharPetIdx = Math.max(0, G.activePet);
  const p = G.pets[selectedCharPetIdx] || activePet() || PET_POOL.find(x=>x.grade==='UR') || PET_POOL[0];
  const artEl = document.getElementById('homeArtFull');
  artEl.classList.add('petArtMode');
  const key = `pet:${p.name}:${p.grade}:${p.img}:${petLevel(p)}:${petCap(p)}:${p.stats}:${p.skill}`;
  if(artEl.dataset.key !== key){
    artEl.dataset.key = key;
    const img = p.img ? `<img class="petBigImg" src="${p.img}${AV}" alt="${p.name}">` : `<div class="gearBig">${p.emoji||'🐾'}</div>`;
    artEl.innerHTML = `<div class="charShowcase petShowcase">
      ${img}
      <div class="showcaseTitle"><span class="txt-${p.grade}">[${p.grade}]</span> ${p.name} Lv.${petLevel(p)}/${petCap(p)}</div>
    </div>`;
  }
  document.getElementById('charView').classList.remove('fullArt');
  const sc = document.getElementById('homeScene');
  sc.style.backgroundImage = `url('assets/bg/home.png${AV}')`;
  sc.style.backgroundSize='cover'; sc.style.backgroundPosition='center'; sc.style.backgroundRepeat='no-repeat';
  document.getElementById('charView').style.setProperty('--glow', gradeColorOf(p.grade) || '#ffb74d');
  document.getElementById('cvName').textContent = p.name;
  document.getElementById('cvLv').textContent = p.grade;
}
function renderCharPetList(){
  const box = document.getElementById('charHeroList');
  if(!box) return;
  let h = `<h3>펫 목록 (${G.pets.length}종 / ${totalPetCopies()}개)</h3><div class="card small">${PET_DUST_ICON} 펫 결정 <b>${(G.petDust||0).toLocaleString()}</b> · 펫 분해로 획득, 초월에 사용</div>`;
  if(!G.pets.length){
    h += `<div class="card small">보유한 펫이 없어요. 소환상점에서 펫을 소환해보세요.</div>`;
  } else {
    orderedPetEntries().forEach(({pet:p,i})=>{
      const active = G.activePet===i;
      h += `<div class="charHeroItem petListItem" onclick="openPetFromChar(${i})">
        <div class="heroFace g-bg-${p.grade}" style="border-color:${gradeColorOf(p.grade)}">${petVisual(p,'heroListImg')}</div>
        <div class="heroMeta">
          <div class="heroName txt-${p.grade}">[${p.grade}] ${p.name} Lv.${petLevel(p)} ${stackBadge(itemCount(p))} ${active?'<span style="font-size:10px;color:#3be38b">●장착</span>':''}</div>
          <div class="heroPower">전투력 ${petPower(p).toLocaleString()} · ${petBuffText(p)}</div>
        </div>
        <button class="btn ${active?'':'gem'}" onclick="event.stopPropagation();equipPetFromChar(${i})" ${active?'disabled':''}>${active?'장착중':'장착'}</button>
      </div>`;
    });
  }
  box.innerHTML = h;
}
function selectCharPet(i){
  selectedCharPetIdx = i;
  syncCharHallTabs();
  renderCharPetLeft();
  renderCharPetList();
}
function openPetFromChar(i){
  selectedCharPetIdx = i;
  renderCharPetLeft();
  renderCharPetDetail(i);
}
function renderCharPetDetail(i){
  const box = document.getElementById('charHeroList');
  const p = G.pets[i];
  if(!box || !p){ renderCharPetList(); return; }
  selectedCharPetIdx = i;
  renderCharPetLeft();
  const active = G.activePet===i;
  box.innerHTML = `<button class="btn" style="width:100%;margin-bottom:9px" onclick="renderCharPetList()">◂ 펫 목록</button>
    <div class="card" style="text-align:center;border-color:${gradeColorOf(p.grade)}">
      <div class="hp-card g-bg-${p.grade}" style="width:86px;height:86px;margin:0 auto 8px;border-color:${gradeColorOf(p.grade)}">
        <div class="hp-shine"></div><div class="hp-grade txt-${p.grade}">${p.grade}</div>${petVisual(p)}
      </div>
      <div class="txt-${p.grade}" style="font-weight:bold;margin-top:4px">[${p.grade}] ${p.name} Lv.${petLevel(p)}/${petCap(p)} ${stackBadge(itemCount(p))}</div>
      <div class="small">${petBuffText(p)}</div>
      <button class="btn ${active?'':'gem'}" style="width:100%;margin-top:8px" onclick="equipPetFromChar(${i})" ${active?'disabled':''}>${active?'장착중':'장착'}</button>
    </div>
    ${petDetailPanelHtml(p)}
    ${petGrowthHtml(i,'char')}
    ${petDismantleHtml(i,'char')}`;
}
function equipPetFromChar(i){
  selectedCharPetIdx = i;
  G.activePet = i;
  refreshTop(); updatePet();
  renderCharPetDetail(i);
}
function renderCharPet(){
  charHallTab = 'pet';
  if((selectedCharPetIdx<0 || !G.pets[selectedCharPetIdx]) && G.activePet>=0 && G.pets[G.activePet]) selectedCharPetIdx = G.activePet;
  syncCharHallTabs();
  renderCharPetLeft();
  renderCharPetList();
}
function bindCharHallTabs(){
  document.querySelectorAll('#charHallTabs button').forEach(btn=>{
    btn.onclick = ()=>setCharHallTab(btn.dataset.hallTab || 'hero');
  });
}
function renderChar(){
  charHallTab = 'hero';
  syncCharHallTabs();
  if(selectedCharHeroIdx==null && G.heroes.length){
    const first = orderedCharHeroes()[0];
    if(first) selectedCharHeroIdx = first.i;
  }
  renderCharLeftArt();
  renderCharHeroList();
}
function orderedCharHeroes(){
  const slots = partySlots();
  const partyRank = new Map(slots.filter(Boolean).map((hero, idx)=>[hero.uid, idx]));
  return G.heroes
    .map((hero,i)=>({hero,i}))
    .sort((a,b)=>{
      const ap = partyRank.has(a.hero.uid) ? partyRank.get(a.hero.uid) : 99;
      const bp = partyRank.has(b.hero.uid) ? partyRank.get(b.hero.uid) : 99;
      if(ap!==bp) return ap-bp;
      const ag = GRADE_RANK[a.hero.grade] ?? 0;
      const bg = GRADE_RANK[b.hero.grade] ?? 0;
      if(ag!==bg) return bg-ag;
      const al = heroLevel(a.hero);
      const bl = heroLevel(b.hero);
      if(al!==bl) return bl-al;
      return heroEffAtk(b.hero)-heroEffAtk(a.hero);
    });
}
function orderedBattleHeroList(){
  return orderedCharHeroes();
}
function heroHallSummaryHtml(){
  const slots = partySlots();
  const party = slots.filter(Boolean);
  const best = G.heroes.length ? orderedCharHeroes()[0]?.hero : null;
  const syn = typeof synergyInfo==='function' ? synergyInfo() : {bonus:0,count:0,cls:''};
  const attrSyn = typeof attrSynergyInfo==='function' ? attrSynergyInfo() : {bonus:0};
  const partyPower = party.reduce((sum, hero)=>sum + heroEffAtk(hero), 0);
  const attrs = typeof partyAttributes==='function' ? partyAttributes() : [];
  const percent = v=>Math.round((v||0)*100);
  return `<div class="card">
    <div style="font-weight:bold;margin-bottom:7px">영웅소 현황</div>
    <div class="heroHallSummary">
      <div class="heroHallMetric"><div class="label">보유 영웅</div><div class="value">${G.heroes.length}종 / ${totalHeroCopies()}개</div></div>
      <div class="heroHallMetric"><div class="label">출전 파티</div><div class="value">${party.length}/5</div></div>
      <div class="heroHallMetric"><div class="label">파티 전투력</div><div class="value">${partyPower.toLocaleString()}</div></div>
      <div class="heroHallMetric"><div class="label">최강 영웅</div><div class="value">${best ? best.name+' Lv.'+heroLevel(best) : '없음'}</div></div>
    </div>
    <div class="heroHallParty">
      ${[0,1,2,3,4].map(n=>{
        const hero = slots[n];
        return hero ? `<div class="heroHallSlot on" style="border-color:${heroCls(hero).color}">
          ${heroSdVisual(hero)}
          <div class="slotName">${n+1}. ${hero.name}</div>
        </div>` : `<div class="heroHallSlot"><div class="empty">${n+1}번</div><div class="slotName">빈 자리</div></div>`;
      }).join('')}
    </div>
    <div class="heroHallRoleRow">
      <span class="heroHallBadge ${syn.bonus>0?'on':''}">직업 시너지 +${percent(syn.bonus)}%</span>
      <span class="heroHallBadge ${attrSyn.bonus>0?'on':''}">속성 시너지 +${percent(attrSyn.bonus)}%</span>
      <span class="heroHallBadge">속성 ${attrs.length ? attrs.join('/') : '없음'}</span>
    </div>
  </div>`;
}
function heroHallPartyControlsHtml(hero, i){
  if(!hero) return '';
  const slots = partySlots();
  const slotNo = slots.findIndex(h=>h && h.uid===hero.uid);
  const inParty = slotNo >= 0;
  return `<div class="card" style="border-color:${inParty?heroCls(hero).color:'#343a66'}">
    <div class="row">
      <div style="flex:1">
        <div style="font-weight:bold">출전 편성 ${inParty?`<span style="font-size:11px;color:#3be38b">● ${slotNo+1}번 출전중</span>`:''}</div>
        <div class="small">전투 파티 5칸 중 원하는 위치에 배치할 수 있어요.</div>
      </div>
      <button class="btn gem" onclick="openPartyPickerFromChar('${hero.uid}',${i})">배치</button>
    </div>
    ${partyPickUid===hero.uid ? `<div class="partyPick">
      ${[0,1,2,3,4].map(n=>`<button class="btn ${slots[n]&&slots[n].uid===hero.uid?'gold':''}" onclick="assignPartySlotFromChar('${hero.uid}',${n},${i})">${n+1}번${slots[n]&&slots[n].uid!==hero.uid?' 교체':''}</button>`).join('')}
      ${inParty?`<button class="btn" onclick="removePartyHeroFromChar('${hero.uid}',${i})">해제</button>`:''}
    </div>`:''}
  </div>`;
}
function refreshCharHeroView(i){
  renderHeroRow();
  refreshTop();
  if(i!=null && G.heroes[i]) renderCharHeroDetail(i);
  else renderCharHeroList();
}
function openPartyPickerFromChar(uid, i){
  if(!G.heroes.some(h=>h.uid===uid)) return;
  partyPickUid = partyPickUid===uid ? null : uid;
  refreshCharHeroView(i);
}
function assignPartySlotFromChar(uid, slot, i){
  const hero = G.heroes.find(h=>h.uid===uid);
  if(!hero || slot<0 || slot>4) return;
  if(!Array.isArray(G.party)) G.party = [];
  while(G.party.length<5) G.party.push(null);
  G.party = G.party.map(id=>id===uid ? null : id);
  G.party[slot] = uid;
  G.heroHp[uid] = heroMaxHp(hero);
  partyPickUid = null;
  refreshCharHeroView(i);
}
function removePartyHeroFromChar(uid, i){
  if(!Array.isArray(G.party)) return;
  G.party = G.party.map(id=>id===uid ? null : id);
  partyPickUid = null;
  refreshCharHeroView(i);
}
function renderCharHeroList(){
  const box = document.getElementById('charHeroList');
  if(!box) return;
  let h = `<h3>영웅 목록 (${G.heroes.length}종 / ${totalHeroCopies()}개)</h3>`;
  h += heroHallSummaryHtml();
  h += `<div class="card small">${HERO_DUST_ICON} 영웅 결정 <b>${(G.heroDust||0).toLocaleString()}</b> · 영웅 분해로 획득, 초월에 사용</div>`;
  if(G.heroes.length===0){
    h += `<div class="card small">아직 영웅이 없어요. 소환상점에서 영웅을 소환해보세요.</div>`;
  } else {
    const slots = partySlots();
    const partyRank = new Map(slots.filter(Boolean).map((hero, idx)=>[hero.uid, idx]));
    const ordered = orderedCharHeroes();
    ordered.forEach(({hero,i})=>{
      const cls = heroCls(hero);
      const slotNo = partyRank.has(hero.uid) ? partyRank.get(hero.uid)+1 : 0;
      const active = selectedCharHeroIdx===i;
      h += `<div class="charHeroItem ${active?'selected':''}" onclick="openHeroFromChar(${i})">
        <div class="heroHallItemTop">
          <div class="heroFace g-bg-${hero.grade}" style="border-color:${cls.color}">${heroSdVisual(hero,'heroListImg')}</div>
          <div class="heroMeta">
            <div class="heroName txt-${hero.grade}">[${hero.grade}] ${hero.name} Lv.${heroLevel(hero)} ${stackBadge(itemCount(hero))}</div>
            <div class="heroPower">${cls.hit} ${cls.name} · 전투력 ${heroEffAtk(hero).toLocaleString()}${slotNo?` · ${slotNo}번 출전`:''}</div>
            <div class="heroTags">
              <span class="miniTag">${heroAttributes(hero).join('/') || '대지'}</span>
              <span class="miniTag">${heroAttackType(hero)}</span>
              <span class="miniTag">HP ${heroMaxHp(hero).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button class="btn gem" style="padding:6px 8px;font-size:10px" onclick="event.stopPropagation();openPartyPickerFromChar('${hero.uid}',null)">배치</button>
      </div>`;
      if(partyPickUid===hero.uid) h += heroHallPartyControlsHtml(hero, null);
    });
  }
  box.innerHTML = h;
}
function showCharCostumes(){
  charHallTab = 'hero';
  syncCharHallTabs();
  const box = document.getElementById('charHeroList');
  if(!box) return;
  const hero = selectedCharHero();
  const costumeId = hero ? costumeHeroIdByName(hero.name) : G.hero;
  if(costumeId) G.hero = costumeId;
  renderCharLeftArt(hero);
  if(!costumeId){
    box.innerHTML = `<button class="btn" style="width:100%;margin-bottom:9px" onclick="renderCharHeroList()">◂ 영웅 목록</button>
      <div class="card" style="border-color:${heroCls(hero).color};text-align:center">
        ${heroSdVisual(hero,'heroListImg')}
        <div class="txt-${hero.grade}" style="font-weight:bold;margin-top:5px">[${hero.grade}] ${hero.name}</div>
        <div class="small" style="margin-top:5px">이 영웅의 코스튬은 준비 중이에요. 왼쪽에서 선택한 영웅 일러스트를 볼 수 있어요.</div>
      </div>`;
    return;
  }
  box.innerHTML = `<button class="btn" style="width:100%;margin-bottom:9px" onclick="renderCharHeroDetail(selectedCharHeroIdx)">◂ 영웅 정보</button>` + viewCostume();
}
function openHeroFromChar(i){
  heroDetailIdx = i;
  selectedCharHeroIdx = i;
  renderCharLeftArt(G.heroes[i]);
  renderCharHeroDetail(i);
}
function renderCharHeroDetail(i){
  const box = document.getElementById('charHeroList');
  const hero = G.heroes[i];
  if(!box || !hero){ renderCharHeroList(); return; }
  selectedCharHeroIdx = i;
  renderCharLeftArt(hero);
  const data = charData(hero.name);
  const art = heroDisplayArt(hero);
  box.innerHTML = `<button class="btn" style="width:100%;margin-bottom:9px" onclick="renderCharHeroList()">◂ 영웅 목록</button>
    <div class="card" style="text-align:center;border-color:${heroCls(hero).color}">
      ${heroSdVisual(hero,'heroListImg')}
      <div class="txt-${hero.grade}" style="font-weight:bold;margin-top:4px">[${hero.grade}] ${hero.name} Lv.${heroLevel(hero)}/${heroCap(hero)} ${stackBadge(itemCount(hero))}</div>
      <div class="small">${heroCls(hero).hit} ${heroCls(hero).name} · ${data.attr||''}</div>
    </div>
    ${heroHallPartyControlsHtml(hero, i)}
    ${heroStatDetailHtml(hero)}
    ${heroSkillDetailHtml(hero)}
    ${heroGrowthHtml(i,'char')}
    ${heroDismantleHtml(i)}
    <div class="card">
      ${art?`<img src="${art}${AV}" alt="${hero.name}" style="width:100%;max-height:220px;object-fit:contain;border-radius:10px;background:transparent;margin-bottom:7px">`:''}
      <div style="font-weight:bold;color:${heroCls(hero).color}">"${data.quote||''}"</div>
      <div class="small" style="margin-top:6px;line-height:1.5">${data.profile||''}</div>
    </div>`;
}
function goHome(){ renderHome(); document.getElementById('home').style.display='flex'; updateTabsVisibility(); if(window.bgm) bgm('home'); }
function enterGame(){
  document.getElementById('home').style.display='none';
  document.getElementById('charView').style.display='none';
  closeMenu(); closeScreen();
  updateTabsVisibility();
}
function enterHunt(){
  enterGame();
  setTab('hunt');
  document.getElementById('tabs').style.display='flex';
  if(window.bgm) bgm('battle');
}
function openFromHome(tab){ enterGame(); setTab(tab); if(window.bgm) bgm(tab==='hunt' ? 'battle' : 'home'); }
function openSummonShopView(){
  renderHome();
  closeMenu(); closeScreen();
  document.getElementById('charView').style.display='none';
  document.getElementById('summonShopView').style.display='block';
  setSummonShopMode('summon');
  updateTabsVisibility();
}
function closeSummonShopView(){
  document.getElementById('summonShopView').style.display='none';
  renderHome();
  document.getElementById('home').style.display='flex';
  updateTabsVisibility();
}
function setSummonShopMode(mode){
  const view = document.getElementById('summonShopView');
  const panel = document.getElementById('summonShopPanel');
  if(!view || !panel) return;
  view.dataset.mode = mode;
  refreshSummonShopWallet();
  refreshSummonShopCounters();
  if(mode==='summon'){
    panel.style.display='none';
    panel.innerHTML='';
    return;
  }
  panel.style.display='block';
  panel.innerHTML = mode==='package' ? viewSummonPackageShop() : viewSummonCashShop();
}
function refreshSummonShopWallet(){
  const box = document.getElementById('summonShopWallet');
  if(!box || typeof G === 'undefined') return;
  box.innerHTML = `<div class="summonWalletPill"><span class="goldIcon"></span> ${Math.floor(G.gold||0).toLocaleString()}</div>
    <div class="summonWalletPill">💎 ${(G.gem||0).toLocaleString()}</div>`;
}
function refreshSummonShopCounters(){
  const box = document.getElementById('summonShopCounters');
  if(!box || typeof ensureSummonState !== 'function') return;
  ensureSummonState();
  const rows = ['hero','gear','pet'];
  box.innerHTML = rows.map((kind)=>{
    const pity = G.summonPity?.[kind] || 0;
    const tickets = G.selectTickets?.[kind] || 0;
    return `<div class="summonCounterCard ${kind}">
      <div class="count">누적 ${pity.toLocaleString()}회</div>
      <div class="ticket">${tickets>0 ? `UR 선택권 ${tickets}장` : '1000소환시 UR선택권'}</div>
      ${tickets>0 ? `<button class="selectBtn" onclick="openSelectSummon('${kind}')">UR 선택</button>` : ''}
    </div>`;
  }).join('');
}
function viewSummonPackageShop(){
  const first = G.firstPayDone
    ? `<div class="card" style="border-color:#3be38b"><b>첫 결제 패키지 수령 완료</b><div class="small">SR 카엘과 보석 보상을 이미 받았어요.</div></div>`
    : `<div class="card" style="border-color:#ffb74d"><div class="row">
        <div style="font-size:34px">🎁</div>
        <div style="flex:1"><b>첫 결제 패키지</b><div class="small">SR 카엘 + 💎2,000</div></div>
        <button class="btn gem" onclick="firstPay();setSummonShopMode('package')">₩1,100</button>
      </div></div>`;
  const pass = G.adPass
    ? `<div class="card" style="border-color:#7c3bff"><b class="txt-SR">광고 스킵 패스 이용 중</b><div class="small">광고 보상 즉시 수령 · 자동사냥 1.5배</div></div>`
    : `<div class="card"><div class="row">
        <div style="font-size:34px">✨</div>
        <div style="flex:1"><b>광고 스킵 패스</b><div class="small">광고 없이 즉시 보상 + 자동사냥 1.5배</div></div>
        <button class="btn" onclick="buyAdPass();setSummonShopMode('package')">월 ₩4,900</button>
      </div></div>`;
  return `<h3>🎁 패키지 상점</h3>${first}${pass}
    <div class="card"><div class="row">
      <div style="font-size:34px">💎</div>
      <div style="flex:1"><b>성장 패키지</b><div class="small">💎3,000 + <span class="goldIcon"></span>100,000</div></div>
      <button class="btn gem" onclick="G.gem+=3000;G.gold+=100000;refreshTop();setSummonShopMode('package')">₩19,900</button>
    </div></div>`;
}
function viewSummonCashShop(){
  return `<h3>💎 재화 상점</h3>
    <div class="card"><div class="row">
      <div style="font-size:34px"><span class="goldIcon"></span></div>
      <div style="flex:1"><b>골드 보급</b><div class="small">게임 재화 골드 +100,000</div></div>
      <button class="btn gold" onclick="G.gold+=100000;refreshTop();setSummonShopMode('cash')">무료</button>
    </div></div>
    <div class="card"><div class="row">
      <div style="font-size:34px">💎</div>
      <div style="flex:1"><b>테스트 보석 20,000</b><div class="small">소환과 강화 테스트용 무료 보석</div></div>
      <button class="btn gem" onclick="G.gem+=20000;saveGame();refreshTop();setSummonShopMode('cash')">💎 20,000 받기</button>
    </div></div>
    <div class="card"><div class="row">
      <div style="font-size:34px">📺</div>
      <div style="flex:1"><b>광고 보석</b><div class="small">광고 보상으로 💎30 획득</div></div>
      <button class="btn gem" onclick="watchAd('gem');setTimeout(()=>setSummonShopMode('cash'),50)" ${adReady('gem')?'':'disabled'}>${G.adPass?'즉시 받기':(adReady('gem')?'광고 보기':adRemain('gem')+'초')}</button>
    </div></div>`;
}
function openChar(){ bindCharHallTabs(); renderChar(); document.getElementById('charView').style.display='block'; updateTabsVisibility(); }
function closeChar(){ document.getElementById('charView').style.display='none'; updateTabsVisibility(); }
function openMenu(){ updateHomeRes(); document.getElementById('menuOverlay').style.display='flex'; }
function closeMenu(){ document.getElementById('menuOverlay').style.display='none'; }

