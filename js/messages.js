const DIALOGS = {
  maria: {
    name: "Мария",
    preview: "Здравствуйте! Книга еще у вас?",
    messages: [
      { from:"them", text:"Здравствуйте! Книга еще у вас?" }
    ]
  },
  ivan: {
    name: "Иван",
    preview: "Готов встретиться завтра.",
    messages: [
      { from:"them", text:"Готов встретиться завтра." }
    ]
  }
};

let activeKey = "maria";

function renderDialogs() {
  const list = document.querySelector("[data-dialogs]");
  if (!list) return;

  list.innerHTML = Object.entries(DIALOGS).map(([key, d]) => `
    <div class="dialog ${key === activeKey ? "is-active":""}" data-dialog data-key="${key}">
      <strong>${d.name}</strong>
      <small>${d.preview}</small>
    </div>
  `).join("");
}

function renderChat() {
  const title = document.querySelector("[data-chat-title]");
  const log = document.querySelector("[data-chat-log]");
  if (!title || !log) return;

  const d = DIALOGS[activeKey];
  log.innerHTML = d.messages.map(m => `
    <div class="msg ${m.from === "me" ? "me":""}">
      ${m.text}
    </div>
  `).join("");
  log.scrollTop = log.scrollHeight;
}

function wireChat() {
  const wrap = document.querySelector("[data-chat]");
  const sendBtn = document.querySelector("[data-send]");
  const input = document.querySelector("[data-msg]");
  if (!wrap || !sendBtn || !input) return;

  wrap.addEventListener("click", (e) => {
    const d = e.target.closest("[data-dialog]");
    if (!d) return;
    activeKey = d.getAttribute("data-key");
    renderDialogs();
    renderChat();
  });

  const send = () => {
    const text = input.value.trim();
    if (!text) return;

    DIALOGS[activeKey].messages.push({ from:"me", text });
    input.value = "";
    renderChat();
  };

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}
function wireTabs() {
  const btns = [...document.querySelectorAll("[data-tab]")];
  const panes = [...document.querySelectorAll("[data-pane]")];
  const myBooksSection = document.getElementById("my-books-section");

  const setActive = (name) => {
    // Если нажали на "Мои книги"
    if (name === "mybooks") {
      myBooksSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return; // Не переключаем верхние табы, просто скроллим
    }

    // Логика переключения для "Сообщения" и "Я читаю"
    btns.forEach(b => {
      const tabName = b.getAttribute("data-tab");
      // Подсвечиваем только те кнопки, которые относятся к верхним панелям
      if (tabName !== "mybooks") {
        b.classList.toggle("is-active", tabName === name);
      }
    });

    panes.forEach(p => {
      p.hidden = p.getAttribute("data-pane") !== name;
    });
  };

  btns.forEach(b => {
    b.addEventListener("click", () => setActive(b.getAttribute("data-tab")));
  });

  // По умолчанию открываем сообщения
  setActive("messages");
}
document.addEventListener("DOMContentLoaded", () => {
  renderDialogs();
  renderChat();
  wireChat();
  wireTabs();
  // wireAnchors();
});