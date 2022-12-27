export class UserInfo {
  constructor(userName, descriptionJob) {
    this._userName = userName;
    this._descriptionJob = descriptionJob;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._descriptionJob.textContent,
    };
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._descriptionJob.textContent = description;
  }
}

/*class UserInfo {
  getUserInfo() {
    const nameContainer = document.querySelector(".profile__name");
    const aboutContainer = document.querySelector(".profile__about");

    return {
      name: nameContainer.textContent,
      about: aboutContainer.textContent,
    };
  }

  setUserInfo({name, about}) {
    const nameContainer = document.querySelector(".profile__name");
    const aboutContainer = document.querySelector(".profile__about");

    nameContainer.textContent = name;
    aboutContainer.textContent = about;
  }
}*/
