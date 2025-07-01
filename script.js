document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const heightInput = document.getElementById('height');
    const heightUnit = document.getElementById('height-unit');
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weight-unit');
    const feetInput = document.getElementById('feet');
    const inchesInput = document.getElementById('inches');
    const heightInchesDiv = document.getElementById('height-inches');
    const resultContainer = document.getElementById('result');
    const bmiNumber = document.getElementById('bmi-number');
    const bmiStatus = document.getElementById('bmi-status');
    const bmiDescription = document.getElementById('bmi-description');
    const recalculateBtn = document.getElementById('recalculate');
    heightUnit.addEventListener('change', function() {
        if (this.value === 'ft-in') {
            heightInchesDiv.style.display = 'block';
            heightInput.style.display = 'none';
            feetInput.required = true;
            inchesInput.required = true;
            heightInput.required = false;
        } else {
            heightInchesDiv.style.display = 'none';
            heightInput.style.display = 'block';
            feetInput.required = false;
            inchesInput.required = false;
            heightInput.required = true;
        }
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });
    recalculateBtn.addEventListener('click', function() {
        resultContainer.style.display = 'none';
        form.style.display = 'block';
        form.reset();
        heightInchesDiv.style.display = 'none';
        heightInput.style.display = 'block';
    });
    function calculateBMI() {
        let height, weight;
        const weightValue = parseFloat(weightInput.value);
        if (weightUnit.value === 'lbs') {
            weight = weightValue * 0.453592;
        } else {
            weight = weightValue;
        }
        if (heightUnit.value === 'ft-in') {
            const feet = parseFloat(feetInput.value) || 0;
            const inches = parseFloat(inchesInput.value) || 0;
            const totalInches = (feet * 12) + inches;
            height = totalInches * 0.0254;
        } else {
            const heightValue = parseFloat(heightInput.value);
            height = heightValue / 100; 
        }
        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Please enter valid height and weight values.');
            return;
        }
        const bmi = weight / (height * height);
        displayResult(bmi);
    }
    function displayResult(bmi) {
        const roundedBMI = Math.round(bmi * 10) / 10;
        bmiNumber.textContent = roundedBMI;
        let category, message, categoryClass;
        if (bmi < 18.5) {
            category = 'Underweight';
            message = 'You are underweight. Consider consulting with a healthcare provider about healthy ways to gain weight.';
            categoryClass = 'category-underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal Weight';
            message = 'Congratulations! You have a healthy weight. Keep up the good work with a balanced diet and regular exercise.';
            categoryClass = 'category-normal';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            message = 'You are overweight. Consider adopting a healthier lifestyle with regular exercise and a balanced diet.';
            categoryClass = 'category-overweight';
        } else {
            category = 'Obese';
            message = 'You are obese. It is recommended to consult with a healthcare provider for personalized advice on weight management.';
            categoryClass = 'category-obese';
        }
        bmiStatus.textContent = category;
        bmiStatus.className = categoryClass;
        bmiDescription.textContent = message;
        form.style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function validateNumberInput(input) {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = '';
            }
        });
    }
    validateNumberInput(heightInput);
    validateNumberInput(weightInput);
    validateNumberInput(feetInput);
    validateNumberInput(inchesInput);
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateBMI();
            }
        });
    });
});