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
		})
		.catch(error => console.error('Error loading JSON:', error));

