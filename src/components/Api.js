// ID: web_es_cohort_03
// 093facbb-999f-4e95-80c4-1209ec92f045

export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this.headers = headers;
    this._authorization = headers.authorization;
  }

  _useFetch(baseUrl, {method, body}) {
    return fetch(baseUrl, {
      headers: {
        authorization: this._authorization,
      },
      method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getProfileInfo() {
    return this._useFetch(`${this._baseUrl}/users/me`, "GET").then((data) => {
      return data;
    });
  }

  editProfile(name, about) {
    return this._useFetch(`${this._baseUrl}/users/me`, "PATCH", {
      name: name,
      about: about,
    }).then((data) => {
      return data;
    });
  }

  getInitialCards() {
    return this._useFetch(`${this._baseUrl}/cards`, "GET").then((data) => {
      return data;
    });
  }

  addNewCard(name, link) {
    return this._useFetch(`${this._baseUrl}/cards`, "POST", {
      name: name,
      link: link,
    }).then((data) => {
      return data;
    });
  }

  deleteCard(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/${cardId}`, "DELETE").then((data) => {
      return data;
    });
  }

  addCardLike(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/likes/${cardId}`, "PUT").then((data) => {
      return data;
    });
  }

  deleteCardLike(cardId) {
    return this._useFetch(`${this._baseUrl}/cards/likes/${cardId}`, "DELETE").then((data) => {
      return data;
    });
  }

  newAvatar(link) {
    return this._useFetch(`${this._baseUrl}/users/me/avatar`, "PATCH", {
      avatar: link,
    }).then((data) => {
      return data;
    });
  }

  /*getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }*/
}
