// AUto reloads on save
if (module.hot) {
  module.hot.accept();
}
document.getElementById('root').innerHTML = 'Hello, Hot Reloading!';
