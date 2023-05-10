const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click",async function(event) {
    event.preventDefault();

    const usernameLogin = document.querySelector("#username-login").value.trim();
    const passwordLogin = document.querySelector("#password-login").value.trim();

    if(usernameLogin && passwordLogin) {
        const loginResponse = await fetch("/api/users/login",{
            method: "POST",
            body: JSON.stringify({
                username: usernameLogin,
                password: passwordLogin
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });

        if(loginResponse.ok) {
            window.location.href = `/profile/${usernameLogin}`
        } else {
            console.log("oops");
        }
    }
});