export const popups = document.querySelectorAll(".popup");

//utils profile
export const profileForm = document.querySelector(".form_profile");
export const nameElement = document.querySelector(".profile__title");
export const descriptionElement = document.querySelector(".profile__text");
export const popupProfile = document.querySelector(".popup_profile");
export const popupAvatarProfile = document.querySelector(".popup_profile-photo");
export const nameInput = document.querySelector("#name");
export const descriptionInput = document.querySelector("#description");
export const editPhotoButton = document.querySelector(".profile__photo-opacity");
export const profileAvatar = document.querySelector(".profile__photo");

//utils card
export const newCardForm = document.querySelector(".form_new-card");
export const newCardButton = document.querySelector(".profile__add-button");
export const editButton = document.querySelector(".profile__edit-button");
export const popupNewCard = document.querySelector(".popup_new-card");
export const cardTitleInput = document.querySelector("#title");
export const cardImageInput = document.querySelector("#image");
export const popupImageContainer = document.querySelector(".popup_image");
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");
export const popupDeleteConfirmation = document.querySelector(".popup_confirmation");

//index
export const cardsContainer = document.querySelector(".cards");
export const configCardSelectors = {
  template: ".template__cards",
  cardSelector: ".cards__item",
  imageSelector: ".cards__image",
  textSelector: ".cards__text",
  popupImageSelector: ".popup_image",
  likeButton: ".cards__like-button",
  likeCounter: ".cards__like-counter",
  deleteButton: ".cards__delete-button",
};

//formValidator
export const configFormSelectors = {
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
};

export const initialCardsData = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];
