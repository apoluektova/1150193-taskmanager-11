import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilterTemplate} from "./components/filter.js";
import {createEditTaskTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";

const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const boardContainer = siteMainElement.querySelector(`.board`);
const boardTasks = boardContainer.querySelector(`.board__tasks`);

render(boardContainer, createSortingTemplate(), `afterbegin`);
render(boardTasks, createEditTaskTemplate());

const renderTasks = () => {
  for (let i = 0; i < TASK_COUNT; i++) {
    render(boardTasks, createTaskTemplate());
  }
};

renderTasks();

render(boardContainer, createLoadMoreButtonTemplate());
