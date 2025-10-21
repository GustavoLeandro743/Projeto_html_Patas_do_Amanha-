// lightbox.js - lightbox simples para galeria
(function () {
  document.addEventListener('click', function (e) {
    const target = e.target;
    // abrir lightbox ao clicar em miniatura
    if (target.matches('.item-galeria')) {
      const src = target.getAttribute('src');
      const alt = target.getAttribute('alt') || '';
      openLightbox(src, alt);
    }
    // fechar quando clicar em elemento com data-close
    if (target.matches('[data-close]') || target.closest('[data-close]')) {
      closeLightbox();
    }
  });

  function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    const img = lb.querySelector('.lightbox__img');
    img.src = src;
    img.alt = alt;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevenir scroll por baixo do modal
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const img = lb.querySelector('.lightbox__img');
    img.src = '';
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // fechar com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();