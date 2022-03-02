import range from '../../node_modules/lodash-es/range.js';

class HabitModel {
  constructor(habitData) {
    if (!habitData) {
      throw new Error('You must provide habitData in order to instantiate a HabitModel');
    }

    this.id = habitData.id;
    this.title = habitData.title;
    this.dateStarted = habitData.dateStarted;
    this.duration = habitData.duration;
    this.days = habitData.days;
    this.completed = habitData.completed;
  }

  static createNewHabitModel(title, duration) {
    const startDate = new Date().toJSON();

    const habitData = {
      title: title,
      duration: duration,
      dateStarted: startDate,
      days: this.createHabitDays(startDate, duration),
    };

    const habit = new HabitModel(habitData);

    return habit;
  }

  static createHabitDays(startDateString, duration) {
    return range(0, duration, 1).map(function (_, idx) {
      return {
        date: dayjs(startDateString).add(idx, 'day').toJSON(),
        done: false,
      };
    });
  }
}

export default HabitModel;
