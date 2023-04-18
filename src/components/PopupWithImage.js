import {Popup} from "./Popup.js";
import {popupImage, popupImageTitle} from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    popupImage.alt = name;
    popupImage.src = link;

    popupImageTitle.textContent = name;
  }
}
