"use strict";

// Get modal elements
var modal = document.getElementById("productModal");
var modalImg = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalAuthor = document.getElementById("modalAuthor");
var modalPrice = document.querySelector(".modal-price");
var closeModal = document.querySelector(".close");
var headerWrap = document.getElementById("header-wrap");

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

// Function to add or remove item from wishlist
function addToWishlist(book) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the item already exists in the wishlist
    const existingItemIndex = wishlist.findIndex(item => item.title === book.title);

    const wishlistButton = document.getElementById('addToWishlistButton');

    if (existingItemIndex !== -1) {
        // If the book exists in the wishlist, remove it
        wishlist.splice(existingItemIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Update the heart icon to empty (unfilled)
        wishlistButton.querySelector('i').classList.add('bi-suit-heart');
        wishlistButton.querySelector('i').classList.remove('bi-heart-fill');
    } else {
        // If the book doesn't exist, add it to the wishlist
        wishlist.push(book);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Update the heart icon to filled
        wishlistButton.querySelector('i').classList.remove('bi-suit-heart');
        wishlistButton.querySelector('i').classList.add('bi-heart-fill');
    }
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

// Fetch books data and populate multiple sections
fetch("./AsmaMarar/books.json")
    .then(response => response.json())
    .then(data => {
        const books = data.books;
        let allBooksHTML = '';
        let classicBooksHTML = '';
        let dystopianBooksHTML = '';
        let fantasyBooksHTML = '';
        let fictionBooksHTML = '';
        let romanceBooksHTML = '';

        // Iterate through the books and create HTML for each section
        for (let i = 0; i < books.length; i++) {
            const bookHTML = `
                <div class="col-md-3">
                    <div class="product-itemf">
                        <figure class="product-style books-image-height">
                            <img
                                src="${books[i].image_url}"
                                alt="Books"
                                class="product-image"
                            />
                            <button
                                type="button"
                                class="add-to-cart"
                                data-product-tile="add-to-cart"
                            >
                                Add to Cart
                            </button>
                        </figure>
                        <figcaption>
                            <h3>${books[i].title}</h3>
                            <span>${books[i].author}</span>
                            <div class="item-price">${books[i].price}</div>
                        </figcaption>
                    </div>
                </div>
            `;
            // Append to all books
            allBooksHTML += bookHTML;

            // Filter by type for each section
            if (books[i].type === "Classic") {
                classicBooksHTML += bookHTML;
            } else if (books[i].type === "Dystopian") {
                dystopianBooksHTML += bookHTML;
            } else if (books[i].type === "Fantasy") {
                fantasyBooksHTML += bookHTML;
            } else if (books[i].type === "Fiction") {
                fictionBooksHTML += bookHTML;
            } else if (books[i].type === "Romance") {
                romanceBooksHTML += bookHTML;
            }
        }

        // Inject HTML into DOM
        document.getElementById("popular-books-all").innerHTML = allBooksHTML;
        document.getElementById("popular-books-Classic").innerHTML = classicBooksHTML;
        document.getElementById("popular-books-business").innerHTML = dystopianBooksHTML;
        document.getElementById("popular-books-fantasy").innerHTML = fantasyBooksHTML;
        document.getElementById("popular-books-Fiction").innerHTML = fictionBooksHTML;
        document.getElementById("popular-books-Romance").innerHTML = romanceBooksHTML;
    })
    .then(() => {
        // After the DOM is ready, update the button states
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            updateCartButtonState(item.title);
        });

        // Use event delegation for dynamically added buttons and images
        document.body.addEventListener('click', function (e) {
            // Handle "Add to Cart" button click
            if (e.target.classList.contains('add-to-cart')) {
                const productItem = e.target.closest('.product-itemf');
                const book = {
                    title: productItem.querySelector('h3').textContent,
                    author: productItem.querySelector('span').textContent,
                    price: parseFloat(productItem.querySelector('.item-price').textContent.replace('$', '')),
                    image: productItem.querySelector('.product-image').src
                };
                addToCart(book);
            }

            // Handle product image click for modal
            if (e.target.classList.contains('product-image')) {
                const productImage = e.target.src;
                const productItem = e.target.closest('.product-itemf');
                modalImg.src = productImage;
                modalTitle.textContent = productItem.querySelector('h3').textContent;
                modalAuthor.textContent = productItem.querySelector('span').textContent;
                modalPrice.textContent = `$${productItem.querySelector('.item-price').textContent}`;


                // Check if the book is already in the wishlist
                const bookTitle = modalTitle.textContent;
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const isInWishlist = wishlist.some(item => item.title === bookTitle);

                const wishlistButton = document.getElementById('addToWishlistButton');
                if (isInWishlist) {
                    wishlistButton.querySelector('i').classList.remove('bi-suit-heart');
                    wishlistButton.querySelector('i').classList.add('bi-heart-fill');
                } else {
                    wishlistButton.querySelector('i').classList.remove('bi-heart-fill');
                    wishlistButton.querySelector('i').classList.add('bi-suit-heart');
                }

                modal.style.display = "flex";
                headerWrap.style.display = "none";
            }

            // Handle modal Add to Cart button click
            if (e.target.classList.contains('add-to-cart-modal')) {
                const book = {
                    title: modalTitle.textContent,
                    author: modalAuthor.textContent,
                    price: parseFloat(modalPrice.textContent.replace('$', '')),
                    image: modalImg.src
                };
                addToCart(book);
            }

            // Handle "Add to Wishlist" button click
            if (e.target.classList.contains('wish')) {
                const book = {
                    title: modalTitle.textContent,
                    author: modalAuthor.textContent,
                    price: parseFloat(modalPrice.textContent.replace('$', '')),
                    image: modalImg.src
                };
                addToWishlist(book); // Call the function to add to wishlist
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// Close modal when 'X' is clicked
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    headerWrap.style.display = "block";
});

// Close modal when clicking outside of it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        headerWrap.style.display = "block";
    }
});
