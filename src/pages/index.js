import "./index.css";

import {
  cardsContainer,
  configCardSelectors,
  popups,
  configFormSelectors,
  nameElement,
  descriptionElement,
  profileAvatar,
  nameInput,
  descriptionInput,
  popupProfile,
  popupAvatarProfile,
  popupNewCard,
  newCardButton,
  editButton,
  editPhotoButton,
} from "../utils/constants.js";

import {Section} from "../components/Section.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../utils/FormValidator.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {data} from "autoprefixer";

//Api
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_03",
  headers: {
    authorization: "093facbb-999f-4e95-80c4-1209ec92f045",
  },
});

//User Information
const userInfo = new UserInfo(nameElement, descriptionElement, profileAvatar);
api.getProfileInfo().then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar);
  userInfo._userId = data._id;
});

//popup profile
editButton.addEventListener("click", () => {
  popupProfileForm.open();
});

const popupProfileForm = new PopupWithForm(popupProfile, profileFormSubmit);

function profileFormSubmit(data) {
  api
    .editProfile(data.name, data.description)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    })
    .finally(() => {
      popupProfile.querySelector('button[type="submit"]').textContent = "Guardar";
      popupProfileForm.close();
    });
}

//popup avatar
editPhotoButton.addEventListener("click", () => {
  popupAvatarProfileForm.open();
});

const popupAvatarProfileForm = new PopupWithForm(popupAvatarProfile, profileAvatarFormSubmit);

function profileAvatarFormSubmit(data) {
  api
    .newAvatar(data.photo)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    })
    .finally(() => {
      popupAvatarProfile.querySelector('button[type="submit"]').textContent = "Guardar";
      popupAvatarProfileForm.close();
    });
}

//Validate Forms
function popupValues() {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}
popupValues();

function formValidation(form) {
  const formValidation = new FormValidator(form, configFormSelectors);
  formValidation.enableValidation();
}

function validatePopupsForms() {
  popups.forEach((form) => formValidation(form));
}

validatePopupsForms();

//Initial Cards
function initialCards() {
  const getInitialCards = api.getInitialCards().then((data) => {
    console.log(data);
    const sectionCards = new Section(
      {
        data: getInitialCards,
        renderer: (cardItem) => {
          cardItem.me = userInfo.getUserInfo();
          const newCard = new Card(cardItem, configCardSelectors);
          const cardElement = newCard.createCard();

          sectionCards.addItem(cardElement);
        },
      },
      cardsContainer
    );
    sectionCards.setItems(data);
    sectionCards.renderItems();
  });
}

initialCards();

//Add Cards
function handleAddCard() {
  addCard.open();
}

const addCard = new PopupWithForm(popupNewCard, (formValues) => {
  api
    .addNewCard(formValues.title, formValues.image)
    .then((cardItem) => {
      cardItem.me = userInfo.getUserInfo();
      const newCard = new Card(cardItem, configCardSelectors);
      cardsContainer.prepend(newCard.createCard());
    })
    .finally(() => {
      popupNewCard.querySelector('button[type="submit"]').textContent = "Crear";
      addCard.close();
    });
});

newCardButton.addEventListener("click", handleAddCard);
