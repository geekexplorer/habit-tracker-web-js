class HabitModel {
  constructor(habitData) {
    if (!habitData) {
      throw new Error('You must provide habitData in order to instanciate a HabitModel');
    }

    this.id = habitData.id;
    this.title = habitData.title;
    this.startDate = habitData.startDate;
    this.duration = habitData.duration;
    this.days = habitData.days;
    this.done = habitData.done;
  }
}

export default HabitModel;
