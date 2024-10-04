fetch('AsmaMarar/books.json')
    .then(response => response.json())
    .then(data => {
        const books = data.books;
        const sliderContainer = document.getElementById('divMain');
        const sliderContainer1 = document.getElementById('divMain1');

        // Display book[9] in the first container
        const book1 = books[9];
        const sliderHTML1 = `
            <div class="banner-content">
                <h2 class="banner-title">${book1.title}</h2>
                <p>${book1.description}</p>
               
            </div><!--banner-content-->
            <img style="border-radius: 20px;" src="${book1.image_url}" alt="${book1.title}" class="banner-image" width="310" height="385">
        `;
        sliderContainer.innerHTML = sliderHTML1;

        // Display book[11] in the second container
        const book2 = books[11];
        const sliderHTML2 = `
            <div class="banner-content">
                <h2 class="banner-title">${book2.title}</h2>
                <p>${book2.description}</p>
               
            </div><!--banner-content-->
            <img style="border-radius: 20px;" src="${book2.image_url}" alt="${book2.title}" class="banner-image" width="310" height="305">
        `;
        sliderContainer1.innerHTML = sliderHTML2;

    })
    .catch(error => console.error('Error loading JSON:', error));
  
