// TODO: add universal code if needed. 
// TODO: add logout logic

// Search Functionality
const search = document.querySelector("#search");
const userSearch = document.querySelector("#search input").value;

search.addEventListener("submit",function(event) {
    event.preventDefault();
    window.location.href = `/search/${userSearch}`
});
