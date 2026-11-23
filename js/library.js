const BOOKS = [
  { id: "1", title: "Портрет Дориана Грея", author: "Оскар Уайльд", distance: 3.0, genre: "Классика", lang: "Русский", cond: "Видавшая виды", 
    cover: "assets/Дориан.jpg" },
  { id: "2", title: "Великий Гэтсби", author: "Ф. Фицджеральд", distance: 1.5, genre: "Роман", lang: "Русский", cond: "Новая", 
    cover: "assets/Гэтсби.jpg" },
  { id: "3", title: "Дюна", author: "Фрэнк Герберт", distance: 1.6, genre: "Фантастика", lang: "Русский", cond: "Новая", 
    cover: "assets/Дюна.jpg" },
  { id: "4", title: "Убийство в \"Восточном экспрессе\"", author: "Агата Кристи", distance: 1.0, genre: "Детектив", lang: "Русский", cond: "Новая", 
    cover: "assets/Убийство.jpg" },
  { id: "5", title: "Цветы для Элджернона", author: "Дэниел Киз", distance: 1.9, genre: "Проза", lang: "Русский", cond: "Новая", 
    cover: "assets/Цветы.jpg" },
  { id: "6", title: "Сияние", author: "Стивен Кинг", distance: 1.1, genre: "Ужасы", lang: "Русский", cond: "Видавшая виды", 
    cover: "assets/Сияние.jpg" },
  { id: "7", title: "Мастер и Маргарита", author: "Михаил Булгаков", distance: 3.5, genre: "Классика", lang: "Русский", cond: "Видавшая виды", 
    cover: "assets/Мастер_и_Маргарита.jpg" },
  { id: "8", title: "Грозовой перевал", author: "Эмили Бронте", distance: 3.9, genre: "Классика", lang: "Английский", cond: "Новая", 
    cover: "assets/Перевал.jpg" },
  { id: "9", title: "Преступление и наказание", author: "Федор Достоевский", distance: 3.7, genre: "Классика", lang: "Русский", cond: "Видавшая виды", 
    cover: "assets/Преступл.jpg" },
];

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
}

function applyFilters() {
  const q = (document.querySelector("[data-library-search]")?.value || "").trim().toLowerCase();
  const genres = new Set(getCheckedValues("genre"));
  const langs = new Set(getCheckedValues("lang"));
  const conds = new Set(getCheckedValues("cond"));

  return BOOKS.filter(b => {
    const matchesQ = !q || (b.title + " " + b.author).toLowerCase().includes(q);
    const matchesGenre = genres.size === 0 || genres.has(b.genre);
    const matchesLang = langs.size === 0 || langs.has(b.lang);
    const matchesCond = conds.size === 0 || conds.has(b.cond);
    return matchesQ && matchesGenre && matchesLang && matchesCond;
  });
}

function render(list) {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;

  grid.innerHTML = list.map(b => `
    
    <article class="card book-card" data-book-card>
    <a href="book-details.html?id=${encodeURIComponent(b.id)}">
      <div class="cover">
        <img src="${b.cover}" alt="Обложка: ${b.title}">
      </div>
    
      <p class="title">${b.title}</p>
    </a>
      <p class="author">${b.author}</p>
      <p class="distance">${b.distance} км от вас</p>
    
      

      <button class="icon-btn icon-heart" type="button" data-fav-toggle
        data-book-id="${b.id}" aria-label="Добавить в избранное">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 21s-7.2-4.7-9.6-8.5C.2 9.1 1.6 5.6 5 4.7c2-.5 4 .3 5.1 2 1.1-1.7 3.1-2.5 5.1-2 3.4.9 4.8 4.4 2.6 7.8C19.2 16.3 12 21 12 21z" />
        </svg>
      </button>
    </article>
    
  `).join("");
  window.BS?.syncFavoriteButtons(grid);
}

function syncFromQueryString() {
  const url = new URL(window.location.href);
  const q = url.searchParams.get("q");
  const input = document.querySelector("[data-library-search]");
  if (q && input) input.value = q;
}

function wire() {
  const input = document.querySelector("[data-library-search]");
  const filters = document.querySelector("[data-filters]");

  const update = () => render(applyFilters());

  input?.addEventListener("input", update);
  filters?.addEventListener("change", update);

  syncFromQueryString();
  update();
}

document.addEventListener("DOMContentLoaded", wire);

// Добавьте это в ваш файл js/main.js

function initFilters() {
    const sidebar = document.querySelector('[data-filters]');
    const toggle = document.querySelector('[data-filter-toggle]');

    if (sidebar && toggle) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }
}

// Не забудьте вызвать эту функцию внутри createHeader или DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    createHeader(); // Ваша существующая функция шапки
    initFilters();  // Инициализация сворачивания фильтров
});