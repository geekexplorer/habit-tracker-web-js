import ModalViewBase from './ModalViewBase.js';

class ErrorModalView extends ModalViewBase {
  render(message) {
    this._message = message;
    super.render();
  }

  _generateMarkup() {
    return `
      <div class="modal-content border-1">
      
        <div class="habit-modal__title border-1 box-shadow">
          ${this._message}
        </div>
        <div class="error-modal__actions">
          <div class="action border-1 drop-shadow js-confirm-error-ok">Ok</div>
        </div>
      </div>
    `;
  }

  // Event Listeners

  addHandleClickOk(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.classList.contains('js-confirm-error-ok')) return;
      handler();
    });
  }
}

export default ErrorModalView = new ErrorModalView();
