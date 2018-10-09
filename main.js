// --- --- --- initalize global variables --- --- ---
var rps = ["rock","paper","scissor"];
var clientPlayer = {
    name: "",
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0,
    isPlayerOne: false
}
var serverPlayer = {
    name: "",
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0,
    isPlayerTwo: false
}
var isPlayerOne = false;
var isPlayerTwo = false;
var readyOne = false;
var readyTwo = false;

// --- --- --- set up firebase data --- --- ---
var config = {
    apiKey: "AIzaSyAT1Z4PlhaiSGHSLEsVVrSOe6YwUMcEf0k",
    authDomain: "my-awesome-project-a164c.firebaseapp.com",
    databaseURL: "https://my-awesome-project-a164c.firebaseio.com",
    projectId: "my-awesome-project-a164c",
    storageBucket: "my-awesome-project-a164c.appspot.com",
    messagingSenderId: "543640538062"
};

firebase.initializeApp(config);
var database = firebase.database();

// --- --- --- username input --- --- ---
$("#submit-name").on("click",function(){
    var playerOne = "";
    var playerTwo = "";

    if(isPlayerOne===false){ // --- player one info
        alert("You are player one!");
        playerOne = $(this).val();
        clientPlayer.name = playerOne;

        $("#user-name").text("");
        isPlayerOne = true;

        makeButtonsOne();
        database.ref("PlayerOne").push({
            name: playerOne,
            isPlayerOne: true
        });
    } else if(isPlayerTwo===false){ // --- player two info
        alert("You are player two!");
        playerTwo = $(this).val();
        serverPlayer.name = playerTwo;

        $("#user-name").text("");
        isPlayerTwo = true;

        makeButtonsTwo();
        database.ref("PlayerTwo").push({
            name: playerTwo,
            isPlayerTwo: true
        });
    }
});

// --- --- --- make the buttons --- --- ---
function makeButtonsOne() {
    if(isPlayerOne===true){
        for(var a=0; a>rps.length; a++){
            var newButton = $("<button>");
            $("#player-one").append(newButton);
            newButton.text(rps[a]);
            newButton.addClass("rps-button-one");
            newButton.attr("value",rps[a]);
        }

        var newStats = $("<p>");
        $("#player-one").append(newStats);
        newStats.attr("id","player-one-stats");
        newStats.text("Wins: "+clientPlayer.wins+" Ties: "+clientPlayer.ties+" Losses: "+clientPlayer.losses);
    }
}
function makeButtonsTwo() {
    if(isPlayerTwo===true){
        for(var a=0; a>rps.length; a++){
            var newButton = $("<button>");
            $("#player-two").append(newButton);
            newButton.text(rps[a]);
            newButton.addClass("rps-button-two");
            newButton.attr("value",rps[a]);
        }

        var newStats = $("<p>");
        $("#player-two").append(newStats);
        newStats.attr("id","player-two-stats");
        newStats.text("Wins: "+serverPlayer.wins+" Ties: "+serverPlayer.ties+" Losses: "+serverPlayer.losses);
    }
}

// --- --- --- grab button info --- --- ---
$(".rps-button-one").on("click",function(){
    if(readyOne===false){
        clientPlayer.selection = $(this).attr("value");
        alert(clientPlayer.name + " has selected");
        readyOne = true;
    }
});
$(".rps-button-two").on("click",function(){
    if(readyTwo===false){
        serverPlayer.selection = $(this).attr("value");
        alert(serverPlayer.name + " has selected");
        readyTwo = true;
    }
});

// --- --- --- compare gathered info --- --- ---
function compareInfo(playerOneSelection,playerTwoSelection){
    if(playerOneSelection===playerTwoSelection){
        clientPlayer.ties++;
        serverPlayer.ties++;
    }  else if(playerOneSelection=="rock"&&playerTwoSelection=="scissor"){
        clientPlayer.wins++;
        serverPlayer.losses++;
    } else if(playerOneSelection=="paper"&&playerTwoSelection=="rock"){
        clientPlayer.wins++;
        serverPlayer.losses++;
    } else if(playerOneSelection=="scissors"&&playerTwoSelection=="rock"){
        clientPlayer.wins++;
        serverPlayer.losses++;
    } else if(playerTwoSelection=="rock"&&playerOneSelection=="scissor"){
        clientPlayer.losses++;
        serverPlayer.wins++;
    } else if(playerTwoSelection=="paper"&&playerOneSelection=="rock"){
        clientPlayer.losses++;
        serverPlayer.wins++;
    } else if(playerTwoSelectionn=="scissors"&&playerOneSelection=="rock"){
        clientPlayer.losses++;
        serverPlayer.wins++;
    }
}

function updateData(){
    database.ref("PlayerOne").push({
        wins: clientPlayer.wins,
        losses: clientPlayer.losses,
        ties: clientPlayer.ties
    });
    database.ref("PlayerTwo").push({
        wins: serverPlayer.wins,
        losses: serverPlayer.losses,
        ties: serverPlayer.ties
    });
}