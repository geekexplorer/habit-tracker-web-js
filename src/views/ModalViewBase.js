import ViewBase from './ViewBase.js';

class ModalViewBase extends ViewBase {
  _parentElement = document.querySelector('.modal');

  constructor() {
    super();
    this._handleCloseModal();
  }

  render(data) {
    this._data = data;
    super.render();
  }

  _handleCloseModal() {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target;

        if (target.classList.contains('js-close-modal')) {
          e.stopPropagation();
          this.hide();
        }
      }.bind(this)
    );
  }
}

export default ModalViewBase;
