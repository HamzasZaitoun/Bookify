'use strict'
// Get modal element
var modal = document.getElementById("productModal");
var modalImg = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalAuthor = document.getElementById("modalAuthor");
var modalPrice = document.querySelector(".modal-price");
var closeModal = document.querySelector(".close");
var headerWrap =document.getElementById("header-wrap");
// Add event listener to product images
var productItems = document.querySelectorAll(".product-item img");

productItems.forEach(function(item) {
    item.addEventListener("click", function() {
        var productImage = this.src;
        var productTitle = this.closest(".product-item").querySelector("h3").textContent;
        var productAuthor = this.closest(".product-item").querySelector("span").textContent;
        var productPrice = this.closest(".product-item").querySelector(".item-price").textContent;

        // Populate modal with product data
        modalImg.src = productImage;
        modalTitle.textContent = productTitle;
        modalAuthor.textContent = productAuthor;
        modalPrice.textContent = productPrice;

        // Display modal
        modal.style.display = "flex";
        headerWrap.style.display ="none";
    });
});

// Close modal on clicking 'X'
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    headerWrap.style.display ="inline-block";
});

// Close modal on clicking outside content
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        headerWrap.style.display ="inline-block";
    }
});