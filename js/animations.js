// GSAP animations for your portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate header on page load
  gsap.from('header', {
    y: -50,
    opacity: 0.5,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Animate hero section with subtle effects
  gsap.from('.hero-content h1, .hero-content p, .hero-content .cta-button', {
    y: 20,
    opacity: 0.8,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  });
  
  // Subtle animation for profile photo
  gsap.from('.profile-photo', {
    scale: 0.95,
    opacity: 0.8,
    duration: 1,
    ease: 'power2.out'
  });
  
  // Animate projects filter buttons
  ScrollTrigger.create({
    trigger: '.projects-filter',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.filter-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    once: true
  });
  
  // Animate sections on scroll
  document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleClass: "visible",
        once: true
      }
    });
  });
  
  // Animate Vue.js skills bars
  ScrollTrigger.create({
    trigger: '#vue-demo',
    start: 'top center',
    onEnter: () => {
      // First animate the skill names
      gsap.from('.skill-name', {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      });
      
      // Then animate the XP values
      gsap.from('.skill-percentage', {
        x: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.3,
        ease: 'power2.out'
      });
      
      // Finally animate the progress bars
      gsap.from('.progress', {
        width: 0,
        duration: 1.5,
        stagger: 0.05,
        delay: 0.5,
        ease: 'power2.out'
      });
    },
    once: true
  });
  
  // Animate contact form elements
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top center',
    onEnter: () => {
      gsap.from('#contact-form input, #contact-form textarea, #contact-form button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    once: true
  });

  // Animate hero section on load
  gsap.from('.hero-content', {
    opacity: 0,
    y: 30,
    duration: 1.5,
    ease: "power3.out"
  });

  // Animate profile photo
  gsap.to('.profile-photo', {
    rotationY: 5,
    rotationX: 5,
    duration: 2,
    ease: "none",
    scrollTrigger: {
      trigger: '.profile-photo',
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });

  // Gentle animation for project cards
  ScrollTrigger.batch('.project-item', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    start: "top 85%"
  });

  // Subtle animation for tech stack
  gsap.from('.tech-tag', {
    y: 10,
    opacity: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.tech-stack',
      start: "top 80%"
    }
  });

  // Subtle parallax effect for hero section
  gsap.to('.hero', {
    backgroundPosition: "50% 55%",
    ease: "none",
    scrollTrigger: {
      trigger: '.hero',
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Mouse move effect for cards
  document.querySelectorAll('.certification-card, .project-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 10;
      const yPercent = (y / rect.height - 0.5) * 10;
      
      gsap.to(card, {
        rotationY: xPercent,
        rotationX: -yPercent,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
}); 