const portfolioVideos=[...document.querySelectorAll('.project video')];
portfolioVideos.forEach(video=>{
 video.addEventListener('play',()=>portfolioVideos.forEach(other=>{if(other!==video)other.pause();}));
 video.addEventListener('loadedmetadata',()=>{if(video.videoWidth&&video.videoHeight)video.style.aspectRatio=`${video.videoWidth} / ${video.videoHeight}`;});
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{portfolioVideos.forEach(video=>{if(button.dataset.filter!=='all'&&video.closest('.project').dataset.category!==button.dataset.filter)video.pause();});}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)portfolioVideos.forEach(video=>video.pause());});
