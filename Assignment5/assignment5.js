calculateBMI = () => {
  const inputHeightLucas = document.getElementById('inputHeightLucas');
  const inputWeightLucas = document.getElementById('inputWeightLucas');
  const inputHeightPeter = document.getElementById('inputHeightPeter');
  const inputWeightPeter = document.getElementById('inputWeightPeter');

  const labelBMIResult = document.getElementById('labelBMIResult');

  if (
    inputHeightLucas.value === '' ||
    inputWeightLucas.value === '' ||
    inputHeightPeter.value === '' ||
    inputWeightPeter.value === ''
  ) {
    alert('Please fill all fields');
    return;
  } else if (
    isNaN(inputHeightLucas.value) ||
    isNaN(inputWeightLucas.value) ||
    isNaN(inputHeightPeter.value) ||
    isNaN(inputWeightPeter.value)
  ) {
    alert('Please enter numbers only');
    return;
  } else {
    const bmiLucas = getBMI(inputHeightLucas.value, inputWeightLucas.value);
    const bmiPeter = getBMI(inputHeightPeter.value, inputWeightPeter.value);

    console.log(
      `The BMI of Peter is ${bmiPeter}, and the BMI of Lucas is ${bmiLucas}, Peter's BMI is higher than Lucas' BMI that is ${
        bmiPeter > bmiLucas
      }`
    );

    labelBMIResult.innerHTML = `Lucas BMI: ${bmiLucas} <br> Peter BMI: ${bmiPeter} <br> Lucas BMI is ${
      bmiLucas > bmiPeter ? 'higher' : 'lower'
    } than Peter's`;
  }
};

getBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(2);
};
