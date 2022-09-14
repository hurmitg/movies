
// main js --------------- 
var url = "https://api.themoviedb.org/3/trending/movie/day?api_key=10f696d14d2328d42fbb98c53b1343c3";
var interval;

const handleClick = (q)=>{
    clearInterval(interval)
    if(q ==`movie`){ 
        document.querySelector(".movie").style.textDecoration = "underline" 
         document.querySelector(".tv").style.textDecoration = "none"
    } else {
        document.querySelector(".tv").style.textDecoration = "underline"
        document.querySelector(".movie").style.textDecoration = "none"
    }
     url = `https://api.themoviedb.org/3/trending/${q}/day?api_key=10f696d14d2328d42fbb98c53b1343c3`;
     getdata();
}


getdata();
function getdata() {
    // let url = `https://api.themoviedb.org/3/trending/tv/day?api_key=10f696d14d2328d42fbb98c53b1343c3`;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            append(res.results);
            // moviesArr = res.Search
            slideshow(res.results);
        })
        .catch(function (err) {
            console.log(err);
        })
}


function append(movies) {

    document.querySelector("#movies").innerHTML = "";
    movies.forEach(function (elem) {
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;

        let p1 = document.createElement("p");
        p1.innerText = elem.name || elem.title;

        div.append(img);
        div.addEventListener('click', function () {
            popup(elem);
        });
        document.querySelector("#movies").append(div);
    })

}


function slideshow(movies) {
    window.clearInterval();
    let main = document.querySelector("#slideshow");

    let i = 0;

    interval = setInterval(function () {
        if (i > 4) i = 0;
        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${movies[i].backdrop_path}`;

        main.innerHTML = "";
        main.append(img);
        i++;

    }, 2500)
}


// Search js --------------------


let id;

function debounce(func, delay) {       //oninput="debounce(mainSearch, 1000)"
    let container = document.querySelector("#searchData");
    container.style.display = "block";
    if (id) {
        clearTimeout(id);
    }
    id = setTimeout(() => {
        func();
    }, delay);
}

async function mainSearch() {
    let query = document.querySelector("#search").value;
    let data = await getSearchData(query);

    if(data.length==0){
        document.querySelector("#searchData").innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "X";
        p.addEventListener('click', function () {
            document.querySelector("#searchData").style.display = "none";
        })
        let errImg = document.createElement("img");
        errImg.src = `https://media2.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif`;
        let h2 = document.createElement("h2");
        h2.innerText = "No Results Found"
        document.querySelector("#searchData").append(p, errImg, h2);

    } else {
    appendSearch(data);
    }
}

async function getSearchData(search) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=10f696d14d2328d42fbb98c53b1343c3&query=${search}&page=1`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data.results);
    return data.results;
}


function appendSearch(data) {

    
    
    let container = document.querySelector("#searchData");
    container.innerHTML = "";
    let p = document.createElement("p");
    p.innerText = "X";
    container.append(p);
    p.addEventListener('click', function () {
        document.querySelector("#searchData").style.display = "none";
    })

    data.forEach((elem) => {
        let img = document.createElement("img");
        let poster = elem.backdrop_path || elem.poster_path;
        img.src = `https://image.tmdb.org/t/p/w500/${poster}`;

        let p = document.createElement("p");
        p.innerText = elem.title || elem.name;

        let div = document.createElement("div");

        div.append(img, p);
        div.addEventListener('click', function () {
            popup(elem);
        });

        if (poster) container.append(div)
    })

}






// popup js --------------------------

function popup(movie) {
    document.querySelector("#box").innerHTML = "";
    document.querySelector("body").setAttribute("class", "no_scroll");
    document.querySelector("#overlay").style.display = "flex"
    document.querySelector("#popup").style.display = "flex"
    appendPopup(movie);
}



function appendPopup(movie) {
    let div1 = document.createElement("div");
    let img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    div1.append(img);

    let div2 = document.createElement("div");

    let title = document.createElement("p");
    title.innerText = movie.title || movie.name;

    let release = document.createElement("p");
    release.innerText = movie.release_date || movie.year || "";

    let overview = document.createElement("p");
    overview.innerText = movie.overview;


    div2.append(title, release, overview);

    document.querySelector("#box").append(div1, div2)
}



{
document.querySelector("#popup>p").addEventListener('click', function () {
    document.querySelector("body").removeAttribute("class", "no_scroll");
    document.querySelector("#overlay").style.display = "none"
    document.querySelector("#popup").style.display = "none"
})
}

