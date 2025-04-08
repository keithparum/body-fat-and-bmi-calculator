// Select elements
const maleBtn = document.getElementById('male-btn');
const femaleBtn = document.getElementById('female-btn');
const form = document.getElementById('calculator-form');
const bmiResult = document.getElementById('bmi-result');
const fatPercentageResult = document.getElementById('fat-percentage-result');
const bmiMatrixTable = document.getElementById('bmi-matrix');
const fatMatrixTable = document.getElementById('fat-matrix');
const calculateBtn = document.getElementById('calculate-btn');
const resultsDiv = document.getElementById('results');
const matricesDiv = document.getElementById('matrices');
const genderSelection = document.querySelector('.gender-selection');

let gender = '';

// Show form based on gender selection
maleBtn.addEventListener('click', () => {
  gender = 'male';
  showForm();
});

femaleBtn.addEventListener('click', () => {
  gender = 'female';
  showForm();
});

// Show the form and hide the gender selection
function showForm() {
  form.classList.remove('hidden');
  genderSelection.style.display = 'none'; // Hide the gender buttons
}

// Go back to the gender selection
form.addEventListener('reset', () => {
  gender = '';
  form.classList.add('hidden');
  resultsDiv.classList.add('hidden');
  matricesDiv.classList.add('hidden');
  bmiResult.textContent = '';
  fatPercentageResult.textContent = '';
  bmiMatrixTable.innerHTML = '';
  fatMatrixTable.innerHTML = '';
  genderSelection.style.display = 'flex'; // Show the gender buttons again
});

// Calculate BMI and Body Fat Percentage
calculateBtn.addEventListener('click', () => {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!height || !weight || gender === '') {
    alert("Please select a gender and enter valid height and weight.");
    return;
  }

  // Calculate BMI
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
  bmiResult.textContent = bmi;

  // Simplified Body Fat Percentage formula
  let bodyFatPercentage;
  if (gender === 'male') {
    bodyFatPercentage = 1.2 * parseFloat(bmi) + 0.23 * 25 - 16.2; // Assuming age = 25 for simplicity
  } else if (gender === 'female') {
    bodyFatPercentage = 1.2 * parseFloat(bmi) + 0.23 * 25 - 5.4; // Assuming age = 25 for simplicity
  }
  bodyFatPercentage = bodyFatPercentage.toFixed(2);
  fatPercentageResult.textContent = bodyFatPercentage;

  // Show results and matrices
  resultsDiv.classList.remove('hidden');
  matricesDiv.classList.remove('hidden');

  // Generate BMI Matrix
  generateBMIMatrix();

  // Generate Body Fat Percentage Matrix
  generateFatMatrix();
});

// Generate BMI Matrix
function generateBMIMatrix() {
  bmiMatrixTable.innerHTML = ''; // Clear table
  const weights = [50, 60, 70, 80, 90]; // Example weights
  const heights = [150, 160, 170, 180, 190]; // Example heights

  // Create table headers
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th>Height/Weight</th>${weights.map(w => `<th>${w} kg</th>`).join('')}`;
  bmiMatrixTable.appendChild(headerRow);

  // Fill table rows
  heights.forEach(h => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${h} cm</td>`;
    weights.forEach(w => {
      const bmi = (w / Math.pow(h / 100, 2)).toFixed(2);
      row.innerHTML += `<td>${bmi}</td>`;
    });
    bmiMatrixTable.appendChild(row);
  });
}

// Generate Body Fat Percentage Matrix
function generateFatMatrix() {
  fatMatrixTable.innerHTML = ''; // Clear table
  const bfps = [10, 15, 20, 25, 30]; // Example body fat percentages
  const bmis = [18, 22, 26, 30, 34]; // Example BMIs

  // Create table headers
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th>BMI/BFP</th>${bfps.map(bfp => `<th>${bfp}%</th>`).join('')}`;
  fatMatrixTable.appendChild(headerRow);

  // Fill table rows
  bmis.forEach(bmi => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${bmi}</td>`;
    bfps.forEach(bfp => {
      row.innerHTML += `<td>${bmi + bfp}</td>`; // Example combination
    });
    fatMatrixTable.appendChild(row);
  });
}