let alert = document.createElement("div");
let movieForm = document.querySelector("#movie-form");
let newMovieForm = document.querySelector("#new-movie-form");
alert.classList = ["alert", "alert-primary"];

const handleSubmit = async(event) => {
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
        event.preventDefault();

        let theBody = await getData("POST", "", movieObject);
        movieForm.prepend(alert);
        if (theBody.ok) {
            console.log(theBody);
            alert.innerHTML = `<div class="alert alert-primary" role="alert">
            Movie has been added. You can add another one!
            </div>`;
            movieForm.prepend(alert);
            newMovieForm.reset();
            setTimeout(() => {
                alert.innerHTML = ``;
            }, 3000);

            // movieForm.appendChild(createAlert("success", "The movie was posted!"));
        } else {
            alert.innerHTML = `<div class="alert alert-danger" role="alert">
            Check if you entered all the detailes needed 
            </div>`;
        }
    } catch (error) {
        console.log("ERROR: ", error);
        movieForm.prepend(alert);
        alert.innerHTML = `<div class="alert alert-danger" role="alert">
ERROR: ${error}
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

console.log;