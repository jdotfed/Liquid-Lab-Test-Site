(() => {
  const menu=document.querySelector('.ll-menu-toggle');
  const nav=document.getElementById('mainNav');
  if(menu&&nav){
    function close(){nav.classList.remove('ll-nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('ll-nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
  // On small screens, expanding one card keeps the list manageable.
  const panels=[...document.querySelectorAll('.ll-product-options')];
  for(const panel of panels)panel.addEventListener('toggle',()=>{
    if(panel.open&&window.matchMedia('(max-width:560px)').matches){
      for(const other of panels)if(other!==panel)other.open=false;
    }
  });
  document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
    for(const b of document.querySelectorAll('.filter'))b.setAttribute('aria-pressed',String(b===button));
    document.querySelectorAll('.ll-product-options').forEach(p=>{if(p.closest('.product-card').classList.contains('hidden'))p.open=false;});
  }));
  // The BO3 tab is the selected design from the approved reference.
  document.querySelector('.filter[data-filter="bo3"]')?.click();
})();
