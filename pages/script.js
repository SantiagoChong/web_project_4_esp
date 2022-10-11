const cardsContainer = document.querySelector(".cards");
const popUpProfile = document.querySelector(".popup_profile");
const popUpNewCard = document.querySelector(".popup_new-card");
const newCardButton = document.querySelector(".profile__add-button");
const popUpImage = document.querySelector(".popup_image");
const editButton = document.querySelector(".profile__edit-button");
const likeButton = document.querySelector(".cards__like-button");
const closeButtonProfile = document.querySelector(".popup__toggle_close_profile");
const closeButtonCard = document.querySelector(".popup__toggle_close_card");
const closeButtonImage = document.querySelector(".popup__toggle_close_image");
const templateCards = document.querySelector(".template__cards").content.querySelector(".cards__item");
const formProfile = document.querySelector(".form_profile");
const newCardForm = document.querySelector(".form_new-card");

editButton.addEventListener("click", function (evt) {
  popUpProfile.classList.add("popup_opened");
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector("#name").value;
  const descriptionInput = document.querySelector("#description").value;
  const name = (document.querySelector(".profile__title").textContent = nameInput);
  const description = (document.querySelector(".profile__text").textContent = descriptionInput);
  popUpProfile.classList.remove("popup_opened");
  evt.target.reset();
});

closeButtonProfile.addEventListener("click", function (evt) {
  popUpProfile.classList.remove("popup_opened");
});

const initialCards = [
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

initialCards.forEach((element) => {
  const newCard = templateCards.cloneNode(true);
  newCard.querySelector(".cards__image").src = element.link;
  newCard.querySelector(".cards__text").textContent = element.name;
  newCard.setAttribute("title", element.name);
  cardsContainer.prepend(newCard);
});

newCardButton.addEventListener("click", function (evt) {
  popUpNewCard.classList.add("popup_opened");
});

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const title = document.querySelector("#title").value;
  const url = document.querySelector("#image").value;
  const newCard = templateCards.cloneNode(true);
  newCard.querySelector(".cards__image").src = url;
  newCard.querySelector(".cards__text").textContent = title;
  newCard.setAttribute("title", title);
  cardsContainer.prepend(newCard);
  popUpNewCard.classList.remove("popup_opened");
  evt.target.reset();
});

closeButtonCard.addEventListener("click", function (evt) {
  popUpNewCard.classList.remove("popup_opened");
});

cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.tagName === "IMG") {
    popUpImage.querySelector(".popup__image").src = evt.target.src;
    popUpImage.classList.add("popup_opened");
    const title = evt.target.parentNode.getAttribute("title");
    document.querySelector(".popup__image-title").textContent = title;
  }
  if (evt.target.classList.contains("cards__delate-button")) {
    evt.target.parentNode.remove();
  }
  if (evt.target.classList.contains("cards__like-button")) {
    evt.target.classList.toggle("cards__like-button_active");
  }
});

closeButtonImage.addEventListener("click", function (evt) {
  popUpImage.classList.remove("popup_opened");
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popUpImage.classList.remove("popup_opened");
    popUpProfile.classList.remove("popup_opened");
    popUpNewCard.classList.remove("popup_opened");
  }
});
