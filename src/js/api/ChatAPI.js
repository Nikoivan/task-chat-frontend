import Entity from "./entity";
import createRequest from "./createRequest";

export default class ChatAPI extends Entity {
  constructor() {
    super();
    this.url = "http://localhost:3000";
  }

  async authorizeRequest(form) {
    const formData = new FormData(form);
    const data = {
      url: this.url + "/new-user",
      method: "POST",
      mode: "cors",
      body: formData,
      headers: { "Content-Type": "application/json" },
    };
    const result = await createRequest(data);
    return result;
  }
}
