const renderFolds=[...document.querySelectorAll('.render-fold')];
function openRenderFold(index){
 renderFolds.forEach((fold,i)=>{const open=i===index;fold.classList.toggle('is-open',open);fold.querySelector('.fold-toggle').setAttribute('aria-expanded',String(open));fold.querySelector('.fold-content').inert=!open;});
 const name=renderFolds[index].querySelector('.fold-name').textContent;
 document.getElementById('render-position').textContent=`${String(index+1).padStart(2,'0')} / 03 · ${name}`;
}
renderFolds.forEach((fold,index)=>{
 const toggle=fold.querySelector('.fold-toggle');
 toggle.addEventListener('click',()=>openRenderFold(index));
 toggle.addEventListener('keydown',event=>{let target=index;if(['ArrowRight','ArrowDown'].includes(event.key))target=(index+1)%renderFolds.length;else if(['ArrowLeft','ArrowUp'].includes(event.key))target=(index+renderFolds.length-1)%renderFolds.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=renderFolds.length-1;else return;event.preventDefault();openRenderFold(target);renderFolds[target].querySelector('.fold-toggle').focus();});
});
document.querySelectorAll('.render-zoom').forEach(button=>button.addEventListener('click',()=>{
 const viewer=document.getElementById('image-viewer');const image=document.getElementById('viewer-image');image.src=button.dataset.render;image.alt=button.dataset.label+'建模渲染';document.getElementById('viewer-caption').textContent=button.dataset.label+' · 裴小勇 / 建模渲染';viewer.setAttribute('aria-label','建模渲染大图');viewer.showModal();
}));
