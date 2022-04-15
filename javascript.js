console.log("This is the add movie page");

// handle submit

const handleSubmit = (event) => {
    event.preventDefault();
    let titleValue = document.querySelector("#title").value;
    let descriptionValue = document.querySelector("#description").value;
    let categoryValue = document.querySelector("#category").value;
    let coverValue = document.querySelector("#cover").value;

    // object to be sent
    const movieObject = {
        name: titleValue,
        description: descriptionValue,
        category: categoryValue,
        imageUrl: coverValue,
    };

    getData("POST", "", movieObject);
    console.log(movieObject);
    console.log("ok");
};

// this function works with GET/POST/DELETE/PUT
let getData = async(method, id = "", object = {}) => {
    let body = "";
    method === "GET" ? (body = null) : (body = JSON.stringify(object));
    let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/movies/${id}`, {
            method: method,
            body,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwOWZmNTRjZmY1ZjAwMTU5MGJkYWUiLCJpYXQiOjE2NTAwMTAwMTEsImV4cCI6MTY1MTIxOTYxMX0.gUnkRagRPNMgM7QL-dmazjZn6f0EMEVrADfen5CYDOw",
                "Content-Type": "Application/Json",
            },
        }
    );
    data = await response.json();

    return data;
};

// dashboard

const handleDelete = (movieId) => {
    alert(`You have deleted ${movieId}`);
    getData("DELETE", movieId);
};
const handleEdit = (movieId) =>
    (window.location.href = `/M3-DAY10-Homework/add-movie-page.html?EditMovie=${movieId}`);

const handleLoadMovies = async() => {
    console.log("Loading...");
    let categories = await getData("GET");

    console.log(categories);
    categories.forEach((movie) => {
        getAllMovies(movie);
    });
};

const getAllMovies = async(movie) => {
    let movieDetails = await getData("GET", movie);
    // console.log(movieDetails);
    movieDetails.forEach((m) => {
        createThumbnail(m);
    });
};

const createThumbnail = async(movie) => {
    // fetch for each category all the movies

    let moviesRowDB = document.querySelector(".movies-dashboard");
    let movieDb = document.createElement("div");
    movieDb.classList = ["carousel-item", "image-card", "active"];
    movieDb.innerHTML = `

    
    <img src="${movie.imageUrl}" class="d-block image-card img-wrap " alt="...">
    <div class="carousel-caption caption ">
        <span class="d-flex justify-content-center ">
              <h5>${movie.name}</h5>
        </span>
        <p>Some kind of description</p>

        <!-- edit -->
        <button type="button" onClick="handleEdit('${movie._id}')" class="btn btn-warning">
        
        <i  class="fa fa-pencil " aria-hidden="true"></i>
        
        </button>
        
        <!-- delete -->
        <button type="button"  onClick="handleDelete('${movie._id}')" class="btn btn-danger">
        <i class="fa fa-trash-o " aria-hidden="true"></i>
        </button>
        


        
    </div>


    `; {
        /* <img class="image-card " src="${movie.imageUrl}" /> */
    }

    moviesRowDB.appendChild(movieDb);
};

const handleSelection = (event) => {
    const select = document.querySelector("#select-category");
    let index = select.options.selectedIndex;
    console.log(select.options[index].value);
};

window.onload = () => {
    handleLoadMovies();
    // console.log((document.querySelector(".no-selection").selected = false));
};