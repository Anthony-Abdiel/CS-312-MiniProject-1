//server file
const express = require("express")


//creating the express app
const app = express()
PORT = 3000

//GLOBALS
blogPosts = [];

function createPost(postTitle, description, postContent) {

    //creating a js object for the post
    const post = {
        title: postTitle,
        desc: description,
        content: postContent
    };

    return post;
}

//routes


//GET 
app.get("/", async(req, res) => {


    //render the home page
    res.render("home", {blogPosts})

})

app.get("/posts/:title", (req,res) => {
    const postTitle = req.params.title;

    //fetch the specified post from the posts array
    const post = blogPosts.find(p => p.title === postTitle);

    //render EJS template with post info
    res.render("post", {post})

})

//PUT

//POST
app.post("/post", async(req, res)=>{
    //save the post name, description, and content to a post object
    const newPost = createPost(req.title, req.desc, req.content);

    //add the post object into the blog posts array
    blogPosts.push(newPost);

    //return a response code...?
})


//DELETE
app.delete("/posts/:title", (req,res) => {
    
    postTitle = req.params.title;


    //find the post
    const postIndex = blogPosts.pop(p => p.title === postTitle);

    //removes specific post object
    if(postIndex !== -1) {
        blogPosts.slice(postIndex, 1);
    }


})



app.listen( PORT, ()=>{console.log("listening on Port: " + PORT)} );