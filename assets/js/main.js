document.addEventListener('DOMContentLoaded', () => {
  // === Theme System ===
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const tabletThemeToggle = document.getElementById('tabletThemeToggle');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    
    if (themeLabel) themeLabel.textContent = isDark ? 'Dark' : 'Light';
    if (mobileThemeLabel) mobileThemeLabel.textContent = isDark ? 'Dark' : 'Light';
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


  // === Roles Rotator ===
  const roles = document.querySelectorAll('#roleRotator .header-identity__role');
  if (roles.length > 1) {
    let currentRoleIdx = 0;
    
    setInterval(() => {
      // Hide current role
      const currentRole = roles[currentRoleIdx];
      currentRole.classList.remove('active');
      currentRole.setAttribute('aria-hidden', 'true');
      
      // Select next index
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      
      // Show next role
      const nextRole = roles[currentRoleIdx];
      nextRole.classList.add('active');
      nextRole.setAttribute('aria-hidden', 'false');
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
