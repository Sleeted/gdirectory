var link = "https://chatquick.glitch.me/"

window.addEventListener("load", ()=>{
  setTimeout(()=>{
    document.getElementById("game_frame").src=link;
    var w = document.getElementById("game_frame").contentWindow;
    w.login("hello");
  },2000)
});