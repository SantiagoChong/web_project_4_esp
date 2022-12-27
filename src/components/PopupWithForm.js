import {Popup} from "./Popup.js";
import {configFormSelectors} from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(configFormSelectors.inputSelector);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._popupSelector.querySelector(configFormSelectors.formSelector).reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector(configFormSelectors.formSelector).addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }
}
