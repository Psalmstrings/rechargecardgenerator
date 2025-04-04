// Event listeners for button clicks to trigger the respective functions
generateBTN.addEventListener("click", generateRechargeCard);  // Listens for click on the generate button
saveBTN.addEventListener("click", addRechargeCard);  // Listens for click on the save button
rechargeBTN.addEventListener("click", loadCard);  // Listens for click on the recharge button

// Array to store recharge card objects
let rechargeCards = JSON.parse(localStorage.getItem("rechargeCards")) || [];  // Load recharge cards from localStorage, or initialize as an empty array if none exist

// null - falsy value (indicating that the value could be empty or nonexistent)

// The previous method for checking localStorage and initializing rechargeCards is commented out for simplification
// if (localStorage.getItem("rechargeCards") !== null) {
//     rechargeCards = JSON.parse(localStorage.getItem("rechargeCards"));  // Load recharge cards from localStorage if they exist
// } else {
//     rechargeCards = [];  // Initialize rechargeCards as an empty array if no data exists in localStorage
// }
// The previous method for checking localStorage and initializing rechargeCards is commented out for simplification


let card;  // Declare a variable to hold the recharge card object

displayRechargeCards()  // Call the function to display the cards on the page

// Function to update the localStorage with the current rechargeCards array
function updateLocalStorage() {
    localStorage.setItem("rechargeCards", JSON.stringify(rechargeCards));  // Convert rechargeCards to a JSON string and save to localStorage
}

// Function to add a recharge card to the list
function addRechargeCard() {
    // Commented out old method for defining recharge codes for different networks
    // The previous method involved hardcoding the recharge codes for each network. It is now replaced with a more readable method.

    // Defining recharge codes based on the network using an object for better readability
    let networkCodes = {
        mtn: "*555*",
        airtel: "*126*",
        glo: "*123*",
        "9mobile": "*222*",
    }

    // Creating the recharge code based on network and pin
    card.rechargeCode = `${networkCodes[card.network]}${card.pin}#`  // Combining network prefix and pin to generate recharge code

    // Adding the card to the list of recharge cards
    rechargeCards.push(card)  // Push the card object to the rechargeCards array
    updateLocalStorage()  // Save the updated list to localStorage
    console.log(rechargeCards);  // Log the updated list of recharge cards
    displayRechargeCards()  // Update the UI to display the new list of cards
}


// Function to generate a new recharge card
function generateRechargeCard() {
    // Create a new card object with the input network and amount
    card = {
        network: networkINP.value.trim(),  // Get network input value and remove extra spaces
        amount: amountINP.value.trim(),  // Get amount input value and remove extra spaces
        status: false,  // The card is initially unused
        dateCreated: new Date().toLocaleDateString(),  // Store the creation date
        dateUsed: "Not yet used"  // Default status for the card
    }

    // Validate the inputs to ensure both network and amount are provided
    if (card.network === "" || card.amount === "") {
        alert("Ensure all fields are filled");  // Alert if inputs are empty
        return  // Exit the function if validation fails
    }

    // Define an object with the required PIN lengths for each network
    let networkLength = {
        mtn: 12,  // MTN network requires a 12-digit PIN
        airtel: 15,  // Airtel network requires a 15-digit PIN
        glo: 10,  // Glo network requires a 10-digit PIN
        "9mobile": 14  // 9mobile network requires a 14-digit PIN
    }

    // Generate a random code (PIN) for the card, with length based on the selected network
    let code = generateCode(networkLength[card.network])  // Use the networkLength object to get the correct PIN length for the selected network

    card.pin = code  // Assign the generated code to the card
    codeINP.value = code  // Display the generated code in the input field
}

// Function to generate a random code of a given length
function generateCode(length) {
    let code = ""  // Initialize an empty string for the code

    // Generate a random code by concatenating random digits
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10)  // Random digit from 0-9
    }

    console.log(code.length);  // Log the length of the generated code (for debugging)
    return code  // Return the generated code
}

// Function to display the recharge cards in the table
function displayRechargeCards() {
    tbodyTable.innerHTML = "";  // Clear the table before displaying updated cards
    if (rechargeCards.length === 0) {
        tbodyTable.innerHTML = `  <!-- If no recharge cards are available, display a "No record here" message -->
            <tr>
                <td colspan="8">No record here.</td>
            </tr>
        `;
        return  // Exit the function if no cards exist
    }
    rechargeCards.forEach((card, i) => {
        // Add each card as a new row in the table
        tbodyTable.innerHTML += `
            <tr>
            <td>${i + 1}</td>  <!-- Display the card index (1-based) -->
            <td>${card.network}</td>  <!-- Display the network -->
            <td>${card.pin}</td>  <!-- Display the card PIN -->
            <td>${card.rechargeCode}</td>  <!-- Display the recharge code -->
            <td>${card.status ? "used" : "unused"}</td>  <!-- Display the status (used or unused) -->
            <td>${card.dateCreated}</td>  <!-- Display the creation date -->
            <td>${card.dateUsed}</td>  <!-- Display the date the card was used -->
            <td><button class="btn btn-danger" onclick="deleteRechargeCard(${i})">Delete</button></td>  <!-- Delete button for each card -->
            </tr>   
        `;
    })
}

// Function to delete a recharge card by index
function deleteRechargeCard(i) {
    rechargeCards.splice(i, 1);  // Remove the card from the array by its index
    updateLocalStorage()  // Save the updated list to localStorage
    displayRechargeCards()  // Refresh the display to reflect the change
}

// Function to load a card and mark it as used
function loadCard() {
    let cardPin = rechargeINP.value.trim();  // Get the entered recharge code

    // Find the card with the matching recharge code
    let cardToBeRecharged = rechargeCards.find((card) => {
        return card.rechargeCode === cardPin
    })

    // If the card is not found, alert the user
    if (!cardToBeRecharged) {
        alert("Invalid Pin")  // Alert if the card was not found
        return
    }

    // If the card hasn't been used yet, mark it as used and update the date
    if (!cardToBeRecharged.status) {
        cardToBeRecharged.status = true
        cardToBeRecharged.dateUsed = new Date().toLocaleDateString()  // Set the current date as the date used
        updateLocalStorage()  // Update localStorage
        displayRechargeCards()  // Update the UI
        alert("Recharge successful")  // Notify the user of success
    }
    else {
        alert("Card has been used")  // Notify the user if the card is already used
    }
}

// Ways of accessing object properties
// 1. Dot notation
let user = {
    name: "John",  // Define an object with properties
    age: 10
}

// Access the 'name' property using dot notation
// user.name
let prop = "name"
// 2. Bracket Notation (alternative method to access object properties)
console.log(user[prop]);  // Access the 'name' property dynamically using bracket notation

// Change property to 'age' and access it using bracket notation
prop = "age"
console.log(user[prop]);  // Access the 'age' property


/*
Assignment: 
Create a custom filter function that mimics the behavior of JavaScript’s built-in Array filter() method. The custom function should take an array and a callback function as parameters and return a new array containing all elements for which the callback function returns a truthy value.
*/



function customSome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;  // Return true if the callback function returns a truthy value for any element
        }
    }
    return false;  // Return false if no truthy values are found
}

const numbers = [4, 8, 12, 3];

const result = customSome(numbers, (element) => element > 10);  // Check if any number is greater than 10

console.log(result);  // Output: true (because 12 is greater than 10)
