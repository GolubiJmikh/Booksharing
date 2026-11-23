document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.getElementById('header-component');
    if (headerElement) {
        headerElement.innerHTML = headerTemplate;
        
        // Тут же можно сразу инициализировать бургер, 
        // чтобы он работал на всех страницах автоматически
        initBurger(); 
    }
});

function initBurger() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (toggle && nav) {
        toggle.onclick = () => {
            toggle.classList.toggle('is-active');
            nav.classList.toggle('is-open');
        };
    }
}