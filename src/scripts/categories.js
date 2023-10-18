import createModal from './modal.js';
import { createCategoryCards } from './overview_cards.js';

let categories = document.getElementById('categories');
let add_category_btn = document.getElementById('add_category_btn');
let files_input = document.getElementById('csvFileInput');
let category_input_element = document.getElementById('add_category_value');

export async function loadCategories() {
  let data = await api.optionsData();
  let isFileSelected = files_input.files.length != 0;
  categories.innerHTML = Object.keys(data)
    .map(key => `<div id='category'>${key}</div>`)
    .join('');

  document.querySelectorAll('#category').forEach(item => {
    item.addEventListener('click', e => {
      let category = e.currentTarget.innerHTML;
      createModal(category, data[category]);
    });
  });

  if (!isFileSelected) createCategoryCards(data);
}

add_category_btn.addEventListener('click', async () => {
  api.send('saveCategory', category_input_element.value);
  category_input_element.value = '';

  let data = await api.optionsData();
  document.getElementById('categories').innerHTML = Object.keys(data)
    .map(key => `<div id='category'>${key}</div>`)
    .join('');
  loadCategories();
});
