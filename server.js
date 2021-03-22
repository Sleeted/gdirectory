const express = require("express");
const fs = require("fs");
const discordThings = require("./discord_things");
const app = express();
const bodyParser = require('body-parser');
const viewsPath=__dirname+"/nonpublic/views.txt";
const LOCKDOWN=false;

var WTV_debounce=false


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));


function createView(){
  if (WTV_debounce===false) {
    
    WTV_debounce=true
    fs.readFile(viewsPath, (err, data)=>{
      if (err){console.log("Error getting views"); WTV_debounce=false; return;}
      var views=parseInt(data)+1;
      fs.writeFile(viewsPath, views.toString(), "utf8", (err)=>{
        if (err){console.log("Error writing to views.txt"); WTV_debounce=false; return;}
        console.log("Views: "+views);
        discordThings.webhook({message: `Views: ${views}`});
        WTV_debounce=false;
      })
    });
    
  }else{
    discordThings.webhook({message: "Multiple people viewed at same time. Rejected view to prevent corruption."})
    console.log("Multiple people viewing at same time (rejected view)");
  }
}


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/nonpublic/index.html");
  createView();
});
app.get("/views", (req, res)=>{
  fs.readFile(viewsPath, (err, data)=>{
    if (err){res.status(200); console.log("Error getting views"); return;}
    res.send(data).status(200);
  });
});
app.get("/redirect", (req, res)=>{
  var location=req.query.location
  res.sendFile(__dirname+"/nonpublic/redirect.html")
  setTimeout(()=>{
    res.redirect(location)
  }, 2000);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});