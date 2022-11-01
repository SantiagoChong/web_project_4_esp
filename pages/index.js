const cardsContainer = document.querySelector(".cards");
const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__text");
const popupNewCard = document.querySelector(".popup_new-card");
const newCardButton = document.querySelector(".profile__add-button");
const popupImageContainer = document.querySelector(".popup_image");
const cardTitleInput = document.querySelector("#title");
const cardImageInput = document.querySelector("#image");
const likeButton = document.querySelector(".cards__like-button");
const delateButton = document.querySelector(".cards__delate-button");
const closeButtons = document.querySelectorAll(".popup__toggle");
const templateCards = document.querySelector(".template__cards").content.querySelector(".cards__item");
const profileForm = document.querySelector(".form_profile");
const newCardForm = document.querySelector(".form_new-card");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImage = document.querySelector(".popup__image");

function openPopup(popups) {
  popups.classList.add("popup_opened");
}

function closePopup(popups) {
  popups.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(popupProfile);
});

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

function createCard(title, url) {
  const cardElement = templateCards.cloneNode(true);
  cardElement.querySelector(".cards__text").textContent = title;
  const cardImage = cardElement.querySelector(".cards__image");
  cardImage.src = url;
  cardImage.alt = title;
  cardElement.querySelector(".cards__delate-button").addEventListener("click", function (evt) {
    cardElement.remove();
  });
  cardElement.querySelector(".cards__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__like-button_active");
  });
  cardImage.addEventListener("click", (evt) => {
    openPopup(popupImageContainer);
    popupImage.src = evt.target.src;
    popupImage.alt = title;
    popupImageTitle.textContent = title;
  });
  return cardElement;
}

initialCards.forEach((element) => {
  const newCard = createCard(element.title, element.url);
  cardsContainer.prepend(newCard);
});

newCardButton.addEventListener("click", function (evt) {
  openPopup(popupNewCard);
});

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const title = cardTitleInput.value;
  const url = cardImageInput.value;
  const newCard = createCard(title, url);
  cardsContainer.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

/*popupImageContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.content("popup")) {
    closePopup(popupImageContainer);
  }
});*/
