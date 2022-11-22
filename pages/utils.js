import {popups, editButton, newCardButton, popupProfile, popupNewCard} from "./constants.js";

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__toggle")) {
      closePopup(popup);
    }
  });
});

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

editButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

newCardButton.addEventListener("click", function (evt) {
  openPopup(popupNewCard);
});
