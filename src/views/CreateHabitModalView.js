import ModalViewBase from './ModalViewBase.js';
import HabitFormControl from './controls/HabitFormControl.js';

class CreateHabitModalView extends ModalViewBase {
  _title = 'Create a Habit';

  constructor() {
    super();
    this._habitFormControl = new HabitFormControl('.modal');
  }

  _generateMarkup() {
    return `
      <div class="modal-content border-1">
        <div class="habit-modal__title border-1 box-shadow">
          ${this._title}
        </div>
        ${this._habitFormControl.initialize()}
        ${this._generateActionsMarkup()}
      </div>
    `;
  }

  _generateActionsMarkup() {
    return `
    <div class="habit-modal__actions">
      <div class="action border-1 drop-shadow js-confirm-create">Create</div>
      <div class="action border-1 drop-shadow js-close-modal">Nope!</div>
    </div>`;
  }

  // Event Handlers

  addCreateHabitHandler(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target;
        if (!e.target.classList.contains('js-confirm-create')) return;

        const title = this._habitFormControl.HabitTitle;
        if (!title) {
          this._habitFormControl.displayError('You must provide a title.');
          return;
        }

        e.stopPropagation();
        const duration = this._habitFormControl.HabitDuration;

        handler({ title: title, duration: duration });
      }.bind(this)
    );
  }
}

export default CreateHabitModalView = new CreateHabitModalView();
