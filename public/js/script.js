// TODO: add universal code if needed. 
// TODO: add logout logic

// Search Functionality
search.addEventListener("submit",function(event) {
    const search = document.querySelector("#search");
    const userSearch = document.querySelector("#search input").value;
    event.preventDefault();
    window.location.href = `/search/${userSearch}`
});