(() => {
  const FAVORITES_KEY = "bs_favorites";

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
    } catch {
      return [];
    }
  }

  function setFavorites(ids) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    updateFavoritesBadge();
  }

  function isFavorite(id) {
    return getFavorites().includes(String(id));
  }

  function toggleFavorite(id) {
    id = String(id);
    const fav = new Set(getFavorites());
    if (fav.has(id)) fav.delete(id);
    else fav.add(id);
    setFavorites([...fav]);
    return fav.has(id);
  }

  function updateFavoritesBadge() {
    const count = getFavorites().length;
    document.querySelectorAll("[data-fav-count]").forEach(el => {
      el.textContent = count;
    });
  }
  function syncFavoriteButtons(root = document) {
    root.querySelectorAll("[data-fav-toggle]").forEach((btn) => {
      const id = btn.getAttribute("data-book-id");
      btn.classList.toggle("is-active", isFavorite(id));
    });
  }

  function wireFavoriteButtons(root = document) {
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav-toggle]");
      if (!btn) return;

      const id = btn.getAttribute("data-book-id");
      const active = toggleFavorite(id);

      document
        .querySelectorAll(`[data-fav-toggle][data-book-id="${CSS.escape(id)}"]`)
        .forEach((b) => b.classList.toggle("is-active", active));
    });

    document.querySelectorAll("[data-fav-toggle]").forEach((btn) => {
      const id = btn.getAttribute("data-book-id");
      btn.classList.toggle("is-active", isFavorite(id));
    });
    syncFavoriteButtons(root);
  }

  function wireHeaderSearch() {
    const form = document.querySelector("[data-header-search-form]");
    const input = document.querySelector("[data-header-search]");
    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      const url = new URL("library.html", window.location.href);
      if (q) url.searchParams.set("q", q);
      window.location.href = url.toString();
    });
  }

  window.BS = { 
    getFavorites, 
    setFavorites, 
    isFavorite, 
    toggleFavorite, 
    updateFavoritesBadge,
    wireFavoriteButtons,
    syncFavoriteButtons, };

  document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesBadge();
    wireFavoriteButtons(document);
    wireHeaderSearch();
  });
})();

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');

    if (toggle && nav) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); // На всякий случай, если это ссылка или кнопка в форме
            toggle.classList.toggle('is-active');
            nav.classList.toggle('is-open');
            
            // Проверка в консоли (нажми F12 в браузере)
            console.log('Меню открыто:', nav.classList.contains('is-open'));
        });
    } else {
        console.error('Ошибка: Кнопка или навигация не найдены в DOM');
    }
});