document.addEventListener("DOMContentLoaded", function() {
  
    // sample song data

    const songs = [
      {
        title: "my tears ricochet",
        artist: "Taylor Swift",
        length: "4:14",
        album: "folklore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "Midnight Rain",
        artist: "Taylor Swift",
        length: "2:54",
        album: "Midnights",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "The Archer",
        artist: "Taylor Swift",
        length: "3:31",
        album: "Lover",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "cowboy like me",
        artist: "Taylor Swift",
        length: "4:35",
        album: "evermore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "right where you left me - bonus track",
        artist: "Taylor Swift",
        length: "4:05",
        album: "evermore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "mirrorball",
        artist: "Taylor Swift",
        length: "3:28",
        album: "folklore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "Anti-Hero",
        artist: "Taylor Swift",
        length: "3:20",
        album: "Midnights",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "champagne problems",
        artist: "Taylor Swift",
        length: "4:04",
        album: "evermore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "Would've, Could've, Should've",
        artist: "Taylor Swift",
        length: "4:20",
        album: "Midnights",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        title: "this is me trying",
        artist: "Taylor Swift",
        length: "3:15",
        album: "folklore",
        lyrics: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
    ];
  
    const songList = document.getElementById("songList");
  
    // displaying the first ten recommended songs
    for (let i = 0; i < 10 && i < songs.length; i++) {
      const song = songs[i];
      const songElement = createSongElement(song);
      songList.appendChild(songElement);
    }
  
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
      spotifyButton.innerHTML = '<img src="./icons/spotify-icon.svg" alt="Spotify">';
      spotifyButton.setAttribute("data-tooltip", "Open in Spotify");

      const shareButton = document.createElement("button");
      shareButton.classList.add("share-button");
      shareButton.innerHTML = '<img src="./icons/share-icon.svg" alt="Share">';
      shareButton.setAttribute("data-tooltip", "Show Sharing Options");
      
      const favoriteButton = document.createElement("button");
      favoriteButton.classList.add("favorite-button");
      favoriteButton.innerHTML = '<img src="./icons/heart-icon.svg" alt="Like">';
      favoriteButton.setAttribute("data-tooltip", "Favorite Song");

      const showLyricsButton = document.createElement("button");
      showLyricsButton.classList.add("lyrics-button");
      showLyricsButton.innerHTML = '<img src="./icons/lyrics-icon.svg" alt="Show Lyrics">';
      showLyricsButton.setAttribute("data-tooltip", "Show Lyrics");

      // Functionality of buttons

      showLyricsButton.addEventListener("click", function() {
        if (lyricsContainer.style.display === "none") {
          lyricsContainer.style.display = "block"; // shows lyrics when clicked
          showLyricsButton.setAttribute("data-tooltip", "Hide Lyrics");
        } else {
          lyricsContainer.style.display = "none"; // hides lyrics when clicked again
          showLyricsButton.setAttribute("data-tooltip", "Show Lyrics");
        }
      });

      const favoriteButtonIsActive = favoriteButton.classList.contains("active");

      if (favoriteButtonIsActive) {
        favoriteButton.innerHTML = '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
        favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
        favoriteButton.classList.add("active");
      }

      favoriteButton.addEventListener("click", function() {
        if (favoriteButton.classList.contains("active")) {
          favoriteButton.innerHTML = '<img src="./icons/heart-icon.svg" alt="Like">';
          favoriteButton.setAttribute("data-tooltip", "Favorite Song");
          favoriteButton.classList.remove("active");
        } else {
          favoriteButton.innerHTML = '<img src="./icons/solid-heart-icon.svg" alt="Unlike">';
          favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
          favoriteButton.classList.add("active");
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

      editButton.addEventListener("click", function() {
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

      lyricsElement.addEventListener("click", function(event) {
        if (!lyricsAreEditable) {
          event.stopPropagation();
        }
      });
      
      const sendLyricsButton = document.createElement("button");
      sendLyricsButton.classList.add("send-lyrics-button");
      sendLyricsButton.textContent = "Send";

      // Put Endpoint for new, edited lyrics

      sendLyricsButton.addEventListener("click", function() {
        const lyrics = lyricsElement.value;
      
        const xhr = new XMLHttpRequest();
      
        const data = {
          lyrics: lyrics
        };
      
        xhr.open("PUT", "api-endpoint", true);
        xhr.setRequestHeader("Content-Type", "application/json");
      
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 400) {
            console.log("Lyrics sent successfully");
          } else {
            console.error("Failed to send lyrics. Status: " + xhr.status);
          }
        };
  
        xhr.onerror = function() {
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