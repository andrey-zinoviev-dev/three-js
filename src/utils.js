const button = document.querySelector('.main__content-button');
const colorButtons = Array.from(document.querySelectorAll('.main__content-button-data'));

//functions
function changeButtonColor(evt) {
  const color = evt.dataset.color;
  return color;
}

module.exports = {
  button,
  colorButtons,
  changeButtonColor
}