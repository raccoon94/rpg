// 효과음 — Web Audio로 즉석 합성. 오디오 파일 0개(용량 0), 오프라인·모바일 동작.
// 마스터에 로우패스 필터를 걸어 날카로움을 줄이고, 레이어/엔벨로프로 부드럽게 만든다.
// 사용: sfx('tap'|'crit'|'hit'|'kill'|'boss'|'levelup'|'reward'|'gacha'|'click'|'heart')
// 음소거: G.sfxOn === false 면 무음 (기본 켜짐).
(function(){
  let ctx = null, master = null, lp = null;
  function ensure(){
    if(ctx) return ctx;
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.5;
      lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.5;
      lp.connect(master); master.connect(ctx.destination);
    }catch(e){ ctx = null; }
    return ctx;
  }
  function enabled(){ return !window.G || G.sfxOn !== false; }
  // 부드러운 단음: attack/decay 엔벨로프, 사인/삼각 위주, 약한 디튠 레이어 옵션
  function tone(o){
    if(!enabled()) return;
    const c = ensure(); if(!c) return;
    if(c.state === 'suspended') c.resume();
    const t = (o.at!=null ? o.at : c.currentTime);
    const dur = o.dur || 0.18, atk = o.atk!=null ? o.atk : 0.012;
    const osc = c.createOscillator(), g = c.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.f0 || 440, t);
    if(o.f1) osc.frequency[o.glide==='lin'?'linearRampToValueAtTime':'exponentialRampToValueAtTime'](o.f1, t + dur);
    const vol = o.vol == null ? 0.4 : o.vol;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(lp);
    osc.start(t); osc.stop(t + dur + 0.03);
    if(o.detune){ // 살짝 어긋난 두 번째 음으로 두께 부여
      const o2 = c.createOscillator(), g2 = c.createGain();
      o2.type = o.type || 'sine'; o2.frequency.setValueAtTime((o.f0||440)*1.005, t);
      if(o.f1) o2.frequency.exponentialRampToValueAtTime(o.f1*1.005, t + dur);
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(vol*0.5, t + atk);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o2.connect(g2); g2.connect(lp); o2.start(t); o2.stop(t + dur + 0.03);
    }
  }
  // 부드러운 잡음(필터링된 임팩트용)
  function thump(dur, vol, cutoff){
    if(!enabled()) return;
    const c = ensure(); if(!c) return;
    if(c.state === 'suspended') c.resume();
    const n = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for(let i=0;i<n;i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/n, 2.5);
    const s = c.createBufferSource(); s.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = cutoff || 900;
    const g = c.createGain(); g.gain.value = vol == null ? 0.2 : vol;
    s.connect(f); f.connect(g); g.connect(lp); s.start();
  }
  function chord(notes, type, step, dur, vol){
    const c = ensure(); const base = c ? c.currentTime : 0;
    notes.forEach((f, i) => tone({type, f0:f, dur, vol, at: base + i*step, detune:true}));
  }
  const lib = {
    // 가볍고 둔탁하지 않은 "톡" — 짧고 낮은 사인 + 약한 저역 임팩트
    tap:     () => { tone({type:'sine', f0:430, f1:230, dur:0.09, vol:0.16, glide:'lin'}); },
    crit:    () => { tone({type:'triangle', f0:620, f1:880, dur:0.13, vol:0.22, detune:true}); thump(0.08, 0.12, 1400); },
    hit:     () => tone({type:'sine', f0:260, f1:150, dur:0.08, vol:0.13, glide:'lin'}),
    // 처치 — 묵직한 저역 임팩트 + 짧은 하강음
    kill:    () => { thump(0.16, 0.22, 700); tone({type:'triangle', f0:300, f1:150, dur:0.16, vol:0.18}); },
    boss:    () => { thump(0.34, 0.3, 460); tone({type:'sine', f0:150, f1:60, dur:0.4, vol:0.26}); },
    // 레벨업 — 부드러운 상승 아르페지오(메이저 코드)
    levelup: () => chord([523, 659, 784, 1047], 'triangle', 0.085, 0.26, 0.2),
    // 보상 — 맑은 종소리 느낌
    reward:  () => chord([784, 988, 1319], 'sine', 0.08, 0.3, 0.22),
    gacha:   () => { tone({type:'sine', f0:330, f1:1320, dur:0.6, vol:0.24, detune:true}); },
    click:   () => tone({type:'sine', f0:520, dur:0.05, vol:0.12}),
    heart:   () => chord([784, 988], 'sine', 0.1, 0.2, 0.2)
  };
  window.sfx = function(name){ try{ (lib[name] || lib.click)(); }catch(e){} };
  window.sfxResume = function(){ const c = ensure(); if(c && c.state === 'suspended') c.resume(); };
  function unlock(){ window.sfxResume(); document.removeEventListener('pointerdown', unlock); document.removeEventListener('touchstart', unlock); }
  document.addEventListener('pointerdown', unlock, {once:true});
  document.addEventListener('touchstart', unlock, {once:true});
})();
