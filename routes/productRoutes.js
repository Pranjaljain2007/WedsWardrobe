/*
    to get product data from json in frontend
*/

const express = require("express");
const fs = require("fs"); //lets us read and write files on the server.
const path = require("path"); //helps create file paths safely, so they work on any operating system.F

const router = express.Router();

router.get("/:gender/:category/:subcategory", (req, res) => {

    //Extracts the URL parameters from the request
    const { gender, category, subcategory } = req.params;

    const filePath = path.resolve(
        `data/${gender}/${category}/${subcategory}/${subcategory}.json`
    );



    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(404).json({ message: "Products not found" });
        }

        try {
            const products = JSON.parse(data);
            res.json(products);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).json({ message: "Invalid JSON format" });
        }
    });
});

module.exports = router; 
