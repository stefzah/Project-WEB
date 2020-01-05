fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data) // Prints result from `response.json()` in getRequest
        user = data;
        if (user.loged == 0) {
            var login_button = document.getElementById("login-button");
            login_button.setAttribute("class", "login-button");
            login_button.setAttribute("onclick", "location='login.html'");
            login_button.innerHTML = "Login";
            document.getElementsByTagName("header")[0].appendChild(login_button);
        }
        else if (user.loged == 1) {
            var login_button = document.getElementById("login-button");
            login_button.setAttribute("class", "login-button");
            login_button.setAttribute("onclick", "Logout()");
            login_button.innerHTML = "Logout";
            document.getElementsByTagName("header")[0].appendChild(login_button);
        }
    })
    .catch(error => console.error(error))

function Logout() {
    var user = { val_id: 0, loged: 0 };
    postRequest('http://localhost:3000/user', user)
        .then(data => {
            console.log(data)
            location.replace("home.html");
        }) // Result from the `response.json()` call
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

}