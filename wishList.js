"use strict";

// Array to hold the book data
let bookArr = [];

// Call table content
let taHead = document.getElementById("tableHed");
let taBody = document.getElementById("tableBody");

// Fetch the JSON data
fetch('AsmaMarar/books.json')
    .then(response => response.json())
    .then(data => {
        bookArr = data.books;  // Store the array of books
        console.log("Array of books:", bookArr);  // Log the array to the console
        createHeader(); // Call function to create table header
        renderBooks(); // Call function to render book data
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });

// Function to create table header
function createHeader() {
    let trEle = document.createElement('tr');
    taHead.appendChild(trEle);

    let thEl1 = document.createElement('th');
    trEle.appendChild(thEl1);
    thEl1.textContent = 'About the Book';

    let thEl2 = document.createElement('th');
    trEle.appendChild(thEl2);
    thEl2.textContent = 'Author Name';

    let thEl3 = document.createElement('th');
    trEle.appendChild(thEl3);
    thEl3.textContent = 'Price';

    let thEl4 = document.createElement('th');
    trEle.appendChild(thEl4);
    thEl4.textContent = 'Add to Cart'; // Placeholder, as you mentioned it won't do anything

    let thEl5 = document.createElement('th');
    trEle.appendChild(thEl5);
    thEl5.textContent = 'Remove from wish list'; // Changed header to "Remove"
}

// Function to render book data into the table
function renderBooks() {
    taBody.innerHTML = ""; // Clear existing table body
    bookArr.forEach((book, index) => {
        let trBody = document.createElement('tr');
        taBody.appendChild(trBody);

        // About the Book with Image
        let tdEl1 = document.createElement('td');
        let imgEl = document.createElement('img');
        imgEl.src = "./" + book.image_url; // Ensure this matches your JSON structure
        imgEl.alt = book.title; // Alternative text for the image
        imgEl.style.width = "100px"; // Adjust width as needed
        imgEl.style.height = "150px"; // Adjust height as needed

        // Create a container for the image and title
        let bookInfoDiv = document.createElement('div');
        bookInfoDiv.style.textAlign = "center"; // Center the text

        // Append image and title to the container
        bookInfoDiv.appendChild(imgEl);
        let titleEl = document.createElement('div');
        titleEl.textContent = book.title; // Show book title
        titleEl.style.fontWeight = "bold"; // Make the title bold
        bookInfoDiv.appendChild(titleEl);

        // Append book info to the table cell
        tdEl1.appendChild(bookInfoDiv);
        trBody.appendChild(tdEl1);

        // Author Name
        let tdEl2 = document.createElement('td');
        tdEl2.textContent = book.author; // Assuming book has an 'author' property
        tdEl2.style.fontSize = "18px"; // Increase font size for author name
        trBody.appendChild(tdEl2);

        // Price with Dollar Sign
        let tdEl3 = document.createElement('td');
        tdEl3.textContent = `$${book.price}`; // Add dollar sign to the price
        tdEl3.style.fontSize = "18px"; // Increase font size for price
        trBody.appendChild(tdEl3);

        // Add to Cart Button
        let tdEl4 = document.createElement('td');
        let addButton = document.createElement('button');
        addButton.textContent = "Add to Cart";
        addButton.onclick = () => {
            console.log(`Added ${book.title} to cart`);
            // Add your logic for adding to cart here
        };
        styleButton(addButton); // Apply styles to the button
        tdEl4.appendChild(addButton);
        trBody.appendChild(tdEl4);

        // Remove Button
        let tdEl5 = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Changed button text to "Remove"
        removeButton.onclick = () => {
            removeFromCart(index); // Pass the index of the book to remove
        };
        styleButton(removeButton); // Apply styles to the button
        tdEl5.appendChild(removeButton);
        trBody.appendChild(tdEl5);
    });
}

// Function to style buttons
function styleButton(button) {
    button.style.backgroundColor = "#C5A992"; // Set button background to the desired color
    button.style.color = "white"; // White text
    button.style.padding = "15px 25px"; // Increased padding for bigger buttons
    button.style.border = "none"; // Remove border
    button.style.borderRadius = "5px"; // Rounded corners
    button.style.cursor = "pointer"; // Pointer cursor on hover
    button.style.fontSize = "16px"; // Increase font size for buttons
    button.style.transition = "background-color 0.3s"; // Smooth transition for hover effect

    // Change background color on hover
    button.onmouseover = function() {
        button.style.backgroundColor = "#B59C80"; // Darker shade for hover effect
    };
    button.onmouseout = function() {
        button.style.backgroundColor = "#C5A992"; // Reset to original color
    };
}

// Function to remove a book from the cart
function removeFromCart(index) {
    bookArr.splice(index, 1); // Remove the book from the array
    saveToLocalStorage(); // Save the updated array to local storage
    renderBooks(); // Re-render the table with the updated array
}

// Function to save the book array to local storage
function saveToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(bookArr));
}

// Function to load the wishlist from local storage on page load
function loadFromLocalStorage() {
    const savedBooks = localStorage.getItem("wishlist");
    if (savedBooks) {
        bookArr = JSON.parse(savedBooks);
        renderBooks(); // Render the saved books
    }
}

// Load from local storage on page load
loadFromLocalStorage();
document.getElementById("goBackButton").addEventListener("click", function() {
    window.location.href = "index.html"; // Change this to your main index page path
});
