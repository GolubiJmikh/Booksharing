/* book-details.html: модалка подтверждения + мини-галерея + "хочу прочитать" */

function modal() {
  const openBtn = document.querySelector("[data-open-modal]");
  const backdrop = document.querySelector("[data-modal-backdrop]");
  const closeBtns = document.querySelectorAll("[data-close-modal]");
  if (!openBtn || !backdrop) return;

  const open = () => backdrop.classList.add("is-open");
  const close = () => backdrop.classList.remove("is-open");

  openBtn.addEventListener("click", open);
  closeBtns.forEach(b => b.addEventListener("click", close));

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function gallery() {
  const mainImg = document.querySelector("[data-main-cover]");
  const thumbs = [...document.querySelectorAll("[data-thumb]")];
  if (!mainImg || thumbs.length === 0) return;

  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      if (!src) return;
      mainImg.src = src;

      thumbs.forEach(t => t.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  modal();
  gallery();
});