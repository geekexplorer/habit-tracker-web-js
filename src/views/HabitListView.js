import ViewBase from './ViewBase.js';

class HabitListView extends ViewBase {
  _parentElement = document.querySelector('.habit-list-view');

  render(data, title = 'My Habit Tracker') {
    if (!data) {
      throw Error('Cannot render HabitViewList without data');
    }

    this._title = title;
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
      <div class="habit-list-view__title title-border-1 box-shadow">${this._title}</div> 
    `;
  }

  _generateHabitListMarkup() {
    return `
      <div class="habit-list">
        ${this._data.reduce((prev, habit) => {
          return prev + this._generateHabitMarkup(habit);
        }, '')}
      </div>
    `;
  }

  _generateHabitMarkup(habit) {
    return `
      <div class="habit-list__habit js-habit-list__habit border-1 box-shadow " data-habit-id=${habit.id}>
        <div class="habit-details">
          <div class="habit-details__title">${habit.title}</div>
          <div class="habit-details__start-date">started ${new Date(habit.dateStarted).toLocaleDateString()}</div>
          ${this._generateHabitActionsMarkup(habit.id)}
        </div>
        ${this._generateHabitDaysMarkup(habit)}
      </div>
    `;
  }

  _generateHabitActionsMarkup(habitId) {
    return `
    <div class="habit-details__actions">
      <div>
        <i class="fa-regular fa-pen-to-square action js-edit-habit"></i>
      </div>
      <div>
        <i class="fa-regular fa-trash-can action js-delete-habit"></i>
      </div>
    </div>`;
  }

  _generateHabitDaysMarkup(habit) {
    return `
      <div class="habit-days">
      ${habit.days.reduce((prev, day, idx) => {
        return prev + this._generateHabitDayMarkup(day, idx);
      }, '')}
      </div>
    `;
  }

  _generateHabitDayMarkup(day) {
    const date = new Date(day.date);
    return `
    <div class="habit-day js-habit-day" data-date="${day.date}" data-completed="${day.completed}">
      <div>
        ${
          day.completed
            ? '<i class="fa-regular fa-circle-check day-complete action"></i>'
            : '<i class="fa-regular fa-circle day-incomplete action"></i>'
        }
      </div>
     
      <div class="day-date">
        ${date.getMonth() + 1} / ${date.getDate()}
      </div>
    </div>
    `;
  }

  _generateListActionsMarkup() {
    return `<div class="action create-new-habit button button-border-1 box-shadow js-habit-list__create-new-habit">Create New Habit</div>`;
  }

  // Events Listeners

  addHandlerToggleDayCompelete(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const habitDay = e.target.closest('.js-habit-day');
      if (!habitDay) return;

      const habitId = habitDay.closest('.js-habit-list__habit').dataset.habitId;
      if (!habitId) return;

      e.stopPropagation();
      handler({ habitId: habitId, date: habitDay.dataset.date, completed: habitDay.dataset.completed });
    });
  }

  addHandlerDeleteHabit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.classList.contains('js-delete-habit')) return;

      const habitId = e.target.closest('.js-habit-list__habit').dataset.habitId;
      if (!habitId) return;

      e.stopPropagation();
      handler(habitId);
    });
  }

  addHandlerEditHabit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.classList.contains('js-edit-habit')) return;

      const habitId = e.target.closest('.js-habit-list__habit').dataset.habitId;
      if (!habitId) return;

      e.stopPropagation();
      handler(habitId);
    });
  }

  addHandleCreateNewHabit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const target = e.target;

      if (!target.classList.contains('js-habit-list__create-new-habit')) return;

      e.stopPropagation();
      handler();
    });
  }
}

export default HabitListView = new HabitListView();
