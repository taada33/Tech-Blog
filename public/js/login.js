const login = async () => {
    event.preventDefault();
    const username = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && password){
        console.log('here')
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({name: username, password: password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            setTimeout(document.location.pathname = '/', 1500)
            return;
        }
        document.querySelector('#password').value = "";
        alert('Incorrect username or password')
    }else{
        alert('Missing login form input(s)')
    }
}

const loginFormBtn = document.querySelector('#login-btn');
loginFormBtn.addEventListener('click', login);

const register = async () => {
    event.preventDefault();

    const username = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && password){
        const response = await fetch('api/users/register', {
            method: 'POST',
            body: JSON.stringify({name: username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        setTimeout(document.location.pathname = '/', 1500)
    }else{
        alert('Missing registration form input(s)')
    }
}

const registerBtn = document.querySelector('#register-btn');
registerBtn.addEventListener('click', register);