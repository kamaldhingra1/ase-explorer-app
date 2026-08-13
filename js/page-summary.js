
function setupPageSummaries(){
  document.querySelectorAll('[data-summary-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const card=btn.closest('.summary-card');
      if(!card) return;
      card.classList.toggle('open');
      btn.textContent = card.classList.contains('open') ? 'Hide Summary' : 'Summarize This Page';
    });
  });
}
document.addEventListener('DOMContentLoaded',setupPageSummaries);
