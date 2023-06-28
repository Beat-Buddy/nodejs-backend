document.addEventListener("DOMContentLoaded", function () {
  let queryParams = new URLSearchParams(window.location.search);
  let searchParameters = queryParams.get("data");

  let compactSongs = [];

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/recommendations", true);
  xhr.onload = function (res) {
    if (xhr.status >= 200 && xhr.status < 400) {
      let spotifySongs = JSON.parse(res.target.response).tracks;
      for (let i = 0; i < spotifySongs.length; i++) {
        const song = spotifySongs[i];
        compactSongs.push({
          id: song.id,
          title: song.name,
          album: song.album.name,
          length: convertMsToMinutesAndSeconds(song.duration_ms),
          artist: song.artists[0].name,
          spotifyLink: song.external_urls.spotify,
          bildLink: song.album.images[0].url,
        });
      }

      const songList = document.getElementById("songList");
      // displaying the first ten recommended songs
      for (let i = 0; i < 10 && i < compactSongs.length; i++) {
        const song = compactSongs[i];
        const songElement = createSongElement(song);
        songList.appendChild(songElement);
      }
    } else {
      console.error(
        "Error while getting recommendations. Status: " + xhr.status
      );
    }
  };
  xhr.onerror = function () {
    console.error("Error while getting recommendations.");
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(searchParameters);
});

function createSongElement(song) {
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

  const buttonsContainer = document.createElement("div");

  const spotifyButton = document.createElement("button");
  spotifyButton.classList.add("spotify-button");
  spotifyButton.innerHTML =
    '<img src="./icons/spotify-icon.svg" alt="Spotify">';
  spotifyButton.setAttribute("data-tooltip", "Open in Spotify");

  spotifyButton.addEventListener("click", function () {
    window.open(song.spotifyLink, "_blank");
  });

  const shareButton = document.createElement("button");
  shareButton.classList.add("share-button");
  shareButton.innerHTML = '<img src="./icons/share-icon.svg" alt="Share">';
  shareButton.setAttribute("data-tooltip", "Add to clipboard");

  shareButton.addEventListener("click", function () {
    navigator.clipboard.writeText(song.spotifyLink);
    window.alert("Copied to clipboard!");
  });

  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite-button");
  favoriteButton.innerHTML = '<img src="./icons/heart-icon.svg" alt="Like">';
  favoriteButton.setAttribute("data-tooltip", "Favorite Song");

  const isActive = favoriteButton.classList.contains("active");

  if (isActive) {
    favoriteButton.innerHTML =
      '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
    favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
    favoriteButton.classList.add("active");
  }

  favoriteButton.addEventListener("click", function () {
    if (favoriteButton.classList.contains("active")) {
      removeSongFromFavourites(song, favoriteButton);
    } else {
      addSongToFavourites(song, favoriteButton);
    }
  });

  // icons used: https://www.svgrepo.com/collection/zest-interface-icons/

  songInfoDiv.appendChild(titleElement);
  songInfoDiv.appendChild(detailsElement);

  buttonsContainer.appendChild(spotifyButton);
  buttonsContainer.appendChild(shareButton);
  buttonsContainer.appendChild(favoriteButton);

  songDiv.appendChild(songInfoDiv);
  songDiv.appendChild(buttonsContainer);

  return songDiv;
}

function addSongToFavourites(song, favoriteButton) {
  console.log("Folgender Song zu den Favoriten hinzugefügt.");
  console.log(song);

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log("xhr status : " + xhr.status);
    if (xhr.status === 200) {
      favoriteButton.innerHTML =
        '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
      favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
      favoriteButton.classList.add("active");
    }
  };

  let songToAddJSON = JSON.stringify(song);

  xhr.open("POST", "http://localhost:3000/userfavorites");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(songToAddJSON);
}

function removeSongFromFavourites(song, favoriteButton) {
  console.log("Folgender Song wird von den Favoriten entfernt.");
  console.log(song);

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log("xhr status : " + xhr.status);
    if (xhr.status === 200) {
      favoriteButton.innerHTML =
        '<img src="./icons/heart-icon.svg" alt="Like">';
      favoriteButton.setAttribute("data-tooltip", "Favorite Song");
      favoriteButton.classList.remove("active");
    }
  };

  // TODO : Eventuell noch ändern.
  xhr.open("DELETE", "http://localhost:3000/userfavorites/" + song.id);
  xhr.send();
}

function convertMsToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000); // Berechne die Minuten
  var seconds = Math.floor((ms % 60000) / 1000); // Berechne die Sekunden

  // Füge eine führende Null hinzu, wenn die Sekunden einstellig sind
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}
