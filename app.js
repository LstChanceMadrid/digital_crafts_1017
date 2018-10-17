
let groceryStoreTextBox = document.getElementById("grocery-store-text-box");
let addStoreButton = document.getElementById("add-store-button");
let storeList = document.getElementById("store-list-container");
let currentGroceryLists = document.getElementById("current-lists-container");


//creates an instance of firebase realtime database
const database = firebase.database();

//creates a node under root to call all of the stores
const storesRef = database.ref("stores");

let stores = [];




const addStore = (store) => {
    let storeRef = storesRef.push();

    storeRef.set(store);
}


addStoreButton.addEventListener('click', function() {
    let storeName = groceryStoreTextBox.value;

    let store = {
        storeName : storeName,
        items : ''
    };

    addStore(store);
});


// displays all store selections

const displayStores = (stores) => {
    let legend = document.getElementById("store-list-legend")
    storeList.innerHTML = ""
    let storeNames = stores.map(function(store) {

        return `<div class="store">${store.storeName}</div>`
        
    }).join('');
    storeList.insertAdjacentHTML('beforeend', storeNames);
    storeList.insertAdjacentElement('afterbegin', legend);
}


const configureStores = () => {

    storesRef.on('value', (snapshot => {

        stores = []

        snapshot.forEach(childSnapshot => {
            stores.push(childSnapshot.val())
        })
        displayStores(stores); 
    }))

        
}




configureStores()