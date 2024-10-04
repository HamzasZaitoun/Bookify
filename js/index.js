// Get modal element
var modal = document.getElementById("productModal");
var modalImg = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalAuthor = document.getElementById("modalAuthor");
var modalPrice = document.querySelector(".modal-price");
var closeModal = document.querySelector(".close");
var headerWrap = document.getElementById("header-wrap");
// Add event listener to product images
var productItems = document.querySelectorAll(".product-itemf img");
let wishButton = document.getElementById("wishbtn");
productItems.forEach(function (item) {
  item.addEventListener("click", function () {
    var productImage = this.src;
    var productTitle =
      this.closest(".product-itemf").querySelector("h3").textContent;
    var productAuthor =
      this.closest(".product-itemf").querySelector("span").textContent;
    var productPrice =
      this.closest(".product-itemf").querySelector(".item-price").textContent;

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

// Close modal on clicking 'X'
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  headerWrap.style.display = "block";
});

// Close modal on clicking outside content
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    headerWrap.style.display = "block";
  }
});

// function addToWishList(item) {
//     console.log(item);
//     alert('sssssssssssssssssss')
// }
// Array to hold the book data (the wish list)
// Array to hold the book data (the wish list)
let bookArr = [];
// Check if the book is in the wishlist
function isInWishList(bookTitle) {
  const savedBooks = JSON.parse(localStorage.getItem("wishlist")) || [];
  return savedBooks.some((book) => book.title === bookTitle);
}

// Update heart icon for all book cards based on the wish list
function updateHeartIcons() {
  const productItems = document.querySelectorAll(".product-itemf");

  productItems.forEach(function (item) {
    const productTitle = item.querySelector("h3").textContent;
    const wishButton = item.querySelector(".wish");

    // Check if this book is in the wishlist
    if (isInWishList(productTitle)) {
      wishButton.innerHTML = '<i class="bi bi-heart-fill"></i>'; // Filled heart
    } else {
      wishButton.innerHTML = '<i class="bi bi-suit-heart"></i>'; // Empty heart
    }
  });
}

// Call this function when the page loads to update the heart icons
window.addEventListener("load", updateHeartIcons);

// Function to toggle the wish list and heart icon
function changeIcon(wishButton) {
  let productImage = modalImg.src;
  let productTitle = modalTitle.textContent;
  let productAuthor = modalAuthor.textContent;
  let productPrice = modalPrice.textContent;

  // Create an object for the book
  let book = {
    image_url: productImage,
    title: productTitle,
    author: productAuthor,
    price: productPrice,
  };

  // Check if the book is already in the wish list
  const inWishlist = isInWishList(productTitle);

  if (inWishlist) {
    removeFromWishList(productTitle); // Remove the book from the wish list
    wishButton.innerHTML = '<i class="bi bi-suit-heart"></i>'; // Change back to empty heart
  } else {
    addToWishList(book); // Add the book to the wish list
    wishButton.innerHTML = '<i class="bi bi-heart-fill"></i>'; // Change to filled heart
  }
}

// Function to add a book to the wish list
function addToWishList(book) {
  const savedBooks = JSON.parse(localStorage.getItem("wishlist")) || [];
  savedBooks.push(book); // Add to the list
  localStorage.setItem("wishlist", JSON.stringify(savedBooks)); // Save updated wish list
}

// Function to remove a book from the wish list
function removeFromWishList(bookTitle) {
  const savedBooks = JSON.parse(localStorage.getItem("wishlist")) || [];
  const updatedBooks = savedBooks.filter((book) => book.title !== bookTitle); // Remove the book
  localStorage.setItem("wishlist", JSON.stringify(updatedBooks)); // Save updated wish list
}
