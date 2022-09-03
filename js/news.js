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