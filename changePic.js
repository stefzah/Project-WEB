document.getElementById('input-file').onchange = function () {

    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            //console.log(data) // Prints result from `response.json()` in getRequest
            var user = data;
            var path = "http://localhost:3000/users/"
            path += user.val_id;
            fetch(path)
                .then(response => response.json())
                .then(data => {
                    var usr = data;
                    usr.photo = document.getElementById('input-file').files[0].name;
                    var profile_img = document.getElementById("profile-img");
                    profile_img.setAttribute("src", usr.photo);
                    var imgs = document.getElementsByClassName("mini-profile-img");
                    for(var i=0;i<imgs.length;i++)
                       imgs[i].src=usr.photo;
                    postRequest(path, usr)
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
                })
                .catch(error => console.error(error))

        })
        .catch(error => console.error(error))

};