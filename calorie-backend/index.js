// 1. Import The Express Library
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// 2. Initialize The Application
const app = express();
app.use(cors());    

// 3. Define The Port ( The Frequency Your Server Listens To)
const PORT = process.env.PORT || 5000;

// ---- Routes GO Here ----

// 1. A Basic Test Door (Root URL)
app.get('/' , (req , res) => {
    res.send("Welcome To The Calorie Tracker Backend !");
});

// 2. The Skeleton Search Route
// Notice the word 'async' added before (req, res)
app.get('/api/food/:foodName' , async (req , res) => {
    // req.params grabs the dynamic variable from the URL
    const requestFood = req.params.foodName;

    // 1. Your future "Passwords" for the external database
    const API_KEY =  process.env.USDA_API_KEY;

    // 2. The exact URL structure to search the Edamam Food Database
    const externalApiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${requestFood}&api_key=${API_KEY}`;

    // 3. Try/Catch Block: Crucial for backend stability!
    try {
        console.log(`Asking External Databse For : ${requestFood}....`);

        // We 'await' the fetch so Node knows to pause and wait for the internet request
        const response = await fetch(externalApiUrl);

        if(!response.ok) {
            throw new Error(`USDA API Error : ${response.status}`);
        }

        // const data = JSON.parse(text);
        const data = await response.json()

        // console.log(JSON.stringify(data , null , 2));

        // 3. The Safety Check (Preventing the Crash)
        if(!data.foods || data.foods.length === 0) {
            // If the array is missing or empty, stop here and tell the frontend
            return res.status(404).json({
                error : "Food Not Found Or Wrong API Structure !"
            });
        }

        // 4. If we pass the safety check, safely grab the calories
        const nutrients = data.foods[0].foodNutrients;
        const calories = nutrients.find(
            nutrient => nutrient.nutrientName.includes("Energy")
        );

        const exactCalorie = calories ? calories.value : 0;

        // 5. Send The Clean , Simple Data Back To Your Frontend
        res.json({
            item: requestFood,
            calorie: exactCalorie,
            status: "Success!"
        });
    } catch (error) {
        // 6. If the external database is down, or our keys are fake, handle the crash gracefully
        console.error("External API Error:" , error.message);

        // Send a '500 Internal Server Error' to the frontend instead of crashing the whole server
        res.status(500).json({
            error : "Could Not Fetch Food data. Are Your Api Keys Correct?"
        });
    }

});

// -----------------------

// 4. Tell The App To Start Listening
app.listen(PORT , () => {
    console.log(`The Server Is Succesfully Running On Http://localhost:${PORT}`);
});