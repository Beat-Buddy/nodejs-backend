document.addEventListener("DOMContentLoaded", function () {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let favoriteSongs = JSON.parse(xhr.response).userFilteredFavorites;
    console.log(xhr.response);
    console.log(JSON.parse(xhr.response));
    console.log(JSON.parse(xhr.response).userFilteredFavorites);

    // displaying the first ten recommended songs
    const songList = document.getElementById("songList");
    for (let i = 0; i < 10 && i < favoriteSongs.length; i++) {
      const song = favoriteSongs[i];
      const songElement = createSongElement(song);
      songList.appendChild(songElement);
    }
  };
  xhr.open("GET", "/userfavorites");
  xhr.send();

  function createSongElement(song) {
    // Song Info

    const songDiv = document.createElement("div");
    songDiv.classList.add("song");

    const songInfoDiv = document.createElement("div");
    songInfoDiv.classList.add("song-info");

    const titleElement = document.createElement("p");
    titleElement.classList.add("song-title");
    titleElement.textContent = song.title;

    const detailsElement = document.createElement("p");
    detailsElement.classList.add("song-details");
    detailsElement.textContent = `${song.artist} · ${song.length} · ${song.album}`;

    // Buttons Container
    // Source of icons used: https://www.svgrepo.com/collection/zest-interface-icons/

    const buttonsContainer = document.createElement("div");

    const spotifyButton = document.createElement("button");
    spotifyButton.classList.add("spotify-button");
    spotifyButton.innerHTML =
      '<img src="./icons/spotify-icon.svg" alt="Spotify">';
    spotifyButton.setAttribute("data-tooltip", "Open in Spotify");

    const shareButton = document.createElement("button");
    shareButton.classList.add("share-button");
    shareButton.innerHTML = '<img src="./icons/share-icon.svg" alt="Share">';
    shareButton.setAttribute("data-tooltip", "Show Sharing Options");

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-button");
    favoriteButton.classList.add("active");
    favoriteButton.innerHTML =
      '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
    favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");

    const showLyricsButton = document.createElement("button");
    showLyricsButton.classList.add("lyrics-button");
    showLyricsButton.innerHTML =
      '<img src="./icons/lyrics-icon.svg" alt="Show Lyrics">';
    showLyricsButton.setAttribute("data-tooltip", "Show Lyrics");

    // Functionality of buttons

    showLyricsButton.addEventListener("click", function () {
      if (lyricsContainer.style.display === "none") {
        lyricsContainer.style.display = "block"; // shows lyrics when clicked
        showLyricsButton.setAttribute("data-tooltip", "Hide Lyrics");
      } else {
        lyricsContainer.style.display = "none"; // hides lyrics when clicked again
        showLyricsButton.setAttribute("data-tooltip", "Show Lyrics");
      }
    });

    spotifyButton.addEventListener("click", function () {
      window.open(song.spotifyLink, "_blank");
    });

    shareButton.addEventListener("click", function () {
      navigator.clipboard.writeText(song.spotifyLink);
      window.alert("Copied to clipboard!");
    });

    favoriteButton.addEventListener("click", function () {
      if (favoriteButton.classList.contains("active")) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status === 200) {
            favoriteButton.innerHTML =
              '<img src="./icons/heart-icon.svg" alt="Like">';
            favoriteButton.setAttribute("data-tooltip", "Favorite Song");
            favoriteButton.classList.remove("active");
            sendLyricsButton.disabled = true;
            sendLyricsButton.style = "background-color: #777";
          } else alert("You are not allowed to do this!");
        };
        xhr.open("DELETE", "http://localhost:3000/userfavorites/" + song.id);
        xhr.send();
      } else {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status === 200) {
            favoriteButton.innerHTML =
              '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
            favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
            favoriteButton.classList.add("active");
            sendLyricsButton.disabled = false;
            sendLyricsButton.style = "background-color: #6C9DBB";
            sendLyricsButton.addEventListener(
              "mouseover",
              () =>
                (sendLyricsButton.style.backgroundColor =
                  "var(--accentpink-color)")
            );
            sendLyricsButton.addEventListener(
              "mouseout",
              () => (sendLyricsButton.style.backgroundColor = "#6C9DBB")
            );
          } else alert("You are not allowed to do this!");
        };
        xhr.open("POST", "http://localhost:3000/userfavorites");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(song));
      }
    });

    // Lyrics container that is only shown when the lyrics button is clicked

    const lyricsContainer = document.createElement("div");
    lyricsContainer.classList.add("lyrics-container");
    lyricsContainer.style.display = "none"; // functionality so lyrics are not shown by default

    const lyricsElement = document.createElement("textarea");
    lyricsElement.classList.add("song-lyrics");
    lyricsElement.textContent = song.lyrics;
    //lyricsElement.type = "text";
    lyricsElement.value = song.lyrics; // set initial value of the input
    lyricsElement.readOnly = true; // set the input as read-only initially

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";

    let lyricsAreEditable = false;

    // default setting of a text area type is that when clicked on -> editable
    // this is added to find a way around that

    editButton.addEventListener("click", function () {
      editButton.classList.toggle("clicked");
      lyricsAreEditable = !lyricsAreEditable;

      if (lyricsAreEditable) {
        lyricsElement.removeAttribute("readonly");
        lyricsElement.classList.add("editable");
      } else {
        lyricsElement.setAttribute("readonly", "readonly");
        lyricsElement.classList.remove("editable");
      }
    });

    lyricsElement.addEventListener("click", function (event) {
      if (!lyricsAreEditable) {
        event.stopPropagation();
      }
    });

    const sendLyricsButton = document.createElement("button");
    sendLyricsButton.classList.add("send-lyrics-button");
    sendLyricsButton.textContent = "Send";

    // Put Endpoint for new, edited lyrics

    sendLyricsButton.addEventListener("click", function () {
      const lyrics = lyricsElement.value;

      const xhr = new XMLHttpRequest();

      const data = {
        id: song.id,
        lyrics: lyrics,
      };

      xhr.open("PUT", "/userfavorites", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
          console.log("Lyrics sent successfully");
          song.lyrics = lyrics;
        } else {
          alert("You are not allowed to change these lyrics!");
          console.error("Failed to send lyrics. Status: " + xhr.status);
        }
      };

      xhr.onerror = function () {
        console.error("Error sending lyrics.");
      };

      xhr.send(JSON.stringify(data));
    });

    songInfoDiv.appendChild(titleElement);
    songInfoDiv.appendChild(detailsElement);
    songInfoDiv.appendChild(lyricsElement);

    buttonsContainer.appendChild(spotifyButton);
    buttonsContainer.appendChild(shareButton);
    buttonsContainer.appendChild(favoriteButton);
    buttonsContainer.appendChild(showLyricsButton);

    lyricsContainer.appendChild(lyricsElement);
    lyricsContainer.appendChild(editButton);
    lyricsContainer.appendChild(sendLyricsButton);

    songDiv.appendChild(songInfoDiv);
    songDiv.appendChild(buttonsContainer);
    songDiv.appendChild(lyricsContainer);

    return songDiv;
  }
});
