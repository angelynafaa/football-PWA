var base_url = "https://api.football-data.org/v2/";
var id_liga = "2021";
var headers = {
  "X-Auth-Token": "a91ef88a9f764bc2a4285057d81a5b9b"
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    } 
}
  
  // Blok kode untuk memparsing json menjadi array JavaScript
  function json(response) {
    return response.json();
  }
  
  // Blok kode untuk meng-handle kesalahan di blok catch
  function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
  }

  // Blok kode untuk melakukan request data json
  function getTim(){
      if ("caches" in window){
          caches
          .match(`${base_url}competitions/${id_liga}/teams`)
          .then(function(response){
              if (response){
                  response.json().then(function(data){
                      var timHTML="";
                      data.teams.forEach(function(team){
                          timHTML +=`
                            <div class="col s12 m4 l3">
                               <div class="card">
                                    <div class="card-image waves-effect waves-block waves-light card-image-h">
                                        <a href="./detail.html?id=${team.id}">
                                        <img src="${team.crestUrl}" class="responsive-img" onerror="this.onerror=null; this.src='img/na.png'">
                                        </a>
                                        </div>
                                        <div class="card-content center">
                                        <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                                        <p>${team.area.name}</p>
                                     </div>
                                        <div class="card-action center">
                                        <a href="./detail.html?id=${team.id}">Detail Tim</a>
                                    </div>
                                </div>
                            </div>
                          `;
                      });
                      // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("teams").innerHTML = timHTML;
                  });
              }
          });
      }
      fetch(`${base_url}competitions/${id_liga}/teams`,{
          headers
      })
      .then(status)
      .then (json)
      .then (function(data){
          // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var timHTML="";
      data.teams.forEach(function(team){
          if(team !== null){
              timHTML +=`
              <div class="col s12 m4 l3">
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light card-image-h">
                  <a href="./detail.html?id=${team.id}">
                    <img src="${
                      team.crestUrl !== null
                        ? team.crestUrl.replace(/^http:\/\//i, "https://")
                        : "img/na.png"
                    }" class="responsive-img" onerror="this.onerror=null; this.src='img/na.png'">
                  </a>
                  </div>
                  <div class="card-content center">
                  <span class="card-title grey-text text-darken-4 truncate">${
                    team.name
                  }</span>
                  <p>${team.area.name}</p>
                </div>
                <div class="card-action center">
                  <a href="./detail.html?id=${team.id}">Detail Tim</a>
                </div>
              </div>
            </div>             
              `;
          }
      });
       // Sisipkan komponen card ke dalam elemen dengan id #content
       document.getElementById("teams").innerHTML = timHTML;
      })
      .catch(error);
  }


  function getTimById(){
      //ambil nilai query parameter (?id=)
      var urlParams = new URLSearchParams(window.location.search);
      var idPraram = urlParams.get("id");

      if ("caches" in window){
          caches.match(`${base_url}teams/${idPraram}`).then(function(response){
              if (response){
                  response.json().then(function(data){
                      if (data != null){
                          var timHTML =`
                          <input type="hidden" id="id-team" value="${data.id}">
                          <div class="card mt-2 p2">
                            <div class="row">
                              <div class="col s12 m4 center">
                                <img src="${data.crestUrl.replace(
                                  /^http:\/\//i,
                                  "https://"
                                )}" class="responsive-img"/>
                                <button onclick="insertFav(${data.id}, '${data.name}', '${
                              data.crestUrl
                            }')" class="waves-effect waves-light btn mt-1 mb-2" id="favButton"><i class="material-icons left">favorite_border</i>Favorit</button>
                              </div>
                              <div class="col s12 m8">
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>Nama Tim</th>
                                      <td>${data.name}</td>
                                    </tr>
                                    <tr>
                                      <th>Nama Singkat</th>
                                      <td>${data.shortName ? data.shortName : "-"}</td>
                                    </tr>
                                    <tr>
                                      <th>Stadion</th>
                                      <td>${data.venue ? data.venue : "-"}</td>
                                    </tr>
                                    <tr>
                                      <th>Website</th>
                                      <td>${data.website ? data.website : "-"}</td>
                                    </tr>
                                    <tr>
                                      <th>Email</th>
                                      <td>${data.email ? data.email : "-"}</td>
                                    </tr>
                                    <tr>
                                      <th>Negara</th>
                                      <td>${data.area.name ? data.area.name : "-"}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div class="card-content">
                              <span class="card-title">Daftar Squad</span>
                              <table class="responsive-table striped">
                                <thead>
                                  <tr>
                                      <th>Nama</th>
                                      <th>Posisi</th>
                                      <th>Nomor</th>
                                      <th>Negara</th>
                                  </tr>
                                </thead>
                
                                <tbody>
                                ${data.squad
                                  .map((squad, i) => {
                                    return `
                                  <tr>
                                    <td>${squad.name ? squad.name : "-"}</td>
                                    <td>${squad.position ? squad.position : "-"}</td>
                                    <td>${squad.shirtNumber ? squad.shirtNumber : "-"}</td>
                                    <td>${squad.nationality ? squad.nationality : "-"}</td>
                                  </tr>
                                  `;
                                  })
                                  .join("")}
                                </tbody>
                              </table>
                            </div>
                          </div>                         
                          `;
                      }
                      //sisipkan kompoenne card ke dalam elemen dengan ud #content
                      document.getElementById("body-content").innerHTML =innerHTML;
                      dbGetFavourite(data.id)
                      .then(fav=>{
                          console.log(fav);
                          if(fav.favId === data.id){
                              let favo =document.getElementById("FavButton");
                              favo.innerHTML.padEnd("red");
                          }
                      })
                      .catch(()=> console.log("bukan favorit"));
                  });
              }
          });
      }

      fetch(`${base_url}teams/${idPraram}`,{
          headers
      })
      .then(status)
      .then(json)
      .then(function(data){
          //objek JS dari respon.json() masuk lewat variabel data
          console.log(data);
          //menyusun komponen card artikle secara dinamis
          var timHTML=`
          <div class="card mt-2 p2">
          <div class="row">
            <div class="col s12 m4 center">
              <img src="${data.crestUrl.replace(
                /^http:\/\//i,
                "https://"
              )}" class="responsive-img"/>
              <button onclick="insertFav(${data.id}, '${data.name}', '${
          data.crestUrl
        }')" class="waves-effect waves-light btn mt-1 mb-2" id="favButton"><i class="material-icons left">favorite_border</i>Favorit</button>
            </div>
            <div class="col s12 m8">
              <table>
                <tbody>
                  <tr>
                    <th>Nama Tim</th>
                    <td>${data.name}</td>
                  </tr>
                  <tr>
                    <th>Nama Singkat</th>
                    <td>${data.shortName ? data.shortName : "-"}</td>
                  </tr>
                  <tr>
                    <th>Stadion</th>
                    <td>${data.venue ? data.venue : "-"}</td>
                  </tr>
                  <tr>
                    <th>Website</th>
                    <td>${data.website ? data.website : "-"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>${data.email ? data.email : "-"}</td>
                  </tr>
                  <tr>
                    <th>Negara</th>
                    <td>${data.area.name ? data.area.name : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-content">
            <span class="card-title">Daftar Squad</span>
            <table class="responsive-table striped">
              <thead>
                <tr>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th>Nomor</th>
                    <th>Negara</th>
                </tr>
              </thead>
  
              <tbody>
              ${data.squad
                .map((squad, i) => {
                  return `
                <tr>
                  <td>${squad.name ? squad.name : "-"}</td>
                  <td>${squad.position ? squad.position : "-"}</td>
                  <td>${squad.shirtNumber ? squad.shirtNumber : "-"}</td>
                  <td>${squad.nationality ? squad.nationality : "-"}</td>
                </tr>
                `;
                })
                .join("")}
              </tbody>
            </table>
          </div>
        </div>         
          `;
         // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = timHTML;
      dbGetFavourite(data.id)
        .then(fav => {
          console.log(fav);
          if (fav.favId === data.id) {
            let favo = document.getElementById("favButton");
            favo.innerHTML =
              '<i class="material-icons left">favorite</i> Added';
            favo.classList.add("red");
          }
        })
        .catch(() => console.log("Belum Favorit"));
    });
}

function insertFav(id,name,image){
    const team={
        favId : id,
        teamId : id,
        teamName : name,
        TeamPic: image
    };

    dbInsertFav(team). then(()=> {
        console.log ("Data Dimasukan");
        let favo =document.getElementById("favButton");
        favo.innerHTML= <i class="material-icons left">favorite</i> Added';
        favB.classList.add("red");
    });

}