/* ==========================================================================
   VERDANT UPHOLSTERY CARE — GLOBAL JAVASCRIPT (assets/js/main.js)
   Vanilla ES6 | Zero External Dependencies | Full Multi-Page Interactivity
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. STORAGE KEYS & INITIAL DEMO DATA SEEDING
     ------------------------------------------------------------------------ */
  const STORAGE_KEYS = {
    THEME: 'verdant_theme',
    SESSION: 'verdant_session',
    USERS: 'verdant_users',
    BOOKINGS: 'verdant_bookings',
    DRAFT: 'verdant_booking_draft'
  };

  const DEFAULT_DEMO_USER = {
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-8910',
    address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
    preferredContact: 'Email & SMS Demo Alerts',
    memberSince: 'March 2025'
  };

  const INITIAL_DEMO_BOOKINGS = [
    {
      id: 'VRD-2026-8419',
      service: 'Sofa Cleaning',
      furnitureType: '3-Seater Linen Sectional Sofa',
      quantity: 1,
      size: 'Large (L-Shaped / 3-4 Seats)',
      fabric: 'Natural Linen Blend (Code WS)',
      date: '2026-11-18',
      time: '10:00 AM – 12:00 PM (Morning)',
      status: 'Appointment Scheduled',
      trackingStage: 3,
      estimate: '$165 (Sample Estimate)',
      notes: 'Coffee spill on right chaise cushion; gentle low-moisture extraction requested.',
      customerName: 'Eleanor Vance',
      customerEmail: 'eleanor.vance@example.com',
      customerPhone: '+1 (555) 234-8910',
      address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
      isUpcoming: true
    },
    {
      id: 'VRD-2026-8452',
      service: 'Curtain Cleaning',
      furnitureType: 'Full-Height Living Room Drapery Pair',
      quantity: 2,
      size: 'Floor-to-Ceiling (280cm Drop)',
      fabric: 'Textured Cotton-Polyester Drapery',
      date: '2026-11-24',
      time: '02:00 PM – 04:00 PM (Afternoon)',
      status: 'Booking Review',
      trackingStage: 2,
      estimate: '$130 (Sample Estimate)',
      notes: 'On-rod vertical steam sanitization in main lounge.',
      customerName: 'Eleanor Vance',
      customerEmail: 'eleanor.vance@example.com',
      customerPhone: '+1 (555) 234-8910',
      address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
      isUpcoming: true
    },
    {
      id: 'VRD-2026-7904',
      service: 'Chair Cleaning',
      furnitureType: 'Upholstered Dining Chairs Set',
      quantity: 6,
      size: 'Standard Dining Seats',
      fabric: 'Cream Woven Fabric',
      date: '2026-09-14',
      time: '09:00 AM – 11:00 AM (Morning)',
      status: 'Service Completed',
      trackingStage: 5,
      estimate: '$150 (Sample Estimate)',
      notes: 'Post-holiday dining room chair refresh and stain shield.',
      customerName: 'Eleanor Vance',
      customerEmail: 'eleanor.vance@example.com',
      customerPhone: '+1 (555) 234-8910',
      address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
      isUpcoming: false
    },
    {
      id: 'VRD-2026-7312',
      service: 'Mattress Cleaning',
      furnitureType: 'King Quilted Pillow-Top Mattress',
      quantity: 1,
      size: 'King Size',
      fabric: 'Quilted Cotton Ticking',
      date: '2026-06-22',
      time: '01:00 PM – 03:00 PM (Afternoon)',
      status: 'Service Completed',
      trackingStage: 5,
      estimate: '$120 (Sample Estimate)',
      notes: 'Deep steam extraction and surface allergen refresh.',
      customerName: 'Eleanor Vance',
      customerEmail: 'eleanor.vance@example.com',
      customerPhone: '+1 (555) 234-8910',
      address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
      isUpcoming: false
    }
  ];

  function getBookings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
        return [...INITIAL_DEMO_BOOKINGS];
      }
      return JSON.parse(raw);
    } catch (e) {
      return [...INITIAL_DEMO_BOOKINGS];
    }
  }

  function saveBookings(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
    } catch (e) {
      /* ignore storage quota issues */
    }
  }

  function getSessionUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setSessionUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    } catch (e) {
      /* ignore */
    }
  }

  /* ------------------------------------------------------------------------
     2. THEME TOGGLE (LIGHT / DARK MODE WITH LOCALSTORAGE PERSISTENCE)
     ------------------------------------------------------------------------ */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    const initialTheme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
      } catch (err) {
        /* ignore */
      }
      updateThemeButtons(next);
    });

    updateThemeButtons(initialTheme);
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active';
    });
  }

  /* ------------------------------------------------------------------------
     2.1 RTL TOGGLE (LTR / RTL DIRECTION WITH LOCALSTORAGE PERSISTENCE)
     ------------------------------------------------------------------------ */
  function initRtl() {
    const saved = localStorage.getItem('verdant_direction');
    const initialDir = saved === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', initialDir);

    function updateRtlButtons(dir) {
      document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
        const textSpan = btn.querySelector('.rtl-btn-text');
        if (textSpan) {
          textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        }
        const label = dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left';
        btn.setAttribute('aria-label', label);
        btn.setAttribute('title', label);
        btn.classList.toggle('is-rtl', dir === 'rtl');
      });
    }

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-rtl-toggle]');
      if (!btn) return;
      const current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      try {
        localStorage.setItem('verdant_direction', next);
      } catch (err) {
        /* ignore */
      }
      updateRtlButtons(next);
    });

    updateRtlButtons(initialDir);
  }

  /* ------------------------------------------------------------------------
     3. STICKY NAVBAR, ACTIVE ROUTE & MOBILE DRAWER
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.mobile-drawer-backdrop');
    const openBtns = document.querySelectorAll('[data-drawer-open]');
    const closeBtns = document.querySelectorAll('[data-drawer-close]');

    // Sticky scroll state
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 16) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Highlight active route with strict matching and active state cleanups
    const path = window.location.pathname.toLowerCase();
    const rawFile = path.split('/').pop() || 'index.html';
    const file = rawFile.split('?')[0].split('#')[0] || 'index.html';

    document.querySelectorAll('.nav-link, .drawer-nav-link').forEach((link) => {
      const rawHref = (link.getAttribute('href') || '').toLowerCase();
      const href = rawHref.split('?')[0].split('#')[0].replace('./', '');
      const isHome = (file === '' || file === 'index.html') && (href === 'index.html' || href === '' || href === '/');
      const isMatch = isHome || (href && href !== 'index.html' && (file === href || path.endsWith('/' + href)));

      link.classList.toggle('is-active', Boolean(isMatch));
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Update account link & CTA login buttons when demo session exists
    const user = getSessionUser();
    if (user && user.name) {
      const firstName = user.name.split(' ')[0];
      document.querySelectorAll('.btn--nav-cta, [data-account-nav]').forEach((el) => {
        el.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:6px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>${firstName}'s Portal</span>`;
        el.setAttribute('href', 'dashboard.html');
        el.setAttribute('title', `Logged in as ${user.name} — Open Customer Portal`);
      });
      document.querySelectorAll('.drawer-login-btn').forEach((el) => {
        el.textContent = `Customer Portal (${firstName})`;
        el.setAttribute('href', 'dashboard.html');
      });
    }

    // Drawer open / close helpers
    function openDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach((btn) => btn.addEventListener('click', openDrawer));
    closeBtns.forEach((btn) => btn.addEventListener('click', closeDrawer));
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    if (drawer) {
      drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeDrawer);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        closeAllModals();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. DRAGGABLE BEFORE & AFTER COMPARISON SLIDERS
     ------------------------------------------------------------------------ */
  function initBeforeAfterSliders() {
    document.querySelectorAll('.ba-slider').forEach((slider) => {
      const range = slider.querySelector('.ba-slider__range');
      if (!range) return;
      const updatePos = () => {
        slider.style.setProperty('--pos', `${range.value}%`);
      };
      range.addEventListener('input', updatePos);
      range.addEventListener('change', updatePos);
      updatePos();
    });

    const ledgerRows = document.querySelectorAll('.journey-ledger__row');
    if (ledgerRows.length) {
      ledgerRows.forEach((row) => {
        const activate = () => {
          ledgerRows.forEach((r) => r.classList.toggle('is-active', r === row));
        };
        row.addEventListener('mouseenter', activate);
        row.addEventListener('focus', activate);
        row.addEventListener('click', activate);
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. HOME 2 — INTERACTIVE FABRIC EXPLORER, STAIN SHOWCASE, PROCESS & DISCOVERY
     ------------------------------------------------------------------------ */
  const FABRIC_DATA = {
    cotton: {
      name: 'Natural Cotton Upholstery',
      code: 'Manufacturer Care Code: W or W/S (Verify Tag)',
      temp: 'Controlled Warm Extraction (45°C–55°C)',
      drying: 'Estimated Drying: 3 to 5 Hours',
      considerations: 'Natural cotton fibres absorb liquid spills rapidly and can experience cellulosic browning or shrinkage if over-wetted with high-alkaline solutions.',
      careInfo: 'We perform a fibre-burn and dye-stability check first, followed by pH-balanced low-moisture spray extraction and immediate high-velocity airflow grooming.',
      serviceParam: 'Sofa Cleaning',
      image: 'images/image-26.png'
    },
    linen: {
      name: 'Belgian & Textured Linen Weaves',
      code: 'Manufacturer Care Code: S or W/S (Often Dry-Solvent Sensitive)',
      temp: 'Low-Moisture Mist & Vacuum Extraction',
      drying: 'Estimated Drying: 2 to 4 Hours',
      considerations: 'Slubbed linen yarns are prized for their organic texture but are highly sensitive to water rings, distortion, and aggressive mechanical brushing.',
      careInfo: 'Depending on manufacturer instructions and fabric condition, we use encapsulating micro-foam or solvent-safe extraction to lift soil while preserving weave tension.',
      serviceParam: 'Upholstery Deep Cleaning',
      image: 'images/image-46.png'
    },
    velvet: {
      name: 'Cotton, Silk & Performance Velvet',
      code: 'Manufacturer Care Code: S or W/S (Pile-Direction Sensitive)',
      temp: 'Gentle Steam Vapor & Directional Grooming',
      drying: 'Estimated Drying: 2 to 4 Hours',
      considerations: 'Velvet has a raised cut pile that can flatten or show pressure marks if scrubbed or exposed to concentrated heat or heavy moisture.',
      careInfo: 'Our specialists use a cushioned velvet-gliding nozzle, low-pressure mist extraction, and a soft brass/boar-bristle carding brush to reset the nap direction.',
      serviceParam: 'Sofa Cleaning',
      image: 'images/image-22.png'
    },
    polyester: {
      name: 'Woven Polyester & Synthetic Blends',
      code: 'Manufacturer Care Code: W (Water-Safe Synthetic Fibre)',
      temp: 'Deep Hot-Water Spray Extraction (60°C)',
      drying: 'Estimated Drying: 2 to 3 Hours',
      considerations: 'Polyester resists water-soluble stains well but is oleophilic—meaning body oils, cooking vapours, and pet sebum bond tightly to the synthetic fibres.',
      careInfo: 'We apply a targeted lipid-emulsifying pre-treatment followed by deep injection-extraction rinsing to restore brightness and remove trapped odours.',
      serviceParam: 'Sofa Cleaning',
      image: 'images/image-55.png'
    },
    microfiber: {
      name: 'Ultra-Dense Microfiber & Alcantara',
      code: 'Manufacturer Care Code: W or W/S',
      temp: 'Controlled Foam & Dual-Pass Vacuum Extraction',
      drying: 'Estimated Drying: 2 to 3 Hours',
      considerations: 'Ultra-fine split microfibers trap fine dust, pet dander, and beverage spills between tightly packed filaments, leaving stiff patches if residue remains.',
      careInfo: 'We use residue-free encapsulating pre-sprays and precision extraction wands, finishing with a grooming pad so the suede-like hand feel returns.',
      serviceParam: 'Fabric Stain Treatment',
      image: 'images/image-45.png'
    },
    leather: {
      name: 'Aniline, Semi-Aniline & Pigmented Leather',
      code: 'Manufacturer Care Code: L (Specialized Leather Protocol)',
      temp: 'Hand-Applied pH-Neutral Conditioning (No Steam)',
      drying: 'Estimated Drying: 1 Hour',
      considerations: 'High-heat steam or harsh household degreasers strip protective topcoats and natural hides oils, leading to cracking and dye transfer.',
      careInfo: 'We never use wet carpet wands on leather. Instead, we hand-clean pores with gentle foaming hide cleansers and replenish moisture with botanical conditioning cream.',
      serviceParam: 'Upholstery Deep Cleaning',
      image: 'images/image-29.png'
    }
  };

  const STAIN_DATA = {
    coffee: {
      title: 'Coffee, Tea & Tannin Spills',
      badge: 'Tannin & Caramelized Sugar Protocol',
      guidance: 'Hot beverages penetrate both the outer weave and inner cushion ticking. Rubbing spreads tannins wider; blot gently with a white cloth and avoid household bleach.',
      method: 'We apply a slightly acidic tannin-reducing spotter, allow a 10-minute dwell to unbind the pigment, and extract vertically using a transparent upholstery nozzle.',
      ctaText: 'Book Coffee Stain Treatment',
      service: 'Fabric Stain Treatment'
    },
    food: {
      title: 'Food Sauces, Wine & Organic Spills',
      badge: 'Multi-Stage Enzymatic Digestion',
      guidance: 'Food stains combine proteins, oils, and natural/synthetic dyes. Applying hot water directly can permanently set protein-based spills into natural fibres.',
      method: 'Our technicians lift surface solids, apply targeted enzyme pre-treatments tailored to your fabric code, and flush the dissolved residue with balanced extraction.',
      ctaText: 'Book Food & Spill Recovery',
      service: 'Fabric Stain Treatment'
    },
    dust: {
      title: 'Embedded Household Dust, Pollen & Grit',
      badge: 'Dry Crevice Extraction + Deep Rinse',
      guidance: 'Microscopic silica grit acts like abrasive sandpaper against upholstery yarns every time someone sits down, dulling colours and wearing down cushion seams.',
      method: 'Before any moisture touches the sofa, we perform high-filtration crevice vacuuming along welt cords and pleats, followed by deep fabric rinse extraction.',
      ctaText: 'Book Deep Dust & Allergen Clean',
      service: 'Upholstery Deep Cleaning'
    },
    pet: {
      title: 'Pet Hair, Dander & Biological Marks',
      badge: 'Fibre De-Hairing & Odour Neutralization',
      guidance: 'Pet hair weaves into fabric loops while body oils and accidents seep into cushion foam, creating recurring odours when humidity rises.',
      method: 'We combine electrostatic/mechanical pet-hair extraction, sub-surface enzymatic odour neutralization, and deep hot-water extraction.',
      ctaText: 'Book Pet-Friendly Sofa Care',
      service: 'Sofa Cleaning'
    }
  };

  const PROCESS_DATA = {
    1: {
      step: 'STAGE 01 OF 05',
      title: 'Detailed Fibre & Frame Inspection',
      desc: 'Every appointment begins with a seam-by-seam walkthrough. We inspect manufacturer care tags (W, S, W/S, X), test inconspicuous areas for colourfastness, and map existing wear, sun fading, and stains.',
      points: [
        'Identification of natural vs. synthetic yarn blends',
        'Colourfastness and shrinkage risk verification',
        'Pre-cleaning documentation of high-traffic areas'
      ]
    },
    2: {
      step: 'STAGE 02 OF 05',
      title: 'Dry Soil & Crevice Particulate Removal',
      desc: 'Removing dry soil before introducing moisture prevents mud formation inside the weave. We vacuum deep inside button tufts, piping seams, and under stacked cushions.',
      points: [
        'HEPA-filtered commercial upholstery vacuuming',
        'Deep crevice extraction along inner frame corners',
        'Pet hair and lint lifting from textured weaves'
      ]
    },
    3: {
      step: 'STAGE 03 OF 05',
      title: 'Targeted Pre-Treatment & Gentle Agitation',
      desc: 'We apply fabric-appropriate pre-conditioning solutions and gently agitate with soft natural-bristle brushes or orbital microfiber pads to suspend oils and spots without fraying fibres.',
      points: [
        'Fabric-matched enzymatic or encapsulating pre-spray',
        'Soft-bristle hand brushing or orbital foam agitation',
        'Controlled dwell time to loosen stubborn spots'
      ]
    },
    4: {
      step: 'STAGE 04 OF 05',
      title: 'Controlled Injection-Extraction Rinse',
      desc: 'Using commercial spray-extraction equipment, we flush suspended dirt and cleaning solution out of the upholstery while recovering up to 90% of moisture immediately.',
      points: [
        'Transparent nozzle monitoring until rinse water runs clear',
        'Calibrated vacuum suction to prevent cushion over-wetting',
        'Neutralizing rinse leaves fabrics soft and residue-free'
      ]
    },
    5: {
      step: 'STAGE 05 OF 05',
      title: 'Nap Grooming & Final Quality Walkthrough',
      desc: 'We groom velvet and textured piles into alignment, accelerate drying with directional air movers when needed, and review the completed furniture with you.',
      points: [
        'Pile setting for velvet, chenille, and microfiber',
        'Optional stain-repellent fabric shield application',
        'Post-service care guidance and drying checklist'
      ]
    }
  };

  const DISCOVERY_DATA = {
    sofas: {
      title: '2-Seater, 3-Seater & Sectional Sofas',
      duration: 'Typical Appointment: 60–120 Minutes',
      price: 'Sample Starting Price: $89 – $169',
      desc: 'Complete cushion, backrest, armrest, and frame upholstery cleaning tailored to linen, cotton, velvet, microfiber, or leather sofas.',
      service: 'Sofa Cleaning'
    },
    dining: {
      title: 'Upholstered Dining & Banquet Chairs',
      duration: 'Typical Appointment: 45–75 Minutes (Set of 4–8)',
      price: 'Sample Starting Price: $18 per Chair (Package Rates)',
      desc: 'Removes food drips, beverage rings, and hand oils from seat pads and upholstered backs without wetting hardwood or metal frames.',
      service: 'Chair Cleaning'
    },
    office: {
      title: 'Ergonomic Office & Executive Seating',
      duration: 'Typical Appointment: 30–90 Minutes',
      price: 'Sample Starting Price: $22 per Chair',
      desc: 'Hygienic low-moisture extraction for mesh, commercial fabric, and leather task chairs in home studios or corporate offices.',
      service: 'Chair Cleaning'
    },
    curtains: {
      title: 'Full-Height Drapery, Pleats & Roman Blinds',
      duration: 'Typical Appointment: 60–90 Minutes',
      price: 'Sample Starting Price: $65 per Curtain Pair',
      desc: 'On-rod vertical steam sanitization and vacuum extraction—no need to take down heavy curtains or risk laundry shrinkage.',
      service: 'Curtain Cleaning'
    },
    mattresses: {
      title: 'Single, Queen & King Mattresses',
      duration: 'Typical Appointment: 45–75 Minutes',
      price: 'Sample Starting Price: $79 – $119',
      desc: 'Multi-stage dry vacuuming, enzymatic spot care, and low-moisture steam extraction for quilted mattress tops and upholstered headboards.',
      service: 'Mattress Cleaning'
    },
    upholstery: {
      title: 'Armchairs, Ottomans, Settees & Chaises',
      duration: 'Typical Appointment: 40–60 Minutes',
      price: 'Sample Starting Price: $49 per Piece',
      desc: 'Specialized care for wingback chairs, tufted velvet armchairs, footstools, and heirloom upholstered accent pieces.',
      service: 'Upholstery Deep Cleaning'
    }
  };

  function initHome2Interactions() {
    // Fabric Explorer
    const fabricBtns = document.querySelectorAll('[data-fabric-btn]');
    const fabricCards = document.querySelectorAll('[data-fabric-card]');
    if (fabricBtns.length) {
      const updateFabric = (key) => {
        const info = FABRIC_DATA[key];
        if (!info) return;
        fabricBtns.forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-fabric-btn') === key));
        fabricCards.forEach((c) => c.classList.toggle('is-selected', c.getAttribute('data-fabric-card') === key));

        const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.textContent = val;
        };
        setTxt('fe-name', info.name);
        setTxt('fe-code', info.code);
        setTxt('fe-temp', info.temp);
        setTxt('fe-drying', info.drying);
        setTxt('fe-considerations', info.considerations);
        setTxt('fe-care', info.careInfo);

        const cta = document.getElementById('fe-book-cta');
        if (cta) cta.setAttribute('href', `booking.html?service=${encodeURIComponent(info.serviceParam)}&fabric=${encodeURIComponent(info.name)}`);
      };

      fabricBtns.forEach((btn) => {
        btn.addEventListener('click', () => updateFabric(btn.getAttribute('data-fabric-btn')));
      });
      fabricCards.forEach((card) => {
        card.addEventListener('click', () => updateFabric(card.getAttribute('data-fabric-card')));
      });
    }

    // Stain Challenge
    const stainCards = document.querySelectorAll('[data-stain-key]');
    if (stainCards.length) {
      stainCards.forEach((card) => {
        card.addEventListener('click', () => {
          const key = card.getAttribute('data-stain-key');
          const data = STAIN_DATA[key];
          if (!data) return;
          stainCards.forEach((c) => c.classList.toggle('is-selected', c === card));
          const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
          };
          setTxt('stain-panel-badge', data.badge);
          setTxt('stain-panel-title', data.title);
          setTxt('stain-panel-guidance', data.guidance);
          setTxt('stain-panel-method', data.method);
          const cta = document.getElementById('stain-panel-cta');
          if (cta) {
            cta.textContent = data.ctaText;
            cta.setAttribute('href', `booking.html?service=${encodeURIComponent(data.service)}`);
          }
        });
      });
    }

    // 5-Stage Process
    const processBtns = document.querySelectorAll('[data-process-step]');
    if (processBtns.length) {
      processBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const step = btn.getAttribute('data-process-step');
          const data = PROCESS_DATA[step];
          if (!data) return;
          processBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
          const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
          };
          setTxt('proc-stage-num', data.step);
          setTxt('proc-stage-title', data.title);
          setTxt('proc-stage-desc', data.desc);
          const listEl = document.getElementById('proc-stage-list');
          if (listEl) {
            listEl.innerHTML = data.points
              .map(
                (pt) =>
                  `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>${pt}</span></li>`
              )
              .join('');
          }
        });
      });
    }

    // Service Discovery Selector
    const discBtns = document.querySelectorAll('[data-discovery-key]');
    if (discBtns.length) {
      discBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-discovery-key');
          const data = DISCOVERY_DATA[key];
          if (!data) return;
          discBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
          const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
          };
          setTxt('disc-title', data.title);
          setTxt('disc-duration', data.duration);
          setTxt('disc-price', data.price);
          setTxt('disc-desc', data.desc);
          const cta = document.getElementById('disc-cta');
          if (cta) {
            cta.setAttribute('href', `booking.html?service=${encodeURIComponent(data.service)}`);
          }
        });
      });
    }

    // Home 2 Booking Preview Form
    const previewForm = document.getElementById('home2-booking-preview-form');
    if (previewForm) {
      previewForm.querySelectorAll('.slot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          previewForm.querySelectorAll('.slot-btn').forEach((b) => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          const slotInput = document.getElementById('preview-selected-slot');
          if (slotInput) slotInput.value = btn.getAttribute('data-slot') || btn.textContent.trim();
        });
      });

      previewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const service = (document.getElementById('preview-service') || {}).value || 'Sofa Cleaning';
        const qty = (document.getElementById('preview-qty') || {}).value || '1';
        const date = (document.getElementById('preview-date') || {}).value || '';
        const slot = (document.getElementById('preview-selected-slot') || {}).value || '10:00 AM – 12:00 PM (Morning)';
        try {
          localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify({ service, qty, date, slot }));
        } catch (err) {
          /* ignore */
        }
        window.location.href = `booking.html?service=${encodeURIComponent(service)}`;
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. ABOUT PAGE — INTERACTIVE 4-VALUE APPROACH SWITCHER
     ------------------------------------------------------------------------ */
  const APPROACH_DATA = {
    inspect: {
      badge: 'STEP 01 — INSPECT',
      title: 'Every Fibre Tells a Story Before We Clean',
      desc: 'We never apply a generic solution to your furniture. Our technicians inspect seam construction, cushion filling density, manufacturer cleaning codes, and stain origin before selecting a single tool.'
    },
    understand: {
      badge: 'STEP 02 — UNDERSTAND',
      title: 'Matching Chemistry & Moisture to Your Weave',
      desc: 'Natural linen, velvet pile, woven polyester, and aniline leather respond very differently to heat and moisture. We calibrate water temperature, pH balance, and vacuum pressure to your exact upholstery.'
    },
    clean: {
      badge: 'STEP 03 — CLEAN',
      title: 'Precision Extraction Without Residue',
      desc: 'Using commercial spray-extraction systems and soft-bristle agitation, we lift embedded soil, dust, and spills from deep within the weave while recovering moisture rapidly.'
    },
    refresh: {
      badge: 'STEP 04 — REFRESH',
      title: 'Restoring Comfort, Texture & Fresh Living',
      desc: 'We groom fabric nap, check seams and cushions from every angle, and provide clear drying and maintenance guidance so your living space feels renewed.'
    }
  };

  function initAboutInteractions() {
    const btns = document.querySelectorAll('[data-approach-key]');
    if (!btns.length) return;
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-approach-key');
        const data = APPROACH_DATA[key];
        if (!data) return;
        btns.forEach((b) => b.classList.toggle('is-active', b === btn));
        const bEl = document.getElementById('approach-badge');
        const tEl = document.getElementById('approach-title');
        const dEl = document.getElementById('approach-desc');
        if (bEl) bEl.textContent = data.badge;
        if (tEl) tEl.textContent = data.title;
        if (dEl) dEl.textContent = data.desc;
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('is-open');
        // Close siblings
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach((sib) => {
            sib.classList.remove('is-open');
            const t = sib.querySelector('.faq-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
        }
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. BOOKING PAGE (/booking) — FULL INTERACTIVE FLOW & DASHBOARD SYNC
     ------------------------------------------------------------------------ */
  const SERVICE_PRICES = {
    'Sofa Cleaning': 95,
    'Chair Cleaning': 65,
    'Curtain Cleaning': 85,
    'Mattress Cleaning': 80,
    'Upholstery Deep Cleaning': 115,
    'Fabric Stain Treatment': 70
  };

  function initBookingPage() {
    const form = document.getElementById('full-booking-form');
    if (!form) return;

    const serviceInput = document.getElementById('bk-service');
    const furnitureInput = document.getElementById('bk-furniture-type');
    const qtyInput = document.getElementById('bk-quantity');
    const sizeInput = document.getElementById('bk-size');
    const fabricInput = document.getElementById('bk-fabric');
    const dateInput = document.getElementById('bk-date');
    const timeInput = document.getElementById('bk-time');
    const nameInput = document.getElementById('bk-name');
    const emailInput = document.getElementById('bk-email');
    const phoneInput = document.getElementById('bk-phone');
    const addressInput = document.getElementById('bk-address');
    const cityInput = document.getElementById('bk-city');
    const notesInput = document.getElementById('bk-notes');

    // Set default tomorrow date if empty
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date(Date.now() + 86400000 * 2);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // Pre-fill from session user if logged in
    const user = getSessionUser();
    if (user) {
      if (nameInput && !nameInput.value) nameInput.value = user.name || '';
      if (emailInput && !emailInput.value) emailInput.value = user.email || '';
      if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
      if (addressInput && !addressInput.value) addressInput.value = user.address || '';
    }

    // Pre-fill from URL params or saved draft
    const params = new URLSearchParams(window.location.search);
    const paramService = params.get('service');
    const paramFabric = params.get('fabric');
    try {
      const draftRaw = localStorage.getItem(STORAGE_KEYS.DRAFT);
      if (draftRaw) {
        const draft = JSON.parse(draftRaw);
        if (draft.service && serviceInput) serviceInput.value = draft.service;
        if (draft.qty && qtyInput) qtyInput.value = draft.qty;
        if (draft.date && dateInput) dateInput.value = draft.date;
        if (draft.slot && timeInput) timeInput.value = draft.slot;
        localStorage.removeItem(STORAGE_KEYS.DRAFT);
      }
    } catch (e) {
      /* ignore */
    }
    if (paramService && serviceInput) {
      serviceInput.value = paramService;
    }
    if (paramFabric && fabricInput) {
      fabricInput.value = paramFabric;
    }

    // Service selector cards sync
    const serviceCards = document.querySelectorAll('[data-select-service]');
    function syncServiceCards(val) {
      serviceCards.forEach((c) => {
        const match = c.getAttribute('data-select-service') === val;
        c.classList.toggle('is-selected', match);
      });
    }
    serviceCards.forEach((card) => {
      card.addEventListener('click', () => {
        const val = card.getAttribute('data-select-service');
        if (serviceInput) serviceInput.value = val;
        syncServiceCards(val);
        updateSummary();
      });
    });
    if (serviceInput) {
      serviceInput.addEventListener('change', () => {
        syncServiceCards(serviceInput.value);
        updateSummary();
      });
      syncServiceCards(serviceInput.value);
    }

    // Time slot buttons sync
    const slotBtns = form.querySelectorAll('[data-bk-slot]');
    slotBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        slotBtns.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (timeInput) timeInput.value = btn.getAttribute('data-bk-slot');
        updateSummary();
      });
    });

    function updateSummary() {
      const srv = serviceInput ? serviceInput.value : 'Sofa Cleaning';
      const furn = furnitureInput && furnitureInput.value ? furnitureInput.value : 'Residential Sofa / Upholstery';
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      const sz = sizeInput ? sizeInput.value : 'Standard';
      const fab = fabricInput ? fabricInput.value : 'Woven Fabric';
      const dt = dateInput ? dateInput.value : 'Selected Date';
      const tm = timeInput ? timeInput.value : '10:00 AM – 12:00 PM (Morning)';
      const cust = nameInput && nameInput.value ? nameInput.value : 'Guest Customer';

      const base = SERVICE_PRICES[srv] || 90;
      const total = base * qty;

      const setSum = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setSum('sum-service', srv);
      setSum('sum-furniture', `${qty} × ${furn} (${sz})`);
      setSum('sum-fabric', fab);
      setSum('sum-date', dt || 'Pending Selection');
      setSum('sum-time', tm);
      setSum('sum-customer', cust);
      setSum('sum-estimate', `$${total} USD (Illustrative Demo Estimate)`);
    }

    form.addEventListener('input', updateSummary);
    form.addEventListener('change', updateSummary);
    updateSummary();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const srv = serviceInput ? serviceInput.value : 'Sofa Cleaning';
      const furn = (furnitureInput && furnitureInput.value.trim()) || '3-Seater Fabric Sofa';
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      const sz = sizeInput ? sizeInput.value : 'Standard';
      const fab = fabricInput ? fabricInput.value : 'Woven Fabric';
      const dt = dateInput ? dateInput.value : '2026-11-20';
      const tm = timeInput ? timeInput.value : '10:00 AM – 12:00 PM (Morning)';
      const nm = nameInput ? nameInput.value.trim() : '';
      const em = emailInput ? emailInput.value.trim() : '';
      const ph = phoneInput ? phoneInput.value.trim() : '';
      const ad = addressInput ? addressInput.value.trim() : '';
      const ct = cityInput ? cityInput.value.trim() : '';
      const nt = notesInput ? notesInput.value.trim() : '';

      const errEl = document.getElementById('booking-form-error');
      if (!nm || !em || !ph || !ad || !dt) {
        if (errEl) {
          errEl.textContent = 'Please complete all required customer information and preferred date fields before preparing your booking request.';
          errEl.style.display = 'block';
        }
        return;
      }
      if (errEl) errEl.style.display = 'none';

      const refId = 'VRD-2026-' + Math.floor(1000 + Math.random() * 9000);
      const base = SERVICE_PRICES[srv] || 90;
      const estimate = `$${base * qty} (Sample Estimate)`;

      const newBooking = {
        id: refId,
        service: srv,
        furnitureType: furn,
        quantity: qty,
        size: sz,
        fabric: fab,
        date: dt,
        time: tm,
        status: 'Request Received',
        trackingStage: 1,
        estimate: estimate,
        notes: nt || 'Standard fabric-safe inspection and deep extraction requested.',
        customerName: nm,
        customerEmail: em,
        customerPhone: ph,
        address: ct ? `${ad}, ${ct}` : ad,
        isUpcoming: true
      };

      const allBookings = getBookings();
      allBookings.unshift(newBooking);
      saveBookings(allBookings);

      // Also ensure demo session is populated with customer's profile so dashboard connects seamlessly
      const currentSession = getSessionUser() || { ...DEFAULT_DEMO_USER };
      currentSession.name = nm;
      currentSession.email = em;
      currentSession.phone = ph;
      currentSession.address = ct ? `${ad}, ${ct}` : ad;
      setSessionUser(currentSession);

      // Show confirmation box
      const confirmBox = document.getElementById('booking-confirmation-result');
      const refSpan = document.getElementById('confirmed-ref-id');
      if (refSpan) refSpan.textContent = refId;
      if (confirmBox) {
        confirmBox.style.display = 'block';
        confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. LOGIN (/login) & REGISTER (/register) FRONTEND DEMO FLOWS
     ------------------------------------------------------------------------ */
  function initAuthPages() {
    // Password visibility toggles
    document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        if (!input) return;
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.textContent = isPwd ? 'Hide' : 'Show';
      });
    });

    // Quick Demo Login button
    const quickDemoBtn = document.getElementById('quick-demo-login-btn');
    if (quickDemoBtn) {
      quickDemoBtn.addEventListener('click', () => {
        setSessionUser(DEFAULT_DEMO_USER);
        window.location.href = 'dashboard.html';
      });
    }

    // Login Form
    const loginForm = document.getElementById('demo-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = (document.getElementById('login-email') || {}).value.trim();
        const pwd = (document.getElementById('login-password') || {}).value;
        const msgEl = document.getElementById('login-feedback');

        if (!email || !pwd || pwd.length < 4) {
          if (msgEl) {
            msgEl.textContent = 'Please enter a valid email address and password (minimum 4 characters for demo login).';
            msgEl.style.display = 'block';
          }
          return;
        }

        // Check registered demo users or create session without storing raw password
        let matchedUser = null;
        try {
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
          matchedUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        } catch (err) {
          /* ignore */
        }

        const sessionUser = matchedUser || {
          name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          email: email,
          phone: DEFAULT_DEMO_USER.phone,
          address: DEFAULT_DEMO_USER.address,
          memberSince: 'November 2026'
        };

        setSessionUser(sessionUser);
        if (msgEl) {
          msgEl.textContent = 'Demo login successful! Redirecting to your Customer Dashboard...';
          msgEl.style.display = 'block';
        }
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 450);
      });
    }

    // Forgot Password Demo Link
    const forgotBtn = document.getElementById('forgot-password-demo');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msgEl = document.getElementById('login-feedback');
        if (msgEl) {
          msgEl.textContent = 'Demo Notice: Password reset emails are disabled in this frontend demonstration. You may log in with any email or click "Instant Demo Account Login".';
          msgEl.style.display = 'block';
        }
      });
    }

    // Register Form
    const regForm = document.getElementById('demo-register-form');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('reg-name') || {}).value.trim();
        const email = (document.getElementById('reg-email') || {}).value.trim();
        const phone = (document.getElementById('reg-phone') || {}).value.trim();
        const pwd = (document.getElementById('reg-password') || {}).value;
        const confirm = (document.getElementById('reg-confirm') || {}).value;
        const terms = (document.getElementById('reg-terms') || {}).checked;
        const msgEl = document.getElementById('register-feedback');

        if (!name || !email || !phone || !pwd) {
          if (msgEl) {
            msgEl.textContent = 'Please complete all required registration fields.';
            msgEl.style.display = 'block';
          }
          return;
        }
        if (pwd.length < 6) {
          if (msgEl) {
            msgEl.textContent = 'Please choose a password with at least 6 characters.';
            msgEl.style.display = 'block';
          }
          return;
        }
        if (pwd !== confirm) {
          if (msgEl) {
            msgEl.textContent = 'Passwords do not match. Please verify both password fields.';
            msgEl.style.display = 'block';
          }
          return;
        }
        if (!terms) {
          if (msgEl) {
            msgEl.textContent = 'Please accept the demo service terms to create your account.';
            msgEl.style.display = 'block';
          }
          return;
        }

        // Save user metadata ONLY (never store raw password in localStorage)
        const newUser = {
          name,
          email,
          phone,
          address: '742 Evergreen Terrace, Suite 4B, Seattle, WA',
          memberSince: 'November 2026'
        };

        try {
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
          const filtered = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase());
          filtered.push(newUser);
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
        } catch (err) {
          /* ignore */
        }

        setSessionUser(newUser);
        if (msgEl) {
          msgEl.textContent = 'Demo account created! Redirecting to your personalized Customer Dashboard...';
          msgEl.style.display = 'block';
        }
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 550);
      });
    }
  }

  /* ------------------------------------------------------------------------
     11. CUSTOMER DASHBOARD (/dashboard) — FULL PORTAL FUNCTIONALITY
     ------------------------------------------------------------------------ */
  const TRACKING_STAGE_LABELS = [
    { num: '01', name: 'REQUEST RECEIVED', desc: 'Booking details logged in demo portal' },
    { num: '02', name: 'BOOKING REVIEW', desc: 'Fibre notes & slot reviewed by coordinator' },
    { num: '03', name: 'APPOINTMENT SCHEDULED', desc: 'Preferred date & window confirmed' },
    { num: '04', name: 'SERVICE IN PROGRESS', desc: 'Inspection, pre-treatment & extraction' },
    { num: '05', name: 'SERVICE COMPLETED', desc: 'Final fabric check & care summary ready' }
  ];

  function initDashboard() {
    const shell = document.querySelector('.dashboard-shell');
    if (!shell) return;

    // Ensure a demo session exists (if visitor opens /dashboard directly, initialize demo session and show banner)
    let user = getSessionUser();
    const sessionBanner = document.getElementById('dash-session-notice');
    if (!user) {
      user = { ...DEFAULT_DEMO_USER };
      setSessionUser(user);
      if (sessionBanner) {
        sessionBanner.textContent = 'Demo Session Active: You are viewing the Customer Dashboard with sample account credentials (Eleanor Vance). Any bookings you create on the Booking page appear here automatically.';
      }
    }

    function renderUserHeader() {
      const u = getSessionUser() || DEFAULT_DEMO_USER;
      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setTxt('dash-welcome-name', `WELCOME BACK, ${u.name.toUpperCase()}.`);
      setTxt('dash-sidebar-name', u.name);
      setTxt('dash-sidebar-email', u.email);

      const pfName = document.getElementById('pf-name');
      const pfEmail = document.getElementById('pf-email');
      const pfPhone = document.getElementById('pf-phone');
      const pfAddress = document.getElementById('pf-address');
      if (pfName) pfName.value = u.name || '';
      if (pfEmail) pfEmail.value = u.email || '';
      if (pfPhone) pfPhone.value = u.phone || '';
      if (pfAddress) pfAddress.value = u.address || '';
    }

    function renderBookingsAndStats() {
      const bookings = getBookings();
      const upcoming = bookings.filter((b) => b.isUpcoming || b.trackingStage < 5);
      const completed = bookings.filter((b) => !b.isUpcoming && b.trackingStage >= 5);
      const pending = bookings.filter((b) => b.trackingStage <= 2);

      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setTxt('stat-total-bookings', String(bookings.length));
      setTxt('stat-upcoming-bookings', String(upcoming.length));
      setTxt('stat-completed-bookings', String(completed.length));
      setTxt('stat-pending-bookings', String(pending.length));

      // Render Upcoming Bookings Table
      const upBody = document.getElementById('dash-upcoming-tbody');
      if (upBody) {
        upBody.innerHTML = upcoming
          .map(
            (b) => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>${b.service}</td>
            <td>${b.furnitureType} (${b.quantity})</td>
            <td>${b.date}</td>
            <td>${b.time}</td>
            <td><span class="status-badge">${b.status}</span></td>
            <td><button type="button" class="btn btn--outline btn--sm" data-view-booking="${b.id}">Inspect / Track</button></td>
          </tr>`
          )
          .join('');
      }

      // Render History Table
      const histBody = document.getElementById('dash-history-tbody');
      if (histBody) {
        histBody.innerHTML = bookings
          .map(
            (b) => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>${b.service} — ${b.furnitureType}</td>
            <td>${b.date}</td>
            <td><span class="status-badge">${b.status}</span></td>
            <td><button type="button" class="btn btn--outline btn--sm" data-view-booking="${b.id}">View Details</button></td>
          </tr>`
          )
          .join('');
      }

      // Populate Tracking Selector
      const trackSelect = document.getElementById('dash-track-select');
      if (trackSelect) {
        const currentVal = trackSelect.value;
        trackSelect.innerHTML = bookings
          .map((b) => `<option value="${b.id}">${b.id} — ${b.service} (${b.furnitureType})</option>`)
          .join('');
        if (currentVal && bookings.some((b) => b.id === currentVal)) {
          trackSelect.value = currentVal;
        }
        renderTrackingTimeline(trackSelect.value || (bookings[0] && bookings[0].id));
      }
    }

    function renderTrackingTimeline(bookingId) {
      const bookings = getBookings();
      const target = bookings.find((b) => b.id === bookingId) || bookings[0];
      if (!target) return;

      const metaEl = document.getElementById('dash-track-meta');
      if (metaEl) {
        metaEl.textContent = `Tracking ${target.id}: ${target.service} for ${target.furnitureType} • Scheduled ${target.date} (${target.time})`;
      }

      const container = document.getElementById('dash-tracking-steps');
      if (!container) return;
      const stage = target.trackingStage || 1;
      container.innerHTML = TRACKING_STAGE_LABELS.map((st, idx) => {
        const stepNum = idx + 1;
        const cls = stepNum < stage ? 'is-completed' : stepNum === stage ? 'is-current' : '';
        return `
          <div class="tracking-step ${cls}">
            <div style="font-size:0.75rem;font-weight:800;letter-spacing:0.08em;opacity:0.85;margin-bottom:6px;">STAGE ${st.num}</div>
            <h4 class="heading-sm" style="font-size:0.95rem;margin-bottom:6px;">${st.name}</h4>
            <p style="font-size:0.82rem;opacity:0.88;">${st.desc}</p>
          </div>
        `;
      }).join('');
    }

    const trackSelect = document.getElementById('dash-track-select');
    if (trackSelect) {
      trackSelect.addEventListener('change', () => renderTrackingTimeline(trackSelect.value));
    }

    // Demo Button to advance tracking stage for testing
    const advanceBtn = document.getElementById('dash-advance-stage-btn');
    if (advanceBtn && trackSelect) {
      advanceBtn.addEventListener('click', () => {
        const bookings = getBookings();
        const idx = bookings.findIndex((b) => b.id === trackSelect.value);
        if (idx === -1) return;
        const nextStage = (bookings[idx].trackingStage % 5) + 1;
        bookings[idx].trackingStage = nextStage;
        const stageNames = ['Request Received', 'Booking Review', 'Appointment Scheduled', 'Service In Progress', 'Service Completed'];
        bookings[idx].status = stageNames[nextStage - 1];
        bookings[idx].isUpcoming = nextStage < 5;
        saveBookings(bookings);
        renderBookingsAndStats();
      });
    }

    // Dashboard mobile & tablet slide drawer handlers
    const dashDrawer = document.querySelector('.dashboard-sidebar');
    const dashBackdrop = document.querySelector('.dashboard-drawer-backdrop');
    const dashOpenBtns = document.querySelectorAll('[data-dash-drawer-open]');
    const dashCloseBtns = document.querySelectorAll('[data-dash-drawer-close]');

    function openDashDrawer() {
      if (!dashDrawer || !dashBackdrop) return;
      dashDrawer.classList.add('is-open');
      dashBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeDashDrawer() {
      if (!dashDrawer || !dashBackdrop) return;
      dashDrawer.classList.remove('is-open');
      dashBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    dashOpenBtns.forEach((btn) => btn.addEventListener('click', openDashDrawer));
    dashCloseBtns.forEach((btn) => btn.addEventListener('click', closeDashDrawer));
    if (dashBackdrop) dashBackdrop.addEventListener('click', closeDashDrawer);

    if (dashDrawer) {
      dashDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 1024) closeDashDrawer();
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDashDrawer();
      }
    });

    // Sidebar & In-Portal View Switching (SPA Tabs inside Dashboard)
    const navBtns = document.querySelectorAll('[data-dash-nav]');
    const dashViews = document.querySelectorAll('.dash-view[data-dash-view]');

    function switchDashboardView(viewId) {
      if (!viewId) return;
      if (viewId === 'logout') {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        window.location.href = 'login.html';
        return;
      }
      navBtns.forEach((b) => {
        b.classList.toggle('is-active', b.getAttribute('data-dash-nav') === viewId);
      });
      dashViews.forEach((v) => {
        v.classList.toggle('is-active', v.getAttribute('data-dash-view') === viewId);
      });
      if (window.innerWidth <= 1024) {
        closeDashDrawer();
      }
      const mainEl = document.querySelector('.dashboard-main');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-dash-nav');
        switchDashboardView(targetId);
      });
    });

    // Quick action & module switch buttons inside dashboard views
    document.querySelectorAll('[data-dash-switch], [data-dash-scroll]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-dash-switch') || btn.getAttribute('data-dash-scroll');
        switchDashboardView(targetId);
      });
    });

    // View Booking Details Modal
    document.addEventListener('click', (e) => {
      const vBtn = e.target.closest('[data-view-booking]');
      if (!vBtn) return;
      const bId = vBtn.getAttribute('data-view-booking');
      const bookings = getBookings();
      const b = bookings.find((x) => x.id === bId);
      if (!b) return;

      if (trackSelect) {
        trackSelect.value = b.id;
        renderTrackingTimeline(b.id);
      }

      const modal = document.getElementById('booking-detail-modal');
      if (modal) {
        const setTxt = (sel, val) => {
          const el = modal.querySelector(sel);
          if (el) el.textContent = val;
        };
        setTxt('[data-bm-id]', b.id);
        setTxt('[data-bm-service]', b.service);
        setTxt('[data-bm-furniture]', `${b.quantity} × ${b.furnitureType} (${b.size || 'Standard'})`);
        setTxt('[data-bm-fabric]', b.fabric || 'Standard Upholstery');
        setTxt('[data-bm-datetime]', `${b.date} • ${b.time}`);
        setTxt('[data-bm-status]', b.status);
        setTxt('[data-bm-estimate]', b.estimate || '$120 (Sample Estimate)');
        setTxt('[data-bm-address]', b.address || DEFAULT_DEMO_USER.address);
        setTxt('[data-bm-notes]', b.notes || 'No special instructions.');
        openModal('booking-detail-modal');
      }
    });

    // Profile Update Form
    const profileForm = document.getElementById('dash-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          ...(getSessionUser() || DEFAULT_DEMO_USER),
          name: (document.getElementById('pf-name') || {}).value.trim() || DEFAULT_DEMO_USER.name,
          email: (document.getElementById('pf-email') || {}).value.trim() || DEFAULT_DEMO_USER.email,
          phone: (document.getElementById('pf-phone') || {}).value.trim() || DEFAULT_DEMO_USER.phone,
          address: (document.getElementById('pf-address') || {}).value.trim() || DEFAULT_DEMO_USER.address
        };
        setSessionUser(updated);
        renderUserHeader();
        const msg = document.getElementById('pf-save-msg');
        if (msg) {
          msg.textContent = 'Profile changes saved to your browser demo session.';
          msg.style.display = 'block';
          setTimeout(() => {
            msg.style.display = 'none';
          }, 3500);
        }
      });
    }

    // Settings Form & Reset Sample Bookings Button
    const settingsForm = document.getElementById('dash-settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('st-save-msg');
        if (msg) {
          msg.textContent = 'Portal notification & reminder settings saved.';
          msg.style.display = 'block';
          setTimeout(() => {
            msg.style.display = 'none';
          }, 3500);
        }
      });
    }

    const resetDemoBtn = document.getElementById('dash-reset-demo-btn');
    if (resetDemoBtn) {
      resetDemoBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
        ensureDefaultBookings();
        renderBookingsAndStats();
        const msg = document.getElementById('st-save-msg');
        if (msg) {
          msg.textContent = 'Sample bookings restored to default demonstration state.';
          msg.style.display = 'block';
          setTimeout(() => {
            msg.style.display = 'none';
          }, 3500);
        }
      });
    }

    renderUserHeader();
    renderBookingsAndStats();
  }

  /* ------------------------------------------------------------------------
     12. GLOBAL REUSABLE ENQUIRY MODAL & MODAL CONTROLLER
     ------------------------------------------------------------------------ */
  function ensureGlobalEnquiryModal() {
    if (document.getElementById('global-enquiry-modal')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-backdrop';
    wrapper.id = 'global-enquiry-modal';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.setAttribute('aria-labelledby', 'enquiry-modal-title');
    wrapper.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <div>
            <span class="eyebrow">Verdant Upholstery Care</span>
            <h3 class="heading-md" id="enquiry-modal-title">Send a Service or Product Enquiry</h3>
          </div>
          <button type="button" class="modal-close" data-modal-close aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form id="global-enquiry-form" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="enq-name">Full Name *</label>
              <input class="form-control" type="text" id="enq-name" required placeholder="e.g., Eleanor Vance">
            </div>
            <div class="form-group">
              <label class="form-label" for="enq-email">Email Address *</label>
              <input class="form-control" type="email" id="enq-email" required placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="enq-phone">Phone Number *</label>
              <input class="form-control" type="tel" id="enq-phone" required placeholder="+1 (555) 234-8910">
            </div>
            <div class="form-group">
              <label class="form-label" for="enq-type">Enquiry Topic *</label>
              <select class="form-control" id="enq-type">
                <option value="General Enquiry">General Enquiry</option>
                <option value="Service Information">Service Information</option>
                <option value="Pricing Enquiry">Pricing & Package Enquiry</option>
                <option value="Booking Assistance">Booking Assistance</option>
                <option value="Fabric & Product Advice">Fabric & Product Care Advice</option>
              </select>
            </div>
            <div class="form-group form-group--full">
              <label class="form-label" for="enq-message">Furniture & Fabric Details *</label>
              <textarea class="form-control" id="enq-message" required placeholder="Tell us about your sofa, chairs, curtains, fabric type, or specific stains..."></textarea>
            </div>
          </div>
          <div id="enq-feedback" class="alert-banner" style="display:none;margin-top:16px;"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap;">
            <span class="badge-demo">Frontend Demo Enquiry Form</span>
            <button type="submit" class="btn btn--primary">Submit Enquiry</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(wrapper);

    const form = wrapper.querySelector('#global-enquiry-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nm = wrapper.querySelector('#enq-name').value.trim();
      const em = wrapper.querySelector('#enq-email').value.trim();
      const ph = wrapper.querySelector('#enq-phone').value.trim();
      const msg = wrapper.querySelector('#enq-message').value.trim();
      const fb = wrapper.querySelector('#enq-feedback');

      if (!nm || !em || !ph || !msg) {
        fb.textContent = 'Please fill in your name, email, phone number, and message.';
        fb.style.display = 'block';
        return;
      }
      fb.textContent = `Thank you, ${nm}! Your demo enquiry has been recorded. Ready to schedule right away? You can also use our interactive Booking page.`;
      fb.style.display = 'block';
      form.reset();
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop.is-open').forEach((m) => {
      m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }

  function initModals() {
    ensureGlobalEnquiryModal();

    document.addEventListener('click', (e) => {
      const enqTrigger = e.target.closest('[data-open-enquiry]');
      if (enqTrigger) {
        e.preventDefault();
        closeAllModals();
        const topic = enqTrigger.getAttribute('data-open-enquiry') || enqTrigger.getAttribute('data-enquiry-subject') || 'General Enquiry';
        const select = document.getElementById('enq-type');
        const msg = document.getElementById('enq-message');
        if (select) {
          const matchOpt = Array.from(select.options).find((o) => o.value.toLowerCase() === topic.toLowerCase());
          if (matchOpt) {
            select.value = matchOpt.value;
          } else {
            select.value = 'Fabric & Product Advice';
            if (msg && !msg.value) msg.value = `Enquiry regarding: ${topic}\n`;
          }
        }
        openModal('global-enquiry-modal');
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        closeAllModals();
        return;
      }

      if (e.target.classList.contains('modal-backdrop')) {
        closeAllModals();
      }
    });

    // Global Newsletter Form handler
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.trim()) return;
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn ? btn.textContent : 'Subscribe';
        if (btn) btn.textContent = 'Subscribed!';
        input.value = '';
        setTimeout(() => {
          if (btn) btn.textContent = orig;
        }, 3000);
      });
    });

    // Contact Page Inline Quote & Enquiry Form handler
    const contactPageForm = document.getElementById('contact-page-form');
    if (contactPageForm) {
      contactPageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (contactPageForm.querySelector('#cp-name')?.value || '').trim();
        const email = (contactPageForm.querySelector('#cp-email')?.value || '').trim();
        const phone = (contactPageForm.querySelector('#cp-phone')?.value || '').trim();
        const service = contactPageForm.querySelector('#cp-service')?.value || 'Sofa & Sectional Deep Cleaning';
        const suburb = (contactPageForm.querySelector('#cp-suburb')?.value || '').trim();
        const message = (contactPageForm.querySelector('#cp-message')?.value || '').trim();
        const feedback = document.getElementById('cp-form-feedback');

        if (!name || !email || !phone || !suburb || !message) {
          if (feedback) {
            feedback.textContent = 'Please complete all required fields (*) so our specialist desk can prepare your quote.';
            feedback.classList.add('is-visible');
          }
          return;
        }

        const refId = 'ENQ-' + Math.floor(100000 + Math.random() * 900000);
        const savedEnquiries = getStorage(STORAGE_KEYS.ENQUIRIES, []);
        savedEnquiries.unshift({
          id: refId,
          name,
          email,
          phone,
          topic: service,
          suburb,
          message,
          createdAt: new Date().toISOString()
        });
        setStorage(STORAGE_KEYS.ENQUIRIES, savedEnquiries);

        if (feedback) {
          feedback.textContent = `Thank you, ${name}! Your upholstery enquiry (${refId}) for ${service} has been received. A fabric specialist will reply shortly.`;
          feedback.classList.add('is-visible');
        }
        contactPageForm.reset();
      });
    }
  }

  /* ------------------------------------------------------------------------
     13. SCROLL REVEAL, 3D CARD TILT & BACK TO TOP
     ------------------------------------------------------------------------ */
  function initScrollAndTiltEffects() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll reveal via IntersectionObserver
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // Subtle 3D tilt on [data-tilt] cards (desktop pointers only)
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('[data-tilt]').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    // Back-to-top button
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      window.addEventListener(
        'scroll',
        () => {
          btt.classList.toggle('is-visible', window.scrollY > 450);
        },
        { passive: true }
      );
      btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ------------------------------------------------------------------------
     INITIALIZE ALL MODULES ON DOM READY
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRtl();
    initNavigation();
    initBeforeAfterSliders();
    initHome2Interactions();
    initAboutInteractions();
    initAccordions();
    initBookingPage();
    initAuthPages();
    initDashboard();
    initModals();
    initScrollAndTiltEffects();
  });
})();

