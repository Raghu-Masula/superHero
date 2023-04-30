window.onload = function () {
    let wrapper = document.getElementById("characterWrapper");
    // console.log(wrapper);
  
    let windowurl = window.location.href;
    let id = windowurl.substring(windowurl.lastIndexOf("#") + 1) || 1017100;
  
    // chracter details
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=4a57c28c7eb6fb4946d966c4e4f39f7f&hash=9da307e0a7cb71bc39558f90db2f919a`;
    fetch(url)
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((data) => {
        console.log(data.data.results);
        let character = data.data.results[0];
        const {name, description, thumbnail} = character;
        let div = document.createElement("div");
        div.classList.add("character-info-container");
  
        div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${name}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
        wrapper.innerHTML = "";
        wrapper.appendChild(div);
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.log(error);
      });
  
    // character related comics
    let comicsWrapper = document.getElementById("comics");
    comicsWrapper.innerHTML = "";
    url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=4a57c28c7eb6fb4946d966c4e4f39f7f&hash=9da307e0a7cb71bc39558f90db2f919a`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let comics = res.data.results;
        // iterate over all the comics and render it on browser
        for (let comic of comics) {
          const { title, thumbnail, description } = comic;
          let div = document.createElement("div");
          div.classList.add("character-info-container");
  
          div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${title}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
          comicsWrapper.appendChild(div);
        }
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.error(error);
      })
  };
  