document.addEventListener("DOMContentLoaded", () => {
  /* grab <button> elements instead of <a> */
  const navLinks = document.querySelectorAll(".navigation button");

  /* map their data‑target attribute to the actual sections */
  const sections = Array.from(navLinks)
    .map(btn => document.getElementById(btn.dataset.target))
    .filter(Boolean);

  const intro = document.getElementById("introduction");
  const descr = document.getElementById("description");

  function setActive(id) {
    const current = document.querySelector(".navigation .active");
    const targetLi = document.querySelector(
      `.navigation button[data-target="${id}"]`
    )?.parentElement;
    if (targetLi && current !== targetLi) {
      current?.classList.remove("active");
      targetLi.classList.add("active");
    }
  }

  /* click: smooth‑scroll & set active */
  navLinks.forEach(btn =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      /* delay ensures scrollIntoView happens first */
      setTimeout(() => setActive(id), 0);
    })
  );

  /* ---------------- intro / description visibility logic ---------------- */
  function handleIntroDescr() {
    const vh = window.innerHeight;
    const introRect = intro.getBoundingClientRect();
    const descrRect = descr.getBoundingClientRect();
    const introRatio =
      (Math.min(introRect.bottom, vh) - Math.max(introRect.top, 0)) /
      intro.offsetHeight;
    const descrRatio =
      (Math.min(descrRect.bottom, vh) - Math.max(descrRect.top, 0)) /
      descr.offsetHeight;

    if (introRatio >= 0.5) {
      setActive("introduction");
      return true;
    }
    if (descrRatio >= 0.5) {
      setActive("description");
      return true;
    }
    return false;
  }

  /* ---------------- IntersectionObserver for the rest ---------------- */
  const restSections = sections.filter(sec => sec !== intro && sec !== descr);

  const io = new IntersectionObserver(entries => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible && !handleIntroDescr()) setActive(visible.target.id);
  }, {
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0
  });

  restSections.forEach(sec => io.observe(sec));

  /* ---------------- throttled scroll listener ---------------- */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleIntroDescr();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* run once on load */
  handleIntroDescr();
});
