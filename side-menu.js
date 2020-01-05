/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var button = document.getElementById('profile-btn');
button.addEventListener('click', chose);

function chose() {
  fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
     // console.log(data) // Prints result from `response.json()` in getRequest
     var user=data;
     if(user.loged==0)location.replace("login.html");
     if(user.loged==1)location.replace("profile.html");
    })
    .catch(error => console.error(error))

}