import ViewBase from './ViewBase.js';

class HabitListView extends ViewBase {
  _parentElement = document.querySelector('.habit-list-view');

  render(data) {
    if (!data) {
      throw Error('Cannot render HabitViewList without data');
    }

    this._data = data;
    super.render();
  }

  _generateMarkup() {
    return `
            ${this._generateTitle()}
            ${this._generateHabitListMarkup()}
            ${this._generateListActionsMarkup()}
        `;
  }

  _generateTitle() {
    return `
      My Habits
    `;
  }

  _generateHabitListMarkup() {
    return `
      Habit List
    `;
  }

  _generateHabitMarkup() {
    return `
      Habit
    `;
  }

  _generateListActionsMarkup() {
    return `Create New Habit`;
  }

  // Events Listeners
}

export default HabitListView;
