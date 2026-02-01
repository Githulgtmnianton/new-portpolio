// ===================================
// MODERN PORTFOLIO JAVASCRIPT
// Designer: Anton Pananggilan
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  
  // === NAVIGATION ===
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect for navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(10px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    });
  });
  
  // === SMOOTH SCROLLING ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === ACTIVE NAVIGATION LINK ===
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  };
  
  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Call once on load
  
  // === INTERSECTION OBSERVER FOR ANIMATIONS ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger skill bar animations
        if (entry.target.classList.contains('skill-bar-wrapper')) {
          const skillFill = entry.target.querySelector('.skill-fill');
          const percent = skillFill.getAttribute('data-percent');
          if (skillFill && percent) {
            setTimeout(() => {
              skillFill.style.setProperty('--skill-width', percent + '%');
              skillFill.style.width = percent + '%';
            }, 100);
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.design-card, .web-card, .embedded-card, .about-content, .skill-bar-wrapper, .contact-wrapper');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // === SKILL BARS ANIMATION ===
  const skillBars = document.querySelectorAll('.skill-bar-wrapper');
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
  
  // === FORM SUBMISSION ===
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Here you would normally send the data to a server
      // For now, we'll just show a success message
      
      const submitBtn = contactForm.querySelector('.btn-primary');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
  
  // === PARALLAX EFFECT ===
  const heroImage = document.querySelector('.hero-image-wrapper');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }
  
  // === CURSOR EFFECT (Optional - Desktop only) ===
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0, 217, 255, 0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease, border-color 0.2s ease;
      display: none;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.display = 'block';
    });
    
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .design-card, .web-card, .embedded-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'rgba(0, 217, 255, 1)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(0, 217, 255, 0.5)';
      });
    });
  }
  
  // === LAZY LOADING IMAGES ===
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
  }
  
  // === TYPING EFFECT (Optional for hero) ===
  const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    type();
  };
  
  // === SCROLL TO TOP ===
  const scrollToTop = document.querySelector('.footer-links a[href="#home"]');
  if (scrollToTop) {
    scrollToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // === PERFORMANCE OPTIMIZATION ===
  // Debounce function for scroll events
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Use debounced scroll for non-critical updates
  const debouncedScroll = debounce(() => {
    // Any non-critical scroll operations
  }, 100);
  
  window.addEventListener('scroll', debouncedScroll);
  
  // === EASTER EGG (Optional fun feature) ===
  let clickCount = 0;
  const logo = document.querySelector('.nav-logo');
  
  if (logo) {
    logo.addEventListener('click', () => {
      clickCount++;
      
      if (clickCount === 5) {
        // Add a fun animation or effect
        document.body.style.animation = 'hueRotate 2s linear';
        
        setTimeout(() => {
          document.body.style.animation = '';
          clickCount = 0;
        }, 2000);
      }
    });
  }
  
  // Add the hue rotate animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes hueRotate {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // === CONSOLE MESSAGE ===
  console.log(
    '%c👋 Hello there! ',
    'background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%); color: #0A0E27; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
  );
  console.log(
    '%cLooking to hire? Let\'s connect! 🚀',
    'color: #00D9FF; font-size: 14px; font-weight: 600;'
  );
  
});

// === PRELOADER (Optional) ===
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});