import {PopupWithImage} from "./PopupWithImage.js";
import {popupDeleteConfirmation, popupImageContainer, configCardSelectors} from "../utils/constants.js";
import {api} from "../pages/index.js";
import {PopupWithForm} from "./PopupWithForm.js";
export class Card {
  constructor(data, configSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._me = data.me;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardLikes = this._likes.length;
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

    this._element.querySelector(this._configSelector.textSelector).textContent = this._name;
    this._element.querySelector(this._configSelector.imageSelector).src = this._link;
    this._element.querySelector(this._configSelector.imageSelector).alt = this._name;
    this._element.querySelector(this._configSelector.likeCounter).textContent = this._cardLikes ? this._cardLikes : "";
    if (this._likes.some((user) => user._id === this._me._id)) {
      this._element.querySelector(this._configSelector.likeButton).classList.add("cards__like-button_active");
    }
    if (this._ownerId !== this._me._id) {
      this._element.querySelector(this._configSelector.deleteButton).style.display = "none";
    }

    return this._element;
  }

  handleOpenPopup() {
    const popup = new PopupWithImage(popupImageContainer);
    popup.open(this._name, this._link);
  }

  _updateLikes(resArray) {
    this._likes = resArray;
    this._cardLikes = this._likes.length;
    return this._cardLikes;
  }

  _handleAddLike({cardId}) {
    api.addCardLike(cardId).then((res) => {
      this._updateLikes(res.likes);
      this._element.querySelector(this._configSelector.likeButton).classList.add("cards__like-button_active");
      this._element.querySelector(this._configSelector.likeCounter).textContent = this._cardLikes;
    });
  }

  _handleDeleteLike({cardId}) {
    api.deleteCardLike(cardId).then((res) => {
      this._updateLikes(res.likes);
      this._element.querySelector(this._configSelector.likeButton).classList.remove("cards__like-button_active");
      this._element.querySelector(this._configSelector.likeCounter).textContent = this._cardLikes;
      if (this._cardLikes === 0) {
        this._element.querySelector(this._configSelector.likeCounter).textContent = "";
      }
    });
  }

  _likeCard() {
    const likesUsers = this._likes.some((user) => user._id === this._me._id);
    if (likesUsers) {
      this._handleDeleteLike({cardId: this._id});
    } else {
      this._handleAddLike({cardId: this._id});
    }
  }

  _handleDeleteCard({cardId}) {
    const popupDelete = new PopupWithForm(popupDeleteConfirmation, configCardSelectors.deleteButton);
    popupDelete.open();
    popupDelete.setSubmitAction(() => {
      popupDeleteConfirmation.querySelector('button[type="submit"]').textContent = "Borrando...";
      api
        .deleteCard(cardId)
        .then(() => {
          this._deleteCard();
        })
        .finally(() => {
          popupDeleteConfirmation.querySelector('button[type="submit"]').textContent = "Sí";
          popupDelete.close();
        });
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector(this._configSelector.imageSelector).addEventListener("click", () => {
      this.handleOpenPopup();
    });

    this._element.querySelector(this._configSelector.deleteButton).addEventListener("click", () => {
      this._handleDeleteCard({cardId: this._id});
    });

    this._element.querySelector(this._configSelector.likeButton).addEventListener("click", () => {
      this._likeCard();
    });
  }
}
