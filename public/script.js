function updateViews(){
  $.get( "https://gdirectory.glitch.me/views", function( data ) {

    if ( data!==NaN && data!=="NaN" ){
      localStorage.setItem("views", data)
      document.getElementById("views").innerHTML="Views: "+data;
      console.log("Loaded views: "+data); 
    }else{
      document.getElementById("views").innerHTML="Failed to load views";
      console.error("Failed loading views");
    }
    
  });
}

updateViews();
setInterval(updateViews, 5000);

console.log("script.js for index loaded.")