export class UserInfo {
  constructor(userName, descriptionJob, avatar, _id) {
    this._userName = userName;
    this._descriptionJob = descriptionJob;
    this._avatar = avatar;
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
