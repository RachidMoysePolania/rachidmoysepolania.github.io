document.addEventListener('DOMContentLoaded', () => {
  // === Language System ===
  const langButtons = document.querySelectorAll('.locale-seg__btn, .tablet-utils__locale-btn, .mobile-drawer__locale-btn');

  const langTitles = {
    en: {
      "About Me": "About Me",
      "Resume": "Resume",
      "Portfolio": "Portfolio",
      "Blog": "Blog",
      "Contact": "Contact",
      "Terminal": "Terminal"
    },
    es: {
      "About Me": "Sobre Mí",
      "Resume": "Trayectoria",
      "Portfolio": "Portafolio",
      "Blog": "Blog",
      "Contact": "Contacto",
      "Terminal": "Terminal"
    }
  };

  function updateLanguageUI(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('portfolio-lang', lang);

    // Sync button states
    langButtons.forEach(btn => {
      const btnText = btn.textContent.trim().toLowerCase();
      const isBtnActive = btnText === lang;
      
      btn.classList.toggle('locale-seg__btn--active', isBtnActive);
      btn.classList.toggle('tablet-utils__locale-btn--active', isBtnActive);
      btn.classList.toggle('mobile-drawer__locale-btn--active', isBtnActive);
      btn.setAttribute('aria-pressed', isBtnActive ? 'true' : 'false');
    });

    // Update document title if matches page title
    const currentTitle = document.title.split(' | ')[0];
    const siteTitle = document.title.split(' | ')[1] || "Rachid Moyse Polania";
    
    let titleKey = currentTitle;
    for (const [key, value] of Object.entries(langTitles.en)) {
      if (value === currentTitle || langTitles.es[key] === currentTitle) {
        titleKey = key;
        break;
      }
    }
    if (langTitles[lang] && langTitles[lang][titleKey]) {
      document.title = `${langTitles[lang][titleKey]} | ${siteTitle}`;
    }

    // Refresh theme labels language
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeUI(currentTheme);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.textContent.trim().toLowerCase();
      updateLanguageUI(lang);
    });
  });

  // === Theme System ===
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const tabletThemeToggle = document.getElementById('tabletThemeToggle');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    const lang = document.documentElement.getAttribute('lang') || 'en';
    
    let label = '';
    if (lang === 'es') {
      label = isDark ? 'Oscuro' : 'Claro';
    } else {
      label = isDark ? 'Dark' : 'Light';
    }

    // Find and update the inner text of the theme labels without replacing their icon SVGs if any
    if (themeLabel) {
      const labelTextSpan = themeLabel.querySelector('span[lang]') || themeLabel;
      if (labelTextSpan !== themeLabel) {
        // Updated multilingual structures
        const enSpan = themeLabel.querySelector('span[lang="en"]');
        const esSpan = themeLabel.querySelector('span[lang="es"]');
        if (enSpan) enSpan.textContent = isDark ? 'Dark' : 'Light';
        if (esSpan) esSpan.textContent = isDark ? 'Oscuro' : 'Claro';
      } else {
        themeLabel.textContent = label;
      }
    }
    if (mobileThemeLabel) {
      const mobileLabelTextSpan = mobileThemeLabel.querySelector('span[lang]') || mobileThemeLabel;
      if (mobileLabelTextSpan !== mobileThemeLabel) {
        const enSpan = mobileThemeLabel.querySelector('span[lang="en"]');
        const esSpan = mobileThemeLabel.querySelector('span[lang="es"]');
        if (enSpan) enSpan.textContent = isDark ? 'Dark' : 'Light';
        if (esSpan) esSpan.textContent = isDark ? 'Oscuro' : 'Claro';
      } else {
        mobileThemeLabel.textContent = label;
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeUI(newTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (tabletThemeToggle) tabletThemeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // Sync initial label status
  const currentSavedTheme = localStorage.getItem('portfolio-theme') || 
                            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  updateThemeUI(currentSavedTheme);

  // Sync initial language status
  const currentSavedLang = localStorage.getItem('portfolio-lang') || 'en';
  updateLanguageUI(currentSavedLang);

  // === Roles Rotator ===
  const roles = document.querySelectorAll('#roleRotator .header-identity__role');
  if (roles.length > 1) {
    let currentRoleIdx = 0;
    
    setInterval(() => {
      // Hide current role
      const currentRole = roles[currentRoleIdx];
      if (currentRole) {
        currentRole.classList.remove('active');
        currentRole.setAttribute('aria-hidden', 'true');
      }
      
      // Select next index
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      
      // Show next role
      const nextRole = roles[currentRoleIdx];
      if (nextRole) {
        nextRole.classList.add('active');
        nextRole.setAttribute('aria-hidden', 'false');
      }
    }, 3000);
  }


  // === Header Toggle (Expand/Collapse Profile) ===
  const headerToggle = document.getElementById('headerToggle');
  const header = document.querySelector('.header');
  if (headerToggle && header) {
    headerToggle.addEventListener('click', () => {
      const isCollapsed = header.classList.contains('header--collapsed');
      if (isCollapsed) {
        header.classList.remove('header--collapsed');
        headerToggle.setAttribute('aria-label', 'Collapse profile');
      } else {
        header.classList.add('header--collapsed');
        headerToggle.setAttribute('aria-label', 'Expand profile');
      }
    });
  }


  // === Mobile Navigation Drawer ===
  const mobileMenuMoreBtn = document.getElementById('mobileMenuMoreBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuMoreBtn && mobileDrawer) {
    mobileMenuMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('mobile-drawer--open');
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('mobile-drawer--open') && !mobileDrawer.contains(e.target)) {
        mobileDrawer.classList.remove('mobile-drawer--open');
      }
    });
  }


  // === Scroll to Top ===
  const scrollToTop = document.getElementById('scrollToTop');
  if (scrollToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTop.classList.add('is-visible');
      } else {
        scrollToTop.classList.remove('is-visible');
      }
    });

    scrollToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
