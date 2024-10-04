// Function to handle adding items to cart, merging duplicates
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find((item) => item.title === book.title);

  if (existingItem) {
    // If it exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If it doesn't exist, add it with quantity 1
    book.quantity = 1;
    cart.push(book);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} has been added to your cart.`);
}

// Function to calculate total price of items in the cart
function calculateTotalPrice(cart) {
  return cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
}

// Function to display cart items with quantity and remove functionality
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-items-container");
  const totalPriceElement = document.querySelector(".total-price");

  if (!cartContainer || !totalPriceElement) {
    console.error("Cart container or total price element not found.");
    return;
  }

  cartContainer.innerHTML = ""; // Clear previous cart items

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceElement.textContent = "$0.00";
    return;
  }

  // Loop over the cart items and display each
  cart.forEach((item, index) => {
    const cartItemHTML = `
      <div class="cart-item d-flex align-items-center mb-4">
          <img src="${item.image}" alt="${
      item.title
    }" style="width: 100px;" class="img-fluid">
          <div class="ms-3">
              <h5>${item.title}</h5>
              <p>${item.author}</p>
              <p class="fw-bold">$${parseFloat(item.price).toFixed(2)} x ${
      item.quantity
    }</p>
          </div>
          <button class="btn btn-danger ms-auto" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });

  // Calculate and display the total price using the new function
  const total = calculateTotalPrice(cart);
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems(); // Re-render the cart after removal
}

// Call the function to display cart items when the cart page loads
document.addEventListener("DOMContentLoaded", displayCartItems);
