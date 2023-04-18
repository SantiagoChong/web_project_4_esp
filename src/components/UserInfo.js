export class UserInfo {
  constructor(name, about, avatar, _id) {
    this._userName = name;
    this._descriptionJob = about;
    this._avatar = avatar;
    this._userId = _id;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._descriptionJob.textContent,
      id: this._userId,
    };
  }

  setUserInfo(name, about, avatar, _id) {
    this._userName.textContent = name;
    this._descriptionJob.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}
