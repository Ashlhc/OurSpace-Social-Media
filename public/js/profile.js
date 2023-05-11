const uploader = Uploader({
    apiKey: "free"
});

const editBtn = document.querySelector('.edit-prof button')
const uploadBtn = document.querySelector('.upload-img')
const profImg = document.querySelector("#prof-img");

// Profile Edit Event Listener
// TODO: allow editing of: first_name, last_name
editBtn.addEventListener('click', async function() {
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
});

uploadBtn.addEventListener("click",uploadImage)

async function uploadImage() {
    console.log("image upload click")
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
          console.log('Files uploaded:');
          console.log(files[0].fileUrl);
          profImg.src = files[0].fileUrl
          return;
        }
      }).catch(err => {
        console.error(err);
      });
}