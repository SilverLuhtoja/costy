function removeOldModal() {
  let old_section = document.getElementById('category_modal');
  if (old_section) old_section.remove();
}

function createClosingButton(){
    let btn = document.createElement('button');
    btn.setAttribute('id', 'modal_close_btn');
    btn.innerText = "CLOSE"
    btn.addEventListener('click', () => removeOldModal());
    return btn
}

function addFilterButton(category_name) {
  let btn = document.createElement('button');
  btn.setAttribute('id', 'modal_add_category_btn');
  btn.innerText = 'ADD FILTER';
  btn.addEventListener('click', () => {
// add filter to category
    let valueEl = document.getElementById('modal_add_category_value');
    console.log(valueEl.value);
    api.send('saveCategoryFilter', [category_name, valueEl.value]);
    valueEl.value = '';
  });
  return btn;
}

function createModal(category_name, category_filters) {
  //  remove old modal
  removeOldModal();

  let section = document.createElement('section');
  section.setAttribute('id', 'category_modal');
  section.innerHTML = `
    <div id="modal_title">Category: ${category_name}</div>
    <div id="modal_current_filters">current filters: ${category_filters}</div>
    <input id="modal_add_category_value" name="category" type="text" placeholder="add new filter...">
  `;
  section.append(addFilterButton(category_name));
  section.append(createClosingButton());

  document.body.append(section);

  // get element after it has appended to docuement
  document
    .getElementById('modal_close_btn')
    .addEventListener('click', () => removeOldModal());
}

export default createModal;
