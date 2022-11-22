export class FormValidator {
  constructor(formElement, configForm) {
    this._formElement = formElement;
    this._configForm = configForm;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._configForm.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._configForm.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._configForm.inputErrorClass);
    errorElement.classList.remove(this._configForm.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._configForm.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._configForm.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEvtListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._configForm.inputSelector));
    const buttonElement = this._formElement.querySelector(this._configForm.submitButtonSelector);
    this._toggleButtonState(buttonElement);
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(buttonElement);
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = this._formElement.querySelectorAll(this._configForm.formSelector);
    formList.forEach(() => {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEvtListener();
    });
  }
}
