import {openPopup} from "./utils.js";
import {popupImageContainer, popupImage, popupImageTitle} from "./constants.js";

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
    const cardImage = this._element.querySelector(this._configSelector.imageSelector);
    cardImage.src = this._url;
    cardImage.alt = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    openPopup(popupImageContainer);
    popupImage.src = this._url;
    popupImage.alt = this._title;
    popupImageTitle.textContent = this._title;
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector(this._configSelector.likeButton).classList.toggle("cards__like-button_active");
  }

  _setEventListeners() {
    this._element.querySelector(this._configSelector.imageSelector).addEventListener("click", () => {
      this._handleOpenPopup();
    });

    this._element.querySelector(this._configSelector.deleteButton).addEventListener("click", () => {
      this._deleteCard();
    });

    this._element.querySelector(this._configSelector.likeButton).addEventListener("click", () => {
      this._likeCard();
    });
  }
}
