import {
  cardsContainer,
  configCardSelectors,
  popups,
  configFormSelectors,
  newCardForm,
  profileForm,
  nameElement,
  descriptionElement,
  nameInput,
  descriptionInput,
  cardTitleInput,
  cardImageInput,
  popupProfile,
  popupNewCard,
} from "./constants.js";

import {Card} from "./Card.js";
import {closePopup} from "./utils.js";
import {FormValidator} from "./FormValidator.js";

const initialCards = [
  {
    title: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    title: "Parque Nacional de la Vanoise",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Montañas Calvas",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Lago Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Valle de Yosemite",
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

initialCards.forEach((card) => {
  const newCard = new Card(card, configCardSelectors);
  const cardElement = newCard.createCard();
  cardsContainer.prepend(cardElement);
});

popups.forEach((form) => {
  const formValidation = new FormValidator(form, configFormSelectors);
  formValidation.enableValidation();
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(popupProfile);
});

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const title = cardTitleInput.value;
  const url = cardImageInput.value;
  const newCard = new Card({title, url}, configCardSelectors);
  const cardElement = newCard.createCard();
  cardsContainer.prepend(cardElement);
  evt.target.reset();
  closePopup(popupNewCard);
});
