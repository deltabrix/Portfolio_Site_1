// Fine ambient dust, independent of the logo and its scroll-driven transform.
(()=>{
  const hero=document.querySelector('.hero');
  const stage=hero?.querySelector('.hero-sticky');
  if(!stage)return;
  const canvas=document.createElement('canvas');
  canvas.className='hero-atmosphere';
  canvas.setAttribute('aria-hidden','true');
  const context=canvas.getContext('2d');
  if(!context)return;
  stage.prepend(canvas);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let width=1,height=1,particles=[],frame=0,last=0,elapsed=0,inView=true;
  let seed=731;
  const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
  const wrap=(value,limit)=>((value+12)%(limit+24)+(limit+24))%(limit+24)-12;
  function draw(){
    context.clearRect(0,0,width,height);
    for(const particle of particles){
      const x=wrap(particle.x*width+elapsed*particle.vx+Math.sin(elapsed*.09+particle.phase)*7,width);
      const y=wrap(particle.y*height-elapsed*particle.vy+Math.cos(elapsed*.07+particle.phase)*5,height);
      // Constant opacity avoids flickering or a twinkling-star effect.
      context.fillStyle=`rgba(213,224,237,${particle.opacity})`;
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
    const count=Math.min(60,Math.max(20,Math.round(width*height/27000)));
    particles=Array.from({length:count},()=>({
      x:random(),y:random(),radius:.4+random()*.75,
      opacity:.1+random()*.14,vx:(random()-.4)*.9,vy:.65+random()*1.3,phase:random()*Math.PI*2
    }));
    draw();
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
  }
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
  else addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;update();
  }).observe(stage);
  new MutationObserver(update).observe(hero,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',update);
  reduced.addEventListener('change',update);
  resize();update();
})();
