const global = {
    currentPage:window.location.pathname,
    id:window.location,
    search:{
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults:0
    },
    api:{
        apiKey:'e98dca16d5a003129dfc63d97065d0f2',
        apiurl: 'https://api.themoviedb.org/3/'
    }

};



async function fetchApiData(endpoint){
    
    const API_KEY = 'e98dca16d5a003129dfc63d97065d0f2';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    arr = endpoint.split('/');
    if (global.currentPage == '/index.html' || global.currentPage == '/')displaySlider();
    hideSpinner();
    if (global.currentPage == '/index.html' || global.currentPage == '/')showcase_movies(data);
    if(global.currentPage == '/shows.html')showcase_shows(data);

}
if(global.currentPage == '/index.html' || global.currentPage == '/')fetchApiData('movie/popular');
else if(global.currentPage == '/shows.html')fetchApiData('tv/popular');
console.log(global.currentPage);






const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage.slice(1)){
            link.style.color = 'greenyellow';
        } 
    })
}

function showcase_movies(object){
    const list = object.results;
    //movie-details.html?id=
    const parent = document.querySelector('.showcase-movies');
    list.forEach(list => {

        const url = `movie-details.html?id=${list.id}`
        const link = document.createElement('a');
        link.href = url;
       // const card = document.createElement('div');

        const li = document.createElement('li');
        const img_container = document.createElement('div');
        img_container.className = 'flix-img';
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${list.poster_path}`;
        img_container.appendChild(img);

        //movie-content
        const content = document.createElement('div');
        content.className = 'movie-content';
        const h1 = document.createElement('h2');
        const h2 = document.createElement('h2');
        h1.textContent = list.original_title;
        h2.textContent = `Release: ${list.release_date}`;
        content.appendChild(h1);
        content.appendChild(h2);

        li.appendChild(img_container);
        li.appendChild(content);

        link.appendChild(li);
        console.log(link);
        parent.appendChild(link);

        console.log(url);
    })
}

function showcase_shows(object){
    const list = object.results;
    //movie-details.html?id=
    const parent = document.querySelector('.showcase-shows');
    list.forEach(list => {

        const url = `show-details.html?id=${list.id}`
        const link = document.createElement('a');
        link.href = url;
       // const card = document.createElement('div');

        const li = document.createElement('li');
        const img_container = document.createElement('div');
        img_container.className = 'flix-img';
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${list.poster_path}`;
        img_container.appendChild(img);

        //movie-content
        const content = document.createElement('div');
        content.className = 'movie-content';
        const h1 = document.createElement('h2');
        const h2 = document.createElement('h2');
        h1.textContent = list.original_title;
        h2.textContent = `Release: ${list.release_date}`;
        content.appendChild(h1);
        content.appendChild(h2);

        li.appendChild(img_container);
        li.appendChild(content);

        link.appendChild(li);
        parent.appendChild(link);

        console.log(url);
    })
}



function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            console.log("Home");
            break;
        case '/show-details.html':
            console.log("Show Details");
            displayShowDetails(global.id.search.slice(4));
            break;
        case '/movie-details.html':
            console.log("Movie Details");
            break;
        case '/shows.html':
            console.log("Show Page");
            break;
        case '/search.html':
            console.log("Search Page");
            search();
            searchOfSearch();
            break;
    }
    highlightActiveLink();
    if(global.currentPage == '/movie-details.html')displayMovieDetails(global.id.search.slice(4));
}

window.addEventListener('DOMContentLoaded', init);

async function displayMovieDetails(id){
    console.log("hell")
    const API_URL = `https://api.themoviedb.org/3/movie/${id}`;
    showSpinner();
    const API_KEY = 'e98dca16d5a003129dfc63d97065d0f2';
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    console.log(data);
    const title = document.querySelector('.title-name');
    title.textContent = data.original_title;

    document.querySelector('.rate').textContent = data.vote_average;

    document.querySelector('.about').textContent = data.overview;

    genres = data.genres;
    genres.forEach((genre)=> {
       const h3 = document.createElement('h3');
       h3.className = 'genres';
       h3.textContent = genre.name;
       document.querySelector('.all-genres').appendChild(h3);
    })

    document.querySelector('.budget span').textContent = '$' + data.budget;

    document.querySelector('.revenue span').textContent ='$' + data.revenue;

    document.querySelector('.runtime span').textContent = 
    data.runtime + ' min';

    document.querySelector('.status span').textContent = data.status;

    document.querySelector('.title-image img').src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

    const production = document.querySelector('.production-companies h3');
    text = '';
    data.production_companies.forEach((p, ind) => {
        if(ind == data.production_companies.length - 1) text += p.name + ".";
        else text += p.name + ",          ";
        
    })
    production.textContent = text;
}

async function displayShowDetails(id){

    showSpinner();
    const API_URL = `https://api.themoviedb.org/3/tv/${id}`;
    const API_KEY = 'e98dca16d5a003129dfc63d97065d0f2';
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    console.log(data);
    const title = document.querySelector('.title-name');
    title.textContent = data.original_name;

    document.querySelector('.rate').textContent = data.vote_average;

    document.querySelector('.about').textContent = data.overview;

    genres = data.genres;
    genres.forEach((genre)=> {
       const h3 = document.createElement('h3');
       h3.className = 'genres';
       h3.textContent = genre.name;
       document.querySelector('.all-genres').appendChild(h3);
    })
    document.querySelector('.title-img').src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    document.querySelector('.latest-epsiode span').textContent =  data.last_episode_to_air.name;



    document.querySelector('.budget span').textContent = data.number_of_episodes;


    document.querySelector('.status span').textContent = data.status;


    const production = document.querySelector('.production-companies h3');
    text = '';
    data.production_companies.forEach((p, ind) => {
        if(ind == data.production_companies.length - 1) text += p.name + ".";
        else text += p.name + ",          ";
        
    })
    production.textContent = text;
}

// Spinner Function 

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//display slider

async function displaySlider(){
    const API_KEY = 'e98dca16d5a003129dfc63d97065d0f2';
    const API_URL = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    const arr = data.results;
    arr.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
    });
    initSwipper();
}

function initSwipper(){
    const swiper = new Swiper('.swiper', {
        slidesPerView:1,
        spaceBetween: 30,
        freeMode:true,
        loop:true,
        autoplay:{
            delay:3000,
            disableOnInteraction:false,
        },
        breakpoints: {
            500: {
                slidesPerView:2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    })
}
async function search(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search');
    if (global.search.term !== '' && global.search.type !== null){
        const data = await searchApiData();
        // console.log(page,results,total_pages)

    }else{
        showAlert('Please Enter a Search Term', 'show');
    }


}
//Search Api Data

console.log(global.search);

//Make Request to Search
async function searchApiData(){
    
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiurl;
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&Query=${global.search.term}&page=${global.search.page}`);
    const data = await response.json();
    global.search.page = data.page;
    global.search.results = data.results;
    global.search.totalPages = data.total_pages;
    global.search.totalResults = data.total_results;
    console.log(data);
    console.log(global.search);
    displaySearchResults(data.results);
    giveContent(data);
}

// Show Error Alert

function showAlert(message, className){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    const h1 = document.createElement('h1');
    h1.textContent = message;
    alertEl.append(h1);
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => {
        document.querySelector('#alert').classList.add('hide')
    }, 3000)
}


async function displaySearchResults(results){
    //movie-details.html?id=
    document.querySelector('.showcase-container').innerHTML = `
    <div class="wrapper wrapper-showcase">
        <div class="results-heading"><h1></h1></div>
        <!-- <h1 id="tv-shows-title">POPULAR TV SHOWS</h1> -->
        <ul class="showcase-list showcase-shows showcase-search">
            
        </ul>
    </div>

    <div class="switch-page pagination">

    </div>
    `;
    const parent = document.querySelector('.showcase-search');
    console.log(results);
    term ='';
     if(global.search.term === 'tv') term = 'show'
    else term = 'movie';
    movie = true;
    if (global.search.type === 'tv')movie = false;
    results.forEach(list => {

        const url = `${term}-details.html?id=${list.id}`
        const link = document.createElement('a');
        link.href = url;
       // const card = document.createElement('div');

        const li = document.createElement('li');
        const img_container = document.createElement('div');
        img_container.className = 'flix-img';
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${list.poster_path}`;
        img_container.appendChild(img);

        //movie-content
        const content = document.createElement('div');
        content.className = 'movie-content';
        const h1 = document.createElement('h2');
        console.log(movie)
        if(!movie)h1.textContent = list.original_name;
        else h1.textContent = list.title;
        content.appendChild(h1);

        li.appendChild(img_container);
        li.appendChild(content);

        link.appendChild(li);
        parent.appendChild(link);

        console.log(url);
    })
    // page = document.createElement('h2');
    // page.textContent = `Page: ${global.search.page} / ${data.total_pages}`;
    // document.querySelector('.page-count').appendChild(page);
    document.querySelector('.results-heading h1').textContent = `${results.length} of ${global.search.totalResults}`;
    displaypagination();
}

function searchOfSearch(){
    const form =  document.querySelector('#search-of');
    form.value = global.search.type;
 }

 function displaypagination(){

    const div = document.createElement('div');
    div.classList.add('switch-page');
    div.innerHTML = `
        <div class="page-count">
            <h2>Page: ${global.search.page} / ${global.search.totalPages}</h2>
        </div>
        <div class="button">
        <button class="search-button prev" id="prev">Prev</button>
        <button class="search-button next">next</button>
        </div>
        `;
    document.querySelector('.pagination').appendChild(div);
    if(global.search.page == 1){
        document.querySelector('#prev').disabled = true;
        document.querySelector('.prev').style.background = 'red';
    }
    if (global.search.page == global.search.totalPages){
        document.querySelector('.next').disabled = true;
        document.querySelector('.next').style.background = 'red';

    }

    // Next page
    document.querySelector('.next').addEventListener('click', async () => {
        global.search.page++;
        const {results, total_pages} = await searchApiData();
        displaySearchResults(results);
    })
    document.querySelector('.prev').addEventListener('click', async () => {
        global.search.page--;
        const {results, total_pages} = await searchApiData();
        displaySearchResults(results);
    })
 }