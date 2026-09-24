// Screen-space texture and ambient dust stay independent of the logo's zoom.
(()=>{
  const hero=document.querySelector('.hero');
  const stage=hero?.querySelector('.hero-sticky');
  if(!stage)return;
  const logo=stage.querySelector('.hologram');
  const arrival=stage.querySelector('.logo-arrival');
  const grain=document.createElement('div');
  grain.className='hero-grain';
  grain.setAttribute('aria-hidden','true');
  stage.querySelector('.logo-stage').after(grain);
  const canvas=document.createElement('canvas');
  canvas.className='hero-atmosphere';
  canvas.setAttribute('aria-hidden','true');
  const context=canvas.getContext('2d');
  if(!context)return;
  stage.prepend(canvas);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let width=1,height=1,particles=[],frame=0,grainFrame=0,last=0,elapsed=0,inView=true;
  let seed=731;
  const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
  const wrap=(value,limit)=>((value+12)%(limit+24)+(limit+24))%(limit+24)-12;
  const smooth=value=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t)};
  function renderGrain(){
    if(document.hidden||!inView||hero.classList.contains('is-covered'))return;
    const bounds=logo.getBoundingClientRect();
    const surface=stage.getBoundingClientRect();
    // Only the mask follows the logo. The texture itself is never transformed.
    grain.style.setProperty('--grain-mask-size',`${bounds.width}px ${bounds.height}px`);
    grain.style.setProperty('--grain-mask-position',`${bounds.left-surface.left}px ${bounds.top-surface.top}px`);
    grain.style.opacity=String(.1*Number(getComputedStyle(arrival).opacity));
  }
  function animateGrainEntrance(){
    grainFrame=0;
    renderGrain();
    if(inView&&!document.hidden&&hero.classList.contains('is-entering')&&!reduced.matches){
      grainFrame=requestAnimationFrame(animateGrainEntrance);
    }
  }
  function makeParticle(initial=false){
    const particle={
      x:random(),y:random(),radius:.7+random()*.85,
      opacity:(.24+random()*.24)*.8,
      vx:(random()-.4)*.9,vy:.65+random()*1.3,phase:random()*Math.PI*2,
      life:6+random()*4
    };
    // Stagger the cycles; replacement particles begin at zero opacity elsewhere.
    particle.born=initial?elapsed-random()*particle.life:elapsed+.4+random()*1.2;
    return particle;
  }
  function draw(){
    context.clearRect(0,0,width,height);
    const opening=reduced.matches?1:smooth((elapsed-.5)/3);
    for(let index=0;index<particles.length;index++){
      let particle=particles[index];
      let age=elapsed-particle.born;
      if(!reduced.matches&&age>=particle.life){
        particle=particles[index]=makeParticle();
        age=elapsed-particle.born;
      }
      if(age<0)continue;
      const progress=age/particle.life;
      const lifeFade=reduced.matches?1:smooth(progress/.28)*smooth((1-progress)/.38);
      const opacity=particle.opacity*lifeFade*opening;
      if(opacity<=0)continue;
      const movement=age*1.3;
      const x=wrap(particle.x*width+movement*particle.vx+Math.sin(movement*.09+particle.phase)*7,width);
      const y=wrap(particle.y*height-movement*particle.vy+Math.cos(movement*.07+particle.phase)*5,height);
      const halo=context.createRadialGradient(x,y,0,x,y,particle.radius*3.5);
      halo.addColorStop(0,`rgba(213,224,237,${opacity*.24})`);
      halo.addColorStop(1,'rgba(213,224,237,0)');
      context.fillStyle=halo;
      context.beginPath();
      context.arc(x,y,particle.radius*3.5,0,Math.PI*2);
      context.fill();
      context.fillStyle=`rgba(222,231,241,${opacity})`;
      context.beginPath();
      context.arc(x,y,particle.radius,0,Math.PI*2);
      context.fill();
    }
  }
  function resize(){
    width=stage.clientWidth;height=stage.clientHeight;
    const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    seed=731;
    const count=Math.min(110,Math.max(38,Math.round(width*height/13000)));
    if(particles.length!==count)particles=Array.from({length:count},()=>makeParticle(true));
    draw();renderGrain();
  }
  function tick(now){
    if(now-last>=1000/30){
      elapsed+=last?Math.min((now-last)/1000,.1):0;
      last=now;draw();
    }
    frame=requestAnimationFrame(tick);
  }
  function update(){
    const active=inView&&!document.hidden&&!reduced.matches&&!hero.classList.contains('is-covered');
    if(active&&!frame){last=0;frame=requestAnimationFrame(tick)}
    if(!active&&frame){cancelAnimationFrame(frame);frame=0;last=0}
    if(grainFrame){cancelAnimationFrame(grainFrame);grainFrame=0}
    animateGrainEntrance();
    if(reduced.matches)draw();
  }
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
  else addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;update();
  }).observe(stage);
  new MutationObserver(records=>{
    if(records.some(record=>record.attributeName==='class'))update();
    else renderGrain();
  }).observe(hero,{attributes:true,attributeFilter:['class','style']});
  document.addEventListener('visibilitychange',update);
  reduced.addEventListener('change',update);
  resize();update();
})();
