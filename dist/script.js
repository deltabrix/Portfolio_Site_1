const hero=document.querySelector('.hero');
const profile=document.querySelector('.profile');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp(value);return t*t*(3-2*t)};
document.documentElement.classList.add('motion-ready');
let ticking=false;
let heroStart=0;
let distance=1;
function measure(){
  heroStart=hero.offsetTop;
  distance=Math.max(1,hero.offsetHeight-document.querySelector('.hero-sticky').offsetHeight);
  queue();
}
function renderScroll(){
  const travelled=window.scrollY-heroStart;
  const p=clamp(travelled/(distance||1));
  const arrival=reduced.matches?1:smooth((p-.66)/.34);
  const wash=reduced.matches?0:smooth((p-.57)/.29);
  hero.style.setProperty('--zoom',reduced.matches?1:Math.exp(Math.min(p,.82)*3.8));
  hero.style.setProperty('--caption',Math.max(0,1-p*5));
  hero.style.setProperty('--wash',wash);
  hero.classList.toggle('is-covered',wash===1);
  profile.style.setProperty('--arrival',arrival);
  profile.style.setProperty('--approach',.92+.08*arrival);
  profile.classList.toggle('is-arriving',arrival>0);
  ticking=false;
}
function queue(){if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}}
addEventListener('scroll',queue,{passive:true});
addEventListener('resize',measure);
reduced.addEventListener('change',measure);
measure();
// The intro is visually pinned during the transition; anchors use its layout position.
document.querySelectorAll('a[href="#profile"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  history.replaceState(null,'','#profile');
  window.scrollTo({top:reduced.matches?profile.parentElement.offsetTop:heroStart+distance,behavior:reduced.matches?'instant':'smooth'});
}));
addEventListener('pageshow',()=>{
  if(location.hash==='#profile')requestAnimationFrame(()=>requestAnimationFrame(()=>{
    measure();
    window.scrollTo({top:reduced.matches?profile.parentElement.offsetTop:heroStart+distance,behavior:'instant'});
  }));
});
const revealSelector='header .wordmark,header nav a,.hero-meta span,.hero-bottom>*,.logo-stage,'+
  '.section-top span,.intro>*,.resume-row>h3,.entries article,.expertise>div,'+
  '.profile-contact>*,.work-heading h2,.footer-brand,.footer-contact,.footer-bottom';
document.querySelectorAll(revealSelector).forEach(element=>element.classList.add('reveal'));
function loadImage(image){if(!image.getAttribute('src'))image.src=image.dataset.src}
const reveals=document.querySelectorAll('.reveal');
const images=document.querySelectorAll('img[data-src]');
const videos=document.querySelectorAll('.work-video');
if('IntersectionObserver' in window){
  const preload=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){loadImage(entry.target);preload.unobserve(entry.target)}
  }),{rootMargin:'400px 0px',threshold:0});
  images.forEach(image=>preload.observe(image));
  const entrances=new IntersectionObserver(entries=>entries.forEach(entry=>{
    entry.target.classList.toggle('is-inview',entry.isIntersecting);
  }),{threshold:0,rootMargin:'0px 0px -48px 0px'});
  reveals.forEach(element=>entrances.observe(element));
  // Release distant players instead of running sixteen videos in the background.
  const players=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const frame=entry.target.querySelector('iframe');
    if(entry.isIntersecting&&!frame.hasAttribute('src'))frame.src=frame.dataset.src;
    else if(!entry.isIntersecting&&frame.hasAttribute('src'))frame.removeAttribute('src');
  }),{rootMargin:'400px 0px',threshold:0});
  videos.forEach(video=>players.observe(video));
}else{
  images.forEach(loadImage);
  reveals.forEach(element=>element.classList.add('is-inview'));
  videos.forEach(video=>{const frame=video.querySelector('iframe');frame.loading='lazy';frame.src=frame.dataset.src});
}
