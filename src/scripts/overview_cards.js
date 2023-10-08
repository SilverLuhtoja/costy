function createBudgetCard(category_name) {
  const budget_card = document.createElement('div');
  budget_card.innerHTML = `
    <div class="budget_card">
        <div class="budget_card_title flex">
            <img src="./src/icons/home.png" />
            <h2>${category_name}</h2>
        </div>
        <div class="stats">
            <h1>SPENT:</h1>
        </div>
        <h1 class="budget_procent">100%</h1>
    </div> 
    `;

  return budget_card;
}

function createCategoryCards(categories) {
  let section = document.getElementById('overview');
  section.innerHTML = '';
  categories.forEach(category => {
    section.append(createBudgetCard(category));
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  createCategoryCards(Object.keys(await api.optionsData()));
});

export default createCategoryCards;
