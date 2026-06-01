const foods = {
    apple : 95,
    banana : 105,
    egg : 78,
    roti : 120,
    rice : 130
};

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