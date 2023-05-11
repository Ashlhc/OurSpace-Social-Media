const editProfile = document.getElementById('edit-profile')

// **profile edit button event listener**
    // SUMMARY: 
        // bio is replaced with a form with the value of the bio's content
        // below the form, a save and cancel button are created
            // save button, when clicked, replaces the form with a <pre> element and takes the text content of the form and places it into the <pre> element
            // cancel button, when clicked, replaces the form with a <pre> element and takes the text content of the old bio and places it into the <pre> element

editProfile.addEventListener('click', function() {
// TODO: create logic for adding/removing interests
// TODO: **OPTIONAL** (not really though) create seperate functions for editing bio and interests
    // TODO: editprofile function just executes the editBio and editInterest functions
    console.log("click")
    // hides "edit profile" button
    editProfile.classList.add('hide')
    const bio = document.querySelector('.bio');
    // creating variables for text content of the bio before editing
    const bioText = bio.textContent;

    // creating variables for the new editable bio which is an input field, setting its value to the text content of the bio
    const bioInput = document.createElement('input');
    bioInput.type = 'text';
    bioInput.value = bioText;
    bioInput.id = 'bioTxt';
    // TODO: add appropriate CSS classes to bioInput
    // bioInput.classList.add('')

    // creates the save button
    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'save';
    // TODO: add appropriate CSS classes to save button
    saveBtn.classList.add('btn')
    saveBtn.id = 'save';

    // creates the cancel button
    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'cancel';
    // TODO: add appropriate CSS classes to cancel button
    cancelBtn.classList.add('btn')
    cancelBtn.id = 'cancel';

    // effectively changes the bio from a <pre> tag to a form text input using the varibles defined above
    bio.parentNode.replaceChild(bioInput, bio);

    // places cancel and save button after the newly created bioInput element
    bioInput.insertAdjacentElement('afterend', saveBtn);
    bioInput.insertAdjacentElement('afterend', cancelBtn);

    // event listener for save button
    saveBtn.addEventListener('click', function() {

        // creates a new <pre> element with updated text from bioInput form
        var updatedBio = document.createElement('pre');
        updatedBio.textContent = bioInput.value;
        updatedBio.id = 'bio';

        // replaces the input with the updated <pre> element
        bioInput.parentNode.replaceChild(updatedBio, bioInput);

        // removes the save and cancel buttons from the page and adds the "edit profile" button
        saveBtn.remove();
        cancelBtn.remove();
        // TODO: consider where in the function you want to remove the editProfile button. make sure to change comment above accordingly
        editProfile.classList.remove('hide')
    });

    // event listener for cancel button
    cancelBtn.addEventListener('click', function() {

        // creates a <pre> element with the original bio text content
        var oldBio = document.createElement('pre');
        oldBio.textContent = bioText;
        oldBio.id = 'bio';

        // replaces the input with the original bio
        bioInput.parentNode.replaceChild(oldBio, bioInput);

        // removes the save and cancel buttons from the page and adds the "edit profile" button
        saveBtn.remove();
        cancelBtn.remove();
        // TODO: consider where in the function you want to remove the editProfile button. make sure to change comment above accordingly
        editProfile.classList.remove('hide')
        });
    });
