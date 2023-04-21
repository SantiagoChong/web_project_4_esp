import {PopupWithImage} from "./PopupWithImage.js";
import {popupDeleteConfirmation, popupImageContainer, configCardSelectors} from "../utils/constants.js";
import {api} from "../pages/index.js";
import {PopupWithForm} from "./PopupWithForm.js";
export class Card {
  constructor(data, configSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myId = "082ca6dc424abe6336d60b11";
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardLikes = this._likes.length;
    //this.isliked = false;
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

    if (this._ownerId !== this._myId) {
      this._element.querySelector(this._configSelector.deleteButton).style.display = "none";
    }

    return this._element;
  }

  handleOpenPopup() {
    const popup = new PopupWithImage(popupImageContainer);
    popup.open(this._name, this._link);
  }

  _updateLikes = (resArray) => {
    this._likes = resArray;
    return this._likes;
  };

  _handleLikeAdd({id}) {
    api.addCardLike(id).then((res) => {
      this._updateLikes(res.likes);
      this._element.querySelector(this._configSelector.likeButton).classList.add("cards__like-button_active");
      this._element.querySelector(this._configSelector.likeCounter).textContent = this._likes;
    });
  }

  _handleLikeDelete({id}) {
    api.deleteCardLike(id).then((res) => {
      this._updateLikes(res.likes);
      this._element.querySelector(this._configSelector.likeButton).classList.remove("cards__like-button_active");
      this._element.querySelector(this._configSelector.likeCounter).textContent = this._likes;
      if (this._cardLikes === 0) {
        this._element.querySelector(this._configSelector.likeCounter).textContent = "";
      }
    });
  }

  _likeCard() {
    const hasUserLiked = this._likes.some((like) => like._id === this._ownerId);
    if (hasUserLiked) {
      this._handleLikeDelete({id: this._id});
    } else {
      this._handleLikeAdd({id: this._id});
    }
    /*this.isliked = !this.isliked;

    if (this.isliked) {
      this._element.querySelector(this._configSelector.likeButton).classList.add("cards__like-button_active");
      api.addCardLike(this._id);
    } else {
      this._element.querySelector(this._configSelector.likeButton).classList.remove("cards__like-button_active");
      api.deleteCardLike(this._id);
    }*/

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

  _handleDeleteCard({id}) {
    const popupDelete = new PopupWithForm(popupDeleteConfirmation, configCardSelectors.deleteButton);
    popupDelete.open();
    popupDelete.setSubmitAction(() => {
      api.deleteCard(id).then(() => {
        this._deleteCard();
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
      this._handleDeleteCard({id: this._id});
    });

    this._element.querySelector(this._configSelector.likeButton).addEventListener("click", () => {
      this._likeCard();
    });
  }
}
