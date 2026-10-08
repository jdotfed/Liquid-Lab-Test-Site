/* Design preview on a test repo; existing integrations on the live domain. */
(() => {
  const productionHosts=new Set(['liquidlab.shop','www.liquidlab.shop']);
  const isPreview=!productionHosts.has(location.hostname);
  window.LIQUID_LAB_SITE_MODE=Object.freeze({isPreview});
  if(!isPreview)return;
  document.addEventListener('DOMContentLoaded',()=>{
    const bar=document.createElement('aside');bar.className='ll-preview-bar';
    bar.innerHTML='<span>DESIGN PREVIEW</span><p>Try the options and cart. Checkout opens a preview.</p>';
    const header=document.querySelector('header');if(header)header.after(bar);else document.body.prepend(bar);
    const dialog=document.createElement('dialog');dialog.className='ll-preview-dialog';dialog.setAttribute('aria-label','Design preview');
    dialog.innerHTML='<div class="ll-preview-dialog-head"><strong>Liquid Lab · Design Preview</strong><button type="button" aria-label="Close preview">×</button></div><div class="ll-preview-dialog-body"><h2></h2><p></p><div class="ll-preview-order"></div><button class="ll-preview-dismiss" type="button">Keep browsing</button></div>';
    document.body.append(dialog);
    dialog.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>dialog.close()));
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    function show(title,copy,order){dialog.querySelector('h2').textContent=title;dialog.querySelector('.ll-preview-dialog-body>p').textContent=copy;dialog.querySelector('.ll-preview-order').textContent=order||'';dialog.showModal();}
    document.addEventListener('click',event=>{
      const target=event.target.closest('a,button');if(!target)return;
      const stripe=/^https:\/\/buy\.stripe\.com\//.test(target.getAttribute('href')||'');
      const cart=target.id==='cartCheckout';
      const connect=target.id==='discordConnect';
      if(!stripe&&!cart&&!connect)return;
      event.preventDefault();event.stopImmediatePropagation();
      if(connect){show('Discord connection','Discord linking is available on the live store. This test site lets you try the design as a guest.');return;}
      if(cart){
        const rows=[...document.querySelectorAll('.ll-cart-row')];
        if(!rows.length){show('Your cart is empty','Add a service to try the cart preview.');return;}
        show('Your checkout preview','Your selected services and total are ready. This preview does not create a payment.',rows.map(r=>r.innerText.replace(/\n+/g,' · ')).join('\n')+'\n\nTotal: '+document.getElementById('cartTotal').textContent);return;
      }
      const card=target.closest('.product-card'),option=card?.querySelector('select')?.selectedOptions[0];
      show('Your checkout preview','This is how your selection carries into checkout. Payments are available on the live store.',[card?.querySelector('h3')?.textContent,option?.textContent,card?.querySelector('.price strong')?.textContent].filter(Boolean).join('\n'));
    },true);
    document.addEventListener('submit',event=>{
      if(!document.querySelector('.admin-shell'))return;
      event.preventDefault();event.stopImmediatePropagation();
      show('Admin access','The admin files are included. Sign in on the live domain to manage the real store; this repository is a design preview.');
    },true);
  });
})();
