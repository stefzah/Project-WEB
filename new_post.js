

var button = document.getElementById("profile-button");
button.addEventListener('click', showSubmitPost)

function showSubmitPost() {
    if (document.getElementById("submit-post") == null) {

        var submit_post = document.createElement("div");
        submit_post.setAttribute("id", "submit-post");
        submit_post.setAttribute("class", "login-box");

        var input_box1 = document.createElement("div");
        input_box1.setAttribute("class", "input-box");
        input_box1.innerHTML = "Title: ";

        var post_title = document.createElement("input");
        post_title.setAttribute("id", "post-title");
        post_title.setAttribute("class", "input");
        post_title.setAttribute("type", "text");

        var input_box2 = document.createElement("div");
        input_box2.setAttribute("class", "input-box");
        input_box2.innerHTML = "Picture: ";

        var post_image = document.createElement("input");
        post_image.setAttribute("id", "post-image");
        post_image.setAttribute("type", "file");
        post_image.setAttribute("accept", "image/*");

        var submit_button = document.createElement("div");
        submit_button.setAttribute("id", "submit-button");
        submit_button.setAttribute("class", "confirm-button");
        submit_button.innerHTML = "Submit Post";

        input_box1.appendChild(post_title);
        input_box2.appendChild(post_image);
        submit_post.appendChild(input_box1);
        submit_post.appendChild(input_box2);
        submit_post.appendChild(submit_button);
        document.getElementById("profile-button").parentNode.insertBefore(submit_post, document.getElementById("profile-button").nextSibling);

        if (document.getElementById("submit-button") != null) {
            var button = document.getElementById("submit-button");
            button.addEventListener('click', submitPost);
            //console.log(button);
            function submitPost() {
                //console.log('aaaaaa');
                var path = 'http://localhost:3000/users/';
                var title_val = document.getElementById('post-title').value;
                var pic_val = document.getElementById('post-image').files[0].name;;
                fetch('http://localhost:3000/user')
                    .then(response => response.json())
                    .then(data => {
                        user = data;
                        path += user.val_id;
                        //console.log(path);
                        fetch(path)
                            .then(response => response.json())
                            .then(data => {
                                //console.log(data) // Prints result from `response.json()` in getRequest
                                var users = data;
                                var nr_posts = users.posts.length;
                                var post = {
                                    id: nr_posts,
                                    title: title_val,
                                    img: pic_val,
                                    likes: 0
                                }
                                users.posts.push(post);
                                //console.log(users);

                                postRequest(path, users)
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
                                location.replace("profile.html");
                            })
                            .catch(error => console.error(error))

                    })
                    .catch(error => console.error(error))
                    
                }
        }
    }

}

