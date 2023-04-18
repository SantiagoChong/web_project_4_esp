import {PopupWithImage} from "./PopupWithImage.js";
import {popupDeleteConfirmation, popupImageContainer} from "../utils/constants.js";
import {api} from "../pages/index.js";
import {PopupWithForm} from "./PopupWithForm.js";
export class Card {
  constructor(data, configSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myId = "093facbb-999f-4e95-80c4-1209ec92f045";
    this._me = data.me;
    this._owner = data.owner;
    this._likes = data.likes;
    this.isliked = false;
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
    this._element.querySelector(this._configSelector.likeCounter).textContent = this._likes.length;

    if (this._owner._id !== this._myId.id) {
      this._element.querySelector(this._configSelector.deleteButton).style.display = "none";
    }

    return this._element;
  }

  handleOpenPopup() {
    const popup = new PopupWithImage(popupImageContainer);
    popup.open(this._name, this._link);
  }

  _likeCard() {
    this.isliked = !this.isliked;

    if (this.isliked) {
      this._element.querySelector(this._configSelector.likeButton).classList.add("cards__like-button_active");
      api.addCardLike(this._id);
    } else {
      this._element.querySelector(this._configSelector.likeButton).classList.remove("cards__like-button_active");
      api.deleteCardLike(this._id);
    }

    /*const likesUsers = this._likes.filter((user) => user._id === this._me.id);
    if (likesUsers.length > 0) {
      api.deleteCardLike(this._id).then((data) => {
        this._likes = data.likes;
        this._likeCounter = data.likes.length;
        this._element.querySelector(this._configSelector._likeCounter).textContent = data.likes.length;
      });
    } else {
      api.addCardLike(this._id).then((data) => {
        this._likes = data.likes;
        this._likeCounter = data.likes.length;
        this._element.querySelector(this._configSelector._likeCounter).textContent = data.likes.length;
      });
    }*/
  }

  deleteConfirmation() {
    const popupDelete = new PopupWithForm(popupDeleteConfirmation);
    popupDelete.open();
    popupDelete.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCard;
    });
  }

  _deleteCard() {
    api.deleteCard(this._id).then(() => {
      this._element.remove();
    });
  }

  /*_deleteCard() {
    this._element.remove();
  }*/

  /*_likeCard() {
    this._element.querySelector(this._configSelector.likeButton).classList.toggle("cards__like-button_active");
  }*/

  _setEventListeners() {
    this._element.querySelector(this._configSelector.imageSelector).addEventListener("click", () => {
      this.handleOpenPopup();
    });

    this._element.querySelector(this._configSelector.deleteButton).addEventListener("click", () => {
      this.deleteConfirmation();
    });

    this._element.querySelector(this._configSelector.likeButton).addEventListener("click", () => {
      this._likeCard();
    });
  }
}
