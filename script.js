(function () {
  const track = document.getElementById("track");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressFill = document.getElementById("progressFill");
  const total = 3;
  let index = 0;
  let timer;

  function render() {
    track.style.transform = `translateX(-${index * (100 / total)}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    progressFill.classList.remove("animate");
    void progressFill.offsetWidth;
    progressFill.classList.add("animate");
  }

  function goTo(i) {
    index = (i + total) % total;
    render();
    resetTimer();
  }

  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(next, 5000);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  dots.forEach((d) =>
    d.addEventListener("click", () => goTo(parseInt(d.dataset.index))),
  );

  render();
  resetTimer();

  const slider = document.getElementById("gbsSlider");
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => (touchStartX = e.touches[0].clientX),
  );
  slider.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) prev();
    else if (dx < -40) next();
  });
})();



// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }),
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple contact form handler (no backend wired up yet)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Thanks! This form is a front-end demo — connect it to an email service or backend (e.g. Formspree, EmailJS, or your own server) to receive submissions.",
  );
  this.reset();
});

// Scroll reveal for section heads and cards
const revealTargets = document.querySelectorAll(
  ".dest-card, .svc-card, .test-card, .step",
);
revealTargets.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealTargets.forEach((el) => io.observe(el));

emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_73l4az4", "YOUR_TEMPLATE_ID", this).then(
    function () {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    },
    function (error) {
      alert("Failed to send message.");
      console.log(error);
    },
  );
});

