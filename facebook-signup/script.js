const buttonLogin = document.querySelector('#button-login');

buttonLogin.addEventListener('click', function (event) {
  event.preventDefault();
  alert(document.querySelector('#user-email-phone').value);
});

function validateRadios() {
  const radioFemale = document.querySelector('#feminine');
  const radioMale = document.querySelector('#masculine');
  const radioCustom = document.querySelector('#custom');
  let validRadio = false;
  if ((radioFemale.checked) || (radioMale.checked) || (radioCustom.checked)) {
    validRadio = true;
  }
  return validRadio;
}

function validateName() {
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  let isValid = true;
  if ((firstName.value === '') || (lastName.value === '')) {
    isValid = false;
  }
  return isValid;
}

function validateOthers() {
  const phoneEmail = document.querySelector('#phone-email');
  const password = document.querySelector('#password');
  const birthdate = document.querySelector('#birthdate');
  let isValid = true;
  if ((phoneEmail.value === '') || (birthdate.value === '') || (password.value === '')) {
    isValid = false;
  }
  return isValid;
}

function validateForm() {
  let isValid = true;

  if ((validateName()) && (validateOthers()) && (validateRadios())) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
}

function getRadioChecked() {
  const radios = [document.querySelector('#feminine'), document.querySelector('#masculine'), document.querySelector('#custom')];
  let radioChecked = null;
  for (let index = 0; index < radios.length; index += 1) {
    if (radios[index].checked) {
      radioChecked = radios[index].value;
    }
  }
  return radioChecked;
}

function showResults() {
  const rightContent = document.querySelector('.right-content');
  const infos = [];
  infos[0] = `Olá, ${document.querySelector('#first-name').value} ${document.querySelector('#last-name').value}`;
  infos[1] = document.querySelector('#phone-email').value;
  infos[2] = document.querySelector('#birthdate').value;
  infos[3] = getRadioChecked();
  rightContent.innerHTML = '';
  for (let index = 0; index < infos.length; index += 1) {
    const newP = document.createElement('p');
    newP.innerText = infos[index];
    rightContent.appendChild(newP);
  }
}

const buttonRegister = document.querySelector('#facebook-register');

buttonRegister.addEventListener('click', function (event) {
  event.preventDefault();
  const submitError = document.querySelector('#submit-error');
  submitError.innerText = '';
  if (!validateForm()) {
    submitError.innerText = 'Campos inválidos';
  } else {
    showResults();
  }
});

const allRadioBtns = document.querySelectorAll('input[name="gender"]');

function genderSelected(e) {
  const gender = e.srcElement.id;
  const formRegister = document.querySelector('.form-register');
  const totalChildrensForm = formRegister.children.length - 3;
  const inputCustomGender = document.querySelector('.custom-gender');

  if (gender === 'custom') {
    if (!inputCustomGender) {
      const newInputCustomGender = document.createElement('input');

      newInputCustomGender.className = 'gender-custom';
      newInputCustomGender.placeholder = 'Gênero (opcional)';
      newInputCustomGender.name = 'gender-custom';
      formRegister.children[totalChildrensForm].appendChild(newInputCustomGender);
    }
  }

  if (inputCustomGender) {
    inputCustomGender.remove();
  }
}
for (let i = 0; i < allRadioBtns.length; i += 1) {
  allRadioBtns[i].addEventListener('click', genderSelected);
}
