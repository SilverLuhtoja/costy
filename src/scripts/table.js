import updateBudgetCards from './overview_cards.js';

const show_table_btn = document.getElementById('show_table_btn');
const data_table = document.getElementById('dataTable');
const csvFileInput = document.getElementById('csvFileInput');
const table = document.getElementById('dataTable');
const fileUpload = document.querySelector('.custom-file-upload');
const COLUMN_DATA = {
  Reatüüp: 0,
  Kuupäev: 1,
  SaajaMaksja: 2,
  Selgitus: 3,
  Summa: 4,
  DeebetKreedit: 5,
};

show_table_btn.addEventListener('click', () => {
  data_table.classList.toggle('hidden');
  if (data_table.classList.contains('hidden')) {
    show_table_btn.innerText = 'SHOW CONTENT';
    fileUpload.classList.remove('hidden');
  } else {
    show_table_btn.innerText = 'HIDE CONTENT';
    fileUpload.classList.add('hidden');
  }
});

// Function to handle file input change
csvFileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    show_table_btn.classList.remove('hidden');
    const reader = new FileReader();

    reader.onload = async function (e) {
      const contents = e.target.result;
      const cleanedUpList = getCleanedUpList(contents);
      const calculations = await calculateExpenses(cleanedUpList);

      createTableData(cleanedUpList);
      updateBudgetCards(calculations);
    };
    reader.readAsText(file);
  } else {
    show_table_btn.classList.add('hidden');
  }
});

async function calculateExpenses(data) {
  const optionsData = await api.optionsData();
  let entries = Object.entries(optionsData);
  let SumUpCategories = {};

  for (let i = 1; i < data.length; i++) {
    for (const [key, values] of entries) {
      if (isMatch(values, data[i]) && values.length > 0) {
        let number = Number(data[i][COLUMN_DATA['Summa']]);
        if (data[i][COLUMN_DATA['DeebetKreedit']] == 'K' && key != 'INCOME') {
          number = -number;
        }
        SumUpCategories[key] = (SumUpCategories[key] || 0) + number;
      }
    }
  }
  return SumUpCategories;
}

function isMatch(values, data_row) {
  const pattern = new RegExp(values.join('|'), 'i');
  const receiverPayer = data_row[COLUMN_DATA['SaajaMaksja']].toLowerCase();
  const explanation = data_row[COLUMN_DATA['Selgitus']].toLowerCase();
  if (pattern.test(receiverPayer) || pattern.test(explanation)) {
    return true;
  }
  return false;
}

// Function to process CSV data and display it in a table
function createTableData(data) {
  table.innerHTML = ''; // Clear existing data

  data.forEach((rowData, rowIndex) => {
    const row = document.createElement(rowIndex === 0 ? 'thead' : 'tr');

    rowData.map(cellData => {
      const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
      cellElement.textContent = cellData.trim();
      row.appendChild(cellElement);
    });

    table.appendChild(row);
  });
}

function getCleanedUpList(data) {
  const ROWS_TO_INCLUDE = [1, 2, 3, 4, 5, 7];
  const lines = data.split('\n');
  return lines.map(line => {
    let splitedLine = cleanUpData(line).split(';');
    splitedLine[5] = splitedLine[5].replaceAll(',', '.'); // For Price, cant add comas together
    return ROWS_TO_INCLUDE.map(index => splitedLine[index]);
  });
}

function cleanUpData(line) {
  const cleanUpList = ['RD/EL;'];
  cleanUpList.forEach(constraint => {
    if (line.includes(constraint)) {
      line = line.replaceAll(constraint, constraint.slice(0, -1));
    }
  });
  return line.replaceAll('"', '');
}
