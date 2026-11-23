/* add-book.html: drag&drop + предпросмотр фото */

function setupUpload() {
  const dz = document.querySelector("[data-dropzone]");
  const fileInput = document.querySelector("[data-file]");
  const preview = document.querySelector("[data-preview]");
  if (!dz || !fileInput || !preview) return;

  const show = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${url}" alt="Предпросмотр фото книги">`;
  };

  dz.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    show(fileInput.files?.[0]);
  });

  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };

  ["dragenter","dragover"].forEach(ev => dz.addEventListener(ev, (e) => {
    stop(e);
    dz.classList.add("is-dragover");
  }));

  ["dragleave","drop"].forEach(ev => dz.addEventListener(ev, (e) => {
    stop(e);
    dz.classList.remove("is-dragover");
  }));

  dz.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      show(file);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupUpload();
});