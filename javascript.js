console.log("This is the add movie page");

// handle submit movie

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

let loadCategory = [];
const handleSelection = (event) => {
    const select = document.querySelector("#select-category");
    let index = select.options.selectedIndex;
    index === 0 ?
        (loadCategory = []) :
        (loadCategory = [select.options[index].value]);
    console.log(loadCategory.length);

    console.log("category: ", select.options[index].value, "index: ", index);
    console.log("Load index: ", loadCategory);
};

const handleLoadMovies = async() => {
    console.log("Loading...");
    if (loadCategory.length) {
        loadCategory.forEach((movie) => {
            getAllMovies(movie);
        });
    } else {
        let categories = await getData("GET");

        console.log(categories);
        categories.forEach((movie) => {
            getAllMovies(movie);
        });
    }
};

const handleEdit = (name, description, category, _id, createdAt) => {
    window.location.href = `M3-DAY10-Homework/add-movie-page.html?name=${name}&description=${description}
    &category=${category}&_id=${_id}&createdAt=${createdAt}`;
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
    const { name, description, imageUrl, category, _id, createdAt } = movie;
    let moviesRowDB = document.querySelector(".movies-dashboard");
    let movieDb = document.createElement("div");
    movieDb.classList = ["carousel-item", "image-card", "active"];
    movieDb.innerHTML = `

    
    <img src="${imageUrl}" class="d-block image-card img-wrap " alt="...">
    <div class="carousel-caption caption ">
        <span class="d-flex justify-content-center ">
              <h5>${name}</h5>
        </span>
        <p>${description}</p>

        <!-- edit -->
        <button type="button" onClick="handleEdit('${name}','${description}','${category}','${_id}','${createdAt}')" class="btn btn-warning">
        
        <i  class="fa fa-pencil " aria-hidden="true"></i>
        
        </button>
        
        <!-- delete -->
        <button type="button"  onClick="return handleDelete('${_id}')" class="btn btn-danger">
        <i class="fa fa-trash-o " aria-hidden="true"></i>
        </button>
      

        
    </div>


    `; {
        /* <img class="image-card " src="${movie.imageUrl}" /> */
    }

    moviesRowDB.appendChild(movieDb);
};

window.onload = () => {
    handleLoadMovies();
    // console.log((document.querySelector(".no-selection").selected = false));
};