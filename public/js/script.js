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
    await fetch("/sessiondata",{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(async json=>{
        if (json.user_id==undefined){
            alert("You must be logged in to add a friend!");
            return;
        }
        const friend_id = event.target.dataset.id;
        const user_id = json.user_id
        if (user_id == friend_id) {
            alert("You can't friend yourself!")
            return;
        }
        const newFriend = await fetch(`/api/users/${user_id}/newfriend/${friend_id}`,{
            method: "POST",
        })

        if (newFriend.ok) {
            console.log("new friend")
        }
        // TODO: Add responsive class for buttons based on: yourself, not friend, and friend
    })
}

// Deletion
const delBtn = document.querySelectorAll(".delete");
for (let i=0;i<delBtn.length;i++){
    delBtn[i].addEventListener("click",deleteHandler);
}
async function deleteHandler(event) {
    event.preventDefault()

    console.log("click delete");
}