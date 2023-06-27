document.addEventListener("DOMContentLoaded", function() {
    // sample song data
    const songs = [
      {
        id : "randomID1",
        title: "my tears ricochet",
        album: "folklore",
        length: "4:14",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID2",
        title: "Midnight Rain",
        album: "Midnights",
        length: "2:54",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID3",
        title: "The Archer",
        album: "Lover",
        length: "3:31",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID4",
        title: "cowboy like me",
        album: "evermore",
        length: "4:35",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID5",
        title: "right where you left me - bonus track",
        album: "evermore",
        length: "4:05",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID6",
        title: "mirrorball",
        album: "folklore",
        length: "3:28",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID7",
        title: "Anti-Hero",
        album: "Midnights",
        length: "3:20",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID8",
        title: "champagne problems",
        album: "evermore",
        length: "4:04",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID9",
        title: "Would've, Could've, Should've",
        album: "Midnights",
        length: "4:20",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
      {
        id : "randomID10",
        title: "this is me trying",
        album: "folklore",
        length: "3:15",
        artist: "Taylor Swift",
        spotifyLink : "https://open.spotify.com/intl-de",
        bildLink : "https://pbs.twimg.com/media/D8-LieAWsAAaiTS?format=jpg&name=medium"
      },
    ];
  
    const songList = document.getElementById("songList");
  
    // displaying the first ten recommended songs
    for (let i = 0; i < 10 && i < songs.length; i++) {
      const song = songs[i];
      const songElement = createSongElement(song);
      songList.appendChild(songElement);
    }
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
    spotifyButton.innerHTML = '<img src="./icons/spotify-icon.svg" alt="Spotify">';
    spotifyButton.setAttribute("data-tooltip", "Open in Spotify");

    spotifyButton.addEventListener("click",function(){
        window.open(song.spotifyLink, "_blank")
    });

    const shareButton = document.createElement("button");
    shareButton.classList.add("share-button");
    shareButton.innerHTML = '<img src="./icons/share-icon.svg" alt="Share">';
    shareButton.setAttribute("data-tooltip", "Add to clipboard");
    
    shareButton.addEventListener("click",function(){
      navigator.clipboard.writeText(song.spotifyLink);
    })

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-button");
    favoriteButton.innerHTML = '<img src="./icons/heart-icon.svg" alt="Like">';
    favoriteButton.setAttribute("data-tooltip", "Favorite Song");

    const isActive = favoriteButton.classList.contains("active");

    if (isActive) {
      favoriteButton.innerHTML = '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
      favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
      favoriteButton.classList.add("active");
    }

    favoriteButton.addEventListener("click", function() {
      if (favoriteButton.classList.contains("active")) {
        removeSongFromFavourites(song,favoriteButton);

      } else {
        addSongToFavourites(song,favoriteButton);
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
  console.log("Folgender Song zu den Recommendations hinzugefügt.")
  console.log(song);


  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log("xhr status : " + xhr.status);
    if (xhr.status === 200) {

      favoriteButton.innerHTML = '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
      favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
      favoriteButton.classList.add("active");
    }
  };
  
  let songToAddJSON = JSON.stringify(song);

  xhr.open("POST","localhost:3000/favorites")
  xhr.setRequestHeader( "Content-Type", "application/json" );
  xhr.send(songToAddJSON);

}

function removeSongFromFavourites(song, favoriteButton) {
  console.log("Folgender Song wird von den Recommendations entfernt.")
  console.log(song);

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log("xhr status : " + xhr.status);
    if (xhr.status === 200) {
      favoriteButton.innerHTML = '<img src="./icons/heart-icon.svg" alt="Like">';
      favoriteButton.setAttribute("data-tooltip", "Favorite Song");
      favoriteButton.classList.remove("active");
    }
  }

  // TODO : Eventuell noch ändern.
  xhr.open("DELETE", "localhost:3000/favorites/" + song.id);
  xhr.send()

}