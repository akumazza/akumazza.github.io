document.getElementById('year').textContent=new Date().getFullYear();
// Progressive enhancement: content stays readable without JavaScript or motion.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems=[...document.querySelectorAll('.section-head,.filters,.project,.work-note,.about>div,.timeline article,.profile>.eyebrow,.profile>h2,.profile-bottom')];
let revealObserver;
function setupReveals(){
  if(revealObserver)revealObserver.disconnect();
  if(motionPreference.matches||!('IntersectionObserver' in window)){
    revealItems.forEach(item=>item.classList.remove('reveal','is-visible'));
    return;
  }
  revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
    });
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  revealItems.forEach(item=>{
    const rect=item.getBoundingClientRect();
    item.classList.add('reveal');
    if(rect.top<innerHeight&&rect.bottom>0){item.classList.add('is-visible');}
    else if(rect.bottom<=0){item.classList.add('is-visible');}
    else{revealObserver.observe(item);}
  });
}
setupReveals();
motionPreference.addEventListener('change',setupReveals);
document.addEventListener('focusin',event=>{const parent=event.target.closest('.reveal');if(parent)parent.classList.add('is-visible');});
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const heroSculpture=document.querySelector('.sculpture');
let scrollScheduled=false;
function updateScroll(){
  const range=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${range>0?Math.min(1,scrollY/range):0})`;
  if(heroSculpture)heroSculpture.style.translate=motionPreference.matches?'0 0':`0 ${Math.min(scrollY,900)*0.065}px`;
  scrollScheduled=false;
}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
window.addEventListener('resize',updateScroll);updateScroll();
const sectionLinks=[...document.querySelectorAll('nav a')];
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){sectionLinks.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('is-current',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});
  document.querySelectorAll('#home,#work,#about,#experience,#profile').forEach(section=>sectionObserver.observe(section));
}
const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project').forEach(card=>{
  let pointerFrame=0;
  card.addEventListener('pointermove',event=>{
    if(!finePointer.matches||motionPreference.matches)return;
    cancelAnimationFrame(pointerFrame);
    const x=event.clientX,y=event.clientY;
    pointerFrame=requestAnimationFrame(()=>{const rect=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${(0.5-(y-rect.top)/rect.height)*3}deg`);card.style.setProperty('--tilt-y',`${((x-rect.left)/rect.width-0.5)*4}deg`);});
  });
  card.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});document.querySelectorAll('.project').forEach(project=>{project.hidden=button.dataset.filter!=='all'&&project.dataset.category!==button.dataset.filter;});}));
const detail=document.getElementById('detail');document.querySelectorAll('.project[data-title]').forEach(project=>project.addEventListener('click',()=>{document.getElementById('detail-title').textContent=project.dataset.title;document.getElementById('detail-description').textContent=project.dataset.description;detail.showModal();}));document.querySelector('.close').addEventListener('click',()=>detail.close());detail.addEventListener('click',event=>{if(event.target===detail){const r=detail.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)detail.close();}});
document.getElementById('download').addEventListener('click',()=>{const text='裴小勇｜视觉与 3D 设计师\n\n教育背景\n安徽工程大学｜视觉传达设计｜2018—2022\n\n工作经历\n2024.11—至今｜3D 设计师\n产品建模渲染、产品动画制作、海报、AI 内容产出\n\n2023.12—2024.11｜苏州凯尚服饰｜美工\n详情页、海报设计\n\n2022.06—2023.12｜南京世纪驰宇有限公司｜设计师（实习）\n详情页制作\n';const url=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='裴小勇-个人简介.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
