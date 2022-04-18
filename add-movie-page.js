let alert = document.createElement("div");
let movieForm = document.querySelector("#movie-form");
let newMovieForm = document.querySelector("#new-movie-form");
alert.classList = ["alert", "alert-primary"];

const handleSubmit = async(event) => {
    event.preventDefault();
    let titleValue = document.querySelector("#title").value;
    let descriptionValue = document.querySelector("#description").value;
    let categoryValue = document.querySelector("#category").value;
    let coverValue =
        document.querySelector("#cover").value ||
        "https://davidbeltran.net/wp-content/uploads/2015/02/default-poster.jpg";
    // object to be sent
    const movieObject = {
        name: titleValue,
        description: descriptionValue,
        category: categoryValue,
        imageUrl: coverValue,
    };
    try {
        let theBody = await getData("POST", "", movieObject);
        movieForm.prepend(alert);
        if (theBody.ok) {
            alert.innerHTML = `
            <div class="alert alert-success" role="alert">
            ✅ ${movieObject.name} has been updated!!!
            </div>
            <img  src="${movieObject.imageUrl}" class="d-block  img-wrap " alt="...">


                <span class=" justify-content-center " >
                      <h5 class=" movie-description">${movieObject.name}</h5>
                </span>
                <span class=" justify-content-center " >
                      <p class=" movie-description">${movieObject.description}</p>
                </span>
                <span class=" justify-content-center " >
                      <p class=" movie-description">${movieObject.category}</p>
                </span>
            
            `;
            movieForm.prepend(alert);
            newMovieForm.reset();
            setTimeout(() => {
                alert.innerHTML = ``;
            }, 4000);

            // movieForm.appendChild(createAlert("success", "The movie was posted!"));
        } else {
            alert.innerHTML = `<div class="alert alert-danger" role="alert">
            Check if you entered all the detailes needed 
            </div>

        </div>

            `;
        }
    } catch (error) {
        console.log("ERROR: ", error);
        movieForm.prepend(alert);
        alert.innerHTML = `<div class="alert alert-danger" role="alert">
❌ERROR: ${error}
</div>`;
    }
};

// this function works with GET/POST/DELETE/PUT
let getData = async(method, id = "", object = {}) => {
    let body = "";
    try {
        method === "GET" ? (body = null) : (body = JSON.stringify(object));
        let data = await fetch(
            `https://striveschool-api.herokuapp.com/api/movies/${id}`, {
                method: method,
                body,
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwOWZmNTRjZmY1ZjAwMTU5MGJkYWUiLCJpYXQiOjE2NTAwMTAwMTEsImV4cCI6MTY1MTIxOTYxMX0.gUnkRagRPNMgM7QL-dmazjZn6f0EMEVrADfen5CYDOw",
                    "Content-Type": "Application/Json",
                },
            }
        );
        return data;
    } catch (error) {
        console.log("ERROR: ", error);
    }
};

let params = new URLSearchParams(window.location.search);

// edit movie methods:
const handleEditSumbit = async(event) => {
    event.preventDefault();

    try {
        let id = params.get("_id");
        editObject = {
            name: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            category: document.querySelector("#category").value,
            imageUrl: document.querySelector("#cover").value,
        };
        let bodyResponse = await getData("PUT", id, editObject);
        console.log("BR: ", bodyResponse);
        if (bodyResponse.ok) {
            console.log("All good");
            alert.innerHTML = `
        <div class="alert alert-success" role="alert">
        ✅ ${editObject.name} has been updated!!!
        </div>

 



        
        `;
            movieForm.prepend(alert);
        }
    } catch (error) {
        movieForm.prepend(alert);
        alert.innerHTML = `<div class="alert alert-danger" role="alert">
❌ERROR: ${error}
</div>`;
    }
};

if (params.get("name")) {
    if (params.get("preview")) {
        newMovieForm.classList.add("d-none");
    }
    console.log("This is the edit page!");

    movieForm.addEventListener("submit", handleEditSumbit);
    document.querySelector(".add-btn").classList.add("d-none");

    // get akk dates from the url params
    let titleValue = params.get("name");
    document.querySelector(".page-title").textContent = `Edit ${titleValue}`;
    let descriptionValue = params.get("description");
    let categoryValue = params.get("category");
    let coverValue = params.get("imageUrl");

    // // Set the clicked movie details
    document.querySelector("#title").value = titleValue;
    document.querySelector("#description").value = descriptionValue;
    document.querySelector("#category").value = categoryValue;
    document.querySelector("#cover").value = coverValue;

    let editObject = {
        name: titleValue,
        description: descriptionValue,
        category: categoryValue,
        imageUrl: coverValue,
    };
    console.log("movie: ", editObject);
    const moviePreview = document.querySelector(".movie-details-preview");
    moviePreview.innerHTML = `
    <div class="image-card-preview" >
    <div class="darker-thumbnail" ></div>
        <img src="${editObject.imageUrl}" class="thumbnail" alt="..."/>
        <div class="movie-description-preview">
        <h5 class=" ">${editObject.name} </h5>
        <p class=" ">Category${editObject.category}</p>
        <p class=" ">${editObject.description}description</p>
        </div>
    </div>
    `;
} else {
    console.log("This is the add page!");
    document.querySelector(".save-btn").classList.add("d-none");
    movieForm.addEventListener("submit", handleSubmit);
}

// // console.log(params.has("name"));
// let title = params.get("name");
// console.log(`Movie Title: ${title}`);

// console.log(titleValue, descriptionValue, categoryValue, coverValue);

// console.log(
//   "Selection: ",
//   document.querySelector("#category").options[0].innerText
// );