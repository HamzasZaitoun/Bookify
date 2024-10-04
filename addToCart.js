'use strict';

const add_to_cart = document.querySelectorAll('.add-to-cart-function');
const add_to_cart_page = document.getElementById("cardParent");

add_to_cart.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    // Get the clicked button's associated product information
    const button = event.target;
    const imageUrl = button.getAttribute('data-image-url');
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');

    // Create a new div to hold the cart item
    const cartItem = document.createElement('div');
    cartItem.classList.add('d-flex', 'align-items-center', 'mb-5');

    // Use innerHTML to define the content
    cartItem.innerHTML = `
        <div class="flex-shrink-0">
          <img src="${imageUrl}" class="img-fluid" style="width: 150px;" alt="${title}">
        </div>
        <div class="flex-grow-1 ms-3">
          <a href="#!" class="float-end"><i class="fas fa-times"></i></a>
          <h5 class="text-item">${title}</h5>
          <div class="d-flex align-items-center">
            <p class="fw-bold mb-0 me-5 pe-3">$${price}</p>
            <div class="def-number-input number-input safari_only">
              <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-</button>
              <input class="quantity fw-bold bg-body-tertiary text-body" min="0" name="quantity" value="1" type="number">
              <button class="plus" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">+</button>
            </div>
          </div>
        </div>
    `;

    // Append the newly created cart item to the cart parent element
    add_to_cart_page.appendChild(cartItem);
}