import "./css/form.css";

export default class FormController {
  constructor() {}

  get entryForm() {
    const formWrap = document.createElement("div");
    formWrap.classList.add("form-wrapper");
    formWrap.innerHTML = `<div class="form-header"><span class="form-title">Выберите псевдоним</span></div>
    <form class="entry-chat-form">
        <input class="input chat-input">
        <button class="chat-btn">Продолжить</button>
    </form>`;

    const btn = formWrap.querySelector(".chat-btn");

    return {
      element: formWrap,
      form: formWrap.querySelector(".entry-chat-form"),
      btn,
    };
  }

  getData() {}
}
