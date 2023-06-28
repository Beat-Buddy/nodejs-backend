function otherPageClicked(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onload = function (res) {
      if (xhr.status >= 200 && xhr.status < 400) {
        window.location =res.target.responseURL;
      } else {
        console.error("Error while forwarding. Status: " + xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error("Error while forwarding.");
    };
    xhr.send();
  }
  
  function logoutClicked() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/logout", true);
    xhr.onload = function (res) {
      if (xhr.status >= 200 && xhr.status < 400) {
        window.location =res.target.responseURL;
      } else {
        console.error("Error while forwarding. Status: " + xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error("Error while forwarding.");
    };
    xhr.send();
  }