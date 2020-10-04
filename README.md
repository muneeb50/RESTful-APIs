# RESTful-APIs-for-sample-articles
Created RESTful APIs methods including GET, POST, PUT, PATCH, DELETE using NodeJs, Express and Mongoose


## Instructions: 

There are documents named "/articles" having 2 fields (title: String, content: String) that can be fetched, added, updated, deleted in database named "wikiDB" using GET, POST, PATCH, DELETE methods.


To run install the node_modules and run the app:
```sh
$ node install
$ node app.js
```

### Example: 

 - GET : "localhost:3000/articles" (to get all articles)
 - POST : "localhost:3000/articles" (to add new article ofcourse used with request body) 
 - DELETE : "localhost:3000/articles" (to delete all articles)

#### Request Body : 
```sh
{
  title: "<your_title>",
  content: "<your_content>"
}
```

Moreover, to perform CRUD operations on specific articles using "title":

 - GET : "localhost:3000/article/<your_article_title>" (to get specific article)
 - PUT/PATCH : "localhost:3000/article/<your_article_title>" (to update article ofcourse used with request body) 
 - DELETE : "localhost:3000/article/<your_article_title>" (to delete specific article)
