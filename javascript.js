console.log("This is the add movie page");

let titleValue = document.querySelector("#title").value;
let descriptionValue = document.querySelector("#description").value;
let categoryValue = document.querySelector("#category").value;
let coverValue = document.querySelector("#cover").value;

// handle submit

const handleSubmit = (event) => {
    event.preventDefault();
    console.log("ok");
};

// object to be sent
const movieObject = {
    name: titleValue,
    description: descriptionValue,
    category: categoryValue,
    imageUrl: coverValue,
};

let getData = async() => {
    let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/movies", {
            method: "POST",
            body: JSON.stringify(movieObject),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwOWZmNTRjZmY1ZjAwMTU5MGJkYWUiLCJpYXQiOjE2NTAwMTAwMTEsImV4cCI6MTY1MTIxOTYxMX0.gUnkRagRPNMgM7QL-dmazjZn6f0EMEVrADfen5CYDOw",
                "Content-Type": "Application/Json",
            },
        }
    );
    data = await response.json();
    console.log(data);
};

console.log(movieObject);