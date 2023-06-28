function sendAuthenticationRequest() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username && password) {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      "auth/login?username=" + username + "&password=" + password,
      true
    );
    xhr.onload = function (res) {
      if (xhr.status >= 200 && xhr.status < 400) {
        url = res.target.responseURL;
        if (url == "http://localhost:3000/login")
          window.alert("Incorrect username or password.");
        else window.location = url;
      } else {
        console.error("Error while logging in. Status: " + xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error("Error logging in.");
    };
    xhr.send();
  } else {
    window.alert("Username and password invalid.");
  }
}

function logoutClicked() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/auth/logout", true);
  xhr.onload = function (res) {
    if (xhr.status >= 200 && xhr.status < 400) {
      window.location = "/logout";
    } else {
      console.error("Error while forwarding. Status: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Error while forwarding.");
  };
  xhr.send();
}

document.onkeydown = (e) => {
  if (e.key == 'Enter') document.querySelector("button").click();
};
