export default class UsersAPI {
  constructor(list) {
    this.HTMLList = list;
    this.usersList = { users: [], ids: [] };
  }

  checkMainUser(user) {
    this.id = user.id;
    this.name = user.name;
  }

  create(users) {
    users.forEach((user) => {
      console.log(user.name);
      const element = document.createElement("li");
      element.classList.add("user");
      element.textContent = user.name;
      this.HTMLList.prepend(element);
      this.usersList.users.push({
        element,
        id: user.id,
        name: user.name,
      });
      this.usersList.ids.push(user.id);
    });
  }

  get(id) {
    if (this.id === id) {
      return "You";
    }
    const user = this.usersList.users.find((user) => user.id === id);
    if (!user) {
      console.log("User wasn't found");
    }
    return user.name;
  }

  update(users) {
    this.usersList.users.forEach((user) => user.element.remove());
    this.usersList = { users: [], ids: [] };
    const newUsers = users.filter((user) => user.id !== this.id);
    this.create(newUsers);
  }
}
