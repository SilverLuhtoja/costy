import { loadCategories } from '../scripts/categories.js';
import { createCategoryCards } from '../scripts/overview_cards.js';

document.addEventListener('DOMContentLoaded', async function () {
  let data = await api.getOptionsData();
  createCategoryCards(data);
  loadCategories(data);
});
