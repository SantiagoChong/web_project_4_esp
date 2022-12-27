import {PopupWithImage} from "./PopupWithImage.js";
import {popupImageContainer} from "../utils/constants.js";

export class Card {
  constructor(data, configSelector) {
    this._title = data.title;
    this._url = data.url;
    this._configSelector = configSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._configSelector.template)
      .content.querySelector(this._configSelector.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(this._configSelector.textSelector).textContent = this._title;
    this._element.querySelector(this._configSelector.imageSelector).src = this._url;

    return this._element;
  }

  handleOpenPopup() {
    const popup = new PopupWithImage(popupImageContainer);
    popup.open(this._title, this._url);
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector(this._configSelector.likeButton).classList.toggle("cards__like-button_active");
  }

  _setEventListeners() {
    this._element.querySelector(this._configSelector.imageSelector).addEventListener("click", () => {
      this.handleOpenPopup();
    });

    this._element.querySelector(this._configSelector.deleteButton).addEventListener("click", () => {
      this._deleteCard();
    });

    this._element.querySelector(this._configSelector.likeButton).addEventListener("click", () => {
      this._likeCard();
    });
  }
}
