import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter, isChecked) => {
  const {title, count} = filter;
  const isFilterChecked = isChecked ? `checked` : ``;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isFilterChecked};
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return `<section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
