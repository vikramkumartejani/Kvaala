document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navigation a");
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.hash))
    .filter(Boolean);
  const intro = document.getElementById("introduction");
  const descr = document.getElementById("description");

  function setActive(id) {
    const current = document.querySelector(".navigation .active");
    const target = document.querySelector(`.navigation a[href="#${id}"]`)?.parentElement;
    if (target && current !== target) {
      current?.classList.remove("active");
      target.classList.add("active");
    }
  }

  navLinks.forEach(link =>
    link.addEventListener("click", () =>
      setTimeout(() => setActive(link.hash.slice(1)), 0)
    )
  );

  function handleIntroDescr() {
    const vh = window.innerHeight;
    const introRect = intro.getBoundingClientRect();
    const descrRect = descr.getBoundingClientRect();
    const introHeight = intro.offsetHeight;
    const descrHeight = descr.offsetHeight;
    const introVisible = Math.min(introRect.bottom, vh) - Math.max(introRect.top, 0);
    const descrVisible = Math.min(descrRect.bottom, vh) - Math.max(descrRect.top, 0);
    const introRatio = introVisible / introHeight;
    const descrRatio = descrVisible / descrHeight;

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

  handleIntroDescr();
});
