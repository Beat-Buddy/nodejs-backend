let timeoutId = null;
let spotifyAccessToken = null;
let tokenType = null;
let seedSearchInProgress = false;

const typesOfSliders = [
  "target_popularity",
  "target_danceability",
  "target_energy",
  "target_valence",
  "target_instrumentalness",
  "target_tempo",
];

let availableGenreSeeds = [];

let nOfSelectedSeeds = 0;
let selectedTrackSeeds = [];
let selectedArtistSeeds = [];
let selectedGenreSeeds = [];

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function search() {
  if (nOfSelectedSeeds === 0) {
    window.alert("Choose at least one artist, track or genre!");
  } else {
    const searchParameters = new Object();
    console.log(selectedTrackSeeds);
    if (selectedTrackSeeds.length !== 0)
      searchParameters.seed_tracks = selectedTrackSeeds.join(",");
    if (selectedArtistSeeds.length !== 0)
      searchParameters.seed_artists = selectedArtistSeeds.join(",");
    if (selectedGenreSeeds.length !== 0)
      searchParameters.seed_genres = selectedGenreSeeds.join(",");

    typesOfSliders.forEach((slidername) => {
      let valueOfSlider = getValueOfSlider(slidername);
      if (valueOfSlider !== null) searchParameters[slidername] = valueOfSlider;
    });

    //console.log("search-Function still needs to be implemented.");

    console.log("Objekt, das ans BE geschickt wird : ");
    console.log(searchParameters);

    window.location.href = "/output?data="+ JSON.stringify(searchParameters);

    // Ich gebe die Daten schon so ins Backend zurück, dass sie dort nicht mehr umformattiert
    // werden müssen, sondern gleich weitergeschickt werden können.
  }
}

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function seedSearch() {
  timeoutId = null;
  if (seedSearchInProgress) return;
  if (document.getElementById("seedSearchInput").value === "") {
    removeSearchBarResults();
    return;
  }
  seedSearchInProgress = true;

  //console.log("seedSearch-Function still needs to be implemented.");

  // Übereinstimmungen mit Genres Prüfen.

  // Da Spotify Get-SearchForItem Endpoint nur erlaubt, dass man nach Tracks, oder Artists sucht,
  // müssen die am Anfang geladenen Genre-Seeds selbst bei übereinstimmung in der Liste angezeigt werden.
  // ich zeige 8 Element an, die letzten 2 sind Genres, bei Übereinstimmung, sonst werden nur 6 Elemente angezeigt.

  let url = "https://api.spotify.com/v1/search?q=";
  let seedSearchbarText = document.getElementById("seedSearchInput").value;
  let searchparamsURIEncoded = "&type=artist%2Ctrack&market=AT&limit=3";

  let finalURL =
    url + encodeURIComponent(seedSearchbarText) + searchparamsURIEncoded;
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let response = JSON.parse(xhr.responseText);
    //console.log(response);

    // Die Ergebnisse werden angezeigt
    // Bild und Text daneben.
    // Bei Artists hat das Bild eine Abrundung
    // Bei Songs wird das Cover quadratisch angezeigt.
    removeSearchBarResults();

    // Songs anzeigen
    let seedTracks = response.tracks.items;
    if (seedTracks.length !== 0) addSeedsToSearchbar(seedTracks, "track");
    // Artists anzeigen
    let seedArtists = response.artists.items;
    if (seedArtists.length !== 0) addSeedsToSearchbar(seedArtists, "artist");

    // FindMatching Genre Seeds
    let seedGenres = findMatchingGenreSeeds(seedSearchbarText);
    if (seedGenres.length !== 0) addSeedsToSearchbar(seedGenres, "genre");

    seedSearchInProgress = false;
  };
  //console.log(finalURL);
  xhr.open("GET", finalURL);
  xhr.setRequestHeader("Authorization", tokenType + " " + spotifyAccessToken);
  xhr.send();
}

// TODO : Funktion um Genres erweitern
function addSeedsToSearchbar(data, seedType) {
  if (seedType !== "track" && seedType !== "artist" && seedType !== "genre") {
    console.log("SeedType : '" + seedType + "' wird nicht unterstützt!");
    return;
  }

  let seedResultList = document.getElementById("seedSearchResults");

  if (seedType === "track") addTrackSeedsToSearchbar(data, seedResultList);
  else if (seedType === "artist")
    addArtistSeedsToSearchbar(data, seedResultList);
  else if (seedType === "genre") addGenreSeedsToSearchbar(data, seedResultList);
}

function addTrackSeedsToSearchbar(data, seedResultList) {
  let seedType = "track";
  data.forEach((seed) => {
    let seedListElement = document.createElement("li");
    seedResultList.append(seedListElement);
    let seedContainer = document.createElement("div");

    // Brauche ich glaub ich garnicht - weil ich sowieso alle davon entferne.
    //seedContainer.setAttribute("id","seedSearchbar_" + seed.id);

    seedContainer.setAttribute("class", "searchBarResultContainer");

    seedContainer.addEventListener("click", function () {
      addToSelectedSeed(seed.id, seed.name, seedType);
    });

    seedListElement.append(seedContainer);

    // Bild setzten
    let seedPicture = document.createElement("img");
    seedPicture.setAttribute("class", "searchBarResultItemPictureTrack");
    seedPicture.src = getPictureURLForSeedInSearchbar(
      seed.album.images,
      seedType
    );
    seedContainer.append(seedPicture);

    // Title setzten
    let seedTitel = document.createElement("p");
    seedTitel.setAttribute("class", "searchBarResultItemTitle");

    seedTitel.innerText = seed.name;
    seedContainer.append(seedTitel);
  });
}
function addArtistSeedsToSearchbar(data, seedResultList) {
  let seedType = "artist";
  data.forEach((seed) => {
    let seedListElement = document.createElement("li");
    seedResultList.append(seedListElement);
    let seedContainer = document.createElement("div");

    // Brauche ich glaub ich garnicht - weil ich sowieso alle davon entferne.
    //seedContainer.setAttribute("id","seedSearchbar_" + seed.id);

    seedContainer.setAttribute("class", "searchBarResultContainer");

    seedContainer.addEventListener("click", function () {
      addToSelectedSeed(seed.id, seed.name, seedType);
    });

    seedListElement.append(seedContainer);

    // Bild setzten
    let seedPicture = document.createElement("img");

    seedPicture.setAttribute("class", "searchBarResultItemPictureArtist");
    seedPicture.src = getPictureURLForSeedInSearchbar(seed.images, seedType);

    /*if(seed.images !== null){
                let picturesOfTrack = seed.images;
                if(picturesOfTrack.length > 0){
                    //seedPicture.alt = ""
                    // TODO : Width an Height mit CSS setzten
                    // TODO : CSS Classe hier setzten
                    let smallestPictureOfTrack = picturesOfTrack[picturesOfTrack.length - 2].url;
                    console.log("URL für Foto : " + smallestPictureOfTrack);
                    seedPicture.src = smallestPictureOfTrack;
                } else {
                    seedPicture.src = "./Resources/artist_icon.png";
                }
            } 
             else {
                seedPicture.src = "./Resources/artist_icon.png";
            }*/
    seedContainer.append(seedPicture);

    // Title setzten
    let seedTitel = document.createElement("p");
    seedTitel.setAttribute("class", "searchBarResultItemTitle");

    seedTitel.innerText = seed.name;
    seedContainer.append(seedTitel);
  });
}
function addGenreSeedsToSearchbar(data, seedResultList) {
  let seedType = "genre";
  data.forEach((genreName) => {
    let seedListElement = document.createElement("li");
    seedResultList.append(seedListElement);
    let seedContainer = document.createElement("div");

    // Brauche ich glaub ich garnicht - weil ich sowieso alle davon entferne.
    //seedContainer.setAttribute("id","seedSearchbar_" + seed.id);

    seedContainer.setAttribute("class", "searchBarResultContainer");

    seedContainer.addEventListener("click", function () {
      addToSelectedSeed(genreName, genreName, seedType);
    });

    seedListElement.append(seedContainer);

    // Bild setzten
    let seedPicture = document.createElement("img");

    seedPicture.setAttribute("class", "searchBarResultItemPictureGenre");
    seedPicture.src = getPictureURLForSeedInSearchbar(null, seedType);
    seedContainer.append(seedPicture);

    // Title setzten
    let seedTitel = document.createElement("p");
    seedTitel.setAttribute("class", "searchBarResultItemTitle");

    seedTitel.innerText = genreName;
    seedContainer.append(seedTitel);
  });
}

function getPictureURLForSeedInSearchbar(seedImages, seedType) {
  if (seedImages !== null && seedImages.length > 1) {
    let smallestPictureOfTrack = seedImages[seedImages.length - 2].url;
    //console.log("URL für Foto : " + smallestPictureOfTrack);
    return smallestPictureOfTrack;
  } else {
    if (seedType === "genre") return "./icons/genre_icon.png";
    if (seedType === "track") return "./icons/track_icon.png";
    if (seedType === "artist") return "./icons/artist_icon.png";
  }
}

// TODO : Um Genres erweitern
function addToSelectedSeed(seedId, seedName, seedType) {
  //let selectedSearchbarContainer = document.getElementById(seedId);
  //console.log(selectedSearchbarContainer.querySelectorAll("p"));
  if (nOfSelectedSeeds >= 5) {
    console.log("Es wurde schon die maximale Anzahl an Seeds hinzugefügt!");
    return;
    // TODO : PopUp für den User implementieren.
  }

  if (seedType !== "track" && seedType !== "artist" && seedType !== "genre") {
    console.log("Ungültiger Seedtype übergeben.");
    return;
  }

  if (seedType === "track" && selectedTrackSeeds.includes(seedId)) {
    console.log("Track wurde schon ausgewählt.");
    return;
  }
  if (seedType === "artist" && selectedArtistSeeds.includes(seedId)) {
    console.log("Artist wurde schon ausgewählt.");
    return;
  }
  if (seedType === "genre" && selectedGenreSeeds.includes(seedId)) {
    console.log("Genre wurde schon ausgewählt.");
    return;
  }

  // Das Element wird hinzugefügt.
  nOfSelectedSeeds++;

  // Ich brauche die Liste, der das Element hinzugefügt werden soll
  let selectedItemContainer = document.createElement("div");
  selectedItemContainer.setAttribute("class", "selectedItemContainer");

  let selectedItemTitle = document.createElement("p");
  selectedItemTitle.innerText = seedName.substring(0, 17);
  if (selectedItemTitle.innerText.length == 17)
    selectedItemTitle.innerText = selectedItemTitle.innerText + "...";
  selectedItemContainer.append(selectedItemTitle);

  // Id setzen :
  //selectedItemContainer.setAttribute("id","seedChosen_" + seedId);

  /*
        let selectedItemIdHidden = document.createElement("p");
        selectedItemIdHidden.innerText = seedId;
        selectedItemIdHidden.style.display = "none";
        selectedItemContainer.append(selectedItemIdHidden);
    */

  // Unterscheidung zwischen Track und Artist machen.
  if (seedType === "track") {
    console.log(
      "Es wurde ein Song " +
        seedName +
        " mit der ID : + " +
        seedId +
        "hinzugefügt."
    );

    console.log(seedId);
    selectedTrackSeeds.push(seedId);

    selectedItemContainer.addEventListener("click", function () {
      selectedItemContainer.remove();

      const index = selectedTrackSeeds.indexOf(seedId);
      if (index > -1) {
        // only splice array when item is found
        selectedTrackSeeds.splice(index, 1); // 2nd parameter means remove one item only
      }

      nOfSelectedSeeds--;
      // TODO : Item aus der zugehörigen Liste entfernen.
    });

    let listOfSelectedTracks = document.getElementById("selectedTrackList");
    listOfSelectedTracks.append(selectedItemContainer);
  } else if (seedType === "artist") {
    console.log(
      "Es wurde ein Artist " +
        seedName +
        " mit der ID : + " +
        seedId +
        "hinzugefügt."
    );
    selectedArtistSeeds.push(seedId);

    selectedItemContainer.addEventListener("click", function () {
      selectedItemContainer.remove();

      const index = selectedArtistSeeds.indexOf(seedId);
      if (index > -1) {
        // only splice array when item is found
        selectedArtistSeeds.splice(index, 1); // 2nd parameter means remove one item only
      }

      nOfSelectedSeeds--;
      // TODO : Item aus der zugehörigen Liste entfernen.
    });

    let listOfSelectedArtists = document.getElementById("selectedArtistList");
    listOfSelectedArtists.append(selectedItemContainer);
  } else {
    selectedGenreSeeds.push(seedId);
    selectedItemContainer.addEventListener("click", function () {
      selectedItemContainer.remove();

      const index = selectedGenreSeeds.indexOf(seedId);
      if (index > -1) {
        // only splice array when item is found
        selectedGenreSeeds.splice(index, 1); // 2nd parameter means remove one item only
      }

      nOfSelectedSeeds--;
      // TODO : Item aus der zugehörigen Liste entfernen.
    });

    let listOfSelectedGenres = document.getElementById("selectedGenreList");
    listOfSelectedGenres.append(selectedItemContainer);
  }

  // EVALUATE -
  // Sollen die aktuellen Suchergebnisse verschwinden, wenn eines ausgewählt wurde - NEIN
  // Aktuelle Suchergebnisse sollen verschwinden, sobald der Text in der Suchleiste geändert wird.
  //removeSearchBarResults();
}

function removeSearchBarResults() {
  let seedResultList = document.getElementById("seedSearchResults");
  while (seedResultList.childElementCount > 0) {
    seedResultList.firstChild.remove();
  }
}

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function clearAll() {
  //console.log("clearAll-Function still needs to be implemented.");

  // reset searchbar
  let seedSearchbar = document.getElementById("seedSearchInput");
  seedSearchbar.value = "";

  let seedResultList = document.getElementById("seedSearchResults");
  while (seedResultList.childElementCount > 0) {
    seedResultList.firstChild.remove();
  }

  // reset selected Items
  clearListsOfSelections();
  nOfSelectedSeeds = 0;

  // reset Sliders
  const rangeInputs = document.querySelectorAll('input[type="range"]');
  rangeInputs.forEach((rangeInput) => {
    const elementLabel = document.querySelector(
      'label[for="' + rangeInput.id + '"]'
    );
    if (rangeInput.classList.contains("sliderActive"))
      resetSlider(rangeInput, elementLabel);
  });
}

function clearListsOfSelections() {
  // Arrays zurücksetzten
  selectedTrackSeeds = [];
  selectedArtistSeeds = [];
  selectedGenreSeeds = [];

  const listsToClear = [];
  listsToClear.push(document.getElementById("selectedTrackList"));
  listsToClear.push(document.getElementById("selectedArtistList"));
  listsToClear.push(document.getElementById("selectedGenreList"));
  listsToClear.forEach((listToClear) => {
    while (listToClear.childElementCount > 0) {
      listToClear.firstChild.remove();
    }
  });
}

function getAvailableGenres() {
  let url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";

  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let response = JSON.parse(xhr.responseText);
    availableGenreSeeds = response.genres;
    //console.log(availableGenreSeeds);
  };
  //console.log(url);
  xhr.open("GET", url);
  xhr.setRequestHeader("Authorization", tokenType + " " + spotifyAccessToken);
  xhr.send();
}

function findMatchingGenreSeeds(searchbarText) {
  // Ich will zuerst jene Genres anzeigen, die genauso starten wie der eingegebene Text
  const genresThatStartWithSBText = availableGenreSeeds.filter((entry) =>
    entry.toLowerCase().startsWith(searchbarText.toLowerCase())
  );

  const genresThatIncludeSBText = availableGenreSeeds.filter((entry) =>
    entry.toLowerCase().includes(searchbarText.toLowerCase())
  );

  // erst danach jene, die den Text enthalten.
  const filteredArray = genresThatStartWithSBText.concat(
    genresThatIncludeSBText
  );

  // Durch Umwandlung in ein Set, werden die Duplikate entfernt.
  // Danach erfolgt wieder eine Umwandlung in ein Array
  const uniqueArray = Array.from(new Set(filteredArray));

  console.log("Unique Spliced :");
  console.log(uniqueArray.slice(0, 2));
  return uniqueArray.slice(0, 2);
}

function activeReactiveDesignForSliders() {
  const rangeInputs = document.querySelectorAll('input[type="range"]');
  rangeInputs.forEach((rangeInput) => {
    //console.log("Rangeinput Id : ")
    //console.log(rangeInput.id);
    const elementLabel = document.querySelector(
      'label[for="' + rangeInput.id + '"]'
    );

    if (rangeInput.id === "target_tempoSlider") {
      rangeInput.addEventListener("input", function () {
        activateSlider(rangeInput, elementLabel);
        elementLabel.textContent = rangeInput.value + " BPM";

        /*if(!rangeInput.classList.contains('sliderActive'))
                    rangeInput.setAttribute('class',"sliderActive");
                if(!elementLabel.classList.contains('sliderLabelWhenSliderIsActive'))
                    elementLabel.setAttribute('class',"sliderLabelWhenSliderIsActive");*/
      });
      elementLabel.onclick = function () {
        resetSlider(rangeInput, elementLabel);
        elementLabel.textContent = "Tempo";
      };
    } else {
      rangeInput.addEventListener("input", function () {
        activateSlider(rangeInput, elementLabel);
      });
      elementLabel.onclick = function () {
        resetSlider(rangeInput, elementLabel);
      };
    }
  });
}

function activateSlider(rangeInput, elementLabel) {
  if (!rangeInput.classList.contains("sliderActive"))
    rangeInput.setAttribute("class", "sliderActive");
  if (!elementLabel.classList.contains("sliderLabelWhenSliderIsActive"))
    elementLabel.setAttribute("class", "sliderLabelWhenSliderIsActive");
}

function resetSlider(rangeInput, elementLabel) {
  elementLabel.removeAttribute("class");
  rangeInput.removeAttribute("class");
  rangeInput.setAttribute("class", "sliderNotActive");

  //console.log("Min Wert : " + rangeInput.getAttribute('min'));
  //console.log("Max Wert : " + rangeInput.getAttribute('max'));
  let mittelwert =
    (parseFloat(rangeInput.getAttribute("min")) +
      parseFloat(rangeInput.getAttribute("max"))) /
    2;
  //console.log("Mittelwert : " + mittelwert);
  rangeInput.value = mittelwert;

  // Falls gerade der TempoSlider zurückgesetzt wird
  // und der Text vom Label nicht "Tempo" ist,
  // wird der Text wieder auf Tempo gesetzt.
  if (
    rangeInput.id === "target_tempoSlider" &&
    elementLabel.textContent !== "Tempo"
  )
    elementLabel.textContent = "Tempo";
}

function getValueOfSlider(sliderName) {
  const rangeInput = document.getElementById(sliderName + "Slider");
  if (rangeInput.classList.contains("sliderActive")) {
    return parseFloat(rangeInput.value);
  } else return null;
}

window.onload = function () {
  // Input Listener auf SearchInput hängen.
  const seedSearchbar = document.getElementById("seedSearchInput");
  seedSearchbar.addEventListener("input", function () {
    // Überlegen, ob wir das Timeout drinnen lassen
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(seedSearch, 10);
  });

  // Token Holen - gehört dann zwar ins Backend, und wird dem Client nach der Anmeldung mitgeschickt, aber vorerst
  // kann ich es so machen.
  // Daten vom Backend.
  const client_id = "a77c30d64c6e4f448693b864b9fa0ce8";
  const client_secret = "7fe3fb3fb288461e8dd8949659f42971";

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let response = JSON.parse(xhr.responseText);
    tokenType = response.token_type;
    spotifyAccessToken = response.access_token;
    //console.log(response);

    getAvailableGenres();
    activeReactiveDesignForSliders();
  };

  const url = "https://accounts.spotify.com/api/token";
  xhr.open("POST", authOptions.url);
  xhr.setRequestHeader("Authorization", authOptions.headers.Authorization);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var formData = [];
  for (var key in authOptions.form) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(authOptions.form[key]);
    formData.push(encodedKey + "=" + encodedValue);
  }
  var requestBody = formData.join("&");

  xhr.send(requestBody);

  // API Call - Get Genre Seeds beim Laden des Fensters ausführen.
  // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
};
