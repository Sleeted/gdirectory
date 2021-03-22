var default_url=process.env.HOOK;
var default_username="gdirectory";
const fetch = require('node-fetch');

exports.webhook = (data)=>{
  var url=data.url||default_url;
  var username=data.username||default_username;
  
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": username, "content": data.message})
  });
}