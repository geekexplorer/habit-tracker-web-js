import ModalViewBase from './ModalViewBase.js';

class DeleteHabitModalView extends ModalViewBase {
  _title = 'Are you sure you want to delete';

  _generateMarkup() {
    return `
      <div class="modal-content border-1">
        <div class="habit-modal__title border-1 drop-shadow are-you-sure">
          ${this._title} your <br> <strong>${this._data.title}</strong> habit?
        </div>
        ${this._generateActionsMarkup()}
      </div>
    `;
  }

  _generateActionsMarkup() {
    return `
      <div class="habit-modal__actions">
        <div class="action border-1 drop-shadow js-confirm-delete" data-habit_id="${this._data.id}">Delete</div>
        <div class="action border-1 drop-shadow js-close-modal">Nevermind</div>
      </div>
    `;
  }

  // Event Handlers
  addHandleDelete(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target;
      if (!target.classList.contains('js-confirm-delete')) return;

      var habitId = target.dataset.habit_id;

      handler(habitId);
    });
  }
}

export default DeleteHabitModalView = new DeleteHabitModalView();
