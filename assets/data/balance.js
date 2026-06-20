// Shared balance data split from index.html.
// ---- Summon grade balance ----
var PITY_MAX = 1000;         // 1000회마다 UR 선택소환권
var GRADE_STARS = {N:1, R:2, SR:3, SSR:5, UR:6};
var GRADE_GRAD = {           // 등급별 배경 그라데이션
  N:  'linear-gradient(160deg,#7b8494,#3f4654)',
  R:  'linear-gradient(160deg,#4f9bff,#1b3a8a)',
  SR: 'linear-gradient(160deg,#c06bff,#5b1d97)',
  SSR:'linear-gradient(160deg,#ffd24a,#ff8a00,#ff5e7a)',
  UR:'linear-gradient(160deg,#8b5cf6,#ff4fd8,#ffd24a)',
};

// ---- Hero and pet growth balance ----
var HERO_MAX_LEVEL = 50;
var HERO_GRADE_ORDER = ['N','R','SR','SSR','UR'];
var HERO_GRADE_MULT = {N:.45, R:.68, SR:1, SSR:3.5, UR:9};
var HERO_DUST_ICON = '💠';
var HERO_DUST_BY_GRADE = {N:1, R:3, SR:10, SSR:40, UR:120};
var PET_DUST_ICON = '🐾';
var PET_DUST_BY_GRADE = {N:1, R:3, SR:10, SSR:35, UR:100};
var HERO_MAT = { 린:'wind', 루비아:'fire', 실비아:'water', 사피라:'water', 카엘:'fire', 에메리아:'wind', 카이라:'dark', 카이론:'water', 그란트:'steel' };
var ROLE_STAT_MULT = {
  gunner:{atk:1.28,hp:.78,def:.74},
  gun:{atk:1.28,hp:.78,def:.74},
  mage:{atk:1.22,hp:.82,def:.72},
  magic:{atk:1.22,hp:.82,def:.72},
  assassin:{atk:.96,hp:.86,def:.78},
  warrior:{atk:1.06,hp:1.06,def:1.04},
  sword:{atk:1.06,hp:1.06,def:1.04},
  knight:{atk:.98,hp:1.20,def:1.22},
  tanker:{atk:.82,hp:1.58,def:1.68},
  tank:{atk:.82,hp:1.58,def:1.68},
  healer:{atk:.86,hp:1.18,def:1.10}
};


