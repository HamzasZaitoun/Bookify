"use strict";

// Fetch and display books using API
const apiURL = "https://potterapi-fedeperin.vercel.app/en/books";
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    const books = data;
    console.log(books);
    const productList = document.getElementById("my");
    productList.innerHTML = ""; // Clear existing content
    // Make the price generate randomly
    const randomNumber = (min, max) => (Math.random() * (max - min) + min).toFixed(0); 
   

    // Loop through the books and display them on the page
    books.forEach((book) => {
       const price=randomNumber(50,150);
      const bookItem = `
                <div class="col-md-3">
                    <div class="product-item">
                        <figure class="product-style">
                            <img style="height: 380px; width:320px; border-radius: 20px;" src="${book.cover}" alt="Books" class="product-image">
                            <button type="button" class="add-to-cart" data-title="${book.title}" data-cover="${book.cover}" data-price="100">Add to Cart</button>
                        </figure>
                        <figcaption>
                            <h3>${book.title}</h3>
                            <span>${book.originalTitle}</span>
                            <div class="item-price">$${price}</div>
                        </figcaption>
                    </div>
                </div>`;
                
      productList.innerHTML += bookItem; // Add the new item to the list
    });

    // After books are rendered, enable cart functionality
    enableAddToCart();
  })
  .catch((error) => {
    console.error("Error fetching books:", error);
  });



// Function to enable adding items to the cart
function enableAddToCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const cover = button.getAttribute("data-cover");
      const price = button.getAttribute("data-price");

      const book = {
        title: title,
        cover: cover,
        price: price,
        quantity: 1,
      };

      addToCart(book);
    });
  });
}

function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.title === book.title);
  
    if (existingItem) {
      existingItem.quantity += 1; // Increase the quantity
    } else {
      // If it doesn't exist, add the book to the cart
      cart.push({
        title: book.title,
        cover: book.cover || "default-image-url.jpg", // Use a default image if book.cover is missing
        price: book.price,
        quantity: 1,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  