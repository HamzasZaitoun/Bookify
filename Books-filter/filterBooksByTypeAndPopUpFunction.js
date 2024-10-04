'use strict';

// Get modal elements
var modal = document.getElementById("productModal");
var modalImg = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalAuthor = document.getElementById("modalAuthor");
var modalPrice = document.querySelector(".modal-price");
var closeModal = document.querySelector(".close");
var headerWrap = document.getElementById("header-wrap");

// Fetch books data and populate multiple sections
fetch("./AsmaMarar/books.json")
    .then(response => response.json())
    .then(data => {
        const books = data.books;
        let allBooksHTML = '';  // For all books
        let classicBooksHTML = '';  // For "Classic" books
        let dystopianBooksHTML = '';  // For "Dystopian" books
        let fantasyBooksHTML = '';  // For "Fantasy" books
        let fictionBooksHTML = '';  // For "Fiction" books
        let romanceBooksHTML = '';  // For "Romance" books

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
                                class="add-to-cart add-to-cart-function"
                                data-product-tile="add-to-cart"
                            >
                                Add to Cart
                            </button>
                        </figure>
                        <figcaption>
                            <h3>${books[i].title}</h3>
                            <span>${books[i].author}</span>
                            <div class="item-price">$${books[i].price}</div>
                        </figcaption>
                    </div>
                </div>
            `;

            // Append to all books
            allBooksHTML += bookHTML;

            // Filter by type for each section
            if (books[i].type === "Classic") {
                classicBooksHTML += bookHTML;
            }

            if (books[i].type === "Dystopian") {
                dystopianBooksHTML += bookHTML;
            }

            if (books[i].type === "Fantasy") {
                fantasyBooksHTML += bookHTML;
            }

            if (books[i].type === "Fiction") {
                fictionBooksHTML += bookHTML;
            }

            if (books[i].type === "Romance") {
                romanceBooksHTML += bookHTML;
            }
        }

        // Inject new HTML into the DOM for each genre
        document.getElementById("popular-books-all").innerHTML = allBooksHTML;
        document.getElementById("popular-books-Classic").innerHTML = classicBooksHTML;
        document.getElementById("popular-books-business").innerHTML = dystopianBooksHTML;
        document.getElementById("popular-books-fantasy").innerHTML = fantasyBooksHTML;
        document.getElementById("popular-books-Fiction").innerHTML = fictionBooksHTML;
        document.getElementById("popular-books-Romance").innerHTML = romanceBooksHTML;

        // Attach click event listeners to the new product images for modal
        attachModalListeners();
    })
    .catch(error => console.error('Error loading JSON:', error));

// Function to attach modal click event listeners
function attachModalListeners() {
    const productItems = document.querySelectorAll(".product-image");

    productItems.forEach(function(item) {
        item.addEventListener("click", function() {
            const productImage = this.src;
            const productTitle = this.closest(".product-itemf").querySelector("h3").textContent;
            const productAuthor = this.closest(".product-itemf").querySelector("span").textContent;
            const productPrice = this.closest(".product-itemf").querySelector(".item-price").textContent;

            // Populate modal with product data
            modalImg.src = productImage;
            modalTitle.textContent = productTitle;
            modalAuthor.textContent = productAuthor;
            modalPrice.textContent = productPrice;

            // Display modal
            modal.style.display = "flex";
            headerWrap.style.display = "none";
        });
    });
}

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
