const express = require("express");
const postBank = require('./postBank');
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'));

//app.get("/", (req, res) => res.send("Hello World!"));




app.get("/", (req, res) => {  

  const posts = postBank.list();

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
    </head>
    <body>
      <ul>
        ${posts.map(post=>`<li>${ post.title + ' by ' + post.name }</li>`)}
      </ul>
    </body>
    </html>`;

  res.send(html);
  
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
