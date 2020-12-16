/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não numérico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 2]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

const arrayOnlyOfNumbers = (array) => {
  let isNumber = true;
  for (let index = 0; index < array.length; index += 1) {
    if (typeof array[index] !== 'number') {
      isNumber = false;
    }
  }
  return isNumber;
};

const average = (array) => {
  let averageReturn = null;
  if (array.length === 0 || arrayOnlyOfNumbers(array) === false) {
    averageReturn = undefined;
  } else {
    let sum = 0;
    for (let index = 0; index < array.length; index += 1) {
      sum += array[index];
    }
    averageReturn = Math.round(sum / array.length);
  }
  return averageReturn;
};

module.exports = average;
