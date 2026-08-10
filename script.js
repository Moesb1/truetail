/* ============ TrueTail ============ */

/* Clear any order saved by the earlier version of the site. */
localStorage.removeItem("truetail-cart");

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
