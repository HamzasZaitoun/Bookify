"use strict";

// Fetch and display books using API
const apiURL = "https://potterapi-fedeperin.vercel.app/en/books";
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    const books = data;
    const productList = document.getElementById("my");
    productList.innerHTML = ""; // Clear existing content

    // Random price generator
    const randomNumber = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    // Loop through the books and display them on the page
    books.forEach((book, index) => {
      const price = randomNumber(50, 150); // Generate random price for each book
      book.price = price; // Store the price in the book object
      book.img_url = book.cover; // CHANGED: Set img_url equal to cover

      // Create book item HTML (Now using img_url across the board)
      const bookItem = `
        <div class="col-md-3">
          <div class="product-item">
            <figure class="product-style">
              <img style="height: 380px; width:320px; border-radius: 20px;" src="${book.img_url}" alt="Books" class="product-image" data-index="${index}">
              <button type="button" class="add-to-cart" data-title="${book.title}" data-cover="${book.img_url}" data-price="${price}">Add to Cart</button>
            </figure>
            <figcaption>
              <h3>${book.title}</h3>
              <span>${book.originalTitle}</span>
              <div class="item-price">$${price}</div>
            </figcaption>
          </div>
        </div>`;
      
      // Add the book to the page
      productList.innerHTML += bookItem;
    });

    // Enable cart functionality and modal popup
    enableAddToCart(books);
    enableImageClickForModal(books);
  })
  .catch((error) => {
    console.error("Error fetching books:", error);
  });

/** Function to handle showing modal when image is clicked */
function enableImageClickForModal(books) {
  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach((img) => {
    img.addEventListener("click", () => {
      const index = img.getAttribute("data-index"); // Get the index of the book
      const book = books[index]; // Get the correct book from the array

      // Set modal elements (Now using img_url for the modal image)
      document.getElementById("modalImage").src = book.img_url; // CHANGED: using img_url for the modal image
      document.getElementById("modalTitle").textContent = book.title;
      document.getElementById("modalAuthor").textContent = book.originalTitle;
      document.querySelector(".modal-price").textContent = `$${book.price}`; // Set the correct price
      
      // Update wishlist button state
      updateWishlistButtonState(book.title);

      // Show modal
      document.getElementById("productModal").style.display = "flex";
      document.getElementById("header-wrap").style.display = "none";

      // Add functionality to the "Add to Cart" button inside the modal
      const modalAddToCartButton = document.querySelector(".add-to-cart-modal");
      modalAddToCartButton.onclick = function () {
        addToCart(book); // Add the specific book to the cart
        updateCartButtonState(book.title, true);
      };

      // Add functionality to the "Add to Wishlist" button inside the modal
      const modalWishlistButton = document.querySelector(".wish");
      modalWishlistButton.onclick = function () {
        addToWishlist(book); // Add the specific book to the wishlist
        updateWishlistButtonState(book.title);
      };
    });
  });

  // Close modal functionality
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
    document.getElementById("header-wrap").style.display = "block";
  });
}

// Enable "Add to Cart" functionality for the main page
function enableAddToCart(books) {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const book = books[index]; // Get the correct book from the array

      addToCart(book); // Add the specific book to the cart
      updateCartButtonState(book.title, false);
    });
  });
}

// Add to cart function (using img_url for saving to the cart)
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find((item) => item.title === book.title);

  if (existingItem) {
    existingItem.quantity += 1; // Increase the quantity
  } else {
    // If it doesn't exist, add the book to the cart
    cart.push({ ...book, quantity: 1, img_url: book.img_url }); // Using img_url for the image in the cart
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update "Add to Cart" button state
function updateCartButtonState(bookTitle, isModal = false) { 
  const addToCartButtons = document.querySelectorAll(".add-to-cart, .add-to-cart-modal");

  addToCartButtons.forEach((button) => {
    const buttonTitle = button.getAttribute("data-title");
    // Only update the button matching the book title
    if (buttonTitle === bookTitle) {
      button.classList.add("in-cart");
      button.textContent = "In Cart";
      button.style.backgroundColor = "green"; // Change background color
      button.style.color = "white"; // Change text color to white
    }
  });

  if (!isModal) {
    window.location.href = "#cart"; 
  }
}

// Update wishlist button state based on the book title
function updateWishlistButtonState(bookTitle) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isInWishlist = wishlist.some((item) => item.title === bookTitle);

  const wishlistButton = document.getElementById("addToWishlistButton");
  if (isInWishlist) {
    wishlistButton.querySelector("i").classList.remove("bi-suit-heart");
    wishlistButton.querySelector("i").classList.add("bi-heart-fill");
  } else {
    wishlistButton.querySelector("i").classList.remove("bi-heart-fill");
    wishlistButton.querySelector("i").classList.add("bi-suit-heart");
  }
}

// Add to Wishlist functionality (using img_url for saving to the wishlist)
function addToWishlist(book) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Check if the book already exists in the wishlist
  const existingItem = wishlist.find((item) => item.title === book.title);

  if (existingItem) {
    // If the book is in the wishlist, remove it
    wishlist = wishlist.filter((item) => item.title !== book.title);
  } else {
    // If it doesn't exist, add it to the wishlist
    wishlist.push({ 
      ...book, 
      img_url: book.img_url // Using img_url for the image in the wishlist
    });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
