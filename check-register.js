var button = document.getElementById('confirm-button');
button.addEventListener('click', checkRegister);

var username = document.getElementById('username');
username.addEventListener('keyup', checkRegister2);

var password = document.getElementById('password');
password.addEventListener('keyup', checkRegister2);

var nickname = document.getElementById('nickname');
nickname.addEventListener('keyup', checkRegister2);

var conf_password = document.getElementById('conf-password');
conf_password.addEventListener('keyup', checkRegister2);
function checkRegister(){
 var user_val = document.getElementById('username').value;
 var password_val = document.getElementById('password').value;
 var nickname_val = document.getElementById('nickname').value;
 var conf_password_val = document.getElementById('conf-password').value;
 fetch('http://localhost:3000/users')
 .then(response => response.json())
 .then(data => {
     var users = data;
     var user = { val_id:0, loged:0 };
     var ok = 0;
     if(password_val != conf_password_val)
           ok=1;
     if(ok==0)
     for (var i = 0; i < users.length; i++) {
         if (user_val == users[i].username) {
             ok = 1;
         }
     }
     //console.log(ok);
     if (ok == 0) {
         user.val_id=users.length+1;
         user.loged=1;
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

         var new_user={
            id: 0,
            username: "",
            password: "",
            nickname: "",
            photo: "user-profile.png",
            "fallowers": {
              "nr": 0,
              "id": []
            },
            fallowing: {
              "nr": 0,
              "id": []
            },
            posts: []
          }
          new_user.id=users.length+1;
          new_user.username=user_val;
          new_user.nickname=nickname_val;
          new_user.password=password_val;
          console.log(new_user) 
          postRequest('http://localhost:3000/users', new_user)
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
          // Prints result from `response.json()` in getRequest
         //location.replace("profile.html");
     }
 })
 .catch(error => console.error(error))
}
function checkRegister2(){

}