const express = require("express");
const postBank = require('./postBank');
const morgan = require("morgan");
const app = express();


//gives the server access to the public directory
app.use(express.static('public'));

app.use(morgan('dev'));

//app.get("/", (req, res) => res.send("Hello World!"));




app.get("/", (req, res) => {  
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      )}
    </div>
  </body>
</html>`;

  res.send(html);
});


app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
                        <hr>
            ${post.content}
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
    </div>
  </body>
</html>`;

  res.send(html);
});



app.get('/users/:name', (req, res) => {
  console.log( req.params.name );

  res.send(req.params.name);
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
