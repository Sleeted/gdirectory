var helpMessage = 'You find yourself on a very long street.\nYou are homeless and only have 1000$ to spend.\nYou see multiple places you can go to on the street.\nSay "goto <area number>" to go somewhere.'

window.addEventListener("load", ()=>{
	// Player Data \\
	var health=100;
	var sanity=100;
	var bank=1000;
	var cash=0;
	var inventory=[];
	var area=0;
	var bankRobbed=false;
	var karma=200;
	var messages=[];
	// ----------- \\
	
	
	
	
	
	
	
	// Objects \\
	var area_data=[
		{ "nothing":0 }, // area 0
		{ "burger":250, "water":100, "bigmac":550 }, // mcdonalds
		{ "dollar":1 }, // bank
		{ "garbage":49, "chugjug":699, "water":99, "pizza":249 } // gas station
	]
  var area_names=[
    "Street: 0",
    "Mcdonalds: 1",
    "Bank: 2",
    "Gas Station: 3"
  ]
	var item_data={
		"nothing": {
			"name": "nothing",
			"useable": true,
			"function": ()=>{message("You did nothing")}
		},
		"burger": {
			"name": "burger",
			"useable": true,
			"function": ()=>{health+=10}
		},
		"water": {
			"name": "water",
			"useable": true,
			"function": ()=>{
				sanity+=10
				if (health>50) {
					health+=10
				}else{
					health+=5
				}
			}
		},
		"bigmac": {
			"name": "bigmac",
			"useable": true,
			"function": ()=>{health+=health*.1; sanity-=5;}
		},
		"dollar": {
			"name": "dollar",
			"useable": true,
			"function": ()=>{bank+=1}
		},
    "garbage": {
      "name": "garbage",
      "useable": true,
      "function": ()=>{sanity-=20;health-=20;message("You ate garbage and you are slowly starting to lose your mind.");}
    },
    "chugjug": {
      "name": "chugjug",
      "useable": true,
      "illegal": true,
      "function": ()=>{health+=karma*.2;sanity+=2;message(`You chugged the jug and gained health by 20% of your karma: +${karma*.2}HP +2SANITY.\nThis item is illegal because of this you have been FINED.`)}
    },
    "pizza": {
      "name": "pizza",
      "useable": true,
      "function": ()=>{health+=20;sanity+=10;message("You have ate pizza. It tastes pretty good. +20HP +10SANITY")}
    }
	}
	// --------------------------\\
	
  
  // Functions \\
  document.getElementById("submit").addEventListener("click", ()=>{
    var text=document.getElementById("input").value;
    command(text);
  });
  
  
	function removeItem(id){
		inventory.splice(id, 1);
	}

	
	function message(text){
		messages.push(text);
	  
    var parent = document.getElementById("scroll");
    var msg = document.createElement("p");
    msg.setAttribute("class", "message");
    msg.innerHTML=text.replaceAll("\n","<br/>");
    parent.appendChild(msg);
	}
	
  
	function changeMoney(location, money){
		message(`${location}ed ${money}`);
		
		if (location=="deposit" && cash>=money && cash>0){
			bank+=money
			cash-=money
		}else if(location=="withdraw" && bank>=money && bank>0){
			bank-=money
			cash+=money
		}
	}
  
  
  function getAllStats(){
    var STATS = {
      health: health,
      sanity: sanity,
      bank: bank,
      cash: cash,
      inventory: inventory,
      area: area,
      karma: karma,
      messages: messages
    }
    return STATS;
  }
	
	
	setInterval(()=>{
		if (karma<=200){
			karma+=5
		}
	}, 3000);
  //------------------------------------------------------------\\
	
	
	
	// Main Command Function \\
	function command(text){
		var args=text.split(" ")
		var cmd=args[0]
		
		message(`[${cmd}]`);
		
		switch(cmd){
			case "goto":
				area=args[1];
				message("Entered area: "+args[1])
				break;
			case "buy":
				var itemName=args[1]
				var price=area_data[area][itemName]
				var item=item_data[itemName]
				
				if (cash>=price) {
					cash-=price;
					inventory.push(item);
					message("Bought item: "+itemName+". Spent: "+price);
					karma+=50;
				}else{
					message("Not enought money! Required amount: "+price)
				}
				break;
			case "use":
				var item=inventory[args[1]];
				
				if(item.illegal!==null){
					karma-=50;
					bank-=100;
				}
				
				if (item.useable===true) {
					item.function();
					message("Used item");
				}else{
					message("Item cannot be used!");
				}
				break;
			case "withdraw":
				var money=parseFloat(args[1]);
				changeMoney("withdraw", money);
				break;
			case "deposit":
				var money=parseFloat(args[1]);
				changeMoney("deposit", money);
				break;
			case "items":
				var items=Object.getOwnPropertyNames(area_data[area]);
				var prices=area_data[area];
				var outputThing="";
				
				message(`Area ${area}'s Items:`);
				for (i=0; i<items.length; i++) {
					outputThing+=`${items[i]} ($${prices[i]})\n`;
				}
				message(outputThing);
				break;
			case "inventory":
				var outputStuff="";
				
				message("Inventory:");
				for (i=0; i<inventory.length; i++) {
					outputStuff+=`${inventory[i].name}\n`;
				}
				message(outputStuff);
				break;
			case "rob":
				if (area==2) {
					if (sanity==100&&health>=100&&bank===0&&karma>=100) {
						var stolenMoney=karma*2*area_data[1].water*.1;
						message(`You robbed the bank and came out with ${stolenMoney}`);
						cash+=stolenMoney;
						karma-=100
					}else{
						message("Failed robbing the bank.\nHealth must be 100\nSanity must be 100\nYou must have 0 dollars in the bank\nYou must have atleast 100 karma.\nFINED 100 DOLLARS FROM BANK ACCOUNT FOR BANK ROBBERY ATTEMPT!!!\nYou have lost 10 Health for failing.");
						bank-=100
					}
				}else if(karma>=100){
					var areaItems=area_data[area];
					var areaItemNames=Object.getOwnPropertyNames(areaItems);
					
					for (var i=0; i<areaItemNames.length; i++) {
						var price=areaItems[areaItemNames[i]];
						var item=item_data[areaItemNames[i]];
						
						message(`Stole item: ${item.name}`);
						item.illegal=true;
						item.name+=" (stolen)";
						
						inventory.push(item);
						areaItems[areaItemNames[i]]=price*1.1;
						
					}
					
					karma-=100;
					message(`You have robbed area ${area}. The prices in that area will be raised by 10%.\nYou will be fined for using the stolen items.`);
					break;
				}else{
					message("Not enought karma. Minimum is 100 karma.")
				}
		}
	}
  //-----------------------------\\
});