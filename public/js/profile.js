const uploader = Uploader({
    apiKey: "free"
});

const editBtn = document.querySelector('.edit-prof button')
const uploadBtn = document.querySelector('.upload-img')
const profImg = document.querySelector("#prof-img");

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

        // Switches button to save mode
        editBtn.textContent = "Save";
        editBtn.id = 'save';
    }
}

// Upload Button Event Listener
uploadBtn.addEventListener("click",uploadImage)

// Handles Image Upload
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

// Handles posting a post or commment
const postForm = document.querySelector("#post-form");
const commentForm = document.querySelectorAll("#comment-form");

// Post Form Event Handler
postForm.addEventListener("submit",postHandler)

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

for (let i=0;i<commentForm.length;i++) {
    commentForm[i].addEventListener("submit",commentHandler)
}

// Comment Form Event Handler
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