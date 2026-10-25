document.addEventListener("DOMContentLoaded",()=>{const stickyNav=document.querySelector(".nav");if(stickyNav){let queued=false;const syncNav=()=>{stickyNav.classList.toggle("is-scrolled",window.scrollY>20);queued=false};syncNav();window.addEventListener("scroll",()=>{if(!queued){queued=true;requestAnimationFrame(syncNav)}},{passive:true})}const menu=document.querySelector(".menu"),nav=document.querySelector("#navlinks");if(menu&&nav){const close=()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Abrir menu");menu.textContent="☰"};menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");menu.textContent=open?"✕":"☰"});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();nav.querySelectorAll("details").forEach(d=>d.open=false)}});document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))nav.querySelectorAll("details").forEach(d=>d.open=false)})}const track=document.querySelector(".work-track"),prev=document.querySelector(".gallery-prev"),next=document.querySelector(".gallery-next");if(track&&prev&&next){const move=dir=>track.scrollBy({left:dir*track.clientWidth*.78,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});prev.addEventListener("click",()=>move(-1));next.addEventListener("click",()=>move(1))}if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const targets=document.querySelectorAll(".lux-heading-row,.experience-card,.experience-text-card,.therapy-luxe-copy,.therapy-luxe-visual,.work-heading,.bridal-visual,.bridal-copy,.salon-copy,.salon-image,.page-hero-inner,.interior-editorial-grid,.related-services,.category-list");targets.forEach((el,i)=>{el.classList.add("reveal");if(i%3===1)el.classList.add("reveal-delay");if(i%3===2)el.classList.add("reveal-delay-2")});document.body.classList.add("js-motion");const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{rootMargin:"0px 0px 70px 0px",threshold:.06});targets.forEach(el=>observer.observe(el))}});

document.addEventListener("DOMContentLoaded",()=>{
  const frame=document.querySelector(".hero-portrait-frame");
  const slides=frame?[...frame.querySelectorAll(".hero-slide")]:[];
  if(slides.length<2)return;
  const media=document.querySelector(".hero-luxe-media");
  const count=media.querySelector("[data-hero-count]");
  const caption=media.querySelector("[data-hero-caption]");
  const names=["Mechas e luzes","Progressiva","Terapia capilar","Dia da noiva"];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  let index=0,timer=null,paused=false;
  function show(next){
    index=(next+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===index;
      slide.classList.toggle("is-active",active);
      slide.setAttribute("aria-hidden",String(!active));
    });
    count.textContent=String(index+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    caption.textContent=names[index]||"Jacy & Cia";
  }
  function stop(){if(timer){window.clearInterval(timer);timer=null}}
  function start(){stop();if(!paused&&!reduced.matches&&!document.hidden)timer=window.setInterval(()=>show(index+1),5200)}
  media.querySelector("[data-hero-prev]").addEventListener("click",()=>{show(index-1);start()});
  media.querySelector("[data-hero-next]").addEventListener("click",()=>{show(index+1);start()});
  media.addEventListener("mouseenter",()=>{paused=true;stop()});
  media.addEventListener("mouseleave",()=>{paused=false;start()});
  media.addEventListener("focusin",()=>{paused=true;stop()});
  media.addEventListener("focusout",()=>{if(!media.contains(document.activeElement)){paused=false;start()}});
  document.addEventListener("visibilitychange",start);
  if(reduced.addEventListener)reduced.addEventListener("change",start);
  show(0);start();
});
