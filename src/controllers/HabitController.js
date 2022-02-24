import HabitService from '../services/HabitService.js';
import HabitModel from '../models/HabitModel.js';

class HabitController {
  async getHabit(id) {
    const response = await HabitService.Retrieve(id);
    if (response.success) {
      return { success: true, data: new HabitModel(response.data) };
    }
    return response;
  }

  async getHabits() {
    const response = await HabitService.Retrieve();
    if (response.success) {
      return { success: true, data: response.data.map((habit) => new HabitModel(habit)) };
    }
    return response;
  }

  async CreateHabit(data) {
    const response = await HabitService.Create(data);
    if (response.success) {
      return { success: true, data: new HabitModel(response.data) };
    }
    return response;
  }

  async UpdateHabit(id, data) {
    return await HabitService.Update(id, data);
  }

  async DeleteHabit(id) {
    return await HabitService.Delete(id);
  }
}

export default HabitController = new HabitController();
