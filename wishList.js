"use strict";

// Call table content
let taHead = document.getElementById("tableHed");
let taBody = document.getElementById("tableBody");

// Function to create table header
function createHeader() {
  let trEle = document.createElement("tr");
  taHead.appendChild(trEle);

  let thEl1 = document.createElement("th");
  trEle.appendChild(thEl1);
  thEl1.textContent = "About the Book";

  let thEl2 = document.createElement("th");
  trEle.appendChild(thEl2);
  thEl2.textContent = "Author Name";

  let thEl3 = document.createElement("th");
  trEle.appendChild(thEl3);
  thEl3.textContent = "Price";

  let thEl4 = document.createElement("th");
  trEle.appendChild(thEl4);
  thEl4.textContent = "Add to Cart";

  let thEl5 = document.createElement("th");
  trEle.appendChild(thEl5);
  thEl5.textContent = "Remove from wish list";
}

// Function to render book data into the table
function renderBooks(bookArr) {
  taBody.innerHTML = ""; // Clear existing table body
  bookArr.forEach((book, index) => {
    let trBody = document.createElement("tr");
    taBody.appendChild(trBody);

    // About the Book with Image
    let tdEl1 = document.createElement("td");
    let imgEl = document.createElement("img");
    imgEl.src = book.image_url;
    imgEl.alt = book.title;
    imgEl.style.width = "10rem";
    imgEl.style.height = "15rem";

    let bookInfoDiv = document.createElement("div");
    bookInfoDiv.style.textAlign = "center";

    bookInfoDiv.appendChild(imgEl);
    let titleEl = document.createElement("div");
    titleEl.textContent = book.title;
    titleEl.style.fontWeight = "bold";
    bookInfoDiv.appendChild(titleEl);

    tdEl1.appendChild(bookInfoDiv);
    trBody.appendChild(tdEl1);

    // Author Name
    let tdEl2 = document.createElement("td");
    tdEl2.textContent = book.author;
    tdEl2.style.fontSize = "18px";
    trBody.appendChild(tdEl2);

    // Price with Dollar Sign
    let tdEl3 = document.createElement("td");
    tdEl3.textContent = `$${book.price}`;
    tdEl3.style.fontSize = "18px";
    trBody.appendChild(tdEl3);

    // Add to Cart Button
    let tdEl4 = document.createElement("td");
    let addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => {
      console.log(`Added ${book.title} to cart`);
    };
    styleButton(addButton);
    tdEl4.appendChild(addButton);
    trBody.appendChild(tdEl4);

    // Remove Button
    let tdEl5 = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      removeFromWishlist(index);
    };
    styleButton(removeButton);
    tdEl5.appendChild(removeButton);
    trBody.appendChild(tdEl5);
  });
}

// Function to style buttons
function styleButton(button) {
  button.style.backgroundColor = "#C5A992";
  button.style.color = "white";
  button.style.padding = "15px 25px";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontSize = "16px";
  button.style.transition = "background-color 0.3s";

  button.onmouseover = function () {
    button.style.backgroundColor = "#B59C80";
  };
  button.onmouseout = function () {
    button.style.backgroundColor = "#C5A992";
  };
}

// Function to remove a book from the wishlist
function removeFromWishlist(index) {
  let savedBooks = JSON.parse(localStorage.getItem("wishlist"));
  savedBooks.splice(index, 1); // Remove the book from the saved data
  localStorage.setItem("wishlist", JSON.stringify(savedBooks)); // Save the updated data
  renderBooks(savedBooks); // Re-render the wishlist
}

// Function to load the wishlist from local storage and render it
function loadFromLocalStorage() {
  const savedBooks = JSON.parse(localStorage.getItem("wishlist"));
  if (savedBooks) {
    createHeader(); // Create the table header
    renderBooks(savedBooks); // Render the saved books
  }
}

// Load the wishlist on page load
loadFromLocalStorage();

document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "index.html"; // Change this to your main index page path
});
