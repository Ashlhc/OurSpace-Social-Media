// TODO: create logic to handle succesful and unsuccessful logic
document.addEventListener('DOMContentLoaded', () => {
const usernameInput = document.getElementById('create-username');
const firstnameInput = document.getElementById('create-first_name');
const lastnameInput = document.getElementById('create-last_name');
const passwordInput = document.getElementById('create-password');
const confirm_passwordInput = document.getElementById('confirm-password');
const signUpButton = document.getElementById('sign-up');

signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const usernameValue = usernameInput.value;
    const firstnameValue = firstnameInput.value;
    const lastnameValue = lastnameInput.value;
    const passwordValue = passwordInput.value;
    const confirmpasswordValue = confirm_passwordInput.value;

    if(!usernameValue || !firstnameValue || !lastnameValue || !passwordValue || !confirmpasswordValue) {
        alert('Must fill in all fields');
        return;
    }

    if(passwordValue.length < 8 ) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (passwordValue !== confirmpasswordValue) {
        alert('Password and Confirm Password must match');
        return;
    }

    usernameInput.value = '';
    firstnameInput.value = '';
    lastnameInput.value = '';
    passwordInput.value = '';
    confirm_passwordInput = '';

    alert('You did it!!');
    });

});

