// --- --- --- initalize global variables --- --- ---
var rps = ["rock","paper","scissor"];
var clientPlayer = {
    name: "",
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0
}
var serverPlayer = {
    name: "",
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0
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
        database.ref("PlayerOne").push({
            name: playerOne
        });

        $("#user-name").text("");
        isPlayerOne = true;

        makeButtonsOne();
    } else if(isPlayerTwo===false){ // --- player two info
        alert("You are player two!");
        playerTwo = $(this).val();
        serverPlayer.name = playerTwo;
        database.ref("PlayerTwo").push({
            name: playerTwo
        });

        $("#user-name").text("");
        isPlayerTwo = true;

        makeButtonsTwo();
    }
});

// --- --- --- make the buttons --- --- ---
function makeButtonsOne() {
    if(isPlayerOne===true){
        for(var a=0; a>rps.length; a++){
            var newButton = $("<button>");
            $("#player-one").append(newButton);
            newButton.text(rps[a]);
            newButton.addClass("rps-button");
            newButton.attr("value",rps[a]);
        }

        var newStats = $("<p>");
        $("#player-one").append(newStats);
        newStats.attr("id","player-one-stats");
        newStats.text("Wins: "+clientPlayer.wins+" Ties: "+clientPlayer.ties+" Losses: "+clientPlayer.losses);
    }
}
function makeButtonsTwo() {
    if(isPlayerOne===true){
        for(var a=0; a>rps.length; a++){
            var newButton = $("<button>");
            $("#player-two").append(newButton);
            newButton.text(rps[a]);
            newButton.addClass("rps-button");
            newButton.attr("value",rps[a]);
        }

        var newStats = $("<p>");
        $("#player-two").append(newStats);
        newStats.attr("id","player-two-stats");
        newStats.text("Wins: "+serverPlayer.wins+" Ties: "+serverPlayer.ties+" Losses: "+serverPlayer.losses);
    }
}