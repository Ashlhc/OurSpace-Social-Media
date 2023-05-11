// Search
const search = document.querySelector("#search");

search.addEventListener("submit",function(event) {
    event.preventDefault();
    
    const userSearch = document.querySelector("#search input").value.trim();
    if (userSearch!=="") {
        window.location.href = `/search/${userSearch}`
    }
});

// Logout
const logoutBtn = document.querySelector("#logout-btn");

if (logoutBtn) {
logoutBtn.addEventListener("click",async function(event){
    event.preventDefault();

    const logoutResponse = await fetch("/api/users/logout",{
        method: "POST"
    })
    if (logoutResponse.ok){
        window.location.href = '/'
    }
})
}