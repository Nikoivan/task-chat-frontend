import "../css/chat.css";
import ChatAPI from "./api/ChatAPI";
import UsersAPI from "./api/UsersAPI";
import FormController from "./components/form";
import PopupController from "./components/popup";
import TooltipController from "./components/tooltip";
import moment from "moment/moment";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.popContr = new PopupController(this.container);
    this.formContr = new FormController();
    this.tooltipContr = new TooltipController();
    this.ws = null;

    this.sendMessage = this.sendMessage.bind(this);
    this.exit = this.exit.bind(this);
  }

  exit() {
    this.ws.send(
      JSON.stringify({
        type: "exit",
        user: {
          id: this.id,
          name: this.name,
        },
      })
    );
  }

  init() {
    const { element, form, btn } = this.formContr.entryForm;
    this.popContr.showPopup(element, this.container);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.onEnterChatHandler(form, element);
    });
  }

  async bindToDOM(data) {
    const { user } = data;
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-wrapper");
    chatContainer.innerHTML = `<div class="users">
    <ul class="users-list">
    <li class="user my">You</li>        
    </ul>
  </div>
  <div class="chat">
    <ul class="messages-list">       
    </ul>
    <form class="chat-form"><input class="chat-input" placeholder="Type your message here"></form>
  </div>`;

    this.chat = chatContainer;

    this.usersList = this.chat.querySelector(".users-list");
    this.usersAPI = new UsersAPI(this.usersList);
    this.usersAPI.checkMainUser(user);
    this.id = user.id;
    this.name = user.name;
    this.mesList = this.chat.querySelector(".messages-list");
    this.chatForm = this.chat.querySelector(".chat-form");
    this.chatInput = this.chatForm.querySelector(".chat-input");
    this.container.append(this.chat);

    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.subscribeOnEvents();
    window.addEventListener("beforeunload", this.exit);
  }

  registerEvents(data) {
    console.log(data);
    if (data.type !== "send") {
      this.usersAPI.update(data);
      return;
    }
    this.renderMessage(data);
  }

  subscribeOnEvents() {
    this.ws.addEventListener("error", (e) => {
      console.log(`ws error - ${e}`);
    });
    this.ws.addEventListener("message", (e) => {
      let data = JSON.parse(e.data);
      this.registerEvents(data);
    });
    this.ws.addEventListener("close", (e) => {
      console.log(`ws-error ${e}`);
    });

    this.chatForm.addEventListener("submit", this.sendMessage);
  }

  async onEnterChatHandler(form, element) {
    const signInResult = await this.api.authorizeRequest(form);
    if (signInResult.status === "error") {
      this.tooltipContr.showError({ ...signInResult, position: "above" });
      return;
    }
    element.remove();

    await this.bindToDOM(signInResult);
  }

  sendMessage(e) {
    e.preventDefault();
    const message = this.chatInput.value;

    if (!message) return;

    this.ws.send(
      JSON.stringify({
        id: this.id,
        message,
        type: "send",
        time: `${moment().hour()}:${moment().minutes()} ${moment().format(
          "DD-MM-YY"
        )}`,
      })
    );

    this.chatInput.value = "";
  }

  renderMessage(data) {
    const { message, id, time } = data;
    const name = this.usersAPI.get(id);
    const li = document.createElement("li");
    li.classList.add("message");
    li.innerHTML = `<div class="message-header"><span class="name">${name}</span><span class="time">${time}</span></div>
    <div class="message-main"><span class="content">${message}</span></div>`;
    if (name === "You") {
      li.classList.add("your");
    }
    this.mesList.append(li);
  }
}
