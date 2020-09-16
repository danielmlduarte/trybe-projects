let button1 = document.querySelector('#button1');
let button2 = document.querySelector('#button2');

function openProject(projectName, projectUrl) {
  let opened = window.open('', '_self');
  opened.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="styletemplate.css" media="screen"/><title>${projectName}</title></head><body><header><button id="button-home">HOME</button></header><main><iframe id="project-container" src=${projectUrl} frameborder="0"></iframe></main><footer></footer><script>const btnHome = document.getElementById("button-home"); btnHome.addEventListener("click", function () {window.open("http://127.0.0.1:5500/index.html", "_self")});</script> </body></html>`);
}

button1.addEventListener('click', function () {
  openProject('Todo List', 'https://danielmlduarte.github.io/trybe-projects/todo-list');
});

button2.addEventListener('click', function () {
  openProject('Pixel Art', 'https://danielmlduarte.github.io/trybe-projects/pixels-art');
});

