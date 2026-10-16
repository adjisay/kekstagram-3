const filtersElement = document.querySelector('.img-filters');

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

export { showFilters };
