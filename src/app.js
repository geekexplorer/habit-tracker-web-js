import HabitModel from './models/HabitModel.js';
import HabitListView from './views/HabitListView.js';

// Controllers
import HabitController from './controllers/HabitController.js';

// Views
const habitListView = new HabitListView();
const viewList = [habitListView];

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

// Habit List Handlers
const initHabitListHandlers = function () {};

/*
  --- Initialization --- 
*/

const initHandlers = function () {
  initHabitListHandlers();
};

const initApp = async function () {
  // Event Setup
  initHandlers();

  // Get Habits and start App
  var response = await HabitController.getHabits();
  if (response.success) {
    console.log(response.data);
    habitListModel = response.data;
    renderHabitListView();
    return;
  }

  // Can't get habit list. :(
  // Do some error stuff here.
};

initApp();
