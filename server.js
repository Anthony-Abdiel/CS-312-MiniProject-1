//server file
const express = require("express")
const path = require("path");


//creating the express app
const app = express()
PORT = 3000

//specifying file path:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.set("view engine", "ejs");

//GLOBALS
blogPosts = [];
numPosts = 0;

function createPost(postTitle, postAuthor, postTime, postContent) {

    //creating a js object for the post
    const post = {
        id: numPosts,
        title: postTitle,
        author: postAuthor,
        time: postTime,
        content: postContent
    };

    numPosts++;

    return post;
}

//temporary post for testing
blogPosts.push(createPost("Post1", "Just a Post", "time", "The COOLEST post ever"));
blogPosts.push(createPost("Post2", "Just another Post", "time",  "The Middeset post ever"));
blogPosts.push(createPost("Post1", "Just a Post", "time",  "The COOLEST post ever"));
blogPosts.push(createPost("Post2", "Just another Post", "time",  "The Middeset post ever"));
blogPosts.push(createPost("Post1", "Just a Post", "time",  "The COOLEST post ever"));

//routes


//GET 
app.get("/", async(req, res) => {

    //render the home page
    res.render("home", {posts:blogPosts})

})

app.get("/posts/:id", (req,res) => {
    const postId = req.params.id;


    console.log("Recieved request for ID: " + postId);

    //fetch the specified post from the posts array
    const post = blogPosts.find(p => p.id === Number(postId));

    console.log("Returning OBJ: " + post);

    //render EJS template with post info
    res.json(post);

})

//PUT

//POST
app.post("/post", async(req, res)=>{
    
    //save the post name, description, and content to a post object
    const { title, author, time, content } = req.body;
    const newPost = createPost(title, author, time, content);
    console.log("Recieved Post Req with info:  " + title + " " + author + " " + time + " " + content);

    //add the post object into the blog posts array
    blogPosts.push(newPost);

    res.redirect("/");
})


//DELETE
app.delete("/posts/:id", (req,res) => {
    
    postId = req.params.title;


    //find the post
    const postIndex = blogPosts.findIndex(p => p.id === postId);

    //removes specific post object
    if(postIndex !== -1) {
        blogPosts.slice(postIndex, 1);
    }

})



app.listen( PORT, ()=>{console.log("listening on Port: " + PORT)} );