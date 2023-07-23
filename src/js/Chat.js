import ChatAPI from "./api/ChatAPI";
import FormController from "./components/form";
import PopupController from "./components/popup";
import createRequest from "./api/createRequest";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.popContr = new PopupController(this.container);
    this.formContr = new FormController();
    this.websocket = null;
  }

  init() {
    const { element, form, btn } = this.formContr.entryForm;
    this.popContr.showPopup(element, this.container);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.onEnterChatHandler(form);
    });
  }

  bindToDOM() {}

  registerEvents() {}

  subscribeOnEvents() {}

  async onEnterChatHandler(form) {
    const enterResult = await this.api.authorizeRequest(form);
  }

  sendMessage() {}

  renderMessage() {}
}
