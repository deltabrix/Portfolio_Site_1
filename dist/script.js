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

const revealSelector='header .wordmark,header nav a,.hero-meta span,.hero-bottom>*,'+
  '.section-top span,.intro>*,.resume-row>h3,.entries article,.expertise>div,'+
  '.profile-contact>*,.work-heading h2,footer>*';
document.querySelectorAll(revealSelector).forEach(element=>element.classList.add('reveal'));

const revealElements=document.querySelectorAll('.reveal');
function loadWorkImage(image){
  if(image.dataset.src&&!image.getAttribute('src')) image.src=image.dataset.src;
}
function showAll(){
  revealElements.forEach(element=>{
    if(element.matches('img[data-src]')) loadWorkImage(element);
    element.classList.add('is-inview');
  });
}
if('IntersectionObserver' in window&&!reduced.matches){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const element=entry.target;
      if(element.matches('img[data-src]'))loadWorkImage(element);
      element.classList.add('is-inview');
      revealObserver.unobserve(element);
    });
  },{rootMargin:'0px 0px 320px 0px',threshold:.05});
  revealElements.forEach(element=>revealObserver.observe(element));
}else showAll();
