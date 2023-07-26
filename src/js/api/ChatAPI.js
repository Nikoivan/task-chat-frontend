import createRequest from "./createRequest";

export default class ChatAPI {
  constructor() {
    this.url = "http://localhost:3000";
  }

  async authorizeRequest(form) {
    const input = form.querySelector(".chat-input");

    if (input.value === "") {
      return {
        status: "error",
        message: "Enter your Nickname",
        onElement: input,
      };
    }

    const data = {
      url: this.url + "/new-user",
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name: input.value }),
      headers: { "Content-Type": "application/json" },
    };
    const result = await createRequest(data);

    return { ...result, onElement: input };
  }
}
