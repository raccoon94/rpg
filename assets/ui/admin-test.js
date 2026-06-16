// Admin-only quick navigation for browser testing.
(function(){
  const params = new URLSearchParams(location.search);
  const target = params.get('admin') || params.get('test');
  if(!params.has('admin') && !params.has('test')) return;

  function callIfReady(name, ...args){
    if(typeof window[name] === 'function') window[name](...args);
  }

  function go(view){
    const v = String(view || 'home').toLowerCase();
    if(v === 'home') callIfReady('renderHome');
    if(v === 'hunt') callIfReady('enterGame');
    if(v === 'summon') callIfReady('openSummonShopView');
    if(v === 'hero') callIfReady('openChar');
    if(v === 'gear'){
      callIfReady('openChar');
      callIfReady('setCharHallTab', 'gear');
    }
    if(v === 'pet'){
      callIfReady('openChar');
      callIfReady('setCharHallTab', 'pet');
    }
  }

  function makeButton(label, view){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.addEventListener('click', ()=>go(view));
    return btn;
  }

  function mount(){
    const bar = document.createElement('div');
    bar.className = 'adminTestBar';
    bar.append(
      makeButton('홈', 'home'),
      makeButton('사냥', 'hunt'),
      makeButton('영웅', 'hero'),
      makeButton('장비', 'gear'),
      makeButton('펫', 'pet'),
      makeButton('소환', 'summon')
    );
    const style = document.createElement('style');
    style.textContent = `
      .adminTestBar{position:fixed;left:10px;top:10px;z-index:99999;display:flex;gap:6px;padding:7px;border-radius:8px;background:rgba(23,18,12,.82);box-shadow:0 6px 18px rgba(0,0,0,.28)}
      .adminTestBar button{border:1px solid rgba(255,229,166,.55);border-radius:7px;background:#f3c45e;color:#3a2108;font-weight:900;font-size:12px;padding:6px 9px;cursor:pointer}
      .adminTestBar button:hover{filter:brightness(1.07)}
    `;
    document.head.appendChild(style);
    document.body.appendChild(bar);
    setTimeout(()=>go(target), 150);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount, {once:true});
  }else{
    mount();
  }
})();
