import "./css/tooltip.css";

export default class TooltipController {
  constructor() {
    this.tooltips = [];
    this.removeTooltip = this.removeTooltip.bind(this);

    this.bindPosMethods();
  }

  bindPosMethods() {
    this.position = {
      above: (el, byEl, data) => {
        const { top, left } = data;

        el.style.top = `${top - el.offsetHeight - 20}px`;
        el.style.left = `${left + byEl.offsetWidth / 2 - el.offsetWidth / 2}px`;
      },
    };
  }

  showTooltip(data) {
    const { status, message, onElement } = data;

    const tooltipEl = document.createElement("div");
    tooltipEl.classList.add("tooltip");
    tooltipEl.innerHTML = ``;

    onElement.append(form);
    const id = Math.ceil(performance.now());

    this.tooltips.push({ element: form, id });

    form.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-btn")) {
        this.removeTooltip(id);
      }
    });
    return id;
  }

  showError(options) {
    const { status, message, onElement, position: method } = options;

    const tooltipEl = document.createElement("div");
    tooltipEl.classList.add("tooltip");
    tooltipEl.innerHTML = `   <span class="tolltip-status">${status}</span>
    <span class="tooltip-error-message">${message}</span>`;

    document.body.append(tooltipEl);

    this.position[method](
      tooltipEl,
      onElement,
      onElement.getBoundingClientRect()
    );

    setTimeout(() => tooltipEl.remove(), 3000);
    /* tooltipEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-btn")) {
        this.removeTooltip(id);
      }
    });*/
  }

  removeTooltip(id) {
    const tooltip = this.tooltips.find((el) => el.id === id);
    tooltip.element.remove();
    this.tooltips = this.tooltips.filter((el) => el.id !== id);
  }

  clearTooltips() {
    this.tooltips.forEach((el) => el.element.remove());
  }
}
