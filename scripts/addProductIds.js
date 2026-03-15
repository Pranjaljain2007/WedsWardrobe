const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// base folder where all product JSON files are stored
const BASE_DIR = path.join(__dirname, '../data');

// recursive function to find every .json file
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, callback);
        } else if (file.endsWith('.json')) {
            callback(fullPath);
        }
    });
}

//  function to add IDs to a JSON file if missing
function addIdsToJsonFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        let data = JSON.parse(rawData);

        if (!Array.isArray(data)) {
            console.warn(` Skipping ${filePath} — not an array`);
            return;
        }

        const updatedData = data.map(product => {
            // preserve existing id if already present
            if (!product.id) {
                product.id = uuidv4();
            }
            return product;
        });

        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        console.log(` Updated ${filePath} (${updatedData.length} products)`);
    } catch (err) {
        console.error(` Error processing ${filePath}:`, err.message);
    }
}

//  run for every JSON file in the /data directory
walkDir(BASE_DIR, addIdsToJsonFile);

console.log('\n All product JSON files updated with unique IDs!');
