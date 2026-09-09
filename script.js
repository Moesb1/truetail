/* ============ TrueTail ============ */

/* Storage throws in private mode and inside some in-app browsers (WhatsApp,
   Instagram). Never let that take the whole script down. */
function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (_) {}
  return null;
}
try { localStorage.removeItem("truetail-cart"); } catch (_) {}

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
    "مكافآت طبيعية فاخرة تُحضَّر في لبنان. بلا حشوات، وبلا ألوان أو مواد حافظة صناعية. طعام حقيقي فقط يحبّه أليفك.",
  "hero.btn1": "اطلب الآن",
  "hero.btn2": "قصتنا",
  "hero.script": "صُنعت بعناية، وبكل حب.",
  "hero.badge": "طبيعية ١٠٠٪<br>صُنعت في لبنان",

  "treats.eyebrow": "طبيعية ١٠٠٪. لذيذة ١٠٠٪.",
  "treats.h2": "<em>منتجاتنا</em>",

  "prod.tag": "متوفر الآن",
  "prod.name": "مكافآت بنكهة اليقطين",
  "prod.kind": "مكافآت طبيعية للكلاب · مخبوزة بالفرن",
  "prod.f1": "مكوّنات طبيعية",
  "prod.f2": "اليقطين يدعم الهضم الصحي",
  "prod.f3": "مخبوزة بالفرن",
  "prod.f4": "بلا مواد حافظة صناعية",
  "prod.unit": "للعلبة",
  "prod.qty": "الكمية",
  "prod.order": "اطلب عبر واتساب",
  "prod.note": "نؤكّد كل طلب عبر واتساب. الدفع عبر Whish Money أو نقداً عند التسليم.",

  "promise.eyebrow": "ما نؤمن به",
  "promise.h2": "<em>وعدنا</em>",
  p1t: "مكوّنات طبيعية",
  p1d: "مكوّنات حقيقية ومغذية تعرفها وتثق بها.",
  p2t: "بلا مواد حافظة صناعية",
  p2d: "بلا ألوان أو نكهات أو مواد حافظة صناعية. أبداً.",
  p3t: "جودة منزلية",
  p3d: "تُحضَّر بعناية وبكل حب.",
  p4t: "خالية من الحبوب",
  p4d: "وصفات لطيفة، سهلة على المعدة الحساسة.",
  p5t: "صُنعت في لبنان",
  p5d: "نفتخر بتحضيرها في لبنان. 🇱🇧",
  p6t: "للكلاب والقطط",
  p6d: "مكافآت لذيذة وصحية لأعز أصدقائك.",

  "story.eyebrow": "قصتنا",
  "story.h2": "كل أليف يستحق مكافآت <em>تطمئن</em> إلى تقديمها.",
  "story.p1":
    "لهذا أنشأنا TrueTail. علامة قامت على الجودة والصدق ومكوّنات تعرفها. كل دفعة تُحضَّر يدوياً في لبنان، من مكوّنات بسيطة تعرفها. لا شيء مخفي، ولا شيء صناعي.",
  "story.p2": "لأن الحيوانات السليمة تستحق مكافآت سليمة.",
  "story.script": "صُنعت بحب لرفاقنا الأوفياء.",
  "story.btn": "اكتشف منتجاتنا",

  "footer.explore": "تصفّح",
  "footer.touch": "تواصل معنا",
  "footer.tag": "مكوّنات حقيقية. حبٌّ حقيقي.",
  "footer.bottom": "نفتخر بصناعتها في لبنان 🇱🇧 · TrueTail © 2026",
};

/* ============ Order ============ */
const PRICE = 5;
const WHATSAPP = "96179411378";
const qtyVal = document.getElementById("qtyVal");
const qtyTotal = document.getElementById("qtyTotal");
const orderBtn = document.getElementById("orderBtn");
let qty = 1;

function renderOrder() {
  qtyVal.textContent = qty;
  qtyTotal.textContent = "$" + qty * PRICE;
  const ar = document.documentElement.lang === "ar";
  const msg = ar
    ? `مرحباً TrueTail! أريد أن أطلب:\n- مكافآت بنكهة اليقطين × ${qty}\nالمجموع: ${qty * PRICE}$`
    : `Hello TrueTail! I would like to order:\n- Pumpkin Flavored Treats x${qty}\nTotal: $${qty * PRICE}`;
  orderBtn.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

document.getElementById("qtyMinus").addEventListener("click", () => {
  if (qty > 1) qty--;
  renderOrder();
});
document.getElementById("qtyPlus").addEventListener("click", () => {
  if (qty < 99) qty++;
  renderOrder();
});
renderOrder();

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
  store("truetail-lang", lang);
  if (typeof renderOrder === "function") renderOrder();
}

/* ?lang=ar in the URL wins, so an Arabic link can be shared directly. */
const urlLang = new URLSearchParams(location.search).get("lang");
setLang(
  urlLang === "ar" || urlLang === "en"
    ? urlLang
    : store("truetail-lang") === "ar"
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

/* Safety net: if the observer never fires (or an error stopped it), make sure
   nothing stays invisible. */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.5)
        el.classList.add("visible");
    });
  }, 1200);
});
