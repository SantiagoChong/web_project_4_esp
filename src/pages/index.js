import "./index.css";

import {
  cardsContainer,
  configCardSelectors,
  popups,
  configFormSelectors,
  nameElement,
  descriptionElement,
  nameInput,
  descriptionInput,
  popupProfile,
  popupNewCard,
  initialCardsData,
  newCardButton,
  editButton,
} from "../utils/constants.js";

import {Section} from "../components/Section.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../utils/FormValidator.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

//User Information
const userInfo = new UserInfo(nameElement, descriptionElement);
userInfo.setUserInfo("Jacques Cousteau", "Explorador");

editButton.addEventListener("click", () => {
  popupProfileForm.open();
});

const popupProfileForm = new PopupWithForm(popupProfile, profileFormSubmit);

function profileFormSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
}

function popupValues() {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}
popupValues();

//Validate Forms
function formValidation(form) {
  const formValidation = new FormValidator(form, configFormSelectors);
  formValidation.enableValidation();
}

function validatePopupsForms() {
  popups.forEach((form) => formValidation(form));
}

validatePopupsForms();

//Initial Cards
const sectionCards = new Section(
  {
    data: initialCardsData,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem, configCardSelectors);
      const cardElement = newCard.createCard();

      sectionCards.addItem(cardElement);
    },
  },
  cardsContainer
);

sectionCards.renderItems();

//Add Cards
function handleAddCard() {
  addCard.open();
}

const addCard = new PopupWithForm(popupNewCard, (formValues) => {
  const newCard = new Card(
    {
      title: formValues.title,
      url: formValues.image,
    },
    configCardSelectors
  );
  cardsContainer.prepend(newCard.createCard());
});

newCardButton.addEventListener("click", handleAddCard);
