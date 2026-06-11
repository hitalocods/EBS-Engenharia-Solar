const WHATSAPP = "https://wa.me/5586999917016";

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const billInput = document.getElementById("billInput");
const typeInput = document.getElementById("typeInput");
const savingValue = document.getElementById("savingValue");
const savingYear = document.getElementById("savingYear");
const analysisBtn = document.getElementById("analysisBtn");

if (window.lucide) {
  window.lucide.createIcons();
}

function onScrollHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", onScrollHeader);
onScrollHeader();

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function moneyToNumber(value) {
  const onlyNumbers = value.replace(/\D/g, "");
  return Number(onlyNumbers || 0) / 100;
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function updateSavings() {
  const bill = moneyToNumber(billInput.value);
  const percent = Number(typeInput.value);
  const monthly = Math.max(0, bill * percent);
  savingValue.textContent = `${formatBRL(monthly)}/mes`;
  savingYear.textContent = `Isso e ${formatBRL(monthly * 12)} por ano`;
}

billInput.addEventListener("input", () => {
  const value = moneyToNumber(billInput.value);
  billInput.value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  updateSavings();
});

typeInput.addEventListener("change", updateSavings);
updateSavings();

analysisBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  const type = typeInput.options[typeInput.selectedIndex].text;
  const text = `Ola, quero receber uma analise gratuita. Minha conta e ${billInput.value}, imovel ${type}, cidade ${city}.`;
  window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
});

const projectSwiper = new Swiper(".project-swiper", {
  slidesPerView: 1.08,
  spaceBetween: 18,
  loop: true,
  pagination: {
    el: ".project-swiper .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    720: { slidesPerView: 2.2, spaceBetween: 22 },
    1024: { slidesPerView: 3.3, spaceBetween: 24 },
    1240: { slidesPerView: 4, spaceBetween: 26 },
  },
});

const testimonialSwiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  loop: true,
  allowTouchMove: true,
  allowSlidePrev: true,
  allowSlideNext: true,
  simulateTouch: true,
  grabCursor: true,
  slideToClickedSlide: false,
  touchRatio: 1,
  touchAngle: 45,
  threshold: 10,
  longSwipes: true,
  longSwipesRatio: 0.5,
  resistanceRatio: 0.85,
  preventInteractionOnTransition: false,
  touchStartPreventDefault: false,
  touchStartForcePreventDefault: false,
  touchMoveStopPropagation: false,
  touchAction: "pan-y",
  followFinger: true,
  preventClicks: false,
  preventClicksPropagation: false,
  passiveListeners: false,
  autoplay: {
    delay: 4300,
    disableOnInteraction: false,
    enabled: true,
  },
  pagination: {
    el: ".testimonial-swiper .swiper-pagination",
    clickable: true,
  },
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".brand, .nav-links a, .nav-cta", {
    y: -18,
    opacity: 0,
    duration: 0.8,
    stagger: 0.04,
    ease: "power3.out",
  });

  gsap.from(".eyebrow, .hero-copy h1, .hero-copy p, .hero-actions, .hero-features", {
    y: 34,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    delay: 0.18,
    ease: "power3.out",
  });

  gsap.from(".calculator-card", {
    y: 46,
    opacity: 0,
    duration: 1,
    delay: 0.45,
    ease: "power3.out",
  });

  gsap.to(".hero-bg", {
    scale: 1,
    duration: 2.4,
    ease: "power2.out",
  });

  gsap.utils.toArray(".section h2, .section p, .project-card, .steps-grid div, .compare-card, .benefit-list li, .video-grid button, .final-cta").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
      },
      y: 34,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
    });
  });

  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
        once: true,
      },
      onUpdate: () => {
        counter.textContent = target % 1 === 0 ? Math.round(obj.value) : obj.value.toFixed(1).replace(".", ",");
      },
    });
  });
}

projectSwiper.on("slideChange", () => {
  if (!window.gsap) return;
  gsap.from(".project-swiper .swiper-slide-active", {
    scale: 0.98,
    opacity: 0.8,
    duration: 0.35,
    ease: "power2.out",
  });
});
