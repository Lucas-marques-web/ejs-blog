//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


// using express and body parser
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// creating a db
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogDb', { useNewUrlParser: true });

}

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// const posts =[];


// creating a collection
const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true
  },
  text: String

});


// // get route in path root
app.get('/', function (req, res) {

  // Using find method of mongoose and rendering the posts objects
    Post.find({}, function (err, posts) {
      res.render('home', { StartingContent: homeStartingContent, posts: posts });
    })
  
})


// get route in path about
app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent })
})


// get route in path contact
app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent })
})


// get route in path compose
app.get('/compose', function (req, res) {
  res.render('compose');
})


// post route in path compose
app.post('/compose', function (req, res) {

  // creating an item based on Post collection
  const post = new Post({
    title: req.body.composeInput,
    text: req.body.composeText
  });

  // saving in the db 
  post.save(function (err) {
    if (!err) {
      res.redirect('/');
    }
  });

})


// creating a new page based in the _id in the db
app.get('/post/:postId', function (req, res) {

  const requestedId = req.params.postId;

  //  using id to find the objt and rendering on a new page 
  Post.findOne({ _id: requestedId }, function (err, post) {
    const storedTitle = post.title.toLowerCase();
    storedTitle.replace(/ (?!>)/g, '-');
    const postText = post.text;

    res.render('post', { postTitle: storedTitle, postText: postText });

  });
});  



// express listening 
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
