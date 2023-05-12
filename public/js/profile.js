const uploader = Uploader({
    apiKey: "free"
});

// Declarations for all needed queryselectors
const editBtn = document.querySelector('.edit-prof button')
const uploadBtn = document.querySelector('.upload-img')
const profImg = document.querySelector("#prof-img");
const postForm = document.querySelector("#post-form");
const commentForm = document.querySelectorAll("#comment-form");
const interestForm = document.querySelector("#interest-form")

// Profile Edit Event Listener
// TODO: allow editing of: first_name, last_name
if (editBtn) {
    editBtn.addEventListener('click', editHandler);
}

async function editHandler() {
    // Grabs the textarea bio and it's value
    const bio = document.querySelector('#bio');
    const bioText = bio.value;
    
    // Changes functionality based on if button is in "save" or "edit" mode
    if (editBtn.id == "save") {
        // Logs for bugfixing purposes, can be deleted
        console.log("Saved!")
        console.log(bioText)
        
        // Disables editing
        bio.disabled=true
        uploadBtn.classList.add("hide");
        interestForm.classList.add("hide");

        const uploadImg=profImg.src
        
        // Updates database with new info
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
            await fetch(`/api/users/${json.user_id}`,{
                method: "PUT",
                body: JSON.stringify({
                    // TODO: add other attributes in
                    bio: bioText,
                    profile_img: uploadImg
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            })
        })

        // Switches button to edit mode
        editBtn.textContent = "Edit Profile";
        editBtn.id = "edit-profile";
    } else {
        // Logs for bugfixing purposes, can be deleted
        console.log("Edit Mode")

        // Enables editing
        bio.disabled = false
        uploadBtn.classList.remove("hide");
        interestForm.classList.remove("hide");

        // Switches button to save mode
        editBtn.textContent = "Save";
        editBtn.classList.add("save")
        editBtn.id = 'save';
    }
}

// Upload Button Event Listener
if (uploadBtn) {
    uploadBtn.addEventListener("click",uploadImage)
}
async function uploadImage() {

    uploader
        .open({
            maxFilecount: 1,
            multi: false,
            editor: {
                images: {
                    crop: true,
                    cropShape: "rect",
                    cropRatio: 1 / 1
                }
            }
        })
        .then(files => {
        if (files.length === 0) {
          console.log('No files selected.')
        } else {
          profImg.src = files[0].fileUrl
          return;
        }
      }).catch(err => {
        console.error(err);
      });
};

// Post Form Event Handler
if (postForm){
    postForm.addEventListener("submit",postHandler)
}
async function postHandler(event) {
    event.preventDefault();
    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-body").value.trim();
    console.log(postTitle+"\n"+postBody)

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
        await fetch("/api/posts",{
            method: "POST",
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
                author_id: json.user_id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
    })

    // TODO: Have it append to the page instead of refresh
    location.reload();
}

// Comment Form Event Handler
for (let i=0;i<commentForm.length;i++) {
    commentForm[i].addEventListener("submit",commentHandler)
}
async function commentHandler(event) {
    event.preventDefault();

    const postId = event.target.parentElement.dataset.postid
    const comText = event.target.firstElementChild.value.trim();

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
        await fetch("/api/comments",{
            method: "POST",
            body: JSON.stringify({
                text: comText,
                author_id: json.user_id,
                post_id: postId
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
    })

    // TODO: Have it append to the page instead of refresh
    location.reload();

}

// Interest Form Event Handler
if (interestForm) {
    interestForm.addEventListener("submit",interestHandler)
}
async function interestHandler(event) {
    event.preventDefault()

    const newInterest = document.querySelector("#new-interest").value.trim();
    
    // Creates and appends an li and button to the page
    const interestList = document.querySelector(".interests-lists");
    const newli = document.createElement("li")
    newli.textContent = newInterest
    newli.classList.add("interest")
    const newliBtn = document.createElement("button")
    newliBtn.textContent = "X"
    newliBtn.classList.add("delete-interest");
    newli.appendChild(newliBtn)
    interestList.appendChild(newli)

    // Updates database with new interest
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
        await fetch("/api/interests",{
            method: "POST",
            body: JSON.stringify({
                name: newInterest,
                user_id: json.user_id,
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
    })
}

// WARNING!!! GOOFY FUNCTION FOLLOWS
const friendImgs = document.querySelectorAll(".friend-img");
for (let i=0;i<friendImgs.length;i++){
    const rand1 = Math.floor(Math.random()*100)
    const rand2 = Math.floor(Math.random()*100)
    const rand3 = Math.floor(Math.random()*100)
    const rand4 = Math.floor(Math.random()*100)
    friendImgs[i].setAttribute("style",`border-radius:${rand1}% ${rand2}% ${rand3}% ${rand4}%`)
}
// END GOOFY FUNCTION WARNING