// loading news category
const loadNewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error));
}

// displaying news category
const displayNewsCategory = catagorys => {
    const catagoryContainer = document.getElementById('news-category');
    catagorys.forEach(catagory => {

        const creatDiv = document.createElement('div');
        creatDiv.innerHTML = `
        <a onclick="loadNewsDetails('${catagory.category_id}')" href="#news-category" class="text-decoration-none">${catagory.category_name}</a>
        `;
        catagoryContainer.appendChild(creatDiv);
    })
}

// loading news
const loadNewsDetails = (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayNewsDetails(data.data))
    }
    catch (error) {
        alert('Error Occured');
    }
}

// displaying news
const displayNewsDetails = ids => {

    // sorting
    ids.sort((previous, next) => {
        return next.total_view - previous.total_view;
    })

    const cardContainer = document.getElementById('news-container');
    cardContainer.innerHTML = '';

    // displaying news found in category
    const numbersOfNews = document.getElementById('numbers-of-data');
    numbersOfNews.innerText = ids.length;
    // console.log(id.length)

    // displaying no news found
    const noNewsFound = document.getElementById('news-found');
    if (ids.length === 0) {
        noNewsFound.classList.remove('d-none');
        const numbersOfNews = document.getElementById('numbers-of-data');
        numbersOfNews.innerText = 'No';
        toggleSpinner(false);
    }
    else {
        noNewsFound.classList.add('d-none');
    };

    ids.forEach(id => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('row');
        cardDiv.classList.add('g-0');
        cardDiv.innerHTML = `
        <div class="col-md-3 px-3 py-3">
            <img src="${id.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9 px-2">
            <div class="card-body">
                <h5 class="news-title">${id.title}</h5>
                <p class="news-text mb-5">${id.details.slice(0, 700)} ...</p>

             <div class="d-lg-flex justify-content-between d-sm-grid mt-5 pt-5 pe-5">
                 <div class="d-flex gap-2">
                     <img class="rounded-circle" src="${id.author.img}" alt="" width="30" height="30">
                     <p id="journalist">${id.author.name ? id.author.name : 'No author name found'}</p>
                 </div>

             <div class="d-flex gap-1">
                 <i class="fa-solid fa-eye mt-1"></i>
                 <p id="views" class="fw-bold">${id.total_view ? id.total_view : 'no view'}</p>
             </div>

             <div>
                 <button onclick="detailsModal('${id._id}')" data-bs-toggle="modal" data-bs-target="#showNewsDetailsModal" class="border border-none bg-light"><i class="fa-solid fa-arrow-right" id="showDetails"></i></button>
             </div>
             </div>
            </div>
        </div>
        <hr>
        `;
        cardContainer.appendChild(cardDiv);
        toggleSpinner(false);
    })
}

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinjner');
    if (isLoading === true) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
};


// loading for modal of news details
const detailsModal = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayDetailsModal(data.data)
    }
    catch (error) {
        alert('Error Occured');
    }
}

// display modal of news details
const displayDetailsModal = id => {
    id.forEach(modalId => {
        const modalTitle = document.getElementById('showNewsDetailsModalLabel');
        modalTitle.innerText = modalId.title;
        const modalBody = document.getElementById('news-details-modal-body');
        modalBody.innerHTML = `
        <img class="img" width="50" height="50" src="${modalId.author.img}" alt="">
        <p><span class="fw-bold">Author Name: </span> ${modalId.author.name ? modalId.author.name : "No Name"}</p>
       <div class="d-flex gap-1">
          <i class="fa-solid fa-eye mt-1"></i>       
          <p id="views" class="fw-bold">${modalId.total_view ? modalId.total_view : 'no view'} </p>        
        </div>
        <p><span class="fw-bold">Rating: </span>${modalId.rating.number ? modalId.rating.number : "No review"} <i class="fa-solid fa-star"></i></p>
        <p><span class="fw-bold">Published Date: </span> ${modalId.author.published_date ? modalId.author.published_date : "Published Date Not Found"}</p>
        <h5><span class="fw-bold">Review: </span>${modalId.rating.badge ? modalId.rating.badge : "No Review Given"}</h5>
        `
    })
};



loadNewsCategory();