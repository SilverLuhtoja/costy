let monthlyIncome = document.getElementById('monthly_income');
let monthlyPercent = document.getElementById('monthly_percent');

function createDetails(spentDetails) {
  const div = document.createElement('div');
  div.setAttribute('class', 'details hidden');
  spentDetails.forEach(item => {
    let detail = document.createElement('div');
    detail.setAttribute('class', 'flex');
    detail.innerHTML = `
      <p>${item[1]}</p>
      <p>${item[2]}</p>
      <p>${item[3]}</p>
      <p>${item[5] == 'D' ? '-' : ''}${item[4]}EUR</p>
    `;
    div.append(detail);
  });

  return div;
}

function createBudgetCard(
  category_name,
  spentValue = null,
  spentDetails = null,
  spentPercentage = null
) {
  const budget_card = document.createElement('div');
  const details_btn = document.createElement('button');
  budget_card.classList.add('budget_card');
  details_btn.setAttribute('id', 'details_btn');
  details_btn.innerText = 'details';
  budget_card.innerHTML = `
    <div class="budget_card_title flex">
    <img src="./src/icons/home.png" />
    <h2>${category_name}</h2>
    </div>
    <div class="stats">
    <h1>SPENT: </h1>
    <p>${spentValue ? spentValue + ' EUR' : ''}</p>
    </div>
    <h1 class="budget_percent">${spentPercentage ? spentPercentage : 100}%</h1>
  `;
  if (spentDetails) {
    budget_card.append(details_btn);
    budget_card.append(createDetails(spentDetails));
  }

  details_btn.addEventListener('click', () =>
    budget_card.querySelector('.details').classList.toggle('hidden')
  );

  // budget_card.addEventListener('mouseenter' , () => {
  //   budget_card.querySelector('.details').classList.remove('hidden');
  // })
  //   budget_card.addEventListener('mouseleave', () => {
  //     budget_card.querySelector('.details').classList.add('hidden');
  //   });

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
  let sumPercentage = 0;
  section.innerHTML = '';
  Object.keys(calculatedData).forEach(key => {
    let spentTotal = calculatedData[key]['total'];
    let spentDetails = calculatedData[key]['details'];
    if (key == 'INCOME') {
      monthlyIncome.innerText = spentTotal;
    } else {
      let spentPercentage = calculatePercentageFromTotal(spentTotal);
      sumPercentage += Number(spentPercentage);
      section.append(
        createBudgetCard(key, spentTotal, spentDetails, spentPercentage)
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
