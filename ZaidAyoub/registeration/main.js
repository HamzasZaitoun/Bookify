const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


    document.getElementById('signup-btn').addEventListener('click', function () {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    
    if (name && email && password) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert('Account created successfully!');
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('signin-btn').addEventListener('click', function () {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
    } else {
        alert('Invalid email or password.');
    }
});
