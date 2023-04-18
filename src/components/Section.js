export class Section {
  constructor({data, renderer}, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();

    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  setItems(data) {
    this._data = data;
  }
}
