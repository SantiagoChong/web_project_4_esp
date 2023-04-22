export class UserInfo {
  constructor(userName, descriptionJob, avatar, _id) {
    this._userName = userName;
    this._descriptionJob = descriptionJob;
    this._avatar = avatar;
    this._userId = _id;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._descriptionJob.textContent,
      _id: this._userId,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(name, about, avatar, _id) {
    this._userName.textContent = name;
    this._descriptionJob.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}
