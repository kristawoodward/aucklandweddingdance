// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
}

// Reviews carousel
const track = document.querySelector(".track");
document.querySelectorAll("[data-slide]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!track) return;
    const card = track.querySelector(".review");
    const step = card ? card.getBoundingClientRect().width + 24 : 464;
    track.scrollBy({ left: Number(btn.dataset.slide) * step, behavior: "smooth" });
  });
});

// FAQ: keep one answer open at a time
const faqs = document.querySelectorAll(".faq details");
faqs.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  });
});

// Enquiry form: opens the visitor's email app with the enquiry filled in
const form = document.querySelector("#enquiry");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const names = data.get("names") || "";
    const lines = [
      `Names: ${names}`,
      `Wedding date: ${data.get("date") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Interested in: ${data.getAll("interest").join(", ") || "Not sure yet"}`,
      "",
      data.get("message") || "",
    ];
    const subject = `Wedding dance enquiry${names ? ` from ${names}` : ""}`;
    window.location.href =
      `mailto:aklweddingdance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    form.hidden = true;
    document.querySelector(".thanks").hidden = false;
  });
}
