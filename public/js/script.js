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

        // Creates a two-way friend connection when a single user clicks
        const newFriend = await fetch(`/api/users/${user_id}/newfriend/${friend_id}`,{
            method: "POST",
        })
        const newFriendTwo = await fetch(`/api/users/${friend_id}/newfriend/${user_id}`,{
            method: "POST",
        })

        if (newFriend.ok && newFriendTwo.ok) {
            console.log("new friend")
            location.reload();
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

    const clickedBtn = event.target
    const delId = event.target.dataset.id
    const delType = event.target.dataset.type
    // Types
    // ==========
    // friend
    // interest
    // post
    // comment

    // Will take the delType and spit out to another function that does the fetch
    switch (delType) {

        case "friend":
            deleteFriend(delId, clickedBtn);
            break;

        case "interest":
            await deleteInterest(delId, clickedBtn);
            break;

        case "post":
            deletePost(delId, clickedBtn);
            break;

        case "comment":
            deleteComment(delId, clickedBtn);
            break;

        default:
            console.log("error in deletion");
    }
}

// Deletes friends
async function deleteFriend(id, node) {
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

        // Deletes both directions
        const delResult = await fetch(`/api/users/${json.user_id}/friends/${id}`,{
            method: "DELETE",
        })
        const delResultTwo = await fetch(`/api/users/${id}/friends/${json.user_id}`,{
            method: "DELETE",
        })

        if (delResult.ok && delResultTwo.ok) {
            node.parentElement.remove();
        }
    })
}

// Interest Deletion. Deletes from database then removes the page element
async function deleteInterest(id, node) {
    const delResult = await fetch(`/api/interests/${id}`,{
        method: "DELETE",
    })
    if (delResult.ok) {
        node.parentElement.remove();
    }
}

// Post Deletion. Deletes from database then removes page element
async function deletePost(id, node) {
    const delResult = await fetch(`/api/posts/${id}`,{
        method: "DELETE",
    })
    if (delResult.ok) {
        node.parentElement.parentElement.remove();
    }
}

// Comment Deletion. Deletes from database then removes page element
async function deleteComment(id, node) {
    const delResult = await fetch(`/api/comments/${id}`,{
        method: "DELETE",
    })
    if (delResult.ok) {
        node.parentElement.remove();
    }
}