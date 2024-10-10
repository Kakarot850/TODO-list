const addBtn = document.querySelector('#add');
const input = document.querySelector('#input');


let itemList = ["do homework", "go to the gym", "buy groceries"];

addBtn.addEventListener('click', () => {
    console.log(input.value);
    addToList();
    input.value = ''
});


function renderList() {
    const ul = document.querySelector('#item-list');
    ul.innerHTML = '';

    itemList.forEach((item, index) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        div.textContent = item;
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener("click", () => {
            deleteItem(index);
        })

        editBtn.onclick = (e) => editItem(index,e,editBtn);
        
        li.appendChild(div);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
    save();
}
function addToList() {
    if (input.value == '') {
        alert("Cannot add an empty item!")
        return;
    }
    itemList.push(input.value);
    renderList();
}

function deleteItem(index) {
    itemList.splice(index, 1);
    renderList();
}

function editItem(index, e,btn) {
    const editContainer = document.createElement("div")
    const input = document.createElement("input")
    const doneBtn = document.createElement("button")
    const li = btn.parentElement
    
    input.classList.add("edit-input")
    input.setAttribute("value", `${itemList[index]}`)
    input.setAttribute("type", 'text')
    input.setAttribute("autofocus", '')
    doneBtn.textContent = "Done"

    console.log(li)
    li.innerHTML = ''

    editContainer.appendChild(input)
    editContainer.appendChild(doneBtn)
    li.appendChild(editContainer)
    doneBtn.onclick = () => {
        itemList[index] = input.value
        renderList()
    }
    console.log(li)
}


function load() {
    itemList = JSON.parse(localStorage.getItem("list-items"))
    if (itemList == null) {
        itemList = []
        return;
    }
    renderList()
    console.log("items loaded from local storage");
}

function save() {
localStorage.setItem("list-items", JSON.stringify(itemList));
    console.log("items Saved in local storage");
}

window.onload = load()