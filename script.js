
      (function () {
        const path = document.getElementById("flightpath");
        const plane = document.getElementById("plane");
        if (!path || !plane) return;

        const pathLength = path.getTotalLength();
        const durationMs = 7000; // same speed as before, tweak to taste
        const delta = 0.5; // small step (in path units) used to work out heading

        // Respect users who've asked their OS/browser to reduce motion.
        const prefersReducedMotion = window.matchMedia
          ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
          : false;

        function pointAt(distance) {
          // clamp so getPointAtLength never receives an out-of-range value
          const d = Math.max(0, Math.min(pathLength, distance));
          return path.getPointAtLength(d);
        }

        function render(distance) {
          const current = pointAt(distance);
          const ahead = pointAt(distance + delta);
          const angle =
            Math.atan2(ahead.y - current.y, ahead.x - current.x) *
            (180 / Math.PI);

          plane.setAttribute(
            "transform",
            `translate(${current.x} ${current.y}) rotate(${angle})`
          );
        }

        if (prefersReducedMotion) {
          // Just place it partway along the route, static.
          render(pathLength * 0.5);
          return;
        }

        let startTime = null;

        function frame(timestamp) {
          if (startTime === null) startTime = timestamp;
          const elapsed = (timestamp - startTime) % durationMs;
          const progress = elapsed / durationMs; // 0 -> 1, loops
          render(progress * pathLength);
          requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
      })();


       // Simple sliding photo carousel for the About Us section.
      (function () {
        const track = document.getElementById("aboutSliderTrack");
        const slider = document.getElementById("aboutSlider");
        if (!track || !slider) return;

        const dots = Array.from(slider.querySelectorAll(".about-dot"));
        const prevBtn = slider.querySelector(".about-slider-arrow.prev");
        const nextBtn = slider.querySelector(".about-slider-arrow.next");
        const slideCount = track.children.length;
        const autoplayMs = 4500;

        let index = 0;
        let timer = null;

        function goTo(newIndex) {
          index = (newIndex + slideCount) % slideCount;
          track.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
          dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === index)
          );
        }

        function startAutoplay() {
          stopAutoplay();
          timer = setInterval(() => goTo(index + 1), autoplayMs);
        }

        function stopAutoplay() {
          if (timer) clearInterval(timer);
        }

        dots.forEach((dot) => {
          dot.addEventListener("click", () => {
            goTo(parseInt(dot.dataset.index, 10));
            startAutoplay(); // reset the timer after a manual jump
          });
        });

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            goTo(index - 1);
            startAutoplay();
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            goTo(index + 1);
            startAutoplay();
          });
        }

        // Pause on hover so visitors can read/look without it jumping.
        slider.addEventListener("mouseenter", stopAutoplay);
        slider.addEventListener("mouseleave", startAutoplay);

        goTo(0);
        startAutoplay();
      })();

      const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");

menu.addEventListener("click",()=>{
nav.classList.toggle("active");
});