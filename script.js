const foods = {
    apple : 95,
    banana : 105,
    egg : 78,
    roti : 120,
    rice : 130
};

// For One Row Selection
const foodInput = document.getElementById('food');
const quanInput = document.getElementById('quantity');
// console.log(foodInput);
// console.log(quanInput);

const submitbtn = document.getElementById('calculate');
// console.log(submitbtn);

const resultArea = document.getElementById('result-box');
const result = document.getElementById('result');
// console.log(resultArea);
// console.log(result);
// console.log(foods.apple);

submitbtn.addEventListener('click' , () => {
    const currentFoodInput = foodInput.value;
    const currentQuanInput = quanInput.valueAsNumber;
    // console.log(currentFoodInput);
    // console.log(currentQuanInput);

    if(currentFoodInput.toLowerCase() in foods && currentQuanInput > 0) {
        const foodCalorie = foods[currentFoodInput.toLowerCase()];
        const calories = foodCalorie * currentQuanInput;
        result.textContent = "The Total calorie Is " + calories;
    } else if(currentQuanInput <= 0) {
        result.textContent = "Error : Please Enter Valid Quantity ( Greater Than 0 )";
    } else {
        result.textContent = "Error : Please Enter Valid Food Item";
    }

});

// Add The Another Row Logic 

const addBtn = document.getElementById('addRow');
const inputRows = document.getElementById('food-row')
// console.log(addBtn);
// console.log(inputContainer);

addBtn.addEventListener('click' , () => {
    // Creating InputContainer
    const newInputContainer = document.createElement('div');
    newInputContainer.className = 'input-container';
    
    // Creating Food Input
    const newInputFood = document.createElement('input');
    newInputFood.type = 'text';
    newInputFood.name = 'Food';
    newInputFood.placeholder = 'Enter food item';
    newInputFood.required = true;
    newInputFood.className = 'food-quantity';

    const newQuantityFood = document.createElement('input');
    newQuantityFood.type = 'number';
    newQuantityFood.name = 'Quantity';
    newQuantityFood.placeholder = 'Enter Quantity';
    newQuantityFood.required = true;
    newQuantityFood.className = 'food-quantity';

    // Creating Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'removeRow';
    removeBtn.innerText = '-';

    inputRows.appendChild(newInputContainer);
    newInputContainer.appendChild(newInputFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(newQuantityFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(removeBtn);

});