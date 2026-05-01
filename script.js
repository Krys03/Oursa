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

window.oursaFormFlows = window.oursaFormFlows || {};

window.oursaFormFlows.auto = {
  slug: "auto",
  title: "Assurance auto",
  estimatedDuration: "2 minutes",
  coreQuestionCount: 7,
  intro: "Repondez a 7 questions pour voir des offres adaptees avant de demander un devis.",
  resultTriggerStepId: "coverage_start",
  primaryCtaLabel: "Continuer",
  steps: [
    {
      id: "vehicle_identity",
      progressLabel: "Vehicule",
      title: "Quel vehicule souhaitez-vous assurer ?",
      description: "Le vehicule reste le premier filtre de comparaison.",
      type: "group",
      fields: [
        {
          id: "vehicle_make",
          label: "Marque",
          input: "text",
          placeholder: "Ex. Volkswagen",
          required: true
        },
        {
          id: "vehicle_model",
          label: "Modele",
          input: "text",
          placeholder: "Ex. Golf",
          required: true
        },
        {
          id: "vehicle_first_registration",
          label: "Premiere mise en circulation",
          input: "choice",
          required: true,
          options: [
            { label: "2024 ou plus recent", value: "2024_plus" },
            { label: "2020 a 2023", value: "2020_2023" },
            { label: "2016 a 2019", value: "2016_2019" },
            { label: "2015 ou avant", value: "2015_or_before" }
          ]
        }
      ]
    },
    {
      id: "vehicle_usage",
      progressLabel: "Usage",
      title: "Comment utilisez-vous ce vehicule ?",
      description: "L'usage influence surtout le prix et certaines garanties.",
      type: "choice",
      options: [
        { label: "Usage prive uniquement", value: "private_only" },
        { label: "Prive + domicile-travail", value: "commute" },
        { label: "Prive + professionnel occasionnel", value: "mixed_light_business" },
        { label: "Usage principalement professionnel", value: "business_primary" }
      ]
    },
    {
      id: "main_driver_profile",
      progressLabel: "Conducteur",
      title: "Quel est le profil du conducteur principal ?",
      description: "On garde seulement les informations qui changent reellement le tarif.",
      type: "group",
      fields: [
        {
          id: "driver_age_band",
          label: "Age",
          input: "choice",
          required: true,
          options: [
            { label: "18 a 24 ans", value: "18_24" },
            { label: "25 a 34 ans", value: "25_34" },
            { label: "35 a 49 ans", value: "35_49" },
            { label: "50 a 64 ans", value: "50_64" },
            { label: "65 ans et plus", value: "65_plus" }
          ]
        },
        {
          id: "driver_license_band",
          label: "Depuis quand avez-vous le permis ?",
          input: "choice",
          required: true,
          options: [
            { label: "Moins de 2 ans", value: "under_2_years" },
            { label: "2 a 5 ans", value: "2_5_years" },
            { label: "6 a 10 ans", value: "6_10_years" },
            { label: "Plus de 10 ans", value: "10_plus_years" }
          ]
        }
      ]
    },
    {
      id: "location_and_parking",
      progressLabel: "Lieu",
      title: "Ou stationne principalement le vehicule ?",
      description: "Le NPA et le mode de stationnement influencent la prime.",
      type: "group",
      fields: [
        {
          id: "residence_postcode",
          label: "NPA",
          input: "text",
          placeholder: "Ex. 1007",
          required: true
        },
        {
          id: "parking_type",
          label: "Stationnement habituel",
          input: "choice",
          required: true,
          options: [
            { label: "Garage ferme", value: "closed_garage" },
            { label: "Place privee exterieure", value: "private_outdoor" },
            { label: "Rue ou parking public", value: "public_street" }
          ]
        }
      ]
    },
    {
      id: "coverage_level",
      progressLabel: "Protection",
      title: "Quel niveau de protection voulez-vous ?",
      description: "On peut commencer simple puis affiner apres.",
      type: "choice",
      options: [
        { label: "RC uniquement", value: "liability_only" },
        { label: "RC + casco partielle", value: "liability_partial_casco" },
        { label: "RC + casco complete", value: "liability_full_casco" },
        { label: "Je veux comparer les 3 options", value: "compare_all" }
      ]
    },
    {
      id: "claims_history",
      progressLabel: "Historique",
      title: "Avez-vous eu un sinistre recent ?",
      description: "Base conseillee pour comparer: les 3 a 5 dernieres annees.",
      type: "choice",
      options: [
        { label: "Aucun sinistre recent", value: "none" },
        { label: "1 sinistre non responsable", value: "one_not_at_fault" },
        { label: "1 sinistre responsable", value: "one_at_fault" },
        { label: "Plus d'un sinistre recent", value: "multiple" }
      ]
    },
    {
      id: "coverage_start",
      progressLabel: "Debut",
      title: "Quand voulez-vous etre couvert ?",
      description: "Cette information aide a prioriser les offres et les contacts utiles.",
      type: "choice",
      options: [
        { label: "Des que possible", value: "asap" },
        { label: "Dans moins de 30 jours", value: "within_30_days" },
        { label: "A l'echeance de mon contrat actuel", value: "at_renewal" },
        { label: "Je compare d'abord", value: "research_only" }
      ]
    }
  ],
  conditionalSteps: [
    {
      id: "leasing_status",
      afterStepId: "vehicle_identity",
      title: "Le vehicule est-il en leasing ?",
      type: "choice",
      options: [
        { label: "Oui", value: "yes" },
        { label: "Non", value: "no" },
        { label: "Je ne sais pas encore", value: "unknown" }
      ]
    },
    {
      id: "deductible_preference",
      afterStepId: "coverage_level",
      title: "Quelle franchise preferez-vous ?",
      type: "choice",
      options: [
        { label: "La plus basse possible", value: "lowest" },
        { label: "Un bon equilibre prix / franchise", value: "balanced" },
        { label: "La plus haute pour payer moins", value: "highest" },
        { label: "Je veux comparer plusieurs franchises", value: "compare_many" }
      ]
    },
    {
      id: "second_driver",
      afterStepId: "main_driver_profile",
      title: "Y a-t-il un second conducteur regulier ?",
      type: "choice",
      options: [
        { label: "Non", value: "no" },
        { label: "Oui, meme foyer", value: "same_household" },
        { label: "Oui, jeune conducteur", value: "young_driver" },
        { label: "Oui, plusieurs conducteurs", value: "multiple_drivers" }
      ]
    },
    {
      id: "annual_mileage",
      afterStepId: "vehicle_usage",
      title: "Combien de kilometres faites-vous environ par an ?",
      type: "choice",
      options: [
        { label: "Moins de 5 000 km", value: "under_5000" },
        { label: "5 000 a 10 000 km", value: "5000_10000" },
        { label: "10 000 a 15 000 km", value: "10000_15000" },
        { label: "15 000 a 20 000 km", value: "15000_20000" },
        { label: "Plus de 20 000 km", value: "over_20000" }
      ]
    }
  ],
  resultCopy: {
    title: "Vos premieres pistes auto",
    subtitle: "Voici les protections les plus pertinentes avant de demander un devis detaille."
  }
};

const themeToggle = document.querySelector("[data-theme-toggle]");
const compareHeader = document.querySelector(".compare-header");

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

if (compareHeader) {
  const toggleHeaderState = () => {
    compareHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState, { passive: true });
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

const normalizeNavIconLabel = (value) => value
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/œ/g, "oe")
  .replace(/[’']/g, " ")
  .replace(/[^a-z0-9]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const compareNavLinks = [...document.querySelectorAll(".compare-nav__link")];

if (compareNavLinks.length) {
  const navIconRules = [
    { pattern: /(assurance auto|auto)/, icon: "car" },
    { pattern: /(assurance habitation|habitation|logement)/, icon: "home" },
    { pattern: /(caisse maladie|lamal|hospitalisation)/, icon: "health" },
    { pattern: /(complementaire)/, icon: "shield-heart" },
    { pattern: /(animaux|animal|chien|chat)/, icon: "paw" },
    { pattern: /(pret personnel|credit)/, icon: "card" },
    { pattern: /(franchise|subside|budget|cout total)/, icon: "coins" },
    { pattern: /(modeles|criteres)/, icon: "sliders" },
    { pattern: /(changer d assureur|changer de caisse maladie|regroupement)/, icon: "switch" },
    { pattern: /(famille|familles)/, icon: "users" },
    { pattern: /(jeunes adultes|retraites)/, icon: "user" },
    { pattern: /(dentaire)/, icon: "tooth" },
    { pattern: /(optique)/, icon: "eye" },
    { pattern: /(voyage)/, icon: "plane" },
    { pattern: /(medecines douces|medecine douce)/, icon: "leaf" },
    { pattern: /(bonnes pratiques)/, icon: "sparkles" },
    { pattern: /(checklists)/, icon: "checklist" },
    { pattern: /(decryptages|methodologie)/, icon: "file" },
    { pattern: /(guides|guide)/, icon: "book" },
    { pattern: /(sentiment des avis|avis)/, icon: "chat" },
    { pattern: /(comparatifs|deux assureurs face a face|comparer|comparez)/, icon: "compare" }
  ];

  compareNavLinks.forEach((link) => {
    const label = normalizeNavIconLabel(link.querySelector("strong")?.textContent || link.textContent || "");
    const matchedRule = navIconRules.find(({ pattern }) => pattern.test(label));

    if (matchedRule) {
      link.dataset.navIcon = matchedRule.icon;
    }
  });
}

const compareNavItems = [...document.querySelectorAll(".compare-nav__item")];

if (compareNavItems.length) {
  const panelViewportGap = 12;
  const panelDesktopMedia = window.matchMedia("(max-width: 1024px)");
  let panelFitRaf = null;
  const panelFitTimeouts = new WeakMap();

  const fitCompareNavPanel = (item) => {
    const panel = item.querySelector(".compare-nav__panel");

    if (!panel) return;

    panel.style.removeProperty("--panel-max-height");

    if (panelDesktopMedia.matches || getComputedStyle(panel).display === "none") {
      panel.style.removeProperty("--panel-offset-x");
      return;
    }

    const itemRect = item.getBoundingClientRect();
    const rect = panel.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    let shift = 0;
    const viewportLeft = panelViewportGap;
    const viewportRight = window.innerWidth - panelViewportGap;
    const centeredLeft = itemRect.left + itemRect.width / 2 - rect.width / 2;
    const centeredRight = centeredLeft + rect.width;

    if (centeredLeft < viewportLeft) {
      shift += viewportLeft - centeredLeft;
    }

    if (centeredRight > viewportRight) {
      shift -= centeredRight - viewportRight;
    }

    panel.style.setProperty("--panel-offset-x", `${Math.round(shift)}px`);

    const panelTop = itemRect.bottom + 14;
    const availableHeight = Math.max(260, Math.floor(window.innerHeight - panelTop - panelViewportGap));
    panel.style.setProperty("--panel-max-height", `${availableHeight}px`);
  };

  const requestFitCompareNavPanels = () => {
    if (panelFitRaf !== null) return;

    panelFitRaf = window.requestAnimationFrame(() => {
      panelFitRaf = null;
      compareNavItems.forEach(fitCompareNavPanel);
    });
  };

  const scheduleFitCompareNavPanel = (item) => {
    const panel = item.querySelector(".compare-nav__panel");

    if (!panel) return;

    const existingTimeout = panelFitTimeouts.get(panel);

    if (existingTimeout) {
      window.clearTimeout(existingTimeout);
    }

    fitCompareNavPanel(item);
    window.requestAnimationFrame(() => fitCompareNavPanel(item));

    const timeoutId = window.setTimeout(() => {
      fitCompareNavPanel(item);
      panelFitTimeouts.delete(panel);
    }, 190);

    panelFitTimeouts.set(panel, timeoutId);
  };

  const scheduleFitCompareNavPanels = () => {
    requestFitCompareNavPanels();
    window.requestAnimationFrame(requestFitCompareNavPanels);
  };

  compareNavItems.forEach((item) => {
    item.addEventListener("pointerenter", () => scheduleFitCompareNavPanel(item));
    item.addEventListener("focusin", () => scheduleFitCompareNavPanel(item));
  });

  scheduleFitCompareNavPanels();
  window.addEventListener("load", scheduleFitCompareNavPanels, { once: true });
  window.addEventListener("pageshow", scheduleFitCompareNavPanels);
  window.addEventListener("resize", scheduleFitCompareNavPanels);

  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleFitCompareNavPanels).catch(() => {});
  }
}

const compareStack = document.querySelector("[data-compare-stack]");

if (compareStack) {
  const stickyStage = compareStack.querySelector(".compare-stack__sticky");
  const stackCards = [...compareStack.querySelectorAll("[data-stack-card]")];
  let stackRaf = null;
  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const easeOutCubic = (value) => 1 - ((1 - value) ** 3);
  const getStackTimeline = (stageHeight) => {
    if (window.innerWidth >= 1500) {
      return {
        secondHiddenOffsetMultiplier: 1.38,
        thirdHiddenOffsetMultiplier: 2.18,
        firstPause: stageHeight * 0.3,
        secondDuration: stageHeight * 0.66,
        secondPause: stageHeight * 0.5,
        thirdDuration: stageHeight * 0.74
      };
    }

    if (window.innerWidth >= 1201) {
      return {
        secondHiddenOffsetMultiplier: 1.34,
        thirdHiddenOffsetMultiplier: 1.96,
        firstPause: stageHeight * 0.28,
        secondDuration: stageHeight * 0.7,
        secondPause: stageHeight * 0.42,
        thirdDuration: stageHeight * 0.78
      };
    }

    return {
      secondHiddenOffsetMultiplier: 1.28,
      thirdHiddenOffsetMultiplier: 1.42,
      firstPause: stageHeight * 0.18,
      secondDuration: stageHeight * 0.7,
      secondPause: stageHeight * 0.18,
      thirdDuration: stageHeight * 0.72
    };
  };

  const resetStack = () => {
    const isLinearLayout = !stickyStage || stackCards.length < 3 || window.innerWidth <= 760;
    const {
      secondHiddenOffsetMultiplier,
      thirdHiddenOffsetMultiplier
    } = getStackTimeline(stickyStage?.getBoundingClientRect().height || 0);

    stackCards.forEach((card, index) => {
      const hiddenOffsetMultiplier = index === 2 ? thirdHiddenOffsetMultiplier : secondHiddenOffsetMultiplier;
      const isVisible = isLinearLayout || index === 0;
      card.style.setProperty("--stack-offset", isVisible ? "0px" : `${hiddenOffsetMultiplier * 100}%`);
      card.style.setProperty("--stack-opacity", isVisible ? "1" : "0");
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
    const {
      secondHiddenOffsetMultiplier,
      thirdHiddenOffsetMultiplier,
      firstPause,
      secondDuration,
      secondPause,
      thirdDuration
    } = getStackTimeline(stageHeight);
    const secondTravel = stageHeight * secondHiddenOffsetMultiplier + 24;
    const thirdTravel = stageHeight * thirdHiddenOffsetMultiplier + 24;
    const progress = Math.max(0, stackTop - containerRect.top);
    const secondStart = firstPause;
    const secondEnd = secondStart + secondDuration;
    const thirdStart = secondEnd + secondPause;

    const secondProgress = easeOutCubic(clamp01((progress - secondStart) / secondDuration));
    const thirdProgress = easeOutCubic(clamp01((progress - thirdStart) / thirdDuration));

    stackCards[0].style.setProperty("--stack-offset", "0px");
    stackCards[0].style.setProperty("--stack-opacity", "1");
    stackCards[1].style.setProperty("--stack-offset", `${(1 - secondProgress) * secondTravel}px`);
    stackCards[1].style.setProperty("--stack-opacity", `${clamp01(secondProgress / 0.14)}`);
    stackCards[2].style.setProperty("--stack-offset", `${(1 - thirdProgress) * thirdTravel}px`);
    stackCards[2].style.setProperty("--stack-opacity", `${clamp01(thirdProgress / 0.12)}`);
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

const compareReviewSections = document.querySelectorAll("[data-review-compare]");

if (compareReviewSections.length) {
  const reviewDataset = {
    helsana: {
      name: "Helsana",
      logo: "./Helsana.svg",
      label: "Caisse-maladie & complementaires",
      score: 4.7,
      reviews: 1284,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["CL", "AR", "MB"],
      metrics: [
        { label: "Prime / couverture", value: 4.6 },
        { label: "Clarte des garanties", value: 4.8 },
        { label: "Service client", value: 4.7 },
        { label: "Remboursement", value: 4.5 },
        { label: "Experience digitale", value: 4.8 }
      ],
      sentiment: { positive: 1022, neutral: 198, negative: 64 },
      quote: {
        text: "J'ai surtout gagne en clarte sur la franchise et les options utiles. La comparaison etait beaucoup plus lisible que d'habitude.",
        author: "Camille, Lausanne",
        badge: "Avis verifie"
      }
    },
    css: {
      name: "CSS",
      logo: "./css.svg",
      label: "Assurance de base & service famille",
      score: 4.5,
      reviews: 976,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["LD", "MS", "JP"],
      metrics: [
        { label: "Prime / couverture", value: 4.4 },
        { label: "Clarte des garanties", value: 4.5 },
        { label: "Service client", value: 4.6 },
        { label: "Remboursement", value: 4.4 },
        { label: "Experience digitale", value: 4.6 }
      ],
      sentiment: { positive: 734, neutral: 182, negative: 60 },
      quote: {
        text: "Le service est rassurant et la lecture du contrat reste assez simple, surtout pour comparer plusieurs profils d'une meme famille.",
        author: "Maya, Geneve",
        badge: "Avis verifie"
      }
    },
    sanitas: {
      name: "Sanitas",
      logo: "./sanitas.svg",
      label: "Base & couverture complementaire",
      score: 4.4,
      reviews: 842,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["SL", "FM", "AR"],
      metrics: [
        { label: "Prime / couverture", value: 4.3 },
        { label: "Clarte des garanties", value: 4.4 },
        { label: "Service client", value: 4.5 },
        { label: "Remboursement", value: 4.3 },
        { label: "Experience digitale", value: 4.6 }
      ],
      sentiment: { positive: 618, neutral: 165, negative: 59 },
      quote: {
        text: "Le ressenti global est bon, surtout sur l'espace client. Oursa aide bien a voir les differences sans noyer l'utilisateur.",
        author: "Sofia, Fribourg",
        badge: "Avis Oursa"
      }
    },
    swica: {
      name: "SWICA",
      logo: "./Swica.svg",
      label: "Sante & accompagnement quotidien",
      score: 4.6,
      reviews: 913,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["NS", "CM", "VT"],
      metrics: [
        { label: "Prime / couverture", value: 4.4 },
        { label: "Clarte des garanties", value: 4.7 },
        { label: "Service client", value: 4.8 },
        { label: "Remboursement", value: 4.6 },
        { label: "Experience digitale", value: 4.5 }
      ],
      sentiment: { positive: 709, neutral: 146, negative: 58 },
      quote: {
        text: "Le point fort, c'est la sensation d'etre accompagne. Le score Oursa colle assez bien a mon ressenti sur le service client.",
        author: "Nicolas, Sion",
        badge: "Avis verifie"
      }
    },
    groupemutuel: {
      name: "Groupe Mutuel",
      logo: "./Groupemutuel.svg",
      label: "Base, complementaire & options",
      score: 4.3,
      reviews: 1105,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["ET", "JM", "LA"],
      metrics: [
        { label: "Prime / couverture", value: 4.4 },
        { label: "Clarte des garanties", value: 4.1 },
        { label: "Service client", value: 4.2 },
        { label: "Remboursement", value: 4.3 },
        { label: "Experience digitale", value: 4.1 }
      ],
      sentiment: { positive: 781, neutral: 238, negative: 86 },
      quote: {
        text: "Quand plusieurs options existent, la presentation compte beaucoup. Oursa aide a remettre les garanties dans le bon ordre.",
        author: "Elena, Neuchatel",
        badge: "Avis Oursa"
      }
    },
    axa: {
      name: "AXA",
      logo: "./Axa.svg",
      label: "Auto, habitation & protection",
      score: 4.2,
      reviews: 668,
      verifiedLabel: "Avis collectes sur Oursa",
      update: "Mis a jour en avril 2026",
      avatars: ["AR", "TK", "PM"],
      metrics: [
        { label: "Prime / couverture", value: 4.1 },
        { label: "Clarte des garanties", value: 4.2 },
        { label: "Service client", value: 4.3 },
        { label: "Remboursement", value: 4.1 },
        { label: "Experience digitale", value: 4.4 }
      ],
      sentiment: { positive: 476, neutral: 135, negative: 57 },
      quote: {
        text: "Pour l'auto et l'habitation, c'est surtout la lecture du niveau de couverture qui m'a aidee. Le format est facile a comparer.",
        author: "Pauline, Nyon",
        badge: "Avis Oursa"
      }
    }
  };

  const formatReviewCount = (value) => value.toLocaleString("fr-CH");
  const formatMetric = (value) => value.toFixed(1);

  const renderEmptyCard = () => `
    <article class="compare-review-card compare-review-card--empty">
      <strong>Ajoutez un second assureur</strong>
      <p>Selectionnez une autre marque pour mettre les scores, les criteres et le sentiment des avis Oursa en regard.</p>
    </article>
  `;

  const renderReviewCard = (insurer) => {
    const totalSentiment = insurer.sentiment.positive + insurer.sentiment.neutral + insurer.sentiment.negative;
    const positiveWidth = (insurer.sentiment.positive / totalSentiment) * 100;
    const neutralWidth = (insurer.sentiment.neutral / totalSentiment) * 100;
    const negativeWidth = (insurer.sentiment.negative / totalSentiment) * 100;

    return `
      <article class="compare-review-card">
        <div class="compare-review-card__top">
          <div class="compare-review-card__brand">
            <div class="compare-review-card__logo">
              <img src="${insurer.logo}" alt="${insurer.name}" />
            </div>
            <div class="compare-review-card__brand-meta">
              <h3>${insurer.name}</h3>
              <p>${insurer.label}</p>
            </div>
          </div>
          <div class="compare-review-card__score">
            <strong>${formatMetric(insurer.score)}</strong>
            <span>Score Oursa</span>
          </div>
        </div>

        <div class="compare-review-card__badges">
          <span class="compare-review-card__badge compare-review-card__badge--highlight">${insurer.verifiedLabel}</span>
          <span class="compare-review-card__badge">${formatReviewCount(insurer.reviews)} avis</span>
          <span class="compare-review-card__badge">${insurer.update}</span>
        </div>

        <div class="compare-review-card__panel">
          <div class="compare-review-card__panel-title">
            <strong>Lecture Oursa</strong>
            <span>5 criteres compares</span>
          </div>
          <div class="compare-review-card__metrics">
            ${insurer.metrics.map((metric) => `
              <div class="compare-review-card__metric">
                <label>${metric.label}</label>
                <strong>${formatMetric(metric.value)}</strong>
                <div class="compare-review-card__metric-bar">
                  <span class="compare-review-card__metric-fill" style="width: ${(metric.value / 5) * 100}%"></span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="compare-review-card__panel">
          <div class="compare-review-card__sentiment-head">
            <div class="compare-review-card__avatars" aria-hidden="true">
              ${insurer.avatars.map((avatar) => `<span class="compare-review-card__avatar">${avatar}</span>`).join("")}
            </div>
            <div class="compare-review-card__sentiment-meta">
              <strong>Sentiment des avis</strong>
              <span>Base sur ${formatReviewCount(insurer.reviews)} retours</span>
            </div>
          </div>
          <div class="compare-review-card__sentiment-bar" aria-hidden="true">
            <span class="compare-review-card__sentiment-fill compare-review-card__sentiment-fill--positive" style="width: ${positiveWidth}%"></span>
            <span class="compare-review-card__sentiment-fill compare-review-card__sentiment-fill--neutral" style="width: ${neutralWidth}%"></span>
            <span class="compare-review-card__sentiment-fill compare-review-card__sentiment-fill--negative" style="width: ${negativeWidth}%"></span>
          </div>
          <div class="compare-review-card__sentiment-stats">
            <div>
              <span>Positif</span>
              <strong>${formatReviewCount(insurer.sentiment.positive)}</strong>
            </div>
            <div>
              <span>Neutre</span>
              <strong>${formatReviewCount(insurer.sentiment.neutral)}</strong>
            </div>
            <div>
              <span>Negatif</span>
              <strong>${formatReviewCount(insurer.sentiment.negative)}</strong>
            </div>
          </div>
        </div>

        <div class="compare-review-card__quote">
          <blockquote>"${insurer.quote.text}"</blockquote>
          <div class="compare-review-card__quote-footer">
            <strong>${insurer.quote.author}</strong>
            <span>${insurer.quote.badge}</span>
          </div>
        </div>
      </article>
    `;
  };

  compareReviewSections.forEach((section) => {
    const optionButtons = [...section.querySelectorAll("[data-review-option]")];
    const selectedCount = section.querySelector("[data-review-selected-count]");
    const selectedLabel = section.querySelector("[data-review-selected-label]");
    const grid = section.querySelector("[data-review-grid]");

    let selected = optionButtons
      .filter((button) => button.getAttribute("aria-pressed") === "true")
      .map((button) => button.dataset.reviewOption)
      .filter(Boolean)
      .slice(0, 2);

    if (!selected.length) {
      selected = optionButtons
        .slice(0, 2)
        .map((button) => button.dataset.reviewOption)
        .filter(Boolean);
    }

    const syncButtons = () => {
      optionButtons.forEach((button) => {
        const isActive = selected.includes(button.dataset.reviewOption);
        button.setAttribute("aria-pressed", String(isActive));
      });
    };

    const renderGrid = () => {
      if (!grid) return;

      const selectedCards = selected
        .map((key) => reviewDataset[key])
        .filter(Boolean)
        .map((insurer) => renderReviewCard(insurer));

      const placeholders = Array.from({ length: Math.max(0, 2 - selectedCards.length) }, () => renderEmptyCard());
      grid.innerHTML = [...selectedCards, ...placeholders].join("");
    };

    const syncStatus = () => {
      if (selectedCount) {
        selectedCount.textContent = String(selected.length);
      }

      if (selectedLabel) {
        selectedLabel.textContent = selected.length === 2
          ? "/2 assureurs selectionnes"
          : "/2 assureurs selectionnes · choisissez encore 1 assureur";
      }
    };

    const syncReviewCompare = () => {
      syncButtons();
      syncStatus();
      renderGrid();
    };

    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const { reviewOption } = button.dataset;

        if (!reviewOption || !reviewDataset[reviewOption]) return;

        if (selected.includes(reviewOption)) {
          if (selected.length === 1) return;
          selected = selected.filter((item) => item !== reviewOption);
        } else if (selected.length < 2) {
          selected = [...selected, reviewOption];
        } else {
          selected = [selected[1], reviewOption];
        }

        syncReviewCompare();
      });
    });

    syncReviewCompare();
  });
}
