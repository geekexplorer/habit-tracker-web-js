import HabitModel from './models/HabitModel.js';

// Controllers
import HabitController from './controllers/HabitController.js';

// Views
import habitListView from './views/HabitListView.js';
import deleteHabitModalView from './views/DeleteHabitModalView.js';
import createHabitModalView from './views/CreateHabitModalView.js';
import editHabitModalView from './views/EditHabitModalView.js';
import HabitService from './services/HabitService.js';

const viewList = [habitListView, deleteHabitModalView, createHabitModalView];

// Models
let currentHabitModel = undefined;
let habitListModel = undefined;

/*
  --- Rendering Section ---
*/

const showView = function (view) {
  viewList.forEach((v) => v.hide());
  view.show();
};

const renderHabitListView = function () {
  habitListView.render(habitListModel);
  showView(habitListView);
};

/* 
  --- Handlers Section ---
*/

// HabitListView Handlers

const handleDayClick = async function (data) {
  const { habitId, date, completed } = data;

  const habit = habitListModel.find((habit) => habit.id === habitId);
  const dayIdx = habit.days.findIndex((day) => day.date === new Date(date).toJSON());
  habit.days[dayIdx].completed = !(completed === 'true');

  await HabitController.UpdateHabit(habitId, habit);

  renderHabitListView();
};

const handleHabitListHabitDeleteHabit = async function (habitId) {
  const habit = habitListModel.find((habit) => habit.id === habitId);
  deleteHabitModalView.render(habit);
  deleteHabitModalView.show();
};

const handleHabitListHabitEditHabit = async function (habitId) {
  const habit = habitListModel.find((habit) => habit.id === habitId);
  editHabitModalView.render(habit);
  editHabitModalView.show();
};

const handleHabitListCreateNewHabit = function () {
  createHabitModalView.render();
  createHabitModalView.show();
};

const initHabitListHandlers = function () {
  habitListView.addHandlerToggleDayCompelete(handleDayClick);
  habitListView.addHandlerDeleteHabit(handleHabitListHabitDeleteHabit);
  habitListView.addHandleCreateNewHabit(handleHabitListCreateNewHabit);
  habitListView.addHandlerEditHabit(handleHabitListHabitEditHabit);
};

// CreateHabitModalHandlers

const handleCreateHabitModalCreateHabit = async function (data) {
  const habitModel = HabitModel.createNewHabitModel(data.title, data.duration);
  const result = await HabitController.CreateHabit(habitModel);
  createHabitModalView.hide();
  if (!result.success) {
    // TODO: Surface Error
  }

  habitListModel.push(result.data);
  habitListView.render(habitListModel);
  showView(habitListView);
};

const handleEditHabitModalEditHabit = async function (data) {
  const updatedHabit = new HabitModel(data.habit);
  updatedHabit.title = data.newTitle;
  const result = await HabitController.UpdateHabit(updatedHabit.id, updatedHabit);
  editHabitModalView.hide();
  if (!result.success) {
    // TODO: Surface App Error
    return;
  }

  data.habit.title = updatedHabit.title;
  habitListView.render(habitListModel);
  showView(habitListView);
};

// DeleteHabitModaView Handlers

const handleHabitModalDelete = async function (habitId) {
  if (!habitId) return;

  const result = await HabitController.DeleteHabit(habitId);

  if (!result.success) {
    // TODO: Surface App Error
    return;
  }

  const deletedHabitIndex = habitListModel.findIndex((habit) => habit.id === habitId);
  habitListModel.splice(deletedHabitIndex);
  renderHabitListView();
  showView(habitListView);
};

const initModalHandlers = function () {
  // deleteHabitModal
  deleteHabitModalView.addHandleDelete(handleHabitModalDelete);
  // createHabitModal
  createHabitModalView.addCreateHabitHandler(handleCreateHabitModalCreateHabit);
  // editHabitModal
  editHabitModalView.addEditHabitHandler(handleEditHabitModalEditHabit);
};

/*
  --- Initialization --- 
*/

const initHandlers = function () {
  initHabitListHandlers();
  initModalHandlers();
};

const initApp = async function () {
  // Event Setup
  initHandlers();

  // Get Habits and start App
  var response = await HabitController.getHabits();
  if (response.success) {
    habitListModel = response.data;
    renderHabitListView();
    return;
  }

  // Can't get habit list. :(
  // Do some error stuff here.
};

initApp();
