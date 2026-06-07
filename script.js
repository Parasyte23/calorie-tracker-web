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
const eachResult = document.getElementById('each-result');
const calorieListItem = document.getElementById('calorie-list');
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

    // For Each Food Calorie 
    const foodItem = [];
    const foodCalorie = [];

    // 1.
    // Using ForEach Loop Was Causing An Logic Bug. Which Was That "Return Does Not Break A forEach Loop".
    // When you use a forEach loop, you are passing a callback function (foodElement, index) => { ... } that runs once for every single item in the array.
    // When you use return; inside that callback, you are only exiting that specific function execution for that specific item. You are not exiting the forEach loop itself.
    // In a standard for loop, return or break stops the entire loop dead in its tracks.
    // In a forEach loop, return acts exactly like continue does in a normal loop. It just skips the rest of the current cycle and immediately moves on to the next item in the array.

    // 2. The Error Message gets overwritten
    // Because the loop doesn't actually stop, here is what happens step-by-step if row 1 has an error but row 2 is valid:
    // 1. Row 1 (Error): The else block triggers. result.textContent is set to the Error message. return; executes, skipping the rest of Row 1.
    // 2. Row 2 (Valid): The loop continues anyway! The code processes Row 2 and adds to totalCalories.
    // 3. After the loop: If you have code beneath this loop that sets result.textContent = "Total Calories: " + totalCalories;, that code will execute immediately after the loop finishes. Your error message was technically on the screen, but it was overwritten by the final total a few milliseconds later, making it look like the else block never fired.

    // foodInputs.forEach((foodElement , index) => {
    //     const foodValue = foodElement.value.toLowerCase().trim();
    //     const quantityValue = quanInputs[index].valueAsNumber;

    //     if(foods && foodValue in foods && quantityValue > 0) {
    //         totalCalories += foods[foodValue] * quantityValue;
    //     } else {
    //         result.textContent = "Error : Please Enter Valid Food Item And Quantity ( Greater Than 0 ) In Row " + (index + 1);
    //         return;
    //     }
    // });

    // Fix :-
    // To achieve goal of stopping the entire process the moment an error is found, we need to swap the forEach loop for a traditional for loop. A traditional for loop allows us to use return (to exit the entire surrounding function) or break (to entirely stop the loop).
    for(let i = 0; i < foodInputs.length; i++) {
        let foodElem = foodInputs[i].value.toLowerCase().trim();
        let quanElem = quanInputs[i].valueAsNumber;

        if(foods && foodElem in foods && quanElem > 0) {
            foodItem.push(foodElem);
            foodCalorie.push(foods[foodElem] * quanElem);
            totalCalories += foods[foodElem] * quanElem;
        } else {
            result.innerText = "Error : Please Enter Valid Food Item And \nQuantity (Greater Than 0) In Row " + (i + 1);

            // This 'return' will now successfully stop the entire function, 
            // preventing the loop from continuing and preventing any final output code from running.
            return;
        }
    }

    result.innerText = "The Total Calories Is " + totalCalories;
    if(foodItem.length > 1) {
        eachResult.innerText = "Calories Breakdown For Each Item : \n";
        calorieListItem.innerHTML = "";
        foodItem.forEach((food , index) => {
            const eachFoodCalorie = document.createElement('li');
            calorieListItem.append(eachFoodCalorie);
            eachFoodCalorie.innerText = `${food} : ${foodCalorie[index]} Calories ( ${quanInputs[index].valueAsNumber} Quantity )`;
        });
    } else {
        eachResult.innerText = "";
        calorieListItem.innerHTML = "";
    }
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

    // Appending The Created Elements To The DOM
    inputRows.appendChild(newInputContainer);
    newInputContainer.appendChild(newInputFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(newQuantityFood);
    newInputContainer.appendChild(document.createTextNode(" "));
    newInputContainer.appendChild(removeBtn);

    // Remove The Row Logic
    //  * * Original Logic: 
    //  * Queried all remove buttons and input containers on the page, then 
    //  * looped through them to match indexes and delete the corresponding row.
    //  * * Why it was refactored:
    //  * Nesting `addEventListener` inside the Add Button click event created a bug. 
    //  * Every time a new row was added, brand new event listeners were attached 
    //  * to ALL existing remove buttons. This caused buttons to fire multiple times 
    //  * at once and broke the index syncing when rows were deleted out of order.

    // removeBtn.addEventListener('click' , () => {
    //     const inputContainerArray = document.querySelectorAll('.input-container');
    //     const removeBtnArray = document.querySelectorAll('.removeRow');
    //     // console.log('The Fuck man');
    //     // console.log(inputContainerArray.length);
    //     // console.log(removeBtnArray);

    //     removeBtnArray.forEach((btn , index) => {
    //         btn.addEventListener('click' , () => {
    //             inputContainerArray[index + 1].remove();
    //             console.log("Row No. " + (index + 1) + " Is Deleted");
    //         });
    //     });

    // });

     //  * * The Solution:
    //  * Replaced this logic with JavaScript closures. The current implementation 
    //  * links the remove button directly to its specific parent container at the 
    //  * time of creation, eliminating the need to track indexes or query arrays.
    //  */

    removeBtn.addEventListener('click' , () => {
        newInputContainer.remove();
    });

});