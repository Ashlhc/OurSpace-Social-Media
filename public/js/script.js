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

// Add Friends
const friendBtn = document.querySelectorAll(".add-friend");
for (let i=0;i<friendBtn.length;i++) {
    friendBtn[i].addEventListener("click",friendHandler)
}

async function friendHandler(event) {
    const userId = await fetch("/sessiondata",{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    },
    )
    if (userId.user_id==undefined){
        alert("You must be logged in to add a friend!");
    }
    console.log(event.target.dataset.id)
    console.log(userId);
    console.log(userId.user_id);
}