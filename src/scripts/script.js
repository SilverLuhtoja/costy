import createModal from "./modal.js";

let categories = document.getElementById('categories');
let add_category_btn = document.getElementById('add_category_btn');

// function removeOldModal() {
//   let old_section = document.getElementById('category_modal');
//   if (old_section) old_section.remove();
// }
// function createModal(category_name, category_filters) {
//   //  remove old modal
//   removeOldModal();

//   let section = document.createElement('section');
//   section.setAttribute('id', 'category_modal');
//   section.innerHTML = `
//     <div id="modal_title">Category: ${category_name}</div>
//     <div id="modal_current_filters">current filters: ${category_filters}</div>
//     <input id="modal_add_category_value" name="category" type="text" placeholder="add new filter...">
//     <button id="modal_add_category_btn" type="submit">ADD FILTER</button>
//     <button id="modal_close_btn">CLOSE</button>
//   `;

//   document.body.append(section);

//   // get element after it has appended to docuement
//   document
//     .getElementById('modal_close_btn')
//     .addEventListener('click', () => removeOldModal());
// }

function loadCategories() {
  // Replace 'data.json' with the path to your JSON file
  fetch(api.filePath)
    .then(response => response.json())
    .then(data => {
      categories.innerHTML = Object.keys(data)
        .map(key => `<div id='category'>${key}</div>`)
        .join('');

      document.querySelectorAll('#category').forEach(item => {
        item.addEventListener('click', e => {
          let category = e.currentTarget.innerHTML;
          createModal(category, data[category]);
        });
      });
    })
    .catch(error => {
      console.error('Error loading JSON:', error);
    });
}

loadCategories();
