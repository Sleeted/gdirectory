var games = [
  "https://www.addictinggames.com/embed/html5-games/23687",
  "https://www.addictinggames.com/embed/html5-games/23683",
  "https://www.addictinggames.com/embed/html5-games/24386",
  "https://krunker.io",
  "https://www.addictinggames.com/embed/html5-games/23705",
  "https://bruh.io/",
  "https://merc.zone/?referrer=iogamespace",
  "https://surviv.io/",
  "https://erigato.space/Amongusarena/?gamedomain=gamemonetize.com&amp;portal=https://www.playjolt.com/action-games/among-us-arena-io",
  "https://io.gamemonetize.com/shooterz/",
  "https://craftnite.io/",
  "https://shellshock.io/",
  "https://miniroyale2.io/?ref=iogames",
  "https://mineparkour.club/",
  "https://voxiom.io/",
  "https://shapez.io/",
  "https://classic.minecraft.net/",
  "https://blocktanks.io/",
  "https://zorb.io/",
  "http://voxar.io/"
]
var current = 0

window.addEventListener("load", ()=>{
  var frame=document.getElementById("game_frame");
  var id=document.getElementById("gameid")
  
  document.getElementById("nextgame").addEventListener("click", ()=>{
    current+=1
    id.innerHTML="Game Id: "+current
    frame.src=games[current];
  });
  document.getElementById("lastgame").addEventListener("click", ()=>{
    current-=1
    id.innerHTML="Game Id: "+current
    frame.src=games[current];
  });
  document.getElementById("fullscreen").addEventListener("click", ()=>{
    if (frame.className!=="fullscreen"){
      frame.className="fullscreen";
    }else{
      frame.className="";
    }
  });
  
});