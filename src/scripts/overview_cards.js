let monthlyIncome = document.getElementById('monthly_income');
let monthlyPercent = document.getElementById('monthly_percent');

function createBudgetCard(
  category_name,
  spentValue = null,
  spentPercentage = null
) {
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
          spentPercentage ? spentPercentage : 100
        }%</h1>
    </div> 
    `;

  return budget_card;
}

export function createCategoryCards(data) {
  let section = document.getElementById('overview');
  section.innerHTML = '';
  Object.keys(data).forEach(category => {
    if (category != 'INCOME') section.append(createBudgetCard(category));
  });
}

function updateBudgetCards(calculatedData) {
  let section = document.getElementById('overview');
  section.innerHTML = '';
  let sumPercentage = 0;
  Object.keys(calculatedData).forEach(key => {
    if (key == 'INCOME') {
      monthlyIncome.innerText = calculatedData[key];
    } else {
      let spentPercentage = calculatePercentageFromTotal(calculatedData[key]);
      sumPercentage += Number(spentPercentage);
      section.append(
        createBudgetCard(key, calculatedData[key], spentPercentage)
      );
    }
  });
  monthlyPercent.innerText = sumPercentage.toFixed(2) + '%';
}

function calculatePercentageFromTotal(spentValue) {
  if (monthlyIncome != null) {
    let totalValue = monthlyIncome.innerText;
    return ((spentValue * 100) / totalValue).toFixed(2);
  }
}

export default updateBudgetCards;
