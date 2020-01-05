fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        //console.log(data) // Prints result from `response.json()` in getRequest
        user = data;
        if (user.loged == 0) {
            location.replace("login.html");
            var fallow_button = document.getElementById("profile-button");
            fallow_button.setAttribute("class", "fallow-button");
            fallow_button.innerHTML = "Fallow";
        }
        else if (user.loged == 1) {
            var post_button = document.getElementById("profile-button");
            post_button.setAttribute("class", "fallow-button");
            post_button.innerHTML = "New Post";
        }
    })
    .catch(error => console.error(error))


function showPost() {
    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            //console.log(data) // Prints result from `response.json()` in getRequest
            var user = data;
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(data => {
                    //console.log(data) // Prints result from `response.json()` in getRequest
                    var users = data;
                    // LET THE FUN BEGIN
                    for (var i = 0; i < users.length; i++) {
                        if (user.val_id == users[i].id) {
                            //Setam poza de profil
                            var profile_img = document.getElementById("profile-img");
                            profile_img.setAttribute("src", users[i].photo);


                            //Setam nickname-ul
                            var nickname = document.getElementById("nickname");
                            nickname.innerHTML = users[i].nickname;

                            //Setam postarile
                            if (users[i].posts.length > 0) {
                                for (var j = users[i].posts.length-1; j >= 0; j--) {
                                    var post = document.createElement("div");
                                    post.setAttribute("class", "post");

                                    var post_info = document.createElement("div");
                                    post_info.setAttribute("class", "post-info");

                                    var mini_profile_img = document.createElement("img");
                                    mini_profile_img.setAttribute("src", users[i].photo);
                                    mini_profile_img.setAttribute("class", "mini-profile-img");

                                    var post_title = document.createElement("div");
                                    post_title.innerHTML = users[i].posts[j].title;
                                    post_title.setAttribute("class", "post-title");

                                    var post_image = document.createElement("img");
                                    post_image.setAttribute("src", users[i].posts[j].img);
                                    post_image.setAttribute("class", "post-image");

                                    var post_info_likes = document.createElement("div");
                                    post_info_likes.setAttribute("class", "post-info-likes");

                                    var post_title2 = document.createElement("div");
                                    post_title2.setAttribute("class", "post-title");

                                    var heart = document.createElement("i");
                                    heart.setAttribute("class", "fa fa-heart");
                                    heart.setAttribute("onclick", "makeHeart(this)");



                                    post_title2.appendChild(heart);
                                    post_title2.innerHTML += users[i].posts[i].likes;
                                    post_title2.innerHTML += " likes";

                                    post_info_likes.appendChild(post_title2);
                                    post_info.appendChild(mini_profile_img);
                                    post_info.appendChild(post_title);

                                    post.appendChild(post_info);
                                    post.appendChild(post_image);
                                    post.appendChild(post_info_likes);
                                    document.getElementById("profile-box").appendChild(post);
                                }
                            }
                            break;
                        }
                    }
                })
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))

}
showPost();

function newPost() {

    /*
    postRequest('http://example.com/api/v1/users', {user: 'Dan'})
  .then(data => console.log(data)) // Result from the `response.json()` call
  .catch(error => console.error(error))

function postRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => response.json())
}
*/

}

