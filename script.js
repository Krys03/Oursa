document.querySelector(".compare-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");

  if (!button) return;

  const originalText = button.textContent;
  button.textContent = "Merci, nous préparons votre comparaison";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2200);
});

const themeToggle = document.querySelector("[data-theme-toggle]");

if (themeToggle) {
  const root = document.documentElement;

  const syncThemeToggle = () => {
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Désactiver le mode nuit" : "Activer le mode nuit");
    const label = themeToggle.querySelector("span:last-child");

    if (label) {
      label.textContent = isDark ? "Light mode" : "Night mode";
    }
  };

  syncThemeToggle();

  themeToggle.addEventListener("click", () => {
    const isDark = root.dataset.theme === "dark";

    if (isDark) {
      delete root.dataset.theme;
      localStorage.removeItem("oursa-theme");
    } else {
      root.dataset.theme = "dark";
      localStorage.setItem("oursa-theme", "dark");
    }

    syncThemeToggle();
  });
}

const stickyNav = document.querySelector("[data-sticky-nav]");
const topHero = document.querySelector(".top-hero");

if (stickyNav && topHero) {
  const toggleStickyNav = () => {
    const trigger = topHero.offsetHeight * 0.45;
    stickyNav.classList.toggle("is-visible", window.scrollY > trigger);
  };

  toggleStickyNav();
  window.addEventListener("scroll", toggleStickyNav, { passive: true });
  window.addEventListener("resize", toggleStickyNav);
}

const compareStack = document.querySelector("[data-compare-stack]");

if (compareStack) {
  const stickyStage = compareStack.querySelector(".compare-stack__sticky");
  const stackCards = [...compareStack.querySelectorAll("[data-stack-card]")];
  let stackRaf = null;

  const resetStack = () => {
    stackCards.forEach((card, index) => {
      card.style.setProperty("--stack-offset", index === 0 ? "0px" : "120%");
    });
  };

  const updateStack = () => {
    stackRaf = null;

    if (!stickyStage || stackCards.length < 3 || window.innerWidth <= 760) {
      resetStack();
      return;
    }

    const rootStyles = getComputedStyle(document.documentElement);
    const stackTop = Number.parseFloat(rootStyles.getPropertyValue("--stack-top")) || 88;
    const containerRect = compareStack.getBoundingClientRect();
    const stageHeight = stickyStage.getBoundingClientRect().height;
    const travel = stageHeight + 24;
    const step = stageHeight * 0.78;
    const progress = Math.max(0, stackTop - containerRect.top);

    const secondProgress = Math.min(1, progress / step);
    const thirdProgress = Math.min(1, Math.max(0, progress - step) / step);

    stackCards[0].style.setProperty("--stack-offset", "0px");
    stackCards[1].style.setProperty("--stack-offset", `${(1 - secondProgress) * travel}px`);
    stackCards[2].style.setProperty("--stack-offset", `${(1 - thirdProgress) * travel}px`);
  };

  const requestStackUpdate = () => {
    if (stackRaf !== null) return;
    stackRaf = window.requestAnimationFrame(updateStack);
  };

  resetStack();
  updateStack();
  window.addEventListener("scroll", requestStackUpdate, { passive: true });
  window.addEventListener("resize", requestStackUpdate);
}
