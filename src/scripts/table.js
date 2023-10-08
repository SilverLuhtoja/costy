const show_table_btn = document.getElementById('show_table_btn');
const data_table = document.getElementById('dataTable');
const csvFileInput = document.getElementById('csvFileInput');
const table = document.getElementById('dataTable');

show_table_btn.addEventListener('click', () => {
  data_table.classList.toggle('hidden');
  if (data_table.classList.contains('hidden')) {
    show_table_btn.innerText = 'SHOW CONTENT';
  } else {
    show_table_btn.innerText = 'HIDE CONTENT';
  }
});

// Function to handle file input change
csvFileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    show_table_btn.classList.remove('hidden');
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      processData(contents);
    };
    reader.readAsText(file);
  } else {
    show_table_btn.classList.add('hidden');
  }
});

// Function to process CSV data and display it in a table
function processData(data) {
  table.innerHTML = ''; // Clear existing data

  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const row = document.createElement('tr');

    lines[i] = cleanUpData(lines[i]);

    let cells = lines[i].split(';');
    for (let col = 0; col < cells.length; col++) {
      if ([2, 3, 4, 5, 7].includes(col)) {
        let cellElement = document.createElement('td');
        if (i == 0) {
          cellElement = document.createElement('th');
        }
        cellElement.textContent = cells[col].trim();
        row.appendChild(cellElement);
      }
    }
    table.appendChild(row);
  }
}

function cleanUpData(line) {
  const cleanUpList = ['RD/EL;'];
  cleanUpList.forEach(constraint => {
    if (line.includes(constraint)) {
      line = line.replace(constraint, constraint.slice(0, -1));
    }
  });
  return line.replaceAll('"', '');
}
