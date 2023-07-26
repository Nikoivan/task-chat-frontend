import "./css/popup.css";

export default class PopupController {
  constructor() {
    this.inElement = document.body;
    this.actualPopups = [];

    this.removePopup = this.removePopup.bind(this);
  }

  showPopup(element, onElement) {
    const { left } = onElement.getBoundingClientRect();

    element.classList.add("popup");
    document.body.append(element);

    element.style.top = `${200}px`;
    element.style.left = `${
      left - 30 + onElement.offsetWidth / 2 - element.offsetWidth / 2
    }px`;
  }

  removePopup(element, e) {
    if (e) {
      e.preventDefault();
    }

    element.remove();
  }
}
