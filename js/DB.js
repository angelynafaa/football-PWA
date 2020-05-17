const idbPromised = idb.open("fav", 1 , upgradeDb =>{
    if(!upgradeDb.objectStoreNames.contains("favor")){
        upgradeDb.createObjectStore("favor", {keyPath: "favId"});
    }
});

const dbGetFavourite = favId => {
    return new Promise((resolve, reject) => {
      idbPromised
        .then(db => {
          const transaction = db.transaction("favor", `readonly`);
          return transaction.objectStore("favor").get(favId);
        })
        .then(data => {
          if (data !== undefined) {
              resolve(data);
            } else {
              reject(new Error("Favorite not Found"));
            }
        });
    });
  };

  const dbGetAllFavourites = () => {
    return new Promise((resolve, reject) => {
      idbPromised
        .then(db => {
          const transaction = db.transaction("favor", `readonly`);
          return transaction.objectStore("favor").getAll();
        })
        .then(data => {
          if (data !== undefined) {
            resolve(data);
          } else {
            reject(new Error("Favorite not Found"));
          }
        });
    });
  };

  const dbInsertFavourite = (fav) => {
    return new Promise((resolve, reject) => {
      idbPromised
        .then(db => {
          const transaction = db.transaction("favor", `readwrite`);
          transaction.objectStore("favor").add(fav);
          return transaction;
        })
        .then(transaction => {
          if (transaction.complete) {
            resolve(true);
          } else {
            reject(new Error(transaction.onerror));
          }
        });
    });
  }; 

  const dbDeleteFavourite = favId => {
    return new Promise((resolve, reject) => {
      idbPromised
        .then(db => {
          const transaction = db.transaction("favor", `readwrite`);
          transaction.objectStore("favor").delete( parseInt(favId) );
          return transaction;
        })
        .then(transaction => {
          console.log(transaction)
          if (transaction.complete) {
            resolve(true);
          } else {
            reject(new Error(transaction.onerror));
          }
        });
    });
  };
  