document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector("#sign-up");
    
    if (signupBtn) {
    
    signupBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        
        // Read various input values
        const usernameInput = document.querySelector('#create-username').value.trim();
        const firstNameInput = document.querySelector('#create-firstname').value.trim();
        const lastNameInput = document.querySelector('#create-lastname').value.trim();
        const passwordInput = document.querySelector('#create-password').value.trim();
        const confirmPasswordInput = document.querySelector('#confirm-password').value.trim();
        
        // Checks if all the inputs have text
        if(!usernameInput || !firstNameInput || !lastNameInput || !passwordInput || !confirmPasswordInput) {
            alert('Must fill in all fields');
            return;
        }
    
        // Checks if the password is above minimum length
        if(passwordInput.length < 8 ) {
            alert('Password must be at least 8 characters long.');
            return;
        }
    
        // Checks if the entered passwords are the same
        if (passwordInput !== confirmPasswordInput) {
            alert('Password and Confirm Password must match');
            return;
        }
    
        // Checks if the username is already taken
        await fetch(`/api/users/user/${usernameInput}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            return res.json();
        })
        .then(async json=>{
            console.log(json);
            if (json !== null) {
                alert("Username already taken!");
                return;
            }
        })
    
        // If all successful, adds user into the database
        const signup = await fetch("api/users",{
            method: "POST",
            body: JSON.stringify({
                username: usernameInput,
                first_name: firstNameInput,
                last_name: lastNameInput,
                password: passwordInput 
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
    
    
        if (signup.ok) {
            const loginResponse = await fetch("/api/users/login",{
                method: "POST",
                body: JSON.stringify({
                    username: usernameInput,
                    password: passwordInput
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if(loginResponse.ok) {
                window.location.href = `/profile/${usernameInput}`
            } else {
                console.log("oops");
            }
        } else {
            console.log("oops");
        }
    })
    
    }
    
    });