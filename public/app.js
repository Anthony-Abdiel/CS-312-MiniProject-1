
//array to keep track of categories, both in general and those that are active
const categories = [];
const activeCats = new Set();

currentPostId = null;



//selecting DD-Menu and DD-Menu Divider for later use 
const dropDownMenu = document.querySelector(".dropdown-menu");
const divider = dropDownMenu.querySelector(".dropdown-divider");

//card div for generating posts
const cardRow = document.querySelector(".cardRow");

//modal info for displaying posts
const modal = document.getElementById("viewPost");
const bsModal = new bootstrap.Modal(modal);

//buttons on the already existing posts
const delBtn = document.getElementById("delBtn");
const editBtn = document.getElementById("editBtn");

//form info for creating posts
const submitPostBtn = document.getElementById("submitPostBtn");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const textInput = document.getElementById("text-input");


//============================ EVENT LISTENERS =================================


//Event listener to handle selecting filtering categories - - - - - - - - - - - 
dropDownMenu.addEventListener('click', (event) => {

    //detect a click on a category
    const item = event.target.closest('.dropdown-item.selectable');

    //verify that the user clicked a selectable option
    if(!item){return;}

    //highlighting functionality
    event.preventDefault();
    item.classList.toggle('active');

    //update active category list
    let category = item.textContent.toLowerCase();

    if(item.classList.contains('active')) {
        activeCats.add(category);
    }
    else {
        activeCats.delete(category);
    }
});
//------------------------------------------------------------------------------

//EL for "Open Post" buttons - - - - - - - - - - - - - - - - - - - - - - - - - - 
cardRow.addEventListener('click', (event) => {
    const button = event.target.closest('.openPostBtn');

    if(!button){return;}
    
    postId = button.dataset.postId;

    currentPostId = postId;

    fetch('/posts/'+postId).then(response=>response.json()).then( data => {
        openModal(data);
    })


});


//------------------------------------------------------------------------------


//EL for new post form - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
submitPostBtn.addEventListener('click', (event) => {
    event.preventDefault();


    const postTitle = titleInput.value;
    const postAuthor = authorInput.value;
    const postContent = textInput.value;

    const postTime = new Date();


    const post = {
        title: postTitle,
        author: postAuthor,
        time: postTime,
        content: postContent
    };

    
    fetch("/post", {
        method: "POST",
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    }).then(response => {
        //reloads the page to let EJS update the list
        window.location.reload();
    });

});


//------------------------------------------------------------------------------



//EL for the delete button - - - - - - - - - - - - - - - - - - - - - - - - - - - 
delBtn.addEventListener('click', (event) => {
    event.preventDefault();

    
    fetch("/posts/" + currentPostId, {
        method: "DELETE",
    }).then(response => {
        //reloads the page to let EJS update the list
        window.location.reload();
    });

});


//------------------------------------------------------------------------------




//============================= FUNCTIONS ======================================

function addCategoryToDom(name) {

    //add the new category to the categories array
    categories.push(name.toLowerCase);                                              //DO THIS SOMEWHERE ELSE

    //build the new li element
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.classList.add("dropdown-item", "selectable");
    a.href = "#";
    a.textContent = name;

    li.appendChild(a);

    //inserting before the divider
    dropDownMenu.insertBefore(li, divider);
}


//function to dynamically generate the post information on the modal 
function openModal(post) {
    modal.querySelector('.modalTitle').textContent = post.title;
    modal.querySelector('.modalAuthor').textContent = post.author;
    modal.querySelector('.modalTime').textContent = post.time;
    modal.querySelector('.modalText').textContent = post.content;

    bsModal.show();
}