import createModal from './modal.js';
import createCategoryCards from './overview_cards.js';
let categories = document.getElementById('categories');
let add_category_btn = document.getElementById('add_category_btn');

async function loadCategories() {
  let data = await api.optionsData();
  categories.innerHTML = Object.keys(data)
    .map(key => `<div id='category'>${key}</div>`)
    .join('');

  document.querySelectorAll('#category').forEach(item => {
    item.addEventListener('click', e => {
      let category = e.currentTarget.innerHTML;
      createModal(category, data[category]);
    });
  });
}

add_category_btn.addEventListener('click', async () => {
  let category_value_element = document.getElementById('add_category_value');
  api.send('saveCategory', category_value_element.value);
  category_value_element.value = '';

  let data = await api.optionsData();
  let categories = Object.keys(data);
  document.getElementById('categories').innerHTML = categories
    .map(key => `<div id='category'>${key}</div>`)
    .join('');
  createCategoryCards(categories);
});

loadCategories();
