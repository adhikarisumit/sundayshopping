// alert("hello world")
const addbtn = document.getElementById("addbtn")
const itemForm = document.getElementById("item-form")
const inputForm = document.getElementById("input-form")
const filterInput = document.getElementById("filter-input")
const itemlist = document.getElementById("item-list")
const value = document.getElementById('value')
const clearAll = document.getElementById('clear-all')
const items = document.querySelectorAll('li')
// console.log(`top ko items ${items}`)
// console.log(addbtn)
// console.log(`this is html before function ${inputForm.value}`)
function addItem(e) {
    e.preventDefault();
    // console.log(`function ${inputForm.value}`)
    const inputValue = inputForm.value;
    if (inputValue === '') {
        alert("Please add the item")
        // return
    }
    else {
        // let div = document.createElement("div")
        // div.id = "value"
        // // console.log(div)

        // div.textContent = inputValue
        // console.log(div)
        // div.appendChild(div)
        // console.log("click")

        // const li = document.createElement('li');
        // // const button = document.createElement('button')
        // // const icon = document.createElement('icon')
        // // button.classList.add('btn-list')
        // // icon.classList.add('fa-solid', 'fa-xmark')
        // // button.appendChild(icon)

        // const button = createButton("btn-list")

        // // console.log(li)
        // const text = document.createTextNode(inputValue)
        // li.appendChild(text)
        // li.appendChild(button)
        // itemlist.appendChild(li);
        // inputForm.value = '';
        addItemtoDOM(inputValue)
        addItemtoLocalStorage(inputValue)
        noInput()
    }

}

function displayOnDOM() {

    // let itemsfromLocalStorage = localStorage.getItem('items')
    // // console.log(itemsfromLocalStorage)
    // if (itemsfromLocalStorage === null) {
    //     itemsfromLocalStorage = []
    //     // console.log(itemsfromLocalStorage)
    // } else {
    //     //string ma hunxa tessaile array ma change garni
    //     itemsfromLocalStorage = JSON.parse(localStorage.getItem('items'))
    // }
    const itemsfromLocalStorage = getItemsfromLocalStorage()

    itemsfromLocalStorage.forEach(item => addItemtoDOM(item))
}

displayOnDOM()


function addItemtoDOM(item) {
    const li = document.createElement('li')
    const button = createButton("btn-list")

    // console.log(li)
    const text = document.createTextNode(item)
    li.appendChild(text)
    li.appendChild(button)
    itemlist.appendChild(li)
    inputForm.value = ''
}

// "[1,2,3]"
function addItemtoLocalStorage(item) {
    //local storage le string ma save garxa
    // let itemsfromLocalStorage = localStorage.getItem('items')
    // // console.log(itemsfromLocalStorage)
    // if (itemsfromLocalStorage === null) {
    //     itemsfromLocalStorage = []
    //     // console.log(itemsfromLocalStorage)
    // } else {

    //     //string ma hunxa tessaile array ma change garni
    //     itemsfromLocalStorage = JSON.parse(localStorage.getItem('items'))
    // }
    const itemsfromLocalStorage = getItemsfromLocalStorage()
    // console.log(typeof (itemsfromLocalStorage))

    //array ma change garepaxi push handini
    itemsfromLocalStorage.push(item)
    // console.log(itemsfromLocalStorage)
    //local storage le string ma save garxa tesaile feri 
    // string ma string ma change garni
    localStorage.setItem("items", JSON.stringify(itemsfromLocalStorage))

}
// addItemtoLocalStorage("apple")

function getItemsfromLocalStorage() {
    let itemsfromLocalStorage = localStorage.getItem('items')
    // console.log(itemsfromLocalStorage)
    if (itemsfromLocalStorage === null) {
        itemsfromLocalStorage = []
        // console.log(itemsfromLocalStorage)
    } else {
        //string ma hunxa tessaile array ma change garni
        itemsfromLocalStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsfromLocalStorage

}

const a = getItemsfromLocalStorage()
console.log(a)
function createButton(classes) {

    const button = document.createElement('button')
    button.className = classes
    //  <button class="btn-list"></button>
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    //  <button class="btn-list">
    // < i class='fa-solid fa-xmark' ></ >
    // </button>
    return button

}

function createIcon(classes) {

    const icon = document.createElement('icon')
    icon.className = classes
    return icon

    // < i class='fa-solid fa-xmark' ></ >


}

// list ko length zero vayo vaney display none
function noInput() {
    const items = document.querySelectorAll('li')
    // console.log(items)

    if (items.length === 0) {
        clearAll.style.display = 'none'
        filterInput.style.display = 'none'
    }
    else {
        clearAll.style.display = 'block'
        filterInput.style.display = 'block'
    }

}


function clearItems() {
    itemlist.innerHTML = ''
    localStorage.clear()
    noInput()

}


function onClickItem(e) {
    const btn = e.target.parentElement
    console.log(btn)
    //yedi class ma btn-list xa vaney maatra delete garney
    if (btn.classList.contains('btn-list'))
        // if (confirm("Are you confirm to delete")) {
        //     btn.parentElement.remove()
        // }
        console.log(btn.parentElement)
    removeItem(btn.parentElement)
}

function removeItem(item) {
    console.log(item)
    if (confirm("Are you confirm to delete")) {
        item.remove()
    }
    console.log(item.textContent)
    removeItemFromLocalStorage(item.textContent)


    noInput()

}

function removeItemFromLocalStorage(item) {//sandip
    let itemsfromLocalStorage = getItemsfromLocalStorage()
    // console.log(itemsfromLocalStorage)

    //[banana,sandip,mango]
    itemsfromLocalStorage = itemsfromLocalStorage.filter(i => i != item) //banana !==sandip true sandi!=sandip false
    console.log(itemsfromLocalStorage)
    localStorage.setItem('items', JSON.stringify(itemsfromLocalStorage))

}
// removeItemFromLocalStorage("sandip")




function filterItems(e) {
    const liItems = document.querySelectorAll('li')
    let value = e.target.value.toLowerCase()
    console.log(value)
    liItems.forEach(liItem => {
        //   <li>
        //   Apples.   //first child text content
        //   <button class="btn-list">
        // <i class="fa-solid fa-xmark"></i>
        // </button> //last child
        // </li>

        const itemName = liItem.firstChild.textContent.toLowerCase();
        console.log(itemName)
        // const res = itemName.indexOf(value)
        // console.log(res)
        if (itemName.indexOf(value) !== -1) {
            liItem.style.display = 'flex'
        }
        else {
            liItem.style.display = 'none'

        }
    })

}

itemlist.addEventListener("click", onClickItem)
itemForm.addEventListener("submit", addItem)
clearAll.addEventListener("click", clearItems)
filterInput.addEventListener('input', filterItems)

noInput()

// const a = localStorage.getItem('items')
// console.log(a)
// localStorage.setItem('f', "f")
// localStorage.removeItem("a")
// const key = localStorage.key(0)
// console.log(key)

//local storage a apple b ball c cat d dog 
//getItem(a,b,c,d)
//setItem(e elephant)
//local storage clear()
// localStorage.clear()
// localStorage.setItem("a", "apple")
// localStorage.setItem("b", "ball")
// localStorage.setItem("c", "cat")
// localStorage.setItem("d", "dog")

// const a = localStorage.getItem("e")
// console.log(a)
// localStorage.setItem("e", "elephant")
// localStorage.clear()






