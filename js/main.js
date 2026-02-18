/* ============================================
   SwiftGrades - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === HEADER SCROLL ===
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    // Trigger on load
    if (window.scrollY > 20) header.classList.add('scrolled');
  }

  // === MOBILE MENU ===
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }

  // === SCROLL TO TOP ===
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === FADE-UP ANIMATION ON SCROLL ===
  const fadeElements = document.querySelectorAll('.fade-up, .fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Stagger children if parent has data-stagger
          const stagger = entry.target.getAttribute('data-stagger');
          if (stagger) {
            const children = entry.target.querySelectorAll('.fade-up, .fade-in');
            children.forEach(function(child, index) {
              setTimeout(function() {
                child.classList.add('visible');
              }, index * 150);
            });
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // === COUNT UP ANIMATION ===
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  if (statValues.length > 0) {
    const countObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(function() {
            start += increment;
            if (start >= end) {
              el.textContent = end.toLocaleString('pt-BR') + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(start).toLocaleString('pt-BR') + suffix;
            }
          }, 16);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statValues.forEach(function(el) {
      countObserver.observe(el);
    });
  }

  // === CONTACT FORM ===
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = 'Mensagem Enviada!';
        btn.style.background = '#2A8C82';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === INNER PAGE HEADER (always scrolled style) ===
  const isInnerPage = !document.querySelector('.hero');
  if (isInnerPage && header) {
    header.classList.add('scrolled');
  }

});
