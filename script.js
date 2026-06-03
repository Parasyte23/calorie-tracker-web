const foods = {
    apple : 95,
    banana : 105,
    egg : 78,
    roti : 120,
    rice : 130
};

// For One Row Selection
// const foodInput = document.getElementById('food');
// const quanInput = document.getElementById('quantity');
// console.log(foodInput);
// console.log(quanInput);

// Multiple Row Selection
// This Query Selection Will Not Work Because It Will Return A Node List Of All The Inputs With The Class Name 'food-items' And 'food-quantity' Respectively But It'll Not Select The Newly Added Row Because It Is Outside Of The DOM When The Page Is Loaded So We Need To Move This Query Selection Inside The Event Listener Of The Submit Button To Get The Updated Node List Each Time We Click The Button.
// const foodInputs = document.querySelectorAll('.food-items[type="text"]');
// const quanInputs = document.querySelectorAll('.food-quantity[type="number"]');
// console.log(foodInputs);
// console.log(quanInputs);

const submitbtn = document.getElementById('calculate');
// console.log(submitbtn);

const resultArea = document.getElementById('result-box');
const result = document.getElementById('result');
// console.log(resultArea);
// console.log(result);
// console.log(foods.apple);

// For One Row Calorie Calculation

// submitbtn.addEventListener('click' , () => {
//     const currentFoodInput = foodInput.value;
//     const currentQuanInput = quanInput.valueAsNumber;
//     // console.log(currentFoodInput);
//     // console.log(currentQuanInput);

//     if(currentFoodInput.toLowerCase() in foods && currentQuanInput > 0) {
//         const foodCalorie = foods[currentFoodInput.toLowerCase()];
//         const calories = foodCalorie * currentQuanInput;
//         result.textContent = "The Total calorie Is " + calories;
//     } else if(currentQuanInput <= 0) {
//         result.textContent = "Error : Please Enter Valid Quantity ( Greater Than 0 )";
//     } else {
//         result.textContent = "Error : Please Enter Valid Food Item";
//     }

// });

// For Multiple Row Calorie Calculation

submitbtn.addEventListener('click' , () => {

    let totalCalories = 0;

    const foodInputs = document.querySelectorAll('.food-items[type="text"]');
    const quanInputs = document.querySelectorAll('.food-quantity[type="number"]');

    foodInputs.forEach((foodElement , index) => {
        const foodValue = foodElement.value.toLowerCase().trim();
        const quantityValue = quanInputs[index].valueAsNumber;

        if(foods && foodValue in foods && quantityValue > 0) {
            totalCalories += foods[foodValue] * quantityValue;
        } else {
            result.textContent = "Error : Please Enter Valid Food Item And Quantity ( Greater Than 0 ) In Row " + (index + 1);
            return;
        }
    });

    result.textContent = "The Total Calories : " + totalCalories;

});

// Add The Another Row Logic 

const addBtn = document.getElementById('addRow');
const inputRows = document.getElementById('food-row')
// console.log(addBtn);
// console.log(inputContainer);

addBtn.addEventListener('click' , () => {
    // Creating Inputs
    const newInputContainer = document.createElement('div');
    newInputContainer.className = 'input-container';
    
    // Creating Food Input
    const newInputFood = document.createElement('input');
    newInputFood.type = 'text';
    newInputFood.name = 'Food';
    newInputFood.placeholder = 'Enter food item';
    newInputFood.required = true;
    newInputFood.className = 'food-items';

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

// // Remove The Row Logic 

// const removeBtn = document.querySelectorAll('.removeRow');
// console.log(removeBtn);

