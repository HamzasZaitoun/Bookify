// Function to handle adding items to cart, merging duplicates
function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.title === book.title);

    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it doesn't exist, add it with quantity 1
        book.quantity = 1;
        cart.push(book);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart items with quantity and remove functionality
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items-container');
    cartContainer.innerHTML = '';  // Clear previous cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        document.querySelector('.total-price').textContent = '$0.00';
        return;
    }

    // Loop over the cart items and display each
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item d-flex align-items-center mb-4">
                <img src="${item.image||item.cover}" alt="${item.title}" style="width: 100px;" class="img-fluid">
                <div class="ms-3">
                    <h5>${item.title}</h5>
                    <p>${item.author||'Jhon doe'}</p>
                    <p class="fw-bold">$${parseFloat(item.price).toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="btn btn-danger ms-auto" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    // Calculate and display the total price
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Re-render the cart after removal
}

// Call the function to display cart items when the cart page loads
document.addEventListener('DOMContentLoaded', displayCartItems);
// Function to handle adding items to cart, merging duplicates
function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.title === book.title);

    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it doesn't exist, add it with quantity 1
        book.quantity = 1;
        cart.push(book);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the button background for the newly added book
    updateCartButtonState(book.title);
}

// Function to update the "Add to Cart" button state
function updateCartButtonState(bookTitle) {
    const allButtons = document.querySelectorAll('.product-itemf');
    allButtons.forEach(item => {
        const title = item.querySelector('h3').textContent;
        if (title === bookTitle) {
            const addToCartButton = item.querySelector('.add-to-cart');
            addToCartButton.classList.add('in-cart');
            addToCartButton.textContent = 'In Cart';
            addToCartButton.style.backgroundColor = 'green'; // Change the background color
            addToCartButton.style.color = 'white'; // Change the text color to white
        }
    });
}
