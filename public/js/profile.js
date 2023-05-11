const editBtn = document.querySelector('.edit-prof button')

// Profile Edit Event Listener
// TODO: allow editing of: first_name, last_name, profile_image
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
                    bio: bioText
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

        // Switches button to save mode
        editBtn.textContent = "Save";
        editBtn.classList.add
        editBtn.id = 'save';
    }
});