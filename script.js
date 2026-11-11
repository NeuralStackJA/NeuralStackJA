(() => {
  const canvas = document.getElementById('art');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0, height = 0, dpr = 1, raf = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    width = r.width; height = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  const shapes = [
    {x:.46,y:.49,r:.25,color:'#8255f4',type:'square',speed:.25,phase:0},
    {x:.65,y:.36,r:.19,color:'#ff6689',type:'circle',speed:-.34,phase:2},
    {x:.37,y:.67,r:.15,color:'#ffc45c',type:'triangle',speed:.5,phase:1},
    {x:.75,y:.68,r:.12,color:'#25cbbd',type:'ring',speed:-.4,phase:3},
    {x:.25,y:.27,r:.08,color:'#fff8ee',type:'diamond',speed:.4,phase:1.5}
  ];
  function draw(t) {
    const time = reduced ? 0 : t / 1000;
    ctx.clearRect(0,0,width,height);
    const unit = Math.min(width,height);
    shapes.forEach((s,i)=>{
      const x = s.x*width + Math.sin(time*.55+s.phase)*unit*.025;
      const y = s.y*height + Math.cos(time*.5+s.phase)*unit*.025;
      const r = s.r*unit;
      ctx.save();ctx.translate(x,y);ctx.rotate(time*s.speed+s.phase*.15);
      ctx.shadowColor='rgba(62,32,90,.16)';ctx.shadowBlur=32;ctx.shadowOffsetY=16;
      ctx.fillStyle=s.color;ctx.strokeStyle=s.color;ctx.lineWidth=r*.22;
      if(s.type==='circle'){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();}
      if(s.type==='square'){ctx.beginPath();ctx.roundRect(-r,-r,r*2,r*2,r*.35);ctx.fill();}
      if(s.type==='triangle'){ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(r*.95,r*.85);ctx.lineTo(-r*.95,r*.85);ctx.closePath();ctx.fill();}
      if(s.type==='ring'){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();}
      if(s.type==='diamond'){ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(r,0);ctx.lineTo(0,r);ctx.lineTo(-r,0);ctx.closePath();ctx.fill();}
      ctx.restore();
    });
    if(!reduced) raf=requestAnimationFrame(draw);
  }
  resize();draw(0);
  window.addEventListener('resize',()=>{resize();if(reduced)draw(0)},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);}else if(!reduced){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);}});
})();
