
async function signup() {
    const signUpUrl = `http://localhost:5000/auth/registration`;

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(signUpUrl, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(data => console.log(data))



    window.location.replace('http://localhost:5000/home');
}

const sign_upBtn = document.getElementById('registration');

sign_upBtn.addEventListener('click', signup)