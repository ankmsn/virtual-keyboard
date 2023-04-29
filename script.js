import {lettersEng, lettersEngShift, lettersEngCaps, lettersUkr, lettersUkrShift, lettersUkrCaps} from '/data.js'

document.body.insertAdjacentHTML('afterbegin', `
<div class="wrapper">
  <div class="textarea">
    <div class="top-text">
      <p>Windows OS</p>
      <p>ENG</p>
    </div>
    <textarea id="area" readonly></textarea>
  </div>
  <p>Press Shift + Alt to switch language</p>
  <div class="keyboard">
    <div class="grid"></div>
  </div>
</div>
`);

const grid = document.querySelector('.grid');
let letters;
let lettersShift;
let lettersCaps;
let langText = document.querySelector('.top-text > p:last-child');
let langInstruction = document.querySelector('.wrapper > p');

function selectEng () {
  letters = lettersEng;
  lettersShift = lettersEngShift;
  lettersCaps = lettersEngCaps;
  langText.textContent = 'ENG'
  langInstruction.textContent = 'Press Shift + Alt to switch language'
  localStorage.setItem("language", "ENG");
} 

function selectUkr () {
  letters = lettersUkr;
  lettersShift = lettersUkrShift;
  lettersCaps = lettersUkrCaps;
  langText.textContent = 'УКР';
  langInstruction.textContent = 'Натисніть Shift + Alt щоб змінити мову'
  localStorage.setItem("language", "UKR");
} 

if (localStorage.getItem("language") === 'ENG' || !localStorage.getItem("language")) {
  selectEng ();
} else {
  selectUkr ();
}

  letters.forEach(letter => {
    const cell = document.createElement('div');
    cell.textContent = letter;
    cell.classList.add('cell');
    grid.appendChild(cell);
  });

  const cells = document.querySelectorAll('.cell');
  const textarea = document.getElementById('area');
  let isCapsLockOn = false;

  const keys = {
    'Backquote': cells[0],
    'Digit1': cells[1],
    'Digit2': cells[2],
    'Digit3': cells[3],
    'Digit4': cells[4],
    'Digit5': cells[5],
    'Digit6': cells[6],
    'Digit7': cells[7],
    'Digit8': cells[8],
    'Digit9': cells[9],
    'Digit0': cells[10],
    'Minus': cells[11],
    'Equal': cells[12],
    'Backspace': cells[13],
    'Tab': cells[14],
    'KeyQ': cells[15],
    'KeyW': cells[16],
    'KeyE': cells[17],
    'KeyR': cells[18],
    'KeyT': cells[19],
    'KeyY': cells[20],
    'KeyU': cells[21],
    'KeyI': cells[22],
    'KeyO': cells[23],
    'KeyP': cells[24],
    'BracketLeft': cells[25],
    'BracketRight': cells[26],
    'Backslash': cells[27],
    'Delete': cells[28],
    'KeyA': cells[29],
    'KeyS': cells[30],
    'CapsLock': cells[31],
    'KeyD': cells[32],
    'KeyF': cells[33],
    'KeyG': cells[34],
    'KeyH': cells[35],
    'KeyJ': cells[36],
    'KeyK': cells[37],
    'KeyL': cells[38],
    'Semicolon': cells[39],
    'Quote': cells[40],
    'KeyZ': cells[41],
    'KeyX': cells[42],
    'Enter': cells[43],
    'ShiftLeft': cells[44],
    'KeyC': cells[45],
    'KeyV': cells[46],
    'KeyB': cells[47],
    'KeyN': cells[48],
    'KeyM': cells[49],
    'Comma': cells[50],
    'Period': cells[51],
    'Slash': cells[52],
    'ArrowUp': cells[53],
    'ControlLeft': cells[54],
    'MetaLeft': cells[55],
    'ShiftRight': cells[56],
    'AltLeft': cells[57],
    'AltRight': cells[58],
    'ArrowLeft': cells[59],
    'ArrowDown': cells[60],
    'Space': cells[61],
    'ArrowRight': cells[62],
    'ControlRight': cells[63]
  }

  function updateKeysContent(letters) {
      for (let i=0; i<letters.length; i++){
        cells[i].textContent = letters[i]
     }
   }

document.addEventListener('keydown', (event) => {
  const key = event.code;
  const content = keys[key].textContent
    
  if (key in keys) {
    keys[key].style.backgroundColor = 'lightblue';
    keys[key].style.transform = 'scale(0.9)';
  }

  if (event.shiftKey && event.altKey){
    if (localStorage.getItem("language") === 'ENG' || !localStorage.getItem("language")){
     selectUkr ()
       } else {
     selectEng ()
      }
   }

  if (key === 'ShiftRight' || key === 'ShiftLeft') {
     updateKeysContent(lettersShift); 
  }

  if (key === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    if (isCapsLockOn) {
      updateKeysContent(lettersCaps);
    } else {
      updateKeysContent(letters);
    }
  }

  if (content.length === 1) {
    const cursorPos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPos) + content + textarea.value.slice(cursorPos);
    textarea.selectionStart = cursorPos + 1;
    textarea.selectionEnd = cursorPos + 1;
  }

  if (key === 'Tab') {
    event.preventDefault();
    const cursorPos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPos) + '\t' + textarea.value.slice(cursorPos);
    textarea.selectionStart = cursorPos + 1;
    textarea.selectionEnd = cursorPos + 1;
  }

  if (key === 'Enter') {
    const cursorPos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPos) + '\n' + textarea.value.slice(cursorPos);
    textarea.selectionStart = cursorPos + 1;
    textarea.selectionEnd = cursorPos + 1;
  }

  if (key === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);  
  }

  if (key === 'Delete' && textarea.selectionStart < textarea.value.length) {
    textarea.value = textarea.value.slice(0, -1);  
  }

  if (key === 'ArrowLeft') {
    textarea.selectionStart -= 1;
    textarea.selectionEnd = textarea.selectionStart +1;   
    textarea.focus();
  } 

  if (key === 'ArrowRight') {
    textarea.selectionStart += 1;
    textarea.selectionEnd = textarea.selectionStart +1;   
    textarea.focus();
  } 

  if (key === 'ArrowDown') {
    const currentCursorPosition = textarea.selectionStart
    const numberInCurrentString = currentCursorPosition - textarea.value.lastIndexOf('\n', currentCursorPosition)
    textarea.selectionStart = textarea.value.indexOf('\n', currentCursorPosition) + numberInCurrentString;
    textarea.selectionEnd = textarea.selectionStart +1; 
    textarea.focus();
  } 

  if (key === 'ArrowUp') {
    const currentCursorPosition = textarea.selectionStart
    const prevStringEnd = textarea.value.lastIndexOf('\n', currentCursorPosition)
    const numberInCurrentString = currentCursorPosition - prevStringEnd
    textarea.selectionStart = textarea.value.lastIndexOf('\n', prevStringEnd-1) + numberInCurrentString;
    textarea.selectionEnd = textarea.selectionStart +1; 
    textarea.focus();
  } 

});

document.addEventListener('keyup', (event) => {
  const key = event.code;
  if (key in keys) {
    keys[key].style.backgroundColor = '';
    keys[key].style.transform = '';
  }
  
  if (key === 'ShiftRight' || key === 'ShiftLeft') {
    updateKeysContent(letters);    
    cells[31].style.backgroundColor = '';
    cells[31].style.transform = '';
    isCapsLockOn = false;   
} 

if (isCapsLockOn === true) {
    cells[31].style.backgroundColor = 'lightblue';
    cells[31].style.transform = 'scale(0.9)';
}

});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const key = cell.textContent;
    if (key === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    }
    if (key === 'Enter') {
      textarea.value += '\n';
    }
    if (key === 'Tab') {
      textarea.value += '\t';
    }
    if (key === 'Space') {
      textarea.value += ' ';
    }

    if (key.length === 1) {
      textarea.value += key;
    }

    cell.style.backgroundColor = 'lightblue';
    cell.style.transform = 'scale(0.9)';

    if (key === 'CapsLock') {
      isCapsLockOn = !isCapsLockOn;
      if (isCapsLockOn) {
        updateKeysContent(lettersCaps);
      } else {
        cell.style.backgroundColor = '';
        cell.style.transform = '';
        updateKeysContent(letters);
      }
    }

    if (key === 'Shift') {
      cells[31].style.backgroundColor = '';
      cells[31].style.transform = '';
      isCapsLockOn = false;
      updateKeysContent(letters);
    }

setTimeout(() => {
  if (key !== 'CapsLock') {
    cell.style.backgroundColor = '';
    cell.style.transform = '';
  }
}, 300);
});
});