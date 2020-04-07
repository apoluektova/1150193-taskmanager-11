import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilterTemplate} from "./components/filter.js";
import {createEditTaskTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const boardContainer = siteMainElement.querySelector(`.board`);
const taskElement = boardContainer.querySelector(`.board__tasks`);

render(boardContainer, createSortingTemplate(), `afterbegin`);
render(taskElement, createEditTaskTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const renderTasks = () => {
  tasks.slice(1, showingTasksCount)
    .forEach((task) => render(taskElement, createTaskTemplate(task)));
};

renderTasks();

render(boardContainer, createLoadMoreButtonTemplate());

const loadMoreButton = boardContainer.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
