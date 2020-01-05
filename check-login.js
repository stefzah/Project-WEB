var button = document.getElementById('confirm-button');
button.addEventListener('click', checkLogin);

var username = document.getElementById('username');
username.addEventListener('keyup', checkLogin2);

var password = document.getElementById('password');
password.addEventListener('keyup', checkLogin2);

function checkLogin() {
    var user_val = document.getElementById('username').value;
    var password_val = document.getElementById('password').value;
    
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            var users = data;
            var user = { val_id:0, loged:0 };
            var ok = 0;
            for (var i = 0; i < users.length; i++) {
                if (user_val == users[i].username && password_val == users[i].password) {
                    user.val_id = users[i].id;
                    user.loged = 1;
                    ok = 1;
                }
            }
            console.log(user);
            if (ok == 1) {
                postRequest('http://localhost:3000/user', user)
                    .then(data => console.log(data)) // Result from the `response.json()` call
                    .catch(error => console.error(error))
                function postRequest(url, data) {
                    return fetch(url, {
                        credentials: 'same-origin', // 'include', default: 'omit'
                        method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
                        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                    })
                        .then(response => response.json())
                }
                // console.log(data) // Prints result from `response.json()` in getRequest
                location.replace("profile.html")
            }
        })
        .catch(error => console.error(error))
}

function checkLogin2()
{

}