"use strict"
	fetch('AsmaMarar/books.json')
		.then(response => response.json())
		.then(data => {
			const book = data.books[3];  // Get only the 4th book (index 3)

			// Update the content with the necessary info
			document.getElementById("titleH2").textContent = book.title;
			document.getElementById("author-name").textContent = "By " + book.author;
			document.getElementById("main-description").textContent = book.description;
			document.getElementById("price").textContent = "$ " + book.price;
			document.getElementById("bookImage").src = "./" + book.image_url; // Ensure this is correct based on your JSON
			document.getElementById("bookImage").style.borderRadius = "20px";

			// Add event listener to "Add to Cart" button
		document.getElementById('add-to-cart-button').addEventListener('click', function(event) {
			event.preventDefault(); // Prevent default anchor behavior
			const bookToAdd = {
				title: book.title,
				author: book.author,
				price: book.price,
				image: "./" + book.image_url // Adjust the image path if needed
			};
			addToCart(bookToAdd); // Call the function to add the book to cart

			window.location.href = 'cart.html';
		});
		})
		.catch(error => console.error('Error loading JSON:', error));

		




// // Function to add item from wishlist to cart
// function addToCartFromWishlist(index) {
// 	const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
// 	const book = wishlist[index];
// 	addToCart(book); // Call the addToCart function
//   }