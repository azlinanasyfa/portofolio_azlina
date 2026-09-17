/**
 * Azlina Nasyifa Portfolio — Interactive Logic
 * File: script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Detailed Project Data for Quick View Modal ---
  const projectData = {
    1: {
      title: 'AURA BOTANICALS',
      category: 'Branding & Packaging',
      client: 'Aura Botanicals • Paris, France',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      overview: 'Aura Botanicals is a luxury, organic skincare maison rooted in clean French phytotherapy. They sought a total brand relaunch to enter high-end department stores in Paris, Tokyo, and New York.',
      challenge: 'The legacy visual identity felt too clinical and indistinguishable from generic apothecary lines, failing to communicate the sensory indulgence and high scientific potency of their wild-harvested botanical formulas.',
      solution: 'We engineered an elevated identity featuring bespoke high-contrast serif typography, tactile embossing on recycled FSC-certified pulp boxes, and emerald-frosted glass bottles with subtle gold-leaf silkscreening. The new visual world exudes modern organic luxury with warmth.',
      impact: '140% surge in European retail distributor orders within 90 days; featured on Vogue France and Wallpaper* Magazine.'
    },
    2: {
      title: 'LUMINA PAY FINTECH',
      category: 'UI/UX & Design System',
      client: 'Lumina Technologies • Singapore',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
      overview: 'Lumina Pay is a Southeast Asian cross-border payment and multi-currency wealth platform serving over 400,000 digital-native entrepreneurs and remote professionals.',
      challenge: 'Complex multi-currency FX tables and fragmented user onboarding caused a 34% drop-off at the KYC (Know Your Customer) and currency conversion stages.',
      solution: 'Architected a modular token-based design system in Figma called "Aether", streamlined the 5-step verification process into a continuous progressive disclosure flow, and designed custom interactive charts with haptic-inspired visual feedback.',
      impact: 'KYC completion improved by 62%; daily active mobile transactions doubled within the first quarter following the overhaul.'
    },
    3: {
      title: 'VELVET & VINE WINERY',
      category: 'Packaging & Print Craft',
      client: 'Velvet & Vine • Napa Valley, California',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85',
      overview: 'Velvet & Vine produces small-batch, biodynamic estate wines nestled in the hills of northern California. Each vintage is an ode to regenerative viticulture.',
      challenge: 'How to communicate the tactile grit of volcanic soil and artisanal low-intervention winemaking in a retail landscape saturated with traditional conservative crests.',
      solution: 'Created bespoke woodcut-inspired botanical illustrations paired with multi-level debossing and copper foil hot-stamping on heavy textured cotton paper. The unboxing collection includes custom dyed wax seals and numbered neck-tags.',
      impact: 'Private cellar reserve sold out 4 weeks prior to harvest release; won Gold at the 2024 Global Wine Packaging Awards.'
    },
    4: {
      title: 'KINETIC TYPE LAB',
      category: 'Experimental Typography',
      client: 'Independent Foundry • Global',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
      overview: 'An experimental variable display typeface exploring the intersection of fluid geometry, variable axis morphing, and contemporary editorial voice.',
      challenge: 'Bridging the gap between strict optical readability in print and dynamic typographic responsiveness in browser-based interactive design.',
      solution: 'Hand-crafted 480 glyphs across weight, optical size, and slant axes. Developed a custom interactive microsite allowing creative directors to test font interpolation via real-time audio input and cursor velocity.',
      impact: 'Downloaded by over 12,000 designers globally; licensed by leading music streaming and editorial lifestyle brands.'
    },
    5: {
      title: 'NEONOVA STUDIOS',
      category: 'Brand Identity & Motion',
      client: 'NeoNova Interactive • Tokyo, Japan',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
      overview: 'A high-energy game development studio known for hyper-stylized action RPGs and narrative cyberpunk worlds.',
      challenge: 'Their existing identity was fragmented across disparate game titles without a memorable, unified studio signature that appealed to both Western and Asian gaming communities.',
      solution: 'Crafted a kinetic symbol inspired by holographic prisms, custom bi-lingual logotypes (Latin and Katakana), and an exhaustive 3D brand motion kit for game launch bumpers, twitch streams, and esports tournaments.',
      impact: 'Announced at Tokyo Game Show with an organic 3.2M impressions; praised by IGN and Famitsu for visual freshness.'
    },
    6: {
      title: 'SAVOR ORGANIC MARKET',
      category: 'E-Commerce UI/UX',
      client: 'Savor Marketplace • Melbourne, Australia',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
      overview: 'A farm-to-table digital marketplace connecting ethical Victorian growers directly with conscious urban home cooks for same-day delivery.',
      challenge: 'Users felt intimidated by seasonal harvest fluctuations, variable weighted produce pricing, and clunky checkout steps.',
      solution: 'Re-imagined the grocery shopping mental model into seasonal flavor curations, recipe bundles with one-tap basket population, and dynamic delivery countdown clocks tailored to neighborhood harvest cycles.',
      impact: 'Average order value increased by 38%; weekly recurring subscription boxes grew by 85%.'
    }
  };

  // --- Elements & Selectors ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const prevTestimonialBtn = document.getElementById('prevTestimonial');
  const nextTestimonialBtn = document.getElementById('nextTestimonial');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const sliderDots = document.querySelectorAll('.dot');
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // --- Mobile Navigation Menu ---
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('is-open');
      navLinks.classList.toggle('mobile-active');
    });

    // Close menu when clicking nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-active');
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-active');
      }
    });
  }

  // --- Active Nav Link on Scroll (IntersectionObserver) ---
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // --- Portfolio Filter Functionality ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
          // Add smooth fade-in
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // --- Project Modal Popup ---
  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
      <div class="modal-meta">
        <span>${data.client}</span>
        <span>•</span>
        <span>${data.year}</span>
        <span>•</span>
        <span>${data.category}</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      
      <h3 class="modal-section-title">THE PROJECT BRIEF</h3>
      <p class="body-text">${data.overview}</p>

      <h3 class="modal-section-title">THE STRATEGIC CHALLENGE</h3>
      <p class="body-text">${data.challenge}</p>

      <h3 class="modal-section-title">THE CREATIVE EXECUTION</h3>
      <p class="body-text">${data.solution}</p>

      <div style="background: #fffde6; border: 1px solid #ffd905; border-radius: 16px; padding: 20px; margin-top: 24px;">
        <h4 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 6px;">MEASURED BUSINESS IMPACT</h4>
        <p style="font-size: 15px; font-weight: 600; color: #000000; margin: 0;">${data.impact}</p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="#contact" class="btn-filled-2" onclick="document.getElementById('projectModal').classList.remove('is-visible')">
          INQUIRE ABOUT A SIMILAR PROJECT ↗
        </a>
      </div>
    `;

    projectModal.classList.add('is-visible');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('is-visible');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --- Testimonials Carousel Slider ---
  let currentSlide = 0;
  let testimonialInterval = null;

  const showSlide = (index) => {
    if (testimonialSlides.length === 0) return;
    testimonialSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % testimonialSlides.length;
    showSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(prev);
  };

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(slideIndex);
      resetInterval();
    });
  });

  const startAutoSlide = () => {
    testimonialInterval = setInterval(nextSlide, 7000);
  };

  const resetInterval = () => {
    clearInterval(testimonialInterval);
    startAutoSlide();
  };

  const sliderTrack = document.getElementById('testimonialSlider');
  if (sliderTrack) {
    sliderTrack.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    sliderTrack.addEventListener('mouseleave', () => startAutoSlide());
  }

  startAutoSlide();

  // --- Toast Notification Helper ---
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // --- Copy Email to Clipboard ---
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Email copied: ${email} 📋`);
      } catch (err) {
        // Fallback for non-secure contexts
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Email copied: ${email} 📋`);
      }
    });
  }

  // --- Interactive Contact Form Validation & Submission ---
  if (contactForm) {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please provide your name.';
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please provide your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please share a brief note about your project.';
        isValid = false;
      }

      if (!isValid) return;

      // Simulated sending state
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'TRANSMITTING INQUIRY... ✦';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        contactForm.reset();

        showToast('Thank you! Your inquiry has been sent to Azlina ✨');
      }, 1200);
    });

    // Real-time error clear on input
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        const errorSpan = document.getElementById(`${input.id.replace('user', '').toLowerCase()}Error`);
        if (errorSpan) errorSpan.textContent = '';
      });
    });
  }

  // --- Global Keyboard Accessibility ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-visible')) {
      closeProjectModal();
    }
  });
});
