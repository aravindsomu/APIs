
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// middlewares
app.use(bodyParser.text());

// start express server
app.listen(80,  () => console.log('Listening on port 80.'));


// View the car table

app.get("/", function(req,res){
    return res.sendFile(__dirname + "/index.html");
});

app.post("/click", function(req,res){
    var grid = [];
    var set = [];
    var i; var j; var k; var cID;
    var states = JSON.parse(req.body).bID;
    var outcome;
    var availableSet = [];

    //0 represents no clicked, 1 is for player, 2 is for computer
    for(i = 0; i<3; i++){
        set = [];
        for(j = 0; j<3; j++){
            set[j] = states.toString().charAt(3*i+j);
        }
        grid.push(set);
    }

    outcome = checkState(grid);

    if(outcome == 3){
        for(k = 0; k<9; k++){
            if(states.toString().charAt(k) == '0'){
                availableSet.push(k+1);
            }
        }
        cID = availableSet[Math.floor(Math.random()*availableSet.length)];
        states = states.substr(0, cID-1) + '2' + states.substr(cID);
        grid[Math.floor((cID-1)/3)][(cID-1)%3] = 2;
        outcome = checkState(grid);
    }

    if(outcome == 0){
        return res.send({text: "Game Tied", state: states.toString(), gameEnd: true});
    }
    else if(outcome == 1){
        return res.send({text: "You win!", state: states.toString(), gameEnd: true});
    }
    else if(outcome == 2){
        return res.send({text: "Computer wins!", state: states.toString(), gameEnd: true});
    }
    else{
        return res.send({text: "Your move", state: states.toString(), gameEnd: false});
    }

});

//pass the 2D state array to this function, return 0 for tie, 1 for player, 2 for computer, 3 for continue
function checkState(state){
    var tie = true;
    var i; var j; var k;
    var set = [];
    var outcome = 3;
    var a;
    var outcomeSet = true;

    for(i = 0; i<3; i++){
        set = [];
        outcomeSet = true;
        for(j = 0; j<3; j++){
            set[j] = state[i][j];
            if(set[j] == 0){
                tie = false;
            }
        }

        a = set[0];
        for(k = 0; k<3; k++){
            if(a != set[k]){
                outcomeSet = false;
            }
        }

        if(outcomeSet == true){
            if(a == 1){
                return 1;
            }
            else if(a == 2){
                return 2;
            }
        }
    }

    outcomeSet = true;

    for(j = 0; j<3; j++){
        set = [];
        outcomeSet = true;
        for(i = 0; i<3; i++){
            set[i] = state[i][j];
            if(set[i] == 0){
                tie = false;
            }
        }

        a = set[0];
        for(k = 0; k<3; k++){
            if(a != set[k]){
                outcomeSet = false;
            }
        }

        if(outcomeSet == true){
            if(a == 1){
                return 1;
            }
            else if(a == 2){
                return 2;
            }
        }
    }

    outcomeSet = true;

    set = [];
    for(i = 0; i<3; i++){
        set[i] = state[i][i];
        if(set[i] == 0){
            tie = false;
        }
    }

    a = set[0];
    for(k = 0; k<3; k++){
        if(a != set[k]){
            outcomeSet = false;
        }
    }

    if(outcomeSet == true){
        if(a == 1){
            return 1;
        }
        else if(a == 2){
            return 2;
        }
    }

    outcomeSet = true;

    set = [];
    for(i = 0; i<3; i++){
        set[i] = state[i][2-i];
        if(set[i] == 0){
            tie = false;
        }
    }

    a = set[0];
    for(k = 0; k<3; k++){
        if(a != set[k]){
            outcomeSet = false;
        }
    }

    if(outcomeSet == true){
        if(a == 1){
            return 1;
        }
        else if(a == 2){
            return 2;
        }
    }

    if(tie == true){return 0;}
    else{return 3;}
}