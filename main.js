// --- --- --- initalize global variables --- --- ---
var rps = ["rock","paper","scissor"];
var clientPlayer = {
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0
}
var serverPlayer = {
    selection: "",
    wins: 0,
    ties: 0,
    losses: 0
}
var isClientLoaded = false;
var isServerLoaded = false;

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

// --- --- --- user input --- --- ---
