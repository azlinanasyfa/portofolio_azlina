/**
 * Azlina Nasyifa Portfolio — "KEEP GROWING."
 * Interactive Scrapbook, Journal & Creative Growth Engine
 * File: script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 01. AUDIO SYNTHESIZER (Web Audio API - No External Files Needed)
  // ==========================================================================
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSoftChime(freq = 520, duration = 0.25) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback fails gracefully if blocked
    }
  }

  // ==========================================================================
  // 02. CUSTOM CURSOR & FOLLOWER (Desktop Only)
  // ==========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  let isHoveringInteractive = false;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer && cursorDot && cursorFollower) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth follower animation using lerp in requestAnimationFrame
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    }
    requestAnimationFrame(animateFollower);

    // Hover detection for buttons, links, cards
    const interactiveSelectors = 'a, button, input, textarea, select, label, .trait-card, .polaroid-card, .open-book-card';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        isHoveringInteractive = true;
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        isHoveringInteractive = false;
      });
    });
  }

  // ==========================================================================
  // 03. MAGNETIC BUTTONS INTERACTION
  // ==========================================================================
  if (isFinePointer) {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - btnCenterX) * 0.28;
        const distanceY = (e.clientY - btnCenterY) * 0.28;

        btn.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ==========================================================================
  // 04. HERO PARALLAX ON MOUSE MOVE
  // ==========================================================================
  const heroCanvas = document.getElementById('heroCanvas');
  const parallaxElems = document.querySelectorAll('.parallax-elem');

  if (isFinePointer && heroCanvas && parallaxElems.length > 0) {
    heroCanvas.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      parallaxElems.forEach((elem) => {
        const speed = parseFloat(elem.dataset.speed || '0.05');
        const moveX = relX * speed;
        const moveY = relY * speed;
        elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    heroCanvas.addEventListener('mouseleave', () => {
      parallaxElems.forEach((elem) => {
        elem.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ==========================================================================
  // 05. MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('mobile-active', !isExpanded);
    });

    // Close menu upon clicking any nav link
    navLinkItems.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('mobile-active')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-active');
      }
    });
  }

  // Active Link Highlighting based on Scroll Position
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 06. SCROLL REVEAL (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((elem) => revealObserver.observe(elem));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach((elem) => elem.classList.add('revealed'));
  }

  // ==========================================================================
  // 07. SCROLL-DRIVEN GROWING BRANCH (SVG PATH)
  // ==========================================================================
  const journeySection = document.getElementById('journey');
  const journeyBranchPath = document.getElementById('journeyBranchPath');

  if (journeySection && journeyBranchPath) {
    const pathLength = journeyBranchPath.getTotalLength();
    journeyBranchPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    journeyBranchPath.style.strokeDashoffset = `${pathLength}`;

    function updateJourneyBranch() {
      const rect = journeySection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of journey section through viewport
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      const offset = pathLength * (1 - progress);
      journeyBranchPath.style.strokeDashoffset = `${offset}`;
    }

    window.addEventListener('scroll', updateJourneyBranch, { passive: true });
    updateJourneyBranch();
  }

  // ==========================================================================
  // 08. INTERACTIVE SCRAPBOOK STICKER & STAMP TOOL
  // ==========================================================================
  const toolbarToggle = document.getElementById('toolbarToggle');
  const toolbarDrawer = document.getElementById('toolbarDrawer');
  const stickerOptions = document.querySelectorAll('.sticker-option');
  const clearStampsBtn = document.getElementById('clearStampsBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  let activeSticker = 'leaf';
  let isDrawerOpen = false;
  let isStampModeActive = false;

  const stickerVisuals = {
    'leaf': '🌿',
    'star': '✦',
    'flower': '🌸',
    'stamp-grow': '🌱',
    'heart': '💛'
  };

  if (toolbarToggle && toolbarDrawer) {
    toolbarToggle.addEventListener('click', () => {
      isDrawerOpen = !isDrawerOpen;
      toolbarDrawer.hidden = !isDrawerOpen;
      isStampModeActive = isDrawerOpen;
      document.body.classList.toggle('cursor-stamping', isStampModeActive);
      initAudio();
    });

    stickerOptions.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        stickerOptions.forEach((opt) => opt.classList.remove('active'));
        btn.classList.add('active');
        activeSticker = btn.dataset.sticker;
        isStampModeActive = true;
        document.body.classList.add('cursor-stamping');
        playSoftChime(640, 0.15);
      });
    });

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          initAudio();
          soundToggleBtn.textContent = 'Suara: On 🔊';
          playSoftChime(880, 0.2);
        } else {
          soundToggleBtn.textContent = 'Suara: Off 🔇';
        }
      });
    }

    if (clearStampsBtn) {
      clearStampsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.user-placed-stamp').forEach((stamp) => stamp.remove());
        showToast('Semua stiker scrapbook telah dibersihkan! ✨');
        playSoftChime(440, 0.2);
      });
    }

    // Stamp placement on click anywhere on document body
    document.addEventListener('click', (e) => {
      if (!isStampModeActive) return;

      // Do not stamp if clicking inside the toolbar, nav bar, or inputs
      if (
        e.target.closest('#scrapbookToolbar') ||
        e.target.closest('#header') ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('input') ||
        e.target.closest('textarea')
      ) {
        return;
      }

      // Create new stamp element
      const stamp = document.createElement('div');
      stamp.className = 'user-placed-stamp';
      stamp.textContent = stickerVisuals[activeSticker] || '🌿';

      const randomRot = (Math.random() * 40 - 20).toFixed(1);
      const randomScale = (0.85 + Math.random() * 0.4).toFixed(2);
      stamp.style.setProperty('--rot', `${randomRot}deg`);
      stamp.style.fontSize = `${Math.round(28 * randomScale)}px`;

      stamp.style.left = `${e.pageX}px`;
      stamp.style.top = `${e.pageY}px`;

      document.body.appendChild(stamp);
      playSoftChime(580 + Math.random() * 200, 0.2);
    });
  }

  // ==========================================================================
  // 09. "BETTER THAN YESTERDAY" GROWTH METAPHOR STAGE SWITCHER
  // ==========================================================================
  const stageTabs = document.querySelectorAll('.stage-tab-btn');
  const stageIcon = document.getElementById('stageIcon');
  const stageTitle = document.getElementById('stageTitle');
  const stageBody = document.getElementById('stageBody');
  const stageMotto = document.getElementById('stageMotto');

  const growthStagesData = {
    1: {
      emoji: '🌱',
      title: 'Mulai dari Hal Kecil',
      body: 'Setiap pertumbuhan selalu berawal dari sebuah benih keingintahuan: berani memulai meski masih merasa belum tahu apa-apa.',
      motto: '“Growth begins with curiosity.”'
    },
    2: {
      emoji: '🌿',
      title: 'Tunas yang Belajar',
      body: 'Mencoba hal-hal baru di SMK jurusan RPL, aktif berorganisasi Adiwiyata, dan membiasakan diri untuk pantang menyerah saat menghadapi tantangan.',
      motto: '“Embrace the quiet struggle of learning.”'
    },
    3: {
      emoji: '🍃',
      title: 'Daun yang Membuka Diri',
      body: 'Berani menyuarakan gagasan lewat public speaking, membaca buku untuk memperluas cakrawala, dan menyadari bahwa kita bisa menjadi lebih baik setiap hari.',
      motto: '“Better than I was yesterday.”'
    },
    4: {
      emoji: '🌳',
      title: 'Ranting yang Kokoh',
      body: 'Pencapaian bukan tentang menjadi sempurna, melainkan terus bertumbuh, menjaga integritas, dan memberi manfaat bagi lingkungan sekitar.',
      motto: '“Keep growing — always.”'
    }
  };

  if (stageTabs.length > 0 && stageIcon && stageTitle) {
    stageTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const stageNum = tab.dataset.stage;
        const data = growthStagesData[stageNum];
        if (!data) return;

        stageTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Smooth transition
        stageIcon.style.transform = 'scale(0.7) rotate(-20deg)';
        setTimeout(() => {
          stageIcon.textContent = data.emoji;
          stageTitle.textContent = data.title;
          stageBody.textContent = data.body;
          stageMotto.textContent = data.motto;
          stageIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 150);

        initAudio();
        playSoftChime(500 + stageNum * 70, 0.2);
      });
    });
  }

  // ==========================================================================
  // 10. READING NOOK JOURNAL PAGE FLIPPER
  // ==========================================================================
  const flipPageBtn = document.getElementById('flipPageBtn');
  const bookQuoteSnippet = document.getElementById('bookQuoteSnippet');
  const bookReflectionSnippet = document.getElementById('bookReflectionSnippet');

  const readingNotes = [
    {
      quote: '“A quiet moment, a good book, and a little time to myself.”',
      reflection: 'Membaca bukan tentang seberapa cepat kita selesai, melainkan apa yang tersisa di hati setelah buku itu ditutup.'
    },
    {
      quote: '“Books are quiet friends that never ask for anything in return.”',
      reflection: 'Setiap kalimat yang digarisbawahi adalah percakapan rahasia antara pembaca dan jiwanya sendiri.'
    },
    {
      quote: '“Reading allows the mind to bloom gently in silence.”',
      reflection: 'Di antara lembar-lembar buku, selalu ada ruang untuk tumbuh, memahami empati, dan menjadi lebih peka.'
    }
  ];

  let currentNoteIdx = 0;

  if (flipPageBtn && bookQuoteSnippet && bookReflectionSnippet) {
    flipPageBtn.addEventListener('click', () => {
      currentNoteIdx = (currentNoteIdx + 1) % readingNotes.length;
      const note = readingNotes[currentNoteIdx];

      bookQuoteSnippet.style.opacity = '0';
      bookReflectionSnippet.style.opacity = '0';

      setTimeout(() => {
        bookQuoteSnippet.textContent = note.quote;
        bookReflectionSnippet.textContent = note.reflection;
        bookQuoteSnippet.style.opacity = '1';
        bookReflectionSnippet.style.opacity = '1';
      }, 200);

      initAudio();
      playSoftChime(620, 0.2);
    });
  }

  // ==========================================================================
  // 11. LIVE PHOTO UPLOAD PREVIEW (For Azlina to drop in her portrait)
  // ==========================================================================
  const photoUploadInput = document.getElementById('photoUploadInput');
  const userPhotoImg = document.getElementById('userPhotoImg');
  const photoDisplayBox = document.getElementById('photoDisplayBox');

  if (photoUploadInput && userPhotoImg && photoDisplayBox) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          userPhotoImg.src = event.target.result;
          userPhotoImg.hidden = false;

          const placeholderGraphic = photoDisplayBox.querySelector('.placeholder-graphic');
          if (placeholderGraphic) {
            placeholderGraphic.style.display = 'none';
          }
          showToast('Foto berhasil dipasang di polaroid! 📷✨');
          playSoftChime(750, 0.25);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==========================================================================
  // 12. COPY EMAIL PLACEHOLDER
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');

  if (copyEmailBtn && emailVal) {
    copyEmailBtn.addEventListener('click', () => {
      const textToCopy = emailVal.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Teks "${textToCopy}" berhasil disalin! 📋`);
        playSoftChime(600, 0.18);
      }).catch(() => {
        showToast(`Placeholder email siap diubah: ${textToCopy}`);
      });
    });
  }

  // ==========================================================================
  // 13. GUESTPAD / CONTACT JOURNAL FORM
  // ==========================================================================
  const contactForm = document.getElementById('contactJournalForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderMessage = document.getElementById('senderMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError = document.getElementById('msgError');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (msgError) msgError.textContent = '';

      if (!senderName.value.trim()) {
        if (nameError) nameError.textContent = 'Mohon tuliskan nama kamu.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!senderEmail.value.trim() || !emailRegex.test(senderEmail.value.trim())) {
        if (emailError) emailError.textContent = 'Mohon masukkan format email yang valid.';
        isValid = false;
      }

      if (!senderMessage.value.trim() || senderMessage.value.trim().length < 5) {
        if (msgError) msgError.textContent = 'Tuliskan sedikit pesan untuk Azlina (minimal 5 karakter).';
        isValid = false;
      }

      if (isValid) {
        showToast(`Terima kasih, ${senderName.value.trim()}! Pesan hangatmu telah dicatat. 🌱`);
        initAudio();
        playSoftChime(880, 0.3);
        contactForm.reset();
      }
    });
  }

  // ==========================================================================
  // 14. TOAST NOTIFICATION HELPER
  // ==========================================================================
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3600);
  }
});
