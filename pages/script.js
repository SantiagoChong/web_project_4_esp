let container = document.querySelector(".container");
let popUpContainer = document.querySelector(".popup_opened");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__toggle");
function openPopUpContainer() {
  popUpContainer.classList.remove("popup_opened");
}
editButton.addEventListener("click", openPopUpContainer);

function closePopUpContainer() {
  popUpContainer.classList.add("popup_opened");
}
closeButton.addEventListener("click", closePopUpContainer);

let formElement = document.querySelector(".popup__container");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__item_el_name").value;
  let descriptionInput = document.querySelector(
    ".popup__item_el_description"
  ).value;

  let name = document.querySelector(".profile__title");
  let description = document.querySelector(".profile__text");

  name.textContent = `${nameInput}`;
  description.textContent = `${descriptionInput}`;
}

let saveButton = document.querySelector(".popup__button");
saveButton.addEventListener("click", closePopUpContainer);

formElement.addEventListener("submit", handleProfileFormSubmit);
