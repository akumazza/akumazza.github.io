const architectureViews={render:{src:'architecture-render.png',title:'最终渲染',alt:'水畔住宅夜景：玻璃建筑、车辆与水面倒影',caption:'最终渲染 · 作者提供的原始作品'},clay:{src:'architecture-clay.png',title:'白模图',alt:'水畔住宅白模图，展现建筑、车辆及环境的灰白体块关系',caption:'白模图 · AI 基于最终渲染辅助还原'},sketch:{src:'architecture-design-draft.png',title:'设计稿',alt:'水畔住宅概念设计稿，包含建筑透视线稿、体块拆解与局部构造示意',caption:'设计稿 · AI 基于最终渲染辅助还原'}};
let currentArchitectureView='render';
const architectureImage=document.getElementById('architecture-image');
const architectureViewer=document.getElementById('image-viewer');
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 currentArchitectureView=button.dataset.view;const view=architectureViews[currentArchitectureView];
 architectureImage.src=view.src;architectureImage.alt=view.alt;
 document.getElementById('architecture-caption').textContent=view.caption;
 document.getElementById('architecture-open').setAttribute('aria-label','放大查看'+view.title);
 document.querySelectorAll('[data-view]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
}));
document.getElementById('architecture-open').addEventListener('click',()=>{const view=architectureViews[currentArchitectureView];const image=document.getElementById('viewer-image');image.src=view.src;image.alt=view.alt;document.getElementById('viewer-caption').textContent=view.caption;architectureViewer.showModal();});
architectureViewer.querySelector('.viewer-close').addEventListener('click',()=>architectureViewer.close());
architectureViewer.addEventListener('click',event=>{if(event.target===architectureViewer){const rect=architectureViewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)architectureViewer.close();}});
