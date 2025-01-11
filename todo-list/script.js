const textInput = document.querySelector('#texto-tarefa');
const buttonMake = document.querySelector('#criar-tarefa');
const todoList = document.querySelector('#lista-tarefas');
const buttonClear = document.querySelector('#apaga-tudo');
const buttonEraseCompleted = document.querySelector('#remover-finalizados');
const buttonEditSelected = document.querySelector('#editar-tarefa');
const buttonMoveUp = document.querySelector('#mover-cima');
const buttonMoveDown = document.querySelector('#mover-baixo');
const buttonEraseSelected = document.querySelector('#remover-selecionado');
const tooltip = document.querySelector('#tooltip');
const tooltipText = document.querySelector('#tooltip-text');
let editMode = false;
let elementToEdit = "";
let myTimeout = ""

function removeOldSelected() {
  const oldSelected = document.querySelector('#selected');
  if (oldSelected != null) {
    oldSelected.id = '';
    //oldSelected.style.backgroundColor = '';
    oldSelected.style.border = ''
    oldSelected.style.boxShadow = '';
  }
}

function saveList() {
  const listElements = todoList.children;
  localStorage.clear();
  for (let index = 0; index < listElements.length; index += 1) {
    const elemPos = listElements[index];
    const elementDate = { className: elemPos.className, innerText: elemPos.innerText };
    localStorage.setItem(`item${index}`, JSON.stringify(elementDate));
  }
}

function addItem() {
  const liElement = document.createElement('li');
	if (!editMode) {		
		if (todoList.children.length < 78) {
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
	} else {
		editMode = false;
		elementToEdit.innerText = textInput.value.toUpperCase();
	}
	textInput.focus();
	saveList()
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

function showTooltip() {
	tooltip.classList.add("show")
	myTimeout = setTimeout(hideTooltip, 5000);
}

function hideTooltip() {
	tooltip.classList.remove("show")
	clearTimeout(myTimeout);
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
	saveList()
});

buttonEraseCompleted.addEventListener('click', function () {
  for (let index = (todoList.children.length - 1); index >= 0; index -= 1) {
    if (todoList.children[index].className === 'completed') {
      todoList.removeChild(todoList.children[index]);
    }
  }
	saveList()
});

buttonEditSelected.addEventListener('click', function () {
	elementToEdit = document.getElementById('selected');
	textInput.value = elementToEdit.innerText;
	editMode = true;
});

buttonMoveUp.addEventListener('click', function () {
  const elementToMoveUp = document.getElementById('selected');
  if (elementToMoveUp != null) {
    if (elementToMoveUp.previousElementSibling) {
      const previousElement = elementToMoveUp.previousElementSibling;
      previousElement.before(elementToMoveUp);
    }
  }
	saveList()
});

buttonMoveDown.addEventListener('click', function () {
  const elementToMoveDown = document.getElementById('selected');
  if (elementToMoveDown != null) {
    if (elementToMoveDown.nextElementSibling) {
      const previousElement = elementToMoveDown.nextElementSibling;
      previousElement.after(elementToMoveDown);
    }
  }
	saveList()
});

buttonEraseSelected.addEventListener('click', function () {
  const elementToRemove = document.getElementById('selected');
  if (elementToRemove != null) {
    elementToRemove.remove();
  }
	saveList()
	tooltipText.innerText = "Item removido!"
	showTooltip()
});

textInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    addItem();
  }
})

textInput.addEventListener('click', removeOldSelected);

window.onload = loadList;
