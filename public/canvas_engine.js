const Canvas = document.createElement("canvas"); Canvas.width=500; Canvas.height=500; Canvas.id="game_canvas"; // Canvas (sets default width and height here)
const Services = { "run_data":{material: "#357cf0", frameRate: 50, ground_level: Canvas.height-100, ground: Canvas.height-100, default_size: 50}, "Context": Canvas.getContext("2d"), "ObjectService": {}, "AnimationService": {} }
const ctx = Services.Context;
const objects = []; // x,y,w,h,material,area,movedirection,touching,static
const CAN_WALK = false;
const MAP = [{x:0,y:400,w:50,h:50,material:"orange",name:"block"}, {x:100,y:300,w:50,h:50,material:"orange",name:"block"}, {x:200,y:300,w:50,h:50,material:"orange",name:"block"}];

Services.ObjectService.edit = (i, data) => { objects[i] = {...objects[i], ...data} };
Services.ObjectService.remove = (i) => { if (i>0){objects.splice(i,i+1)}else{objects.splice(0,1)} };
Services.ObjectService.add = (data, type) => {
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
    console.time("Game_Loaded");
    var keybounce = false, Music = new Audio("https://cdn.glitch.com/a0e95398-9276-4d65-b1ad-163ce4e927a2%2FSky.mp3?v=1614985968791");
    document.body.appendChild(Canvas);
    Services.run_data={material: "#357cf0", frameRate: 50, ground_level: Canvas.height-100, ground: Canvas.height-100, default_size: 50}
    document.getElementById("title_screen").style.display="none";
    // Load in objects:
    add({ x: 0, y: Canvas.height-50, w: Canvas.width, h: Services.run_data.ground_level, material: "green", name: "ground" }); // ground 0
    add({ x: Canvas.width/2-50, y: Services.run_data.ground_level, w: 50, h: 50, material: "blue", name: "player", dead:false }, "block"); // player 1
    add({text:"Refreshed", font:"Arial", style:"bolder", size:"20px", material: "green", x:10, y:30, name: "updater"}, "text"); // mainText 2
    add({name: "randomColor", rgb:["red", "green", "blue"]}, "data") // randomColor 3
    add({name: "backgroundNum", num:0}, "data"); // backgroundNum 4
    add({text:"Hello. Press E to place a block. Press F to shoot a block. Press G to place a forward boost. Press Z to place a trampoline. Press Q to place a noncollidable block.", font:"Arial", style:"bolder", size:"20px", material: "blue", x:10, y:100, name: "hello_text"}, "text"); // hello message 5

    for (var v of MAP) {
        add(v, "block");
    }

    document.onkeypress = function(e){
        e=e || window.event;
        switch (e.key.toLowerCase()) {
            case "w": // up
                if (!keybounce){
                    keybounce=true;
                    edit(1, {y: objects[1].y-50});
                    setTimeout(()=>{ edit(1, {y: objects[1].y-50, h:50}); },100);
                    setTimeout(()=>{edit(1, {y: objects[1].y+50, h:50})},400);
                    setTimeout(()=>{ edit(1, {y: objects[1].y+50}); },500);
                    setTimeout(()=>{ edit(1, {y: Services.run_data.ground_level}); },600);
                    setTimeout(()=>{keybounce=false;},610); // Wait 500ms
                }
                break;
            case "d": // right
                if(!CAN_WALK){ scroll("right") }else{ edit(1, {x: objects[1].x+50}); }
                break;
            case "a": // left
                if(!CAN_WALK){ scroll("left") }else{ edit(1, {x: objects[1].x-50}); }
                break;
            case "e": // place block
                var player = objects[1];
                add({x: player.x, y: player.y, w: 50, h: 50, material: "orange", type: "block"});
                break;
            case "f":
                var player = objects[1];
                var id=objects.length;
                add({x: player.x, y: player.y, w: 50, h: 50, material: "orange", type: "block"});
                for (var i=1; i<5; i++) {
                  setTimeout(()=>{
                    var obj=objects[id];
                    edit(id, {x: obj.x+50});
                  }, i*100);
                }
                break;
            case "g":
              var player = objects[1];
              add({x: player.x+50, y: player.y, w: 50, h: 50, material: "cyan", type: "block", name: "boost"});
              break;
            case "q":
              var player = objects[1];
              add({x: player.x, y: player.y, w: 50, h: 50, material: "grey", type: "block", name: "NO_COLLISION"});
              break;
            case "z":
              var player = objects[1];
              add({x: player.x, y: player.y, w: 50, h: 50, material: "lime", type: "block", name: "upboost"});
              break;
            case "c":
              var player = objects[1];
              add({x: player.x+50, y: player.y, w: 50, h: 50, material: "purple", type: "block", name: "backboost"});
              break;
        }
    }

    document.addEventListener("click", event=>{
        Music.play();
    })

    Services.run_data.GAME_LOOP=setInterval(refresh, Services.run_data.frameRate); console.timeEnd("Game_Loaded");
}

function refresh (){ // Remember to implement physics
    ctx.fillStyle = Services.run_data.material;
    ctx.fillRect(0,0,Canvas.width,Canvas.height);
    for (var i = 0; i<objects.length; i++) {  // Draws all objects
        setTimeout(()=>{})
        var selected = objects[i];
        switch (selected.type) {
            case "block":
                ctx.fillStyle = "black";
                ctx.fillRect(selected.x-2, selected.y-2, selected.w+4, selected.h+4);
                
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
    /// Unrequired assets:
    findPlayerPosition();
    edit(2, {material: objects[3].rgb[Math.floor(Math.random()*Math.floor(4))]});
}

function isIntersecting(a){
    var output=false;
    for(var i=0; i<objects.length; i++){
        if(objects[i].type==="block" && objects[i]!=a && objects[i].name!="NO_COLLISION"){
            var b=objects[i];
            if(a.x==b.x&&a.y==b.y&&a.w==b.w&&a.h==b.h){
              
              output=b;
              switch (objects[i].name) {
                  case "boost":
                    for (var v=1; v<10; v++) {
                      setTimeout(()=>{
                        scroll("right");
                      }, v*100);
                    }
                    break;
                  case "upboost":
                    for (var v=1; v<4; v++) {
                      setTimeout(()=>{
                        scroll("up");
                      }, v*100);
                    }
                    setTimeout(()=>{
                      for (var v=1; v<4; v++) {
                        setTimeout(()=>{
                          scroll("down");
                        }, v*100);
                      }
                    }, 400);
                    break;
                  case "backboost":
                    for (var v=1; v<10; v++) {
                      setTimeout(()=>{
                        scroll("left");
                      }, v*100);
                    }
                    break;
              }
              
              
            }
        }
    }
    return output; 
}
function findPlayerPosition(){
    var player = objects[1];
    var ground = Services.run_data.ground;
    if( isIntersecting(player) ){ 
        var a = isIntersecting(player); Services.run_data.ground_level=a.y-a.h; edit(1, {y: a.y-a.h});
    }else if( !isIntersecting(player) && Services.run_data.ground_level!=ground && player.y == Services.run_data.ground_level && !isIntersecting({ x: player.x, y: player.y+50, w: player.w, h: player.h}) ){ // 3rd param checks if a block is below player
         setTimeout(()=>{
            Services.run_data.ground_level=player.y+50;
            edit(1, {y: Services.run_data.ground_level});
         },10)
    }
    ground=null;
}
function scroll(direction) {
    for (var i=0; i<objects.length; i++) {
        var obj = objects[i];
        var ground = objects[0]
        if ( i>4 && obj.name!="player" && obj.name!="ground" ) { 
          if (obj.type=="block"||obj.type=="text") {
            switch (direction){
                case "right":
                    edit(i, {x: obj.x-50});
                    break;
                case "left":
                    edit(i, {x: obj.x+50}); 
                    break;
                case "up":
                  edit(0, {y: ground.y+50});
                  edit(i, {y: obj.y+50});
                  break;
                case "down":
                  edit(0, {y: ground.y-50});
                  edit(i, {y: obj.y-50});
                  break;
            }
          }
        }
        obj=null;
    }
}

window.addEventListener("load", ()=>{
  setTimeout(LOADGAME, 3000)
});

/*//////////////

--- Unused code here ---

function scroll(){
    for (var i = 0; i<objects.length; i++) {
        if (objects[i].scroll === true) {
            var playerData={x:objects[1].x,y:objects[1].y};
            edit(i, {x: objects[i].x-25})
            if(objects[i].x<=-100){edit(i, {x:550})};
            if(objects[i].x==playerData.x&&objects[i].y==playerData.y){
                remove(i); Services.run_data.material="black"; add({text:"DEAD", font:"Arial", style:"bolder", size:"30px", material: "red", x:200, y:200},"text")
                edit(1, {material: "red", y:450, dead:true});
            }
        }
    }
}
function objectExistsAtPoint(data){
    for(i=0; i<objects.length; i++){
        var obj=objects[i];
        if(data.x==obj.x&&data.y==obj.y){ return true; }else{ return false; }
    }
}
*///////////////

/*[ Game made by rust#1622 including the engine ]*/