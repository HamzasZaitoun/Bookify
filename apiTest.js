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
    const randomNumber = (min, max) => (Math.random() * (max - min) + min).toFixed(0);

    // Loop through the books and display them on the page
    books.forEach((book) => {
      const price = randomNumber(50, 150); // Generate a random price for the book
      const bookItem = `
        <div class="col-md-3">
          <div class="product-item">
            <figure class="product-style">
              <img style="height: 380px; width:320px; border-radius: 20px;" src="${book.cover}" alt="Books" class="product-image">
              <button type="button" class="add-to-cart" data-title="${book.title}" data-cover="${book.cover}" data-price="${price}">Add to Cart</button>
            </figure>
            <figcaption>
              <h3>${book.title}</h3>
              <span>${book.originalTitle}</span>
              <div class="item-price">$${price}</div>
            </figcaption>
          </div>
        </div>`;
        
      productList.innerHTML += bookItem;
    });

    // Enable cart functionality and modal popup
    enableAddToCart();
    enableImageClickForModal(books);
  })
  .catch((error) => {
    console.error("Error fetching books:", error);
  });

/** Function to handle showing modal when image is clicked */
function enableImageClickForModal(books) {
  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      const book = books[index];

      // Set modal elements
      document.getElementById("modalImage").src = book.cover;
      document.getElementById("modalTitle").textContent = book.title;
      document.getElementById("modalAuthor").textContent = book.originalTitle;
      document.querySelector(".modal-price").textContent = `$${book.price}`;
      
      // Update wishlist button state
      updateWishlistButtonState(book.title);

      // Show modal
      document.getElementById("productModal").style.display = "flex";
      document.getElementById("header-wrap").style.display = "none";

      // Remove existing event listeners for the "Add to Cart" and "Add to Wishlist" buttons
      const modalAddToCartButton = document.querySelector(".add-to-cart-modal");
      const modalWishlistButton = document.querySelector(".wish");

      // **Updated this to ensure unique event listener by cloning buttons**
      modalAddToCartButton.replaceWith(modalAddToCartButton.cloneNode(true));
      modalWishlistButton.replaceWith(modalWishlistButton.cloneNode(true));

      // **Add functionality to the "Add to Cart" button inside the modal**
      document.querySelector(".add-to-cart-modal").addEventListener("click", () => {
        addToCart(book); // Add to cart when clicked
        updateCartButtonState(book.title); // Update button state in the main page
      });

      // **Add functionality to the "Add to Wishlist" button inside the modal**
      document.querySelector(".wish").addEventListener("click", () => {
        addToWishlist(book); // Toggle wishlist status
        updateWishlistButtonState(book.title); // Update wishlist button state
      });
    });
  });

  // Close modal functionality
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
    document.getElementById("header-wrap").style.display = "block";
  });
}

// Enable "Add to Cart" functionality
function enableAddToCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clickedButton = event.target; // Get the clicked button
      const title = clickedButton.getAttribute("data-title");
      const cover = clickedButton.getAttribute("data-cover");
      const price = clickedButton.getAttribute("data-price"); // Get the price from data-price attribute

      const book = {
        title: title,
        cover: cover,
        price: price,
        quantity: 1,
      };

      addToCart(book);
      updateCartButtonState(clickedButton); // Pass the clicked button to updateCartButtonState
    });
  });
}

// Add to cart function
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find((item) => item.title === book.title);

  if (existingItem) {
    existingItem.quantity += 1; // Increase the quantity
  } else {
    // If it doesn't exist, add the book to the cart
    cart.push(book);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update "Add to Cart" button state
function updateCartButtonState(clickedButton) {
  clickedButton.classList.add("in-cart");
  clickedButton.textContent = "In Cart";
  clickedButton.style.backgroundColor = "green"; // Change the background color
  clickedButton.style.color = "white"; // Change the text color to white
}

// Update wishlist button state based on the book title
function updateWishlistButtonState(bookTitle) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isInWishlist = wishlist.some(item => item.title === bookTitle);

  const wishlistButton = document.getElementById('addToWishlistButton');
  if (isInWishlist) {
    wishlistButton.querySelector('i').classList.remove('bi-suit-heart');
    wishlistButton.querySelector('i').classList.add('bi-heart-fill');
  } else {
    wishlistButton.querySelector('i').classList.remove('bi-heart-fill');
    wishlistButton.querySelector('i').classList.add('bi-suit-heart');
  }
}

// Add to Wishlist functionality
function addToWishlist(book) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the book already exists in the wishlist
  const existingItem = wishlist.find(item => item.title === book.title);

  if (existingItem) {
    // If the book is in the wishlist, remove it
    wishlist = wishlist.filter(item => item.title !== book.title);
  } else {
    // If it doesn't exist, add it to the wishlist
    wishlist.push(book);
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
