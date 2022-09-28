const container = document.querySelector(".container");
const popUpContainer = document.querySelector(".popup_opened");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__toggle");
function openPopUpContainer() {
  popUpContainer.classList.remove("popup_opened");
}
editButton.addEventListener("click", openPopUpContainer);

function closePopUpContainer() {
  popUpContainer.classList.add("popup_opened");
}
closeButton.addEventListener("click", closePopUpContainer);

const formElement = document.querySelector(".popup__container");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__item_el_name").value;
  const descriptionInput = document.querySelector(
    ".popup__item_el_description"
  ).value;

  const name = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__text");

  name.textContent = `${nameInput}`;
  description.textContent = `${descriptionInput}`;
}

const saveButton = document.querySelector(".popup__button");
saveButton.addEventListener("click", closePopUpContainer);

formElement.addEventListener("submit", handleProfileFormSubmit);
