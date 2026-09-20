const hero=document.querySelector('.hero');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let ticking=false;
function renderScroll(){
  const p=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/(hero.offsetHeight-innerHeight||1)));
  hero.style.setProperty('--zoom',reduced.matches?1:Math.exp(p*3.8));
  hero.style.setProperty('--caption',Math.max(0,1-p*5));
  hero.style.setProperty('--wash',Math.max(0,Math.min(1,(p-.67)/.3)));
  ticking=false;
}
function queue(){if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}}
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',queue);renderScroll();
