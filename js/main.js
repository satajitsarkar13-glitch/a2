/* HeartyMealStar - Interactive Culinary Experience JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('hearty_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('hearty_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // 2. Mobile Drawer Navigation
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 3. Search Modal Overlay
  const searchModalTrigger = document.getElementById('searchModalTrigger');
  const searchModalOverlay = document.getElementById('searchModalOverlay');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('liveSearchInput');
  const searchResults = document.getElementById('searchResultsContainer');

  const recipeDatabase = [
    { title: "Slow-Braised Heritage Short Ribs", category: "Slow Cooking & Braising", link: "blog.html" },
    { title: "Cast Iron Seared Duck Breast & Fig Reduction", category: "Cast Iron Mastery", link: "blog.html" },
    { title: "Artisan Sourdough Boule & Cultured Butter", category: "Hearth Baking", link: "blog.html" },
    { title: "Velvety Wild Mushroom & Truffle Gnocchi", category: "Handmade Pasta & Starches", link: "blog.html" },
    { title: "Wood-Fired Hearth Roasted Whole Chicken", category: "Hearth Roasting", link: "blog.html" },
    { title: "Classic Veloute & Emulsion Pan Sauces", category: "Culinary Sauces", link: "blog.html" },
    { title: "Autumn Harvest Roasted Butternut Squash Pot", category: "Comfort Soups & Stews", link: "blog.html" },
    { title: "Pan-Seared Salmon with Herb Emulsion", category: "Seafood & Fish", link: "blog.html" }
  ];

  if (searchModalTrigger && searchModalOverlay) {
    searchModalTrigger.addEventListener('click', () => {
      searchModalOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    });
  }

  if (searchCloseBtn && searchModalOverlay) {
    searchCloseBtn.addEventListener('click', () => {
      searchModalOverlay.classList.remove('active');
    });
  }

  if (searchModalOverlay) {
    searchModalOverlay.addEventListener('click', (e) => {
      if (e.target === searchModalOverlay) {
        searchModalOverlay.classList.remove('active');
      }
    });
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<p style="color:var(--text-muted);font-size:0.88rem;">Type a culinary technique, cut, or recipe name...</p>';
        return;
      }
      const matches = recipeDatabase.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
      if (matches.length === 0) {
        searchResults.innerHTML = '<p style="color:var(--text-muted);font-size:0.88rem;">No matching dinner monographs found. Explore our complete blog directory.</p>';
      } else {
        searchResults.innerHTML = matches.map(m => `
          <a href="${m.link}" class="search-result-item">
            <h5>${m.title}</h5>
            <p>${m.category}</p>
          </a>
        `).join('');
      }
    });
  }

  // 4. Accordion FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(hdr => {
    hdr.addEventListener('click', () => {
      const item = hdr.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const content = i.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) content.style.maxHeight = content.scrollHeight + 40 + 'px';
      }
    });
  });

  // 5. Interactive Dinner Tasting & Braise Configurator
  const dinnerOccasion = document.getElementById('dinnerOccasion');
  const dinnerProtein = document.getElementById('dinnerProtein');
  const dinnerMethod = document.getElementById('dinnerMethod');
  const resultTitle = document.getElementById('configResultTitle');
  const resultTemp = document.getElementById('configResultTemp');
  const resultTime = document.getElementById('configResultTime');
  const resultLiquid = document.getElementById('configResultLiquid');
  const resultTip = document.getElementById('configResultTip');

  function calculateDinnerPlan() {
    if (!dinnerOccasion || !dinnerProtein || !dinnerMethod) return;
    const protein = dinnerProtein.value;
    const method = dinnerMethod.value;

    let temp = "300°F (150°C)";
    let duration = "3.5 - 4.5 Hours";
    let liquid = "Roasted Vegetable & Bone Stock Reduction";
    let tip = "Sear protein in heavy cast iron to create deep fond before slow oven braising.";

    if (method === 'braise') {
      if (protein === 'beef') {
        temp = "275°F - 300°F";
        duration = "3.5 - 4 Hours";
        liquid = "Concentrated Beef Broth & Grape Must Reduction";
        tip = "Maintain tight Dutch oven lid seal to prevent evaporation and promote collagen conversion.";
      } else if (protein === 'poultry') {
        temp = "325°F";
        duration = "1.5 - 2 Hours";
        liquid = "Aromatic Golden Chicken Stock & Thyme Infusion";
        tip = "Braise thighs bone-in, leaving skin above liquid level for golden crisp finish.";
      } else if (protein === 'lamb') {
        temp = "285°F";
        duration = "4 Hours";
        liquid = "Rosemary, Garlic & Tomato Broth Reduction";
        tip = "Rest the shanks 20 minutes in warm braising jus prior to shredding or serving.";
      } else {
        temp = "350°F";
        duration = "50 - 60 Mins";
        liquid = "Caramelized Shallot & Vegetable Stock";
        tip = "Toss root vegetables in cold-pressed oil and layer with hearty heirloom beans.";
      }
    } else if (method === 'roast') {
      if (protein === 'poultry') {
        temp = "425°F (220°C)";
        duration = "55 - 70 Mins";
        liquid = "Melted Cultured Butter & Lemon Juice";
        tip = "Dry brine skin overnight in refrigerator for maximum shatteringly crisp blister.";
      } else if (protein === 'beef') {
        temp = "450°F Sear / 250°F Roast";
        duration = "2 - 2.5 Hours";
        liquid = "Herb Butter Pan Glaze";
        tip = "Reverse sear for consistent wall-to-wall medium rare core temperature.";
      } else {
        temp = "400°F";
        duration = "40 - 50 Mins";
        liquid = "Virgin Olive Oil & Thyme Infusion";
        tip = "Roast on preheated cast iron baking sheet for immediate caramelized bottom crust.";
      }
    } else if (method === 'sear') {
      temp = "450°F Surface";
      duration = "12 - 18 Mins";
      liquid = "Cast Iron Pan Butter Emulsion";
      tip = "Baste constantly with foaming cultured butter, crushed garlic, and rosemary sprigs.";
    }

    if (resultTitle) resultTitle.textContent = `${dinnerProtein.options[dinnerProtein.selectedIndex].text} with ${dinnerMethod.options[dinnerMethod.selectedIndex].text}`;
    if (resultTemp) resultTemp.textContent = temp;
    if (resultTime) resultTime.textContent = duration;
    if (resultLiquid) resultLiquid.textContent = liquid;
    if (resultTip) resultTip.textContent = tip;
  }

  if (dinnerOccasion) dinnerOccasion.addEventListener('change', calculateDinnerPlan);
  if (dinnerProtein) dinnerProtein.addEventListener('change', calculateDinnerPlan);
  if (dinnerMethod) dinnerMethod.addEventListener('change', calculateDinnerPlan);

  // 6. Cookie Consent Management
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieDeclineBtn = document.getElementById('cookieDeclineBtn');

  if (cookieBanner) {
    if (!localStorage.getItem('hearty_cookie_choice')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1200);
    }

    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('hearty_cookie_choice', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }

    if (cookieDeclineBtn) {
      cookieDeclineBtn.addEventListener('click', () => {
        localStorage.setItem('hearty_cookie_choice', 'essential_only');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // 7. Scroll Progress & Back to Top Button
  const progressBar = document.getElementById('readingProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) progressBar.style.width = scrolled + '%';

    if (siteHeader) {
      if (winScroll > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 8. Newsletter Subscription Mock Handler
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        form.innerHTML = '<div style="padding:1rem;background:rgba(200,90,50,0.2);border-radius:12px;color:#fff;font-weight:600;"><i class="fas fa-check-circle" style="color:var(--secondary);margin-right:8px;"></i> Welcome to the Hearthside Gazette! Check your inbox for your dinner guides.</div>';
      }
    });
  });
});
