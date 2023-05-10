

const bio = document.getElementById('bio');
const editProfile = document.getElementById('edit')


// **profile edit button event listener**
    // SUMMARY: 
        // bio is replaced with a form with the value of the bio's content
        // below the form, a save and cancel button are created
            // save button, when clicked, replaces the form with a <p> element and takes the text content of the form and places it into the <p> tag
            // cancel button, when clicked, replaces the form with a <p> element and takes the text content of the old bio and places it into the <p> tag

editProfile.addEventListener('click', function() {

    // hides "edit profile" button
    editProfile.classList.add('hide')

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

    // effectively changes the bio from a <p> tag to a form text input using the varibles defined above
    bio.parentNode.replaceChild(bioInput, bio);

    // TODO: convert the code to use the appendChild() method
    // places cancel and save button after the newly created bioInput element
    bioInput.insertAdjacentElement('afterend', saveBtn);
    bioInput.insertAdjacentElement('afterend', cancelBtn);

    // event listener for save button
    saveBtn.addEventListener('click', function() {

        // creates a new <p> element with updated text from bioInput form
        var updatedBio = document.createElement('p');
        updatedBio.textContent = bioInput.value;
        updatedBio.id = 'bio';

        // replaces the input with the updated <p> element
        bioInput.parentNode.replaceChild(updatedBio, bioInput);

        // removes the save and cancel buttons from the page and adds the "edit profile" button
        saveBtn.remove();
        cancelBtn.remove();
        editProfile.classList.remove('hide')
    });

    // event listener for cancel button
    cancelBtn.addEventListener('click', function() {

        // creates a <p> element with the original bio text content
        var oldBio = document.createElement('p');
        oldBio.textContent = bioText;
        oldBio.id = 'bio';

        // replaces the input with the original bio
        bioInput.parentNode.replaceChild(oldBio, bioInput);

        // removes the save and cancel buttons from the page and adds the "edit profile" button
        saveBtn.remove();
        cancelBtn.remove();
        editProfile.classList.remove('hide')
    });
});