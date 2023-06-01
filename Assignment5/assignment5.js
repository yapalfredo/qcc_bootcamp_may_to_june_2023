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
    isInputEmpty(lucasWeight) ||
    isInputEmpty(lucasHeight) ||
    isInputEmpty(peterWeight) ||
    isInputEmpty(peterHeight)
  ) {
    alert('Please fill all fields for BMI calculation');
    return;
  } else if (
    isNotANumber(lucasWeight) ||
    isNotANumber(lucasHeight) ||
    isNotANumber(peterWeight) ||
    isNotANumber(peterHeight)
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
      `<b>Part A Result:</b><br> ` + partAResult + `<br><br>`;

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

ConvertCelsiusToFahrenheit = () => {
  const inputCelsius = document.getElementById('inputTemperatureCelcius');
  const labelFahrenheit = document.getElementById(
    'labelCelsiusTemperatureResult'
  );

  const celsius = inputCelsius.value.trim();

  if (isInputEmpty(celsius)) {
    alert('Please enter a value for Celsius');
    return;
  } else if (isNotANumber(celsius)) {
    alert('Please enter numbers only');
    return;
  } else {
    const fahrenheit = getFahrenheit(celsius);
    const resultFahrenheit = `${celsius}°C is ${fahrenheit}°F`;
    //Part B Result
    console.log('---------------------------------');
    console.log('Parts B & D Result:');
    console.log(resultFahrenheit);
    console.log('---------------------------------');
    labelFahrenheit.innerHTML =
      `<b>Parts B & D Result:</b><br> ` + resultFahrenheit + `<br><br>`;
  }
};

ConvertFahrenheitToCelsius = () => {
  const inputFahrenheit = document.getElementById('inputTemperatureFahrenheit');
  const labelCelsius = document.getElementById(
    'labelFahrenheitTemperatureResult'
  );

  const fahrenheit = inputFahrenheit.value.trim();

  if (isInputEmpty(fahrenheit)) {
    alert('Please enter a value for Fahrenheit');
    return;
  } else if (isNotANumber(fahrenheit)) {
    alert('Please enter numbers only');
    return;
  } else {
    const celsius = getCelsius(fahrenheit);
    const resultCelsius = `${fahrenheit}°F is ${celsius}°C`;
    //Part B Result
    console.log('---------------------------------');
    console.log('Parts B & D Result:');
    console.log(resultCelsius);
    console.log('---------------------------------');
    labelCelsius.innerHTML =
      `<b>Parts B & D Result:</b><br> ` + resultCelsius + `<br><br>`;
  }
};

getBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(2);
};

isNotANumber = (value) => {
  return isNaN(value);
};

isInputEmpty = (value) => {
  return value === '';
};

getCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

getFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};
