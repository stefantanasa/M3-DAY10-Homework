console.log("This is the add movie page");
let moviesRowDB = document.querySelector(".movies-dashboard");
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

    console.log(getData("POST", "", movieObject));
    console.log(movieObject);
    console.log("ok");
};

// this function works with GET/POST/DELETE/PUT
let getData = async(method, id = "", object = {}) => {
    let body = "";

    try {
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
    } catch (error) {
        console.log("Error caught: ", error.message);
    }
};

// dashboard

const handleDelete = (movieId, title) => {
    handleValidation(movieId, title);
};

const handleValidation = (id, title) => {
    const classId = document.getElementById(`${id}`);
    console.log(classId);
    const modalBox = document.querySelector(".movie-title-validation");
    modalBox.textContent = title;
    const confirmationButton = document.querySelector(".confirmation-button");
    confirmationButton.addEventListener("click", () => {
        console.log("Deleted", id);
        classId.remove();
    });
    console.log("stopped");

    getData("DELETE", id);
};

let loadCategory = [];

const handleSelection = async(event) => {
    const select = document.querySelector("#select-category");

    let index = select.options.selectedIndex;
    loadCategory = [select.options[index].label];

    let clickedLabel = select.options[index].label;

    if (index === 0) {
        handleLoadMovies();
        return;
    } else if (loadCategory) {
        moviesRowDB.innerHTML = "";
        loadCategory = [select.options[index].label];
    }
    console.log("continued ");

    // console.log("continued:", loadCategory); moviesRowDB.innerHTML = "";
    // loadCategory === [] ?
    //     (loadCategory = []) :
    //     (loadCategory = [select.options[index].value]);

    // console.log("category: ", select.options[index].value);
    // // loadCategory = [select.options[index].value];
    // console.log(" index: ", index);
    // console.log(" Value index in loadCat: ", loadCategory);
    handleLoadMovies();
};

const handleLoadMovies = async() => {
    console.log("Loading...");
    if (loadCategory.includes("Genres")) {
        loadCategory = await getData("GET");
        console.log("wHAT LOAD loadCategory:", loadCategory);
        moviesRowDB.innerHTML = "";
        loadCategory.forEach((movie) => {
            getAllMovies(movie);
        });
    } else if (loadCategory.length) {
        console.log("What load cat:", loadCategory);
        loadCategory.forEach((movie) => {
            getAllMovies(movie);
        });
    } else {
        loadCategory = await getData("GET");
        console.log("wHAT LOAD loadCategory:", loadCategory);
        loadCategory.forEach((movie) => {
            getAllMovies(movie);
        });
    }
};

const handleEdit = (name, description, category, _id, createdAt, imageUrl) => {
    window.location.href = `/add-movie-page.html?name=${name}&description=${description}&category=${category}&_id=${_id}&imageUrl=${imageUrl}`;
};

const getAllMovies = async(movie) => {
    let movieDetails = await getData("GET", movie);
    // console.log(movieDetails);
    movieDetails.forEach((m) => {
        createThumbnaiDB(m);
    });
};

const handleMovieDetails = (category) => {
    window.location.href = `/add-movie-page.html?${category}`;
};

const createThumbnaiDB = async(movie) => {
    // fetch for each category all the movies
    const { name, description, imageUrl, category, _id, createdAt } = movie;

    let movieDb = document.createElement("div");
    movieDb.classList = ["carousel-item", "image-card", "active", _id];
    movieDb.setAttribute("id", _id);
    movieDb.innerHTML = `

   
    <img src="${imageUrl}" class="d-block image-card img-wrap " alt="...">
   
    
    <div class="carousel-caption caption ">
        <span class="d-flex justify-content-center " >
              <h5 class=" movie-description">${name}</h5>
        </span>
        <span class="d-flex justify-content-center " >
              <p class=" ">${category}</p>
        </span>
        <p class=" movie-description">${description}</p>
        <span class="d-flex justify-content-center " >
        </span>
        
        <!-- edit -->
        <div class="actions-button">
        <button 
        class="actions-button btn btn-warning"
         type="button"
          onClick="handleEdit(
              '${name}','${description}','${category}','${_id}','${createdAt}','${imageUrl}'
              )"
         class="btn btn-warning">
        
        <i  class="fa fa-pencil " aria-hidden="true"></i>
        
        </button>
        
        <!-- delete -->
        <button type="button"
        onClick="return handleDelete('${_id}','${name}')"
           class="btn btn-danger"
           data-toggle="modal" data-target="#validate-delete"
           >
        <i class="fa fa-trash-o " aria-hidden="true"></i>
        </button>
        </div>
      

        
    </div>


    `;

    moviesRowDB.appendChild(movieDb);
};

window.onload = () => {
    handleLoadMovies();
    // console.log((document.querySelector(".no-selection").selected = false));
};