
let groceryStoreTextBox = document.getElementById("grocery-store-text-box");
let addStoreButton = document.getElementById("add-store-button");
let storeList = document.getElementById("store-list-container");
let currentGroceryList = document.getElementById("current-list-container");
let storeOptionContainer = document.getElementsByClassName("store-option-container");

//creates an instance of firebase realtime database
const database = firebase.database();

//creates a node under root to call all of the stores
const storesRef = database.ref("stores");
const storeRef = storesRef.push();

const groceryItemRef = storeRef.child('items').push();

let stores = [];
let items = [];




const addStore = (store) => {
    console.log(store)
    storeRef.set(store)
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
        return `
            <div class="store-option-container">
                <div class="store-name" onClick="selectStore()">${store.storeName}</div>
            </div>
            `;    
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


let selectStore = () => {
    items = []
    let currentListLegend = document.getElementById('current-list-legend');
    let selectedStore = document.querySelector('div')
    currentGroceryList.innerHTML = ''
    currentGroceryList.insertAdjacentElement('afterbegin', selectedStore);
    currentGroceryList.insertAdjacentElement('afterbegin', currentListLegend);

    newItemTextBox() 
    let div = selectedStore.childNodes

    console.log(div[1].innerHTML)
}



const newItemTextBox = () => {


    let newItemTextBox = `
                <div class="new-item-container">
                    <input id="new-item-text-box" class="new-item-text-box" type="text" placeholder="Enter Item Name Here" />

                    <input id="add-new-item-button" class="add-new-item-button" type="submit" onClick="addItem()" value="Add Item" />
                </div>
                `;



    

    currentGroceryList.insertAdjacentHTML('beforeend', newItemTextBox)
}


const addItem = () => {
    let newItemTextBox = document.getElementById('new-item-text-box');
    let storeName
    let items = newItemTextBox.value;

    let itemNameContainer = `
                    <div>${items}</div>`;

    currentGroceryList.insertAdjacentHTML('beforeend', itemNameContainer);

    console.log(groceryItemRef)


    // groceryItemRef.set({
    //     storeName : storeName,
    //     items : itemName
    // })
}


 // initial data: [ {name: 'foo', counter: 1}, {name: 'bar', counter: 1}, {name: 'baz', counter: 1} ];
//  var ref = new Firebase(URL_TO_LIST);

 // sync down from server
//  var list = [];
//  ref.on('value', function(snap) { list = snap.val(); });

 // time to remove 'bar'!
 // this is the correct way to change an array
//  list.splice(1, 1);
//  ref.set(list);

 // DO NOT DO THIS! It will eventually turn the array into an object
 // and may result in null values for deleted indices
 // ref.child('1').remove();


configureStores()