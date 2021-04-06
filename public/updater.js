var v = "v1.02";
var updateLoop = null;

$.get("/version", (data)=>{
  v=data.v;
  console.log("Current version: "+v);
  console.log("Setting loop to check for new updates");
  updateLoop = setInterval(checkForUpdates, 5000);
});

function checkForUpdates(){
  $.get("/version", (data)=>{
    console.log("Checked for update");
    if (data.v!=v&&data.message=="") {
      console.log("New update found. Going to mainpage for update.");
      location=data.redirect;
    }else if (data.v!=v&&data.message!="") {
      createDialog("Server Message",data.message);
      v=data.v;
    }
  });
}

function createDialog(title, message, extra){
  var div = document.createElement("div");
  var h = document.createElement("h1");
  var p = document.createElement("p");
  var close = document.createElement("button");
  div.setAttribute("class", "modal");
  close.setAttribute("class", "close");
  close.innerHTML="X";
  h.innerHTML=title
  p.innerHTML=message;
  document.body.appendChild(div);
  div.appendChild(close);
  div.appendChild(h)
  div.appendChild(p);
  
  if (extra!=undefined||extra!=null||extra) {
    div.appendChild(extra);
  }
  
  close.addEventListener("click", ()=>{
    div.style.display="none";
  });
  
  return div;
}
