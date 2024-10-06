'use strict';

function fetchData() {
    fetch('AsmaMarar/books.json')
        .then(response => response.json())
        .then(data => displayTopBooks(data.books)) // Access the "books" array in the JSON
        .catch(error => console.error("Error fetching books:", error));
}

function displayTopBooks(books) {
    const top_books_parent = document.getElementById("top-books");
    const top_books = books.slice(0, 4); // Get only the first 4 books

    top_books.map(book => {
        const book_card = document.createElement("div");
        book_card.classList.add("col-md-3");
        book_card.innerHTML = `
            <div class="product-itemf">
                <figure class="product-style books-image-height">
                    <img src="${book.image_url}" alt="${book.title}" class="product-image">
                    <button type="button" class="add-to-cart add-to-cart-function" data-product-tile="add-to-cart">Add to Cart</button>
                </figure>
                <figcaption>
                    <h3>${book.title}</h3>
                    <span>${book.author}</span>
                        <p  style="display: none; font-size: 15px;">${book.description}</p>
                    <div class="item-price">$${book.price.toFixed(2)}</div>
                </figcaption>
            </div>
        `;
        top_books_parent.appendChild(book_card);
    });
}

fetchData();
