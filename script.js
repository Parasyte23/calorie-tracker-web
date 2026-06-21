// For One Row Selection
// const foodInput = document.getElementById('food');
// const quanInput = document.getElementById('quantity');

// Multiple Row Selection
// This Query Selection Will Not Work Because It Will Return A Node List Of All The Inputs With The Class Name 'food-items' And 'food-quantity' Respectively But It'll Not Select The Newly Added Row Because It Is Outside Of The DOM When The Page Is Loaded So We Need To Move This Query Selection Inside The Event Listener Of The Submit Button To Get The Updated Node List Each Time We Click The Button.
// const foodInputs = document.querySelectorAll('.food-items[type="text"]');
// const quanInputs = document.querySelectorAll('.food-quantity[type="number"]');

const submitbtn = document.getElementById('calculate');

const resultArea = document.getElementById('result-box');
const result = document.getElementById('result');
const eachResult = document.getElementById('each-result');
const calorieListItem = document.getElementById('calorie-list');

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

submitbtn.addEventListener('click' , async () => {

    submitbtn.disabled = true;

    let totalCalories = 0;

    const foodInputs = document.querySelectorAll('.food-items[type="text"]');
    const quanInputs = document.querySelectorAll('.food-quantity[type="number"]');

    // For Each Food Calorie 
    const foodItem = [];
    const foodCalorie = [];

    result.innerHTML = "Calculating....";

    for(let i = 0; i < foodInputs.length; i++) {
        let foodElem = foodInputs[i].value.toLowerCase().trim();
        let quanElem = quanInputs[i].valueAsNumber;

        if(foodElem != "" && quanElem > 0) {

            console.log("Searching:", foodElem);

            try {
                
                const response = await fetch(
                `http://localhost:5000/api/food/${foodElem}`
                );

                const data = await response.json();

                console.log('Recieved : ' , data);

                if(data.error) {
                    result.innerText = `Food Not Found : ${foodElem}`;
                    return;
                }

                const calories = data.calorie * quanElem;

                foodItem.push(foodElem);
                foodCalorie.push(calories);

                totalCalories += calories;

            } catch(error) {
                console.error(error);
                result.innerText = "Backend Server is offline";
                submitbtn.disabled = false;
                return;
            }

        } else {
            result.innerText = "Error : Please Enter Valid Food Item And \nQuantity (Greater Than 0) In Row " + (i + 1);
            submitbtn.disabled = false;
            return;
        }
    }

    result.innerText = " Total Calories : " + totalCalories;
    if(foodItem.length > 1) {
        eachResult.innerText = "Calories Breakdown For Each Item : \n";
        calorieListItem.innerHTML = "";
        foodItem.forEach((food , index) => {
            const eachFoodCalorie = document.createElement('li');
            calorieListItem.append(eachFoodCalorie);
            eachFoodCalorie.innerText = `${food.charAt(0).toUpperCase() + food.slice(1)} : ${foodCalorie[index]} Calories ( ${quanInputs[index].valueAsNumber} Quantity )`;
        });
    } else {
        eachResult.innerText = "";
        calorieListItem.innerHTML = "";
    }

    submitbtn.disabled = false;

});

// Keyboard Support , Press Enter Key For Calculation

document.addEventListener('keydown' , (event) => {
    if(event.key === 'Enter') {
        submitbtn.click();
    }
});

// Add The Another Row Logic 

const addBtn = document.getElementById('addRow');
const inputRows = document.getElementById('food-row')

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

    // Appending The Created Elements To The DOM
    inputRows.appendChild(newInputContainer);
    newInputContainer.appendChild(newInputFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(newQuantityFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(removeBtn);

    removeBtn.addEventListener('click' , () => {
        newInputContainer.remove();
    });

});