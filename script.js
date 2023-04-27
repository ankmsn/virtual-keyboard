
document.body.insertAdjacentHTML('beforeend', `
<div class="wrapper">
  <div class="textarea">
    <div class="top-text">
      <p>Windows OS</p>
      <p>EN</p>
    </div>
    <textarea id="area"></textarea>
  </div>
  <p>Press Shift + Alt to switch language</p>
  <div class="keyboard">
    <div class="grid"></div>
  </div>
</div>
`);

const grid = document.querySelector('.grid');
const letters = ['`','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Del',
    's', 'a', 'CapsLock', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\',
    'z', 'ENTER', 'Shift', 'x','c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', 'Ctrl', 'Alt', ' ', '←', '↓', '→'
  ];
  
letters.forEach(letter => {
  const cell = document.createElement('div');
  cell.textContent = letter;
  cell.classList.add('cell');
  grid.appendChild(cell);
});


const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.style.backgroundColor = 'lightblue';
    cell.style.transform = 'scale(0.9)';
    setTimeout(() => {
      cell.style.backgroundColor = '';
      cell.style.transform = '';
    }, 300);
  });
});


document.addEventListener('click',(event) => {
console.log(event.target)
})
