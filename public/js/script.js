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

async function deleteFriend(id, node) {
    console.log("delete friend no.",id)
}

async function deleteInterest(id, node) {
    console.log("delete interest no.",id)
    const delResult = await fetch(`/api/interests/${id}`,{
        method: "DELETE",
    })
    if (delResult.ok) {
        node.parentElement.remove();
    }
}

async function deletePost(id, node) {
    console.log("delete post no.",id)
}

async function deleteComment(id, node) {
    console.log("delete comment no.",id)
}