// 효과음 — Web Audio로 즉석 합성. 오디오 파일 0개(용량 0), 오프라인·모바일 동작.
// 사용: sfx('tap'|'crit'|'hit'|'kill'|'boss'|'levelup'|'reward'|'gacha'|'click'|'heart')
// 음소거: G.sfxOn === false 면 무음 (기본 켜짐). 첫 사용자 입력 때 sfxResume()로 오디오 컨텍스트 활성화.
(function(){
  let ctx = null, master = null;
  function ensure(){
    if(ctx) return ctx;
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.32;
      master.connect(ctx.destination);
    }catch(e){ ctx = null; }
    return ctx;
  }
  function enabled(){ return !window.G || G.sfxOn !== false; }
  function tone(opt){
    if(!enabled()) return;
    const c = ensure(); if(!c) return;
    if(c.state === 'suspended') c.resume();
    const t = c.currentTime, dur = opt.dur || 0.12;
    const o = c.createOscillator(), g = c.createGain();
    o.type = opt.type || 'sine';
    o.frequency.setValueAtTime(opt.f0 || 440, t);
    if(opt.f1) o.frequency.exponentialRampToValueAtTime(opt.f1, t + dur);
    const vol = opt.vol == null ? 0.4 : opt.vol;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(dur, vol){
    if(!enabled()) return;
    const c = ensure(); if(!c) return;
    if(c.state === 'suspended') c.resume();
    const n = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for(let i=0;i<n;i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/n, 2);
    const s = c.createBufferSource(); s.buffer = buf;
    const g = c.createGain(); g.gain.value = vol == null ? 0.25 : vol;
    s.connect(g); g.connect(master); s.start();
  }
  function seq(notes, type, dur, vol){
    notes.forEach((f, i) => setTimeout(() => tone({type, f0:f, dur, vol}), i * (dur*1000*0.62)));
  }
  const lib = {
    tap:     () => tone({type:'triangle', f0:520, f1:300, dur:0.07, vol:0.22}),
    crit:    () => { tone({type:'square', f0:760, f1:1250, dur:0.09, vol:0.28}); noise(0.1, 0.16); },
    hit:     () => tone({type:'triangle', f0:300, f1:160, dur:0.07, vol:0.2}),
    kill:    () => { tone({type:'sawtooth', f0:240, f1:90, dur:0.18, vol:0.26}); noise(0.16, 0.18); },
    boss:    () => { tone({type:'sawtooth', f0:150, f1:48, dur:0.42, vol:0.32}); noise(0.32, 0.24); },
    levelup: () => seq([523, 659, 784, 1047], 'square', 0.16, 0.26),
    reward:  () => seq([660, 880, 1175], 'sine', 0.16, 0.28),
    gacha:   () => tone({type:'sine', f0:280, f1:1500, dur:0.55, vol:0.3}),
    click:   () => tone({type:'sine', f0:440, dur:0.05, vol:0.16}),
    heart:   () => seq([784, 988], 'sine', 0.15, 0.24)
  };
  window.sfx = function(name){ try{ (lib[name] || lib.click)(); }catch(e){} };
  window.sfxResume = function(){ const c = ensure(); if(c && c.state === 'suspended') c.resume(); };
  // 첫 사용자 입력에서 오디오 컨텍스트 활성화 (모바일 자동재생 정책 대응)
  function unlock(){ window.sfxResume(); document.removeEventListener('pointerdown', unlock); document.removeEventListener('touchstart', unlock); }
  document.addEventListener('pointerdown', unlock, {once:true});
  document.addEventListener('touchstart', unlock, {once:true});
})();
