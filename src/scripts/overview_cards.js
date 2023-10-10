function createBudgetCard(category_name, spentValue = null) {
  const budget_card = document.createElement('div');
  budget_card.innerHTML = `
    <div class="budget_card">
        <div class="budget_card_title flex">
            <img src="./src/icons/home.png" />
            <h2>${category_name}</h2>
        </div>
        <div class="stats">
            <h1>SPENT: </h1>
            <p>${spentValue ? spentValue : ''}</p>
        </div>
        <h1 class="budget_percent">${
          spentValue ? calculatePercentageFromTotal(spentValue) : 100
        }%</h1>
    </div> 
    `;

  return budget_card;
}

function createCategoryCards(data) {
  let section = document.getElementById('overview');
  section.innerHTML = '';
  Object.keys(data).forEach(category => {
    section.append(createBudgetCard(category));
  });
}

function updateBudgetCards(calculatedData) {
  let section = document.getElementById('overview');
  section.innerHTML = '';
  Object.keys(calculatedData).forEach(key => {
    if (key == 'INCOME') {
      // section.append(createBudgetCard(key, calculatedData[key]));
      document.getElementById('month_income').innerText = calculatedData[key];
    } else {
      section.append(createBudgetCard(key, calculatedData[key]));
    }
  });
}

function calculatePercentageFromTotal(spentValue) {
  const totalIncome = document.getElementById('monthly_income');
  if (totalIncome != null) {
    let totalValue = totalIncome.innerText;
    console.log(totalValue);
    return ((spentValue * 100) / totalValue).toFixed(2);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  createCategoryCards(await api.optionsData());
});

export default updateBudgetCards;
