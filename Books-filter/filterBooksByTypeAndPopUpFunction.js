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

// Fetch books data and populate multiple sections
fetch("./AsmaMarar/books.json")
  .then((response) => response.json())
  .then((data) => {
    const books = data.books;
    let allBooksHTML = "";
    let classicBooksHTML = "";
    let dystopianBooksHTML = "";
    let fantasyBooksHTML = "";
    let fictionBooksHTML = "";
    let romanceBooksHTML = "";

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
    document.getElementById("popular-books-Classic").innerHTML =
      classicBooksHTML;
    document.getElementById("popular-books-business").innerHTML =
      dystopianBooksHTML;
    document.getElementById("popular-books-fantasy").innerHTML =
      fantasyBooksHTML;
    document.getElementById("popular-books-Fiction").innerHTML =
      fictionBooksHTML;
    document.getElementById("popular-books-Romance").innerHTML =
      romanceBooksHTML;
  })
  .then(() => {
    // Use event delegation for dynamically added buttons and images
    document.body.addEventListener("click", function (e) {
      // Handle "Add to Cart" button click
      if (e.target.classList.contains("add-to-cart")) {
        const productItem = e.target.closest(".product-itemf");
        const book = {
          title: productItem.querySelector("h3").textContent,
          author: productItem.querySelector("span").textContent,
          price: parseFloat(
            productItem
              .querySelector(".item-price")
              .textContent.replace("$", "")
          ),
          image: productItem.querySelector(".product-image").src,
        };
        addToCart(book);
        alert(`${book.title} has been added to your cart.`);
      }

      // Handle product image click for modal
      if (e.target.classList.contains("product-image")) {
        const productImage = e.target.src;
        const productItem = e.target.closest(".product-itemf");
        modalImg.src = productImage;
        modalTitle.textContent = productItem.querySelector("h3").textContent;
        modalAuthor.textContent = productItem.querySelector("span").textContent;
        modalPrice.textContent =
          productItem.querySelector(".item-price").textContent;
        modal.style.display = "flex";
        headerWrap.style.display = "none";
      }

      // Handle modal Add to Cart button click
      if (e.target.classList.contains("add-to-cart-modal")) {
        const book = {
          title: modalTitle.textContent,
          author: modalAuthor.textContent,
          price: parseFloat(modalPrice.textContent.replace("$", "")),
          image: modalImg.src,
        };
        addToCart(book);
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Close modal when 'X' is clicked
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  headerWrap.style.display = "block";
});

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    headerWrap.style.display = "block";
  }
});
