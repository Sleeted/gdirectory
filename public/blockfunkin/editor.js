/*
Stable version v2
Written by RustyCrusty
*/


const Canvas = document.createElement("canvas"); Canvas.width=500; Canvas.height=500; Canvas.id="game_canvas"; // Canvas (sets default width and height here)
const Services = { "run_data":{material: "#1a1a1a", frameRate: 1, ground_level: Canvas.height-100, default_size: 50}, "Context": Canvas.getContext("2d"), "ObjectService": {}, "AnimationService": {} }
const ctx = Services.Context;
const objects = []; // x,y,w,h,material,area,movedirection,touching,static
const version="v1.0";

var moveMapInterval = null;
var points=0;
var Music=null;

//-- Block Values --\\
const ch=Canvas.height;
const ds=50;
const bc="#6cf542";
const bn="block";
//-------------------\\



var MAP = {
  testMap: {
    song: "https://cdn.glitch.com/a0e95398-9276-4d65-b1ad-163ce4e927a2%2Fgettin_freaky.mp3?v=1615608064753",
    speed: 150,
    map: [
      
    ]
  }
}



Services.ObjectService.edit = function (i, data) { objects[i] = {...objects[i], ...data} };
Services.ObjectService.remove = function (i){ if (i>0){objects.splice(i,1)}else{objects.splice(0,1)} };
Services.ObjectService.add = function (data, type){
    type=type||"block";
    switch (type) {
        case "block":
            if (!data.x,!data.y,!data.w,!data.h) {
                data.x = 10; data.y = 10;
                data.w = 10; data.h = 10;
            }
            data.area = data.x*data.y;
            data.type = "block";
            ctx.fillStyle=data.material;
            ctx.fillRect(data.x,data.y,data.w,data.h);
            objects.push(data);
            break;
        case "text":
            ctx.fillStyle = data.material;
            ctx.font = `${data.style} ${data.size}px ${data.font}`;
            ctx.fillText(data.text, data.x, data.y);
            data.type = "text";
            objects.push(data);
            break;
        case "data":
            data.type = "data";
            objects.push(data);
            break;
    }
};

var add=Services.ObjectService.add, remove=Services.ObjectService.remove, edit=Services.ObjectService.edit;

const LOADGAME=function(){
    MAP.testMap.song=document.getElementById("song_link").value;
    MAP.testMap.speed=parseInt(document.getElementById("song_speed").value);

    document.body.appendChild(Canvas);
    document.getElementById("title_screen").style.display="none";
    Services.run_data.GAME_LOOP=setInterval(refresh, Services.run_data.frameRate);
    
  
    add({ x: 0, y: 50, w: 50, h: 50, material: "#3366ff", name: "player" }, "block"); // PLAYER:0
    add({text:"ms: 0", font:"Arial", style:"bolder", size:"20px", material: "blue", x:250, y:20, name: "points"}, "text"); // POINTS:1
    add({ x:0, y:50, w:ds, h:ds, material:"cyan", name:bn}, "block")
    loadNewGame("testMap")
}

function checkVersion(){
  $.get( "https://gdirectory.glitch.me/map_editor_version", function( data ) {

    if (data==version){
      document.getElementById("version").innerHTML=version+" (Up to date)";
    }else{
      document.getElementById("version").innerHTML=version+" (OUT OF DATE! Update here: <a href='https://cdn.glitch.com/a0e95398-9276-4d65-b1ad-163ce4e927a2%2Fmap_editor.rar?v=1615941472379' download>"+data+"</a>)";
      alert("This version is out of date!");
    }
    
  });
}

function clean(){
  clearInterval(moveMapInterval);
  
  if (Music) {
    Music.pause();
    Music.currentTime = 0;
  }
}

function loadNewGame(name){
  clean();
  
  var obj=MAP[name]
  Music=new Audio(obj.song);
  Music.play();
  for (var v of obj.map) {
    add(v, "block");
  }
}

function refresh (){
    ctx.fillStyle = Services.run_data.material;
    ctx.fillRect(0,0,Canvas.width,Canvas.height);
  
    ctx.fillStyle="#404040";
    ctx.fillRect(0, 50, 200, 50);
  
    for (var i = 0; i<objects.length; i++) {  // Draws all objects
        var selected = objects[i];
        switch (selected.type) {
            case "block":
                ctx.fillStyle = selected.material;
                ctx.fillRect(selected.x, selected.y, selected.w, selected.h);
                selected=null;
                break;
            case "text":
                ctx.fillStyle = selected.material;
                ctx.font = `${selected.style} ${selected.size} ${selected.font}`;
                ctx.fillText(selected.text, selected.x, selected.y);
                selected=null;
                break;
        }
    }
    edit(1, {text:"ms: "+points});
}

function moveMap(direction){
  for (var i = 0; i<objects.length; i++) {  // Draws all objects
        var selected = objects[i];
        if (selected.name=="block") {
          
          if (direction=="-"){
            points+=MAP.testMap.speed;
            edit(i, {y:selected.y-50});
          }else{
            points-=MAP.testMap.speed;
            edit(i, {y:selected.y+50});
          }
        }
    }
}

function isIntersecting(a){
    var output=false;
    for(var i=0; i<objects.length; i++){
        if(objects[i].type==="block" && objects[i]!=a){
            var b=objects[i];
            if(a.x==b.x&&a.y==b.y&&a.w==b.w&&a.h==b.h){output=i;}
        }
    }
    return output; 
}

function check(){
  var colliding=isIntersecting(objects[0])
  if ( colliding ) {
    remove(colliding);
  }
}

function makeBlock(){
  var player=objects[0];
  add({ x:player.x, y:player.y, w:ds, h:ds, material:bc, name:bn}, "block");
}

function saveMap(){
  console.log("Ignore 0-1");
  var thing = JSON.stringify(objects)
  saveAs(
    new Blob([thing], {type: "application/json;utf-8"}),
    "map.json"
  )
}

document.onkeypress = function(e){
  e=e || window.event;
  
  console.log(e.key);

  switch (e.key.toLowerCase()) {
    case "a":
      edit(0, {x:0});
      makeBlock();
      break;
    case "s":
      edit(0, {x:50});
      makeBlock();
      break;
    case "w":
      edit(0, {x:100});
      makeBlock();
      break;
    case "d":
      edit(0, {x:150});
      makeBlock();
      break;
    case "q":
      moveMap("+");
      break;
    case "e":
      moveMap("-");
      break;
    case "f":
      break;
    case "x":
      check();
      break;
    case "g":
      console.log("Saving Map")
      saveMap();
      break;
    case "r":
      Music.pause();
      Music.currentTime = 0;
      Music.play();
      break;
    case "c":
      Music.pause();
      break;
    case "v":
      Music.play();
      break;
    case "p":
      moveMapInterval=setInterval(moveMap, MAP.testMap.speed, "-");
      break;
    case "l":
      clearInterval(moveMapInterval);
      break;
      
      // Arrow Keys
    case "left arrow":
      edit(0, {x:0});
      makeBlock();
      break;
    case "down arrow":
      edit(0, {x:50});
      makeBlock();
      break;
    case "up arrow":
      edit(0, {x:100});
      makeBlock();
      break;
    case "right arrow":
      edit(0, {x:150});
      makeBlock();
      break;
      

  }
  //check();
  
}

window.addEventListener("load", ()=>{
  document.getElementById("start_button").addEventListener("click", LOADGAME);
});


