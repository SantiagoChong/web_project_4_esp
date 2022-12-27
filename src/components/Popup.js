export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscCloseBind);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscCloseBind);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__toggle")) {
        this.close();
      }
    });
  }
}
