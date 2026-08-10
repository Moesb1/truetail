/* ============ TrueTail store ============ */

const WHATSAPP_NUMBER = "96179311378";

const PRODUCTS = [
  {
    id: "chicken",
    name: "Chicken & Sweet Potato",
    desc: "High-protein chicken with fiber-rich sweet potato. Our classic recipe for strong, happy pups.",
    img: "images/pouch-chicken.jpg",
  },
  {
    id: "pb-banana",
    name: "Peanut Butter & Banana",
    desc: "Creamy peanut butter and real banana. An irresistible reward for treat time.",
    img: "images/pouch-pb.jpg",
  },
  {
    id: "oats-pumpkin",
    name: "Oats & Pumpkin",
    desc: "Gentle oats and soothing pumpkin. Easy on digestion, big on flavor.",
    img: "images/pouch-oats.jpg",
  },
];

/* ============ Render product cards ============ */
const grid = document.getElementById("productGrid");

PRODUCTS.forEach((p) => {
  const card = document.createElement("article");
  card.className = "product-card reveal";
  card.innerHTML = `
    <div class="product-img"><img src="${p.img}" alt="TrueTail ${p.name} pouch" loading="lazy"></div>
    <div class="product-body">
      <h3>${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-foot">
        <span class="soon-pill">Sizes &amp; pricing coming soon</span>
        <button class="add-btn">Add to Order</button>
      </div>
    </div>`;

  const addBtn = card.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    addToCart(p.id);
    addBtn.textContent = "Added ✓";
    addBtn.classList.add("added");
    setTimeout(() => {
      addBtn.textContent = "Add to Order";
      addBtn.classList.remove("added");
    }, 1200);
  });

  grid.appendChild(card);
});

/* ============ Cart state ============ */
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem("truetail-cart")) || [];
  /* Older carts stored a size per line. Merge those into one line per product. */
  saved.forEach((i) => {
    if (!PRODUCTS.some((p) => p.id === i.id)) return;
    const line = cart.find((c) => c.id === i.id);
    if (line) line.qty += i.qty || 1;
    else cart.push({ id: i.id, qty: i.qty || 1 });
  });
} catch (_) {
  cart = [];
}

function saveCart() {
  localStorage.setItem("truetail-cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find((i) => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  saveCart();
  renderCart();
  bumpCount();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i !== item);
  saveCart();
  renderCart();
}

/* ============ Cart UI ============ */
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartFoot = document.getElementById("cartFoot");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCart();
});

function bumpCount() {
  cartCountEl.classList.remove("bump");
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add("bump");
}

function renderCart() {
  const count = cart.reduce((n, i) => n + i.qty, 0);
  cartCountEl.textContent = count;

  if (cart.length === 0) {
    cartItemsEl.innerHTML =
      '<p class="cart-empty">Your order is empty.<br>Add some treats!</p>';
    cartFoot.hidden = true;
    return;
  }

  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <div class="qty-row">
          <button class="qty-btn" data-act="dec" aria-label="Decrease">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-act="inc" aria-label="Increase">+</button>
        </div>
      </div>`;
    row.querySelector('[data-act="dec"]').addEventListener("click", () =>
      changeQty(item.id, -1)
    );
    row.querySelector('[data-act="inc"]').addEventListener("click", () =>
      changeQty(item.id, 1)
    );
    cartItemsEl.appendChild(row);
  });

  cartFoot.hidden = false;

  const lines = cart.map((i) => {
    const p = PRODUCTS.find((pr) => pr.id === i.id);
    return `- ${p.name} x${i.qty}`;
  });
  const msg = [
    "Hello TrueTail! I am interested in ordering:",
    ...lines,
    "Could you let me know the available sizes and prices?",
  ].join("\n");
  checkoutBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

renderCart();

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
