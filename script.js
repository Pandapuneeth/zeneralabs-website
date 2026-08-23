/* ══ ZENERA LABS — script.js ══ */

// ── CURSOR ──
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cur && ring) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function tick(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    cur.style.left=mx+'px';  cur.style.top=my+'px';
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.svc,.tmember,.impact-card,.svc-cta-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
}

// ── LOADER ──
window.addEventListener('load',()=>{
  setTimeout(()=>{ const l=document.getElementById('loader'); if(l) l.classList.add('hidden'); },1600);
});

// ── NAVBAR SCROLL ──
const nav=document.getElementById('navbar');
if(nav){
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});
}

// ── HAMBURGER ──
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobile-nav');
if(ham&&mob){
  ham.addEventListener('click',()=>{
    mob.classList.toggle('open');
    // Animate spans to X
    const spans=ham.querySelectorAll('span');
    ham.classList.toggle('open');
    if(ham.classList.contains('open')){
      spans[0].style.transform='translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity='0';
      spans[2].style.transform='translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform=''; spans[1].style.opacity=''; spans[2].style.transform='';
    }
  });
}
function closeMobile(){
  if(mob) mob.classList.remove('open');
  if(ham){
    ham.classList.remove('open');
    ham.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
  }
}

// ── REVEAL ON SCROLL ──
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ── COUNT-UP ──
function countUp(el,target,dur=1600){
  let start=null;
  (function step(ts){
    if(!start) start=ts;
    const p=Math.min((ts-start)/dur,1);
    el.textContent=Math.floor((1-Math.pow(1-p,3))*target);
    if(p<1) requestAnimationFrame(step); else el.textContent=target;
  })(performance.now());
}
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){countUp(e.target,parseInt(e.target.dataset.target));cntObs.unobserve(e.target);}});
},{threshold:0.5});
document.querySelectorAll('.ic-num').forEach(el=>cntObs.observe(el));

// ── CANVAS PARTICLES ──
const canvas=document.getElementById('bg-canvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  let W,H;
  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize();
  window.addEventListener('resize',resize,{passive:true});
  const PINK=[255,0,127];
  const dots=Array.from({length:55},()=>({
    x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    r:Math.random()*1.4+.5, o:Math.random()*.22+.05
  }));
  let pmx=0,pmy=0;
  document.addEventListener('mousemove',e=>{pmx=e.clientX;pmy=e.clientY;},{passive:true});
  (function draw(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0)d.x=W; if(d.x>W)d.x=0;
      if(d.y<0)d.y=H; if(d.y>H)d.y=0;
    });
    const MAX=130;
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<MAX){
          ctx.beginPath();
          ctx.moveTo(dots[i].x,dots[i].y);
          ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle=`rgba(${PINK},${ (1-dist/MAX)*.07 })`;
          ctx.lineWidth=.8; ctx.stroke();
        }
      }
    }
    // Mouse glow
    const g=ctx.createRadialGradient(pmx,pmy,0,pmx,pmy,200);
    g.addColorStop(0,'rgba(255,0,127,.05)'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    dots.forEach(d=>{
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${PINK},${d.o})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

// ── ACTIVE NAV ──
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('#desktop-nav a[href^="#"]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-130) cur=s.id;});
  navLinks.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'white':'';});
},{passive:true});

// ── CARD TILT ──
document.querySelectorAll('.svc,.impact-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-4px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});

// ── GOTO CONTACT (from service cards) ──
function goToContact(service){
  window.location.href=`contact.html?service=${encodeURIComponent(service)}`;
}

// ── OPEN LINK ──
function openLink(url){ window.open(url,'_blank'); }
