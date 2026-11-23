/* index.html: счетчик-анимация + слайдер новинок */

function animateCounterWhenVisible() {
  const block = document.querySelector("[data-counter]");
  if (!block) return;

  const digitsEl = [...block.querySelectorAll("[data-digit]")];
  const target = Number(block.getAttribute("data-counter-target") || "1212");

  let started = false;

  const run = () => {
    if (started) return;
    started = true;

    const str = String(target).padStart(digitsEl.length, "0");
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const current = Math.floor(t * target);
      const curStr = String(current).padStart(digitsEl.length, "0");

      digitsEl.forEach((el, i) => el.textContent = curStr[i]);

      if (t < 1) requestAnimationFrame(tick);
      else digitsEl.forEach((el, i) => el.textContent = str[i]);
    }
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some(en => en.isIntersecting)) {
      run();
      io.disconnect();
    }
  }, { threshold: 0.35 });

  io.observe(block);
}

// function slider() {
//   const root = document.querySelector("[data-slider]");
//   if (!root) return;

//   const track = root.querySelector("[data-slider-track]");
//   const slides = [...root.querySelectorAll("[data-slide]")];
//   const prev = root.querySelector("[data-prev]");
//   const next = root.querySelector("[data-next]");
//   const dotsWrap = root.querySelector("[data-dots]");

//   let index = 0;

//   const makeDots = () => {
//     dotsWrap.innerHTML = "";
//     slides.forEach((_, i) => {
//       const b = document.createElement("button");
//       b.className = "dot" + (i === index ? " is-active" : "");
//       b.type = "button";
//       b.addEventListener("click", () => {
//         index = i;
//         update();
//       });
//       dotsWrap.appendChild(b);
//     });
//   };

//   const update = () => {
//     const slideW = slides[0].getBoundingClientRect().width;
//     const gap = parseFloat(getComputedStyle(track).gap || "0");
//     const x = (slideW + gap) * index;
//     track.style.transform = `translateX(${-x}px)`;

//     [...dotsWrap.children].forEach((d, i) => d.classList.toggle("is-active", i === index));
//     prev.disabled = index === 0;
//     next.disabled = index === slides.length - 1;
//   };

//   prev.addEventListener("click", () => {
//     index = Math.max(0, index - 1);
//     update();
//   });
//   next.addEventListener("click", () => {
//     index = Math.min(slides.length - 1, index + 1);
//     update();
//   });

//   makeDots();
//   update();
//   window.addEventListener("resize", update);
// }

document.addEventListener("DOMContentLoaded", () => {
  animateCounterWhenVisible();
  slider();
});



















/* js/index.js (замените только slider()) */

function slider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const viewport = root.querySelector(".slider-viewport");
  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector("[data-dots]");

  if (!viewport || !track || slides.length === 0) return;

  let page = 0;

  const getPerView = () => {
    // как на макете ПК — 2 карточки, на узких — 1
    return window.matchMedia("(max-width: 820px)").matches ? 1 : 2;
  };

  const getMetrics = () => {
    const perView = getPerView();
    const slideW = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const pages = Math.ceil(slides.length / perView);
    return { perView, slideW, gap, pages };
  };

  const makeDots = () => {
    const { pages } = getMetrics();
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pages; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot" + (i === page ? " is-active" : "");
      b.addEventListener("click", () => {
        page = i;
        update();
      });
      dotsWrap.appendChild(b);
    }
  };

  const update = () => {
    const { perView, slideW, gap, pages } = getMetrics();

    // clamp page
    page = Math.max(0, Math.min(page, pages - 1));

    // “страница” = сдвиг на perView карточек
    const rawOffset = page * (slideW + gap) * perView;

    // чтобы не уезжало дальше конца
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const offset = Math.min(rawOffset, maxOffset);

    track.style.transform = `translateX(${-offset}px)`;

    // dots + buttons
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("is-active", i === page));
    prev.disabled = page === 0;
    next.disabled = page === pages - 1;
  };

  prev?.addEventListener("click", () => { page--; update(); });
  next?.addEventListener("click", () => { page++; update(); });

  makeDots();
  update();

  window.addEventListener("resize", () => {
    makeDots();
    update();
  });
}