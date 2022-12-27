import {Popup} from "./Popup.js";
import {popupImage, popupImageTitle} from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(title, url) {
    super.open();
    popupImage.alt = title;
    popupImage.src = url;

    popupImageTitle.textContent = title;
  }
}
