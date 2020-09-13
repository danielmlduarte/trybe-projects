const textInput = document.querySelector('#texto-tarefa');
const buttonMake = document.querySelector('#criar-tarefa');
const todoList = document.querySelector('#lista-tarefas');
const buttonClear = document.querySelector('#apaga-tudo');
const buttonEraseCompleted = document.querySelector('#remover-finalizados');
const buttonSaveList = document.querySelector('#salvar-tarefas');
const buttonMoveUp = document.querySelector('#mover-cima');
const buttonMoveDown = document.querySelector('#mover-baixo');
const buttonEraseSelected = document.querySelector('#remover-selecionado');

function removeOldSelected() {
  const oldSelected = document.querySelector('#selected');
  if (oldSelected != null) {
    oldSelected.id = '';
    //oldSelected.style.backgroundColor = '';
    oldSelected.style.border = ''
    oldSelected.style.boxShadow = '';
  }
}

function saveList(listElements) {
  localStorage.clear();
  for (let index = 0; index < listElements.length; index += 1) {
    const elemPos = listElements[index];
    const elementDate = { className: elemPos.className, innerText: elemPos.innerText };
    localStorage.setItem(`item${index}`, JSON.stringify(elementDate));
  }
}

function addItem() {
  if (todoList.children.length < 26) {
    const liElement = document.createElement('li');
    if (textInput.value === '') {
      liElement.innerText = 'nenhuma tarefa definida'
      liElement.style.fontStyle = 'italic';
      liElement.className = 'completed';
    } else {
      liElement.innerText = textInput.value.toUpperCase();
    }
    todoList.appendChild(liElement);
    textInput.value = '';
  } else {
    alert('Lista Cheia! Finalize ao menos uma tarefa antes de incluir mais uma, né meu filho!?')
  }
}

function loadList() {
  for (let index = 0; index < localStorage.length; index += 1) {
    const elementDateSaved = JSON.parse(localStorage.getItem(`item${index}`));
    const liSavedElement = document.createElement('li');
    liSavedElement.className = elementDateSaved.className;
    liSavedElement.innerText = elementDateSaved.innerText;
    todoList.appendChild(liSavedElement);
  }
}


buttonMake.addEventListener('click', function () {
  addItem();
});

todoList.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    removeOldSelected();
    //event.target.style.backgroundColor = 'rgb(128, 128, 128)';
    event.target.style.border = '1px solid black'
    event.target.style.boxShadow = '5px 5px 5px black';
    event.target.id = 'selected';
  }
});

todoList.addEventListener('dblclick', function (event) {
  if (event.target.tagName === 'LI') {
    if (event.target.className === 'completed') {
      event.target.className = '';
    } else {
      event.target.className = 'completed';
    }
  }
});

buttonClear.addEventListener('click', function () {
  for (let index = (todoList.children.length - 1); index >= 0; index -= 1) {
    todoList.removeChild(todoList.children[index]);
  }
});

buttonEraseCompleted.addEventListener('click', function () {
  for (let index = (todoList.children.length - 1); index >= 0; index -= 1) {
    if (todoList.children[index].className === 'completed') {
      todoList.removeChild(todoList.children[index]);
    }
  }
});

buttonSaveList.addEventListener('click', function () {
  saveList(todoList.children);
});

buttonMoveUp.addEventListener('click', function () {
  const elementToMoveUp = document.getElementById('selected');
  if (elementToMoveUp != null) {
    if (elementToMoveUp.previousElementSibling) {
      const previousElement = elementToMoveUp.previousElementSibling;
      previousElement.before(elementToMoveUp);
    }
  }
});

buttonMoveDown.addEventListener('click', function () {
  const elementToMoveDown = document.getElementById('selected');
  if (elementToMoveDown != null) {
    if (elementToMoveDown.nextElementSibling) {
      const previousElement = elementToMoveDown.nextElementSibling;
      previousElement.after(elementToMoveDown);
    }
  }
});

buttonEraseSelected.addEventListener('click', function () {
  const elementToRemove = document.getElementById('selected');
  if (elementToRemove != null) {
    elementToRemove.remove();
  }
});

textInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    addItem();
  }
})

textInput.addEventListener('click', removeOldSelected);

window.onload = loadList;
