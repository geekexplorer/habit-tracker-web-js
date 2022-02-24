import HabitModel from './models/HabitModel.js';
import HabitListView from './views/HabitListView.js';

// Controllers
import HabitController from './controllers/HabitController.js';
import HabitService from './services/HabitService.js';

// Views
const habitListView = new HabitListView();
const viewList = [habitListView];

// Models
let currentHabitModel = undefined;
let habitListModel = undefined;

const showView = function (view) {
  viewList.forEach((v) => v.hide());
  view.show();
};

const renderHabitListView = function () {
  habitListView.render(habitListModel);
  showView(habitListView);
};

// --- Handlers Section --- //

// Habit List Handlers
const linkHabitListHandlers = function () {};

const linkHandlers = function () {
  linkHabitListHandlers();
};

const initApp = async function () {
  linkHandlers();
  var response = await HabitController.getHabits();
  if (response.success) {
    habitListModel = response.data;
    renderHabitListView();
    return;
  }
};

initApp();
