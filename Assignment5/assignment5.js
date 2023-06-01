calculateBMI = () => {
  const inputHeightLucas = document.getElementById('inputHeightLucas');
  const inputWeightLucas = document.getElementById('inputWeightLucas');
  const inputHeightPeter = document.getElementById('inputHeightPeter');
  const inputWeightPeter = document.getElementById('inputWeightPeter');

  const labelPartAResult = document.getElementById('labelPartAResult');
  const labelPartCResult = document.getElementById('labelPartCResult');

  const lucasWeight = inputWeightLucas.value.trim();
  const lucasHeight = inputHeightLucas.value.trim();
  const peterWeight = inputWeightPeter.value.trim();
  const peterHeight = inputHeightPeter.value.trim();

  if (
    lucasWeight === '' ||
    lucasHeight === '' ||
    peterWeight === '' ||
    peterHeight === ''
  ) {
    alert('Please fill all fields');
    return;
  } else if (
    isNaN(lucasWeight) ||
    isNaN(lucasHeight) ||
    isNaN(peterWeight) ||
    isNaN(peterHeight)
  ) {
    alert('Please enter numbers only');
    return;
  } else {
    const bmiLucas = getBMI(lucasHeight, lucasWeight);
    const bmiPeter = getBMI(peterHeight, peterWeight);

    //Part A Result
    const lucasHigherBMI = bmiPeter > bmiLucas;
    const partAResult = `The BMI of Peter is ${bmiPeter}, and the BMI of Lucas is ${bmiLucas}, Peter's BMI is higher than Lucas' BMI that is ${lucasHigherBMI}`;
    console.log('---------------------------------');
    console.log('Part A Result:');
    console.log(partAResult);
    console.log('---------------------------------');
    labelPartAResult.innerHTML =
      `<b>Part A Result:</b><br> ` + partAResult + `<br>`;

    //Part C Result
    const partCResult = `Lucas' BMI (${bmiLucas}) is ${
      bmiLucas > bmiPeter ? 'higher' : 'lower'
    } than Peter's BMI (${bmiPeter})!`;
    console.log('---------------------------------');
    console.log('Part C Result:');
    console.log(partCResult);
    console.log('---------------------------------');
    labelPartCResult.innerHTML =
      `<b>Part C Result:</b><br> ` + partCResult + `<br>`;
  }
};

getBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(2);
};
