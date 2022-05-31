
async function login(e) {
    e.preventDefault()

    const loginUrl = 'http://localhost:5000/auth/login';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let jwt = fetch(loginUrl, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

        .then(data => console.log(data))


}

const loginbtn = document.getElementById('loginbtn');
loginbtn.addEventListener('click', login)



