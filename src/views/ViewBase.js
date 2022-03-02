class ViewBase {
  _data;
  _parentElement;

  render() {
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  show() {
    this._parentElement.classList.remove('hidden');
  }

  hide() {
    this._parentElement.classList.add('hidden');
  }
}

export default ViewBase;
