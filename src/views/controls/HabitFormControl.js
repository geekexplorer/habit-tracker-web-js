class HabitFormControl {
  constructor(parentElementIdentifier = 'body') {
    this._parentElementIdentifier = parentElementIdentifier;
  }

  initialize(data) {
    this._data = data;
    // If there's no data then we're creating a new habit and can change
    if (!this._data) this._enableDuration = true;

    this._parentElement = document.querySelector(this._parentElementIdentifier);

    if (this._enableDuration) {
      this._handleDurationSliderInput();
    }

    return this._generateControlMarkup();
  }

  _generateControlMarkup() {
    return `
      <div class="habit-form">
        <div class="habit-form__error border-1 box-shadow hidden">
        </div>
        <div class="habit-form__label">
          Title
        </div>
        <div class="habit-form__input">
          <input type="text" class="habit-form__title-input js-habit-title border-1 box-shadow" size="50" value="${
            this._data?.title ?? ''
          }"/>
        </div>
        ${this._optionallyRenderDuration()}
        </div>
    `;
  }

  _optionallyRenderDuration() {
    if (this._enableDuration) {
      return `
        <div class="habit-form__duration-container">
          <div class="habit-form__label">
            Days
          </div>
          <div class="habit-form__label js-duration-value">
            30
          </div>
        </div>
        <div>
          <div class="habit-form__input">
            <input type="range" class="habit-form__duration-slider js-habit-duration" min="7" max="60" value="30" />
          </div>
        </div>
      `;
    }
    return '';
  }

  _getParentElement() {
    if (!this._parentElement) this._parentElement = document.querySelector(this._parentElementIdentifier);
    return this._parentElement;
  }

  get HabitTitle() {
    const title = this._getParentElement().querySelector('.js-habit-title').value;
    return title;
  }

  get HabitDuration() {
    if (!this._enableDuration) return undefined;
    const duration = this._getParentElement().querySelector('.js-habit-duration').value;
    return duration;
  }

  displayError(message) {
    const errorElement = this._getParentElement().querySelector('.habit-form__error');
    errorElement.classList.remove('hidden');
    errorElement.innerHTML = message;
  }

  _handleDurationSliderInput() {
    this._parentElement.addEventListener(
      'input',
      function (e) {
        const target = e.target;
        if (!target.classList.contains('js-habit-duration')) return;

        e.stopPropagation();

        const durationValueElement = this._parentElement.querySelector('.js-duration-value');
        durationValueElement.innerHTML = target.value;
      }.bind(this)
    );
  }
}

export default HabitFormControl;
