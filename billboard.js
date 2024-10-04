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
                <div class="btn-wrap">
                    <a href="#" class="btn btn-outline-accent btn-accent-arrow">Read More<i class="icon icon-ns-arrow-right"></i></a>
                </div><!--btn-wrap-->
            </div><!--banner-content-->
            <img src="${book1.image_url}" alt="${book1.title}" class="banner-image" width="410" height="325">
        `;
        sliderContainer.innerHTML = sliderHTML1;

        // Display book[11] in the second container
        const book2 = books[11];
        const sliderHTML2 = `
            <div class="banner-content">
                <h2 class="banner-title">${book2.title}</h2>
                <p>${book2.description}</p>
                <div class="btn-wrap">
                    <a href="#" class="btn btn-outline-accent btn-accent-arrow">Read More<i class="icon icon-ns-arrow-right"></i></a>
                </div><!--btn-wrap-->
            </div><!--banner-content-->
            <img src="${book2.image_url}" alt="${book2.title}" class="banner-image" width="410" height="325">
        `;
        sliderContainer1.innerHTML = sliderHTML2;

    })
    .catch(error => console.error('Error loading JSON:', error));