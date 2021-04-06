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
  "https://www.officegamespot.com/gunbloodwestern.html?gd_sdk_referrer_url=https://html5.gamedistribution.com/23a719c3577c4bd5902b17577bd97d24/?key=y8&amp;value=default",
  "https://html5.gamedistribution.com/762c932b4db74c6da0c1d101b2da8be6/?key=y8&amp;value=default",
  "https://html5.gamedistribution.com/80e6a5ae477f4d4fbcd1ea293d10087d/?vfbss",
  "https://www.crazygames.com/gameframe/electric-man?v1b",
  "https://www.crazygames.com/gameframe/forward-assault/5/index.html?v202004231436cbb",
  "https://scratch.mit.edu/projects/10128407/embed?v1",
  "https://www.crazygames.com/gameframe/assault-force/1/index.html?v20191210103213",
  "https://www.crazygames.com/gameframe/gangsters-squad?v10",
  "https://uploads.ungrounded.net/alternate/1620000/1620538_alternate_128469_r3.zip/?NewgroundsAPI_PublisherID=1&NewgroundsAPI_SandboxID=606b68b66fc19&NewgroundsAPI_SessionID=&NewgroundsAPI_UserName=%26lt%3Bdeleted%26gt%3B&NewgroundsAPI_UserID=0&ng_username=%26lt%3Bdeleted%26gt%3B",
  "https://uploads.ungrounded.net/alternate/1611000/1611549_alternate_128048_r22.zip/?NewgroundsAPI_PublisherID=1&NewgroundsAPI_SandboxID=606b69d070c45&NewgroundsAPI_SessionID=&NewgroundsAPI_UserName=%26lt%3Bdeleted%26gt%3B&NewgroundsAPI_UserID=0&ng_username=%26lt%3Bdeleted%26gt%3B",
  "https://uploads.ungrounded.net/alternate/1609000/1609554_alternate_126210_r41.zip/?NewgroundsAPI_PublisherID=1&NewgroundsAPI_SandboxID=606b6b41c9e44&NewgroundsAPI_SessionID=&NewgroundsAPI_UserName=%26lt%3Bdeleted%26gt%3B&NewgroundsAPI_UserID=0&ng_username=%26lt%3Bdeleted%26gt%3B",
  "https://v6p9d9t4.ssl.hwcdn.net/html/2876359-359162/index.html",
  "https://mj89sp3sau2k7lj1eg3k40hkeppguj6j-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=http://www.gstatic.com/sites-gadgets/iframe/iframe.xml&container=enterprise&view=default&lang=en&country=ALL&sanitize=0&v=f4e545017d7fc26f&libs=core&mid=68&parent=https://sites.google.com/site/unblockedgame76/friday-night-funkin-whitty-mod#up_scroll=no&up_iframeURL=https://hdboye.github.io/FnfModAttempt/page2/whitty/&st=e%3DAIHE3cBENMIrvlJuv6jdCBZHUc5EBB6Nzam047ZceUumC7FL1pYx%252Bk7686nlkKBoy4uD8HmlQnxtSSfgSdXqgPScZZAcCLSL9EeBaj8trWIvWZjLTnnKcITjWKim8LxrBRi3zoYmj4lr%26c%3Denterprise&rpctoken=5075066761874959337",
  "https://bobydob.github.io/bside/",
  "https://bobydob.github.io/neo/",
  "https://uploads.ungrounded.net/alternate/1581000/1581619_alternate_120871_r1.zip/?NewgroundsAPI_PublisherID=1&NewgroundsAPI_SandboxID=606b9b2f00063&NewgroundsAPI_SessionID=&NewgroundsAPI_UserName=%26lt%3Bdeleted%26gt%3B&NewgroundsAPI_UserID=0&ng_username=%26lt%3Bdeleted%26gt%3B",
  "https://html5.gamemonetize.com/pv5rvtf9hd9nr878f2rcg8tnzs99z13o/?key=y8&value=default"
]
var current = 0

window.addEventListener("load", ()=>{
  var frame=document.getElementById("game_frame");
  var id=document.getElementById("gameid");

  function game(){
      this.setFrame = ()=>{id.innerHTML="Game Id: "+current; frame.src=games[current]};
      this.next = ()=>{current+=1; this.setFrame()};
      this.back = ()=>{current-=1; this.setFrame()};
      this.set = (n)=>{current=n; this.setFrame()};
  }

  var G = new game();
  
  
  document.getElementById("nextgame").addEventListener("click", ()=>{
    G.next();
  });

  document.getElementById("lastgame").addEventListener("click", ()=>{
    G.back();
    if (current<0) createDialog("There isnt anything here.","bruh")
  });

  document.getElementById("fullscreen").addEventListener("click", ()=>{
    if (frame.className!=="fullscreen"){
      frame.className="fullscreen"; createDialog("fullscreen enabled", "click again to disable");
    }else{ frame.className=""; }
  });

  document.getElementById("setgame").addEventListener("click", ()=>{
      var n=document.getElementById("gameid_input").value;
      G.set(parseInt(n));
  });
  
});