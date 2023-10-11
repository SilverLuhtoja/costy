import { loadCategories } from '../scripts/categories.js';
import { createCategoryCards } from '../scripts/overview_cards.js';

document.addEventListener('DOMContentLoaded', async function () {
  createCategoryCards(await api.optionsData());
  loadCategories();
});
