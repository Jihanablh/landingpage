(function () {
  const body = document.body;
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progress-bar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileProjectToggle = document.getElementById("mobile-project-toggle");
  const mobileProjectMenu = document.getElementById("mobile-project-menu");
  const backToTop = document.getElementById("back-to-top");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id], #project-team, #project-individu"));

  function setScrollState() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    progressBar.style.width = `${progress}%`;
    navbar.classList.toggle("scrolled", scrollTop > 24);
    backToTop.classList.toggle("visible", scrollTop > 460);
    setActiveLink();
  }

  function setActiveLink() {
    let current = "home";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 130) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isProject = href === "#projects" && (current === "project-team" || current === "project-individu");
      link.classList.toggle("active", href === `#${current}` || isProject);
    });
  }

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    navbar.classList.remove("menu-active");
    body.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    navbar.classList.toggle("menu-active", isOpen);
    body.classList.toggle("menu-open", isOpen);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        closeMobileMenu();
        window.scrollTo({
          top: target.offsetTop - 82,
          behavior: "smooth",
        });
      });
    });
  }

  function initRevealAnimation() {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function initMobileDropdown() {
    mobileProjectToggle.addEventListener("click", () => {
      const isOpen = mobileProjectMenu.classList.toggle("open");
      mobileProjectToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  function initGalleryLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeButton = document.getElementById("lightbox-close");
    const title = document.getElementById("lightbox-title");
    const visual = document.getElementById("lightbox-visual");

    const gradients = {
      blue: "linear-gradient(145deg, #102a56, #2563eb)",
      gold: "linear-gradient(145deg, #473407, #d99a16)",
      cyan: "linear-gradient(145deg, #083344, #06b6d4)",
      navy: "linear-gradient(145deg, #020617, #102a56)",
      silver: "linear-gradient(145deg, #334155, #94a3b8)",
      sky: "linear-gradient(145deg, #1e3a8a, #38bdf8)",
    };

    function open(item) {
      const itemTitle = item.dataset.title || "Galery Foto";
      const tone = item.dataset.tone || "blue";
      title.textContent = itemTitle;
      visual.style.background = gradients[tone] || gradients.blue;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("menu-open");
    }

    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      body.classList.remove("menu-open");
    }

    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => open(item));
    });

    closeButton.addEventListener("click", close);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const message = document.getElementById("form-message");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const text = String(formData.get("message") || "").trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      message.className = "form-message";

      if (!name || !email || !text) {
        message.textContent = "Mohon lengkapi nama, email, dan pesan.";
        message.classList.add("error");
        return;
      }

      if (!emailPattern.test(email)) {
        message.textContent = "Format email belum valid.";
        message.classList.add("error");
        return;
      }

      message.textContent = "Pesan berhasil dikirim. Terima kasih sudah menghubungi Jihan.";
      message.classList.add("success");
      form.reset();
    });
  }

  hamburger.addEventListener("click", toggleMobileMenu);
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", setScrollState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
  });

  initSmoothScroll();
  initRevealAnimation();
  initMobileDropdown();
  initGalleryLightbox();
  initContactForm();
  setScrollState();
})();
