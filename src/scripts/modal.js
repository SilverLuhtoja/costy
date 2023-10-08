function removeOldModal() {
  let old_section = document.getElementById('category_modal');
  if (old_section) old_section.remove();
}

async function updateFilters(category_name) {
  let data = await api.optionsData();
  document.getElementById(
    'modal_current_filters'
  ).innerHTML = `Current filters: ${createFilterElements(data[category_name])}`;
}

function createFilterElements(filters) {
  return filters.map(filter => `<div class="filter">${filter}</div>`).join('');
}

function createClosingButton() {
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_close_btn');
  btn.innerText = 'X';
  btn.addEventListener('click', () => removeOldModal());
  return btn;
}

function createFilterInput(category_name) {
  let wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'modal_input_wrapper');
  wrapper.innerHTML = `
    <input id="modal_add_category_value" name="category" type="text" placeholder="add new filter...">
  `;
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_add_category_btn');
  btn.innerText = '+';
  btn.addEventListener('click', e => {
    let valueEl = document.getElementById('modal_add_category_value');
    api.send('saveCategoryFilter', [category_name, valueEl.value]);
    valueEl.value = '';
    updateFilters(category_name);
  });
  wrapper.append(btn);
  return wrapper;
}

function createModal(category_name, category_filters) {
  removeOldModal();

  let section = document.createElement('section');
  section.setAttribute('id', 'category_modal');
  section.innerHTML = `
    <div id="modal_title">Category: <p class="title">${category_name}</p></div>
    <div id="modal_current_filters" class="flex">Current filters: ${createFilterElements(
      category_filters
    )}</div>
  `;

  section.append(createFilterInput(category_name));
  section.append(createClosingButton());

  document.body.append(section);
}

export default createModal;
