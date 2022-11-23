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
  initialCardsData,
} from "./constants.js";

import {Card} from "./Card.js";
import {closePopup} from "./utils.js";
import {FormValidator} from "./FormValidator.js";

function renderCard(card) {
  const newCard = new Card(card, configCardSelectors);
  cardsContainer.prepend(newCard.createCard());
}

function renderInitialCards() {
  initialCardsData.forEach((card) => renderCard(card));
}

renderInitialCards();

function validatePopupsForms() {
  popups.forEach((form) => formValidation(form));
}

validatePopupsForms();

function formValidation(form) {
  const formValidation = new FormValidator(form, configFormSelectors);
  formValidation.enableValidation();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

profileForm.addEventListener("submit", handleProfileSubmit);

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const title = cardTitleInput.value;
  const url = cardImageInput.value;
  const newCard = new Card({title, url}, configCardSelectors);
  const cardElement = newCard.createCard();
  cardsContainer.prepend(cardElement);
  evt.target.reset();
  closePopup(popupNewCard);
}

newCardForm.addEventListener("submit", handleNewCardFormSubmit);
