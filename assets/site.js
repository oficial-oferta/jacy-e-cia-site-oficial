document.addEventListener("DOMContentLoaded",()=>{const stickyNav=document.querySelector(".nav");if(stickyNav){let queued=false;const syncNav=()=>{stickyNav.classList.toggle("is-scrolled",window.scrollY>20);queued=false};syncNav();window.addEventListener("scroll",()=>{if(!queued){queued=true;requestAnimationFrame(syncNav)}},{passive:true})}const menu=document.querySelector(".menu"),nav=document.querySelector("#navlinks");if(menu&&nav){const close=()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Abrir menu");menu.textContent="☰"};menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");menu.textContent=open?"✕":"☰"});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();nav.querySelectorAll("details").forEach(d=>d.open=false)}});document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))nav.querySelectorAll("details").forEach(d=>d.open=false)})}const track=document.querySelector(".work-track"),prev=document.querySelector(".gallery-prev"),next=document.querySelector(".gallery-next");if(track&&prev&&next){const move=dir=>track.scrollBy({left:dir*track.clientWidth*.78,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});prev.addEventListener("click",()=>move(-1));next.addEventListener("click",()=>move(1))}if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const targets=document.querySelectorAll(".lux-heading-row,.experience-card,.experience-text-card,.therapy-luxe-copy,.therapy-luxe-visual,.work-heading,.bridal-visual,.bridal-copy,.salon-copy,.salon-image,.page-hero-inner,.interior-editorial-grid,.related-services,.category-list");targets.forEach((el,i)=>{el.classList.add("reveal");if(i%3===1)el.classList.add("reveal-delay");if(i%3===2)el.classList.add("reveal-delay-2")});document.body.classList.add("js-motion");const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{rootMargin:"0px 0px 70px 0px",threshold:.06});targets.forEach(el=>observer.observe(el))}});

document.addEventListener("DOMContentLoaded",()=>{
  const frame=document.querySelector(".hero-portrait-frame");
  if(!frame)return;
  const slides=[...frame.querySelectorAll(".hero-slide")];
  const media=document.querySelector(".hero-luxe-media");
  if(slides.length<2||!media)return;
  const count=media.querySelector("[data-hero-count]");
  const caption=media.querySelector("[data-hero-caption]");
  const previous=media.querySelector("[data-hero-prev]");
  const next=media.querySelector("[data-hero-next]");
  const toggle=media.querySelector("[data-hero-toggle]");
  const labels=["Mechas e luzes","Progressiva","Terapia capilar","Dia da noiva"];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer=window.matchMedia("(hover: hover) and (pointer: fine)");
  let current=0,interval=null,hoverPaused=false,userPaused=reduced.matches;

  function show(value){
    current=(value+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===current;
      slide.classList.toggle("is-active",active);
      slide.setAttribute("aria-hidden",String(!active));
    });
    if(count)count.textContent=String(current+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    if(caption)caption.textContent=labels[current]||"Jacy & Cia";
  }
  function stop(){
    if(interval!==null){window.clearInterval(interval);interval=null}
  }
  function start(){
    stop();
    if(!userPaused&&!hoverPaused&&!document.hidden){
      interval=window.setInterval(()=>show(current+1),4200);
    }
  }
  function syncToggle(){
    if(!toggle)return;
    toggle.setAttribute("aria-pressed",String(userPaused));
    toggle.setAttribute("aria-label",userPaused?"Retomar troca automática":"Pausar troca automática");
    toggle.setAttribute("title",userPaused?"Retomar fotos":"Pausar fotos");
    toggle.textContent=userPaused?"▶":"Ⅱ";
  }
  if(previous)previous.addEventListener("click",()=>{show(current-1);start()});
  if(next)next.addEventListener("click",()=>{show(current+1);start()});
  if(toggle)toggle.addEventListener("click",()=>{userPaused=!userPaused;syncToggle();start()});
  // Evita que o toque no iPhone deixe o carrossel travado em estado de hover/foco.
  media.addEventListener("mouseenter",()=>{
    if(finePointer.matches){hoverPaused=true;stop()}
  });
  media.addEventListener("mouseleave",()=>{hoverPaused=false;start()});
  document.addEventListener("visibilitychange",start);
  if(reduced.addEventListener){
    reduced.addEventListener("change",()=>{userPaused=reduced.matches;syncToggle();start()});
  }
  show(0);
  syncToggle();
  start();
});
