document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");


  function setLanguage(lang) {
    document.querySelectorAll(".i18n").forEach((el) => {
      el.style.display = el.dataset.lang === lang ? "" : "none";
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.set === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }

  const saved = localStorage.getItem("lang") || "ru";
  setLanguage(saved);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.set));
  });

  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("menuOpen");
  const closeBtn = document.getElementById("menuClose");

  function openMenu() {
    drawer?.classList.add("open");
    overlay?.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  document.querySelectorAll(".drawer-nav a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });


  const elements = document.querySelectorAll(".fade-in");
  if (elements.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -15% 0px" }
    );

    elements.forEach((el) => obs.observe(el));
  }

 
  const btns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  if (btns.length && items.length) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const f = btn.dataset.filter;
        items.forEach((item) => {
          item.style.display = item.dataset.cat === f ? "" : "none";
        });
      });
    });

    const start = document.querySelector(".filter-btn.active")?.dataset.filter || "portrait";
    items.forEach((item) => {
      item.style.display = item.dataset.cat === start ? "" : "none";
    });
  }
});