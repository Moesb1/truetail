/* ============ TrueTail ============ */

/* Clear any order saved by the earlier version of the site. */
localStorage.removeItem("truetail-cart");

/* ============ Arabic copy ============
   Keys match the data-i18n attributes in index.html. Values are HTML, so
   inline tags like <em> and <br> are preserved when switching. */
const AR = {
  "nav.home": "الرئيسية",
  "nav.story": "قصتنا",
  "nav.treats": "منتجاتنا",
  "nav.contact": "تواصل",
  "nav.cta": "تواصل معنا",

  "hero.eyebrow": '<span class="paw-icon">🐾</span> مكافآت طبيعية للكلاب والقطط',
  "hero.h1": "مكوّنات حقيقية.<br><em>حبٌّ حقيقي.</em>",
  "hero.sub":
    "مكافآت طبيعية فاخرة تُحضَّر على دفعات صغيرة في لبنان. بلا حشوات، وبلا ألوان أو مواد حافظة صناعية. طعام حقيقي فقط يحبّه أليفك.",
  "hero.btn1": "ما الذي سيأتي",
  "hero.btn2": "قصتنا",
  "hero.script": "صُنعت بعناية، وبكل حب.",
  "hero.badge": "طبيعية ١٠٠٪<br>صُنعت في لبنان",

  "treats.eyebrow": "طبيعية ١٠٠٪. لذيذة ١٠٠٪.",
  "treats.h2": "<em>منتجاتنا</em>",
  "soon.badge": "قريباً",
  "soon.h3": "مكافآتنا شارفت على الجهوزية",
  "soon.p":
    "نضع اللمسات الأخيرة على وصفاتنا وتغليفنا. سنُعلن عن النكهات والأحجام والأسعار هنا قريباً جداً.",
  "soon.strong": "تريد أن تكون أول من يعلم؟ راسِلنا وسنُخبرك لحظة الإطلاق.",
  "soon.btn": "راسِلنا على واتساب",

  "promise.eyebrow": "ما نؤمن به",
  "promise.h2": "<em>وعدنا</em>",
  p1t: "مكوّنات طبيعية",
  p1d: "مكوّنات حقيقية ومغذية تعرفها وتثق بها.",
  p2t: "بلا مواد حافظة صناعية",
  p2d: "بلا ألوان أو نكهات أو مواد حافظة صناعية. أبداً.",
  p3t: "جودة منزلية",
  p3d: "تُحضَّر بعناية على دفعات صغيرة وبكل حب.",
  p4t: "خالية من الحبوب",
  p4d: "وصفات لطيفة، سهلة على المعدة الحساسة.",
  p5t: "صُنعت في لبنان",
  p5d: "نفتخر بتحضيرها في لبنان. 🇱🇧",
  p6t: "للكلاب والقطط",
  p6d: "مكافآت لذيذة وصحية لأعز أصدقائك.",

  "story.eyebrow": "قصتنا",
  "story.h2": "كل أليف يستحق مكافآت <em>تطمئن</em> إلى تقديمها.",
  "story.p1":
    "لهذا أنشأنا TrueTail. علامة قامت على الجودة والصدق ومكوّنات تعرفها. كل دفعة تُحضَّر يدوياً في لبنان، من دجاج حقيقي وبطاطا حلوة وشوفان ومكوّنات بسيطة أخرى. لا شيء مخفي، ولا شيء صناعي.",
  "story.p2": "لأن الحيوانات السليمة تستحق مكافآت سليمة.",
  "story.script": "صُنعت بحب لرفاقنا الأوفياء.",
  "story.btn": "اكتشف منتجاتنا",

  "footer.explore": "تصفّح",
  "footer.touch": "تواصل معنا",
  "footer.tag": "مكوّنات حقيقية. حبٌّ حقيقي.",
  "footer.bottom": "نفتخر بصناعتها في لبنان 🇱🇧 · TrueTail © 2026",
};

/* ============ Language switch ============ */
const langBtn = document.getElementById("langBtn");
const i18nNodes = document.querySelectorAll("[data-i18n]");

/* Keep the English markup so switching back is lossless. */
i18nNodes.forEach((el) => (el.dataset.en = el.innerHTML));

function setLang(lang) {
  const arabic = lang === "ar";
  i18nNodes.forEach((el) => {
    const key = el.dataset.i18n;
    if (arabic && AR[key]) el.innerHTML = AR[key];
    else el.innerHTML = el.dataset.en;
  });
  document.documentElement.lang = arabic ? "ar" : "en";
  document.documentElement.dir = arabic ? "rtl" : "ltr";
  langBtn.textContent = arabic ? "EN" : "عربي";
  localStorage.setItem("truetail-lang", lang);
}

/* ?lang=ar in the URL wins, so an Arabic link can be shared directly. */
const urlLang = new URLSearchParams(location.search).get("lang");
setLang(
  urlLang === "ar" || urlLang === "en"
    ? urlLang
    : localStorage.getItem("truetail-lang") === "ar"
      ? "ar"
      : "en"
);

langBtn.addEventListener("click", () =>
  setLang(document.documentElement.lang === "ar" ? "en" : "ar")
);

/* ============ Nav behavior ============ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

/* ============ Reveal on scroll ============ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
