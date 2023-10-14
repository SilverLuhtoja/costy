import { loadCategories } from './categories.js';

function removeOldModal() {
  let old_section = document.getElementById('category_modal');
  if (old_section) old_section.remove();
}

function removeCategory(category_name) {
  api.send('removeCategory', category_name);
  removeOldModal();
  loadCategories();
}

function removeCategoryFilter(category_name, value) {
  api.send('removeCategoryFilter', { [category_name]: value });
  updateFilters(category_name);
}

async function updateFilters(category_name) {
  let data = await api.optionsData();
  let filterDiv = document.getElementById('modal_current_filters');
  let filters = data[category_name];
  filterDiv.innerHTML = 'FILTERS:';
  filters.forEach(filter =>
    filterDiv.append(createFilterDiv(category_name, filter))
  );
}

function createDropDown(category_name, filter) {
  let drop_down = document.createElement('div');
  let remove_filter_btn = document.createElement('button');
  remove_filter_btn.innerText = 'remove';
  remove_filter_btn.addEventListener('click', () =>
    removeCategoryFilter(category_name, filter)
  );
  drop_down.append(remove_filter_btn);

  return drop_down;
}

function createFilterDiv(category_name, filter) {
  let drop_down = createDropDown(category_name, filter);
  let div = document.createElement('div');
  div.classList.add('filter');
  div.innerText = filter;

  div.addEventListener('mouseenter', () => div.append(drop_down));
  div.addEventListener('mouseleave', () => div.removeChild(drop_down));

  return div;
}

function createFilterElements(category_name, filters) {
  let div = document.createElement('div');
  div.setAttribute('id', 'modal_current_filters');
  div.classList.add('flex');
  div.innerText = 'FILTERS:';

  filters.forEach(filter => {
    div.append(createFilterDiv(category_name, filter));
  });

  return div;
}

function createClosingButton() {
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_close_btn');
  btn.innerText = 'X';
  btn.addEventListener('click', () => removeOldModal());

  return btn;
}

function createRemoveCategoryButton(category_name) {
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_category_remove_btn');
  btn.innerText = '-';
  btn.addEventListener('click', () => removeCategory(category_name));

  return btn;
}

function createAddFilterButton(category_name) {
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_add_category_btn');
  btn.innerText = '+';
  btn.addEventListener('click', () => {
    let valueEl = document.getElementById('modal_add_category_value');
    if (valueEl.value.trim() != '') {
      api.send('saveCategoryFilter', [category_name, valueEl.value]);
    }
    valueEl.value = '';
    updateFilters(category_name);
  });

  return btn;
}

function createFilterInput(category_name) {
  let wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'modal_input_wrapper');
  wrapper.innerHTML = `
    <input id="modal_add_category_value" name="category" type="text" placeholder="add new filter...">
  `;
  wrapper.append(createAddFilterButton(category_name));

  return wrapper;
}

function createModal(category_name, category_filters) {
  removeOldModal();

  let section = document.createElement('section');
  section.setAttribute('id', 'category_modal');
  section.innerHTML = `
    <div id="modal_title">Category: <p class="title">${category_name}</p></div>
  `;

  section.append(createFilterElements(category_name, category_filters));
  section.append(createFilterInput(category_name, category_filters));
  section.append(createClosingButton());
  section.append(createRemoveCategoryButton(category_name));

  document.body.append(section);
}

export default createModal;
