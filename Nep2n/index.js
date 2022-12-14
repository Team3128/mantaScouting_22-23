// Import the functions you need from the SDKs you need
import { getDatabase, ref, child, get, onChildAdded, onValue } from "firebase/database";
import { Chart } from "chart.js/auto"
import { initializeApp } from "firebase/app";
import { DataStructure } from "../dataStructure";
import { Percentile } from "./modules/percentile";
import { DataConverter } from "../decoder";
import { SwitchPage } from "./modules/switchPage";
import { AddTable } from "../addTable"


const dataStructure = new DataStructure()
const firebaseConfig = {
  apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
  authDomain: "escouting-7b4e0.firebaseapp.com",
  databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
  projectId: "escouting-7b4e0",
  storageBucket: "escouting-7b4e0.appspot.com",
  messagingSenderId: "377179821867",
  appId: "1:377179821867:web:cedab35ab708c12986976e",
  measurementId: "G-8VWYRF9QY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


//Navigation
let pageChange = new SwitchPage()
let allNavBtns = document.querySelectorAll(".nav-container");
allNavBtns.forEach((element, index) =>{
  element.addEventListener("click", ()=>{pageChange.switchEvent(allNavBtns[index].getAttribute("name"))})
})
document.addEventListener("keydown", function(e) {
  if(e.key == "Tab"){
    e.preventDefault()
    if(pageChange.toggleState){
      pageChange.hidePanel()
      pageChange.toggleState = false;
    }
    else{
      pageChange.showPanel()
      pageChange.toggleState = true;
    }
  }
  if(e.key == "Enter"){
    if(pageChange.currentState == "search"){
      e.preventDefault();
      search()
    }
    else if (pageChange.currentState == "predict") {
      e.preventDefault();
      predict();
    }
    else if(pageChange.currentState == "compare"){
      e.preventDefault();
      compare();
    }
  }
})

pageChange.switchEvent("predict")

//=============== HOME ===============
var matchData = []
var homeHeadNames = dataStructure.createDataLabels("Match", "Team", "Position", "Scout", 
"Mobility", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", 
"High Cube", "Mid Cube", "Low Cube", "High Cone", "Mid Cone", "Low Cone", "Fumbled", "Climb", "Park",
"Defense Time", "Penalty Count", "Oof Time");

//general table generation
const homeTable = new AddTable();
homeTable.addHeader(homeHeadNames);
var homeTableBody = homeTable.getTableBody();
document.getElementById("table-container").appendChild(homeTable.getTable());
//creating the table labels
var color_tracker = ["b1","b2","b3","r1","r2","r3"]
var homeCache = {};

let setPath = dataStructure.getPath("Matches");
onChildAdded(ref(db, setPath), (snapshot)=>{

  //call the consolidate function here, and add the consolidated data instead
  const data = snapshot.val()
      matchData.push(snapshot.val())
      if(!homeCache.hasOwnProperty(data["Match"])){
        var matchPlaceholder = {}
        for(var i=0; i<6; i++){
          const row = document.createElement("tr");
          matchPlaceholder[color_tracker[i]] = row
          for(var g=0;g<homeHeadNames.length;g++){

            const cellText = document.createElement("div");
            const cell = document.createElement("td");

            if(homeHeadNames[g] == "Position"){
              cellText.innerHTML = color_tracker[i]
            }
            else if(homeHeadNames[g] == "Match"){
              cellText.innerHTML = data["Match"]
            }
            else{
              cellText.innerHTML = "NA";
            }              
            row.appendChild(cell);
            cell.appendChild(cellText);
            homeTableBody.appendChild(row);
          }
        }
        homeCache[data["Match"]] = matchPlaceholder;
      }

      var replaced_row = homeCache[data["Match"]][data["Position"]]
      var row = document.createElement("tr")
      homeTable.addCells(homeHeadNames, data, row);
      homeTableBody.replaceChild(row, replaced_row)
      homeCache[data["Match"]][data["position"]] = row
}
)
console.log(matchData)

//=============== SEARCH ===============
let robotData = []
onChildAdded(ref(db, dataStructure.getPath("Robots")), (snapshot)=>{
  robotData.push(snapshot.val())
  
})
console.log(robotData)

function search( team ){
  //if no team arg is passed, then search() will use the value in the search bar
  if(!team){
    team = document.getElementById("searchbar").value;
    document.getElementById("searchbar").innerHTML = team;
  }
  //if the search bar is still in the default position, then move it
  if(document.getElementById("barContainer").classList.contains("default")){
    document.getElementById("barContainer").classList.remove("default")
    document.getElementById("barContainer").classList.add("active")
  }
  //Checks if robot exists in database
  let teams = [];
  let teamData = [];
  for(let i=0; i<robotData.length; i++){
    teams.push(Object.values(robotData[i])[0]["Team"])
  }
  //TO DO: place pitscouting data
  if(!teams.includes(team)){
    alert("Team does not exist in database")
    return;
  }
  else{
    //team found in database, compiling team data into teamData array for easier access for charts etc. 
    for(let i=0; i<robotData.length; i++){
      if( team == Object.values(robotData[i])[0]["Team"]){
        teamData = Object.values(robotData[i])
      }
    }
  }

  teams = undefined;
  // Image generation here wallim do it

  //General data: Purely quantitative data, no descriptions or words, only numbers and bools
  let generalSearchData = new AddTable()
  let generalLabels = ["Match", "Position", "Mobility", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", "High Cube", "Mid Cube", "Low Cube", "High Cone", "Mid Cone", "Low Cone", "Fumbled"]
  generalSearchData.addHeader(generalLabels);
  //gettin each match
  var row = document.createElement("tr");

  for(let i=0; i<teamData.length; i++){
    //appending each match to a row
    var row = document.createElement("tr");
    var name = generalSearchData.getTableBody();
    name.appendChild(row);
    generalSearchData.addCells(generalLabels, teamData[i], row);
  }
   document.getElementById("dataContainer").appendChild(generalSearchData.table);

   //Qualatative data (Qata): Only descriptions/words
   var qataSearchData = new AddTable()
   let qataLabels = ["Match", "Position", "Scout", "Climb", "Park", "Defense Time", "Penalty Count", "Oof Time", "Climb QATA", "Link QATA", "QATA"]
   qataSearchData.addHeader(qataLabels);
   //gettin each match
   for(let i=0; i<teamData.length; i++){
     //appending each match to a row
     var row = document.createElement("tr");
      var name = qataSearchData.getTableBody();
      name.appendChild(row);
      qataSearchData.addCells(qataLabels, teamData[i], row);
   }
    document.getElementById("qataContainer").appendChild(qataSearchData.table);

  //Misc data: Drivetrain, turret

  //chart/graph: Radar graph of most important data
  //resetting canvas
  document.getElementById("chartContainer").remove()
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "chartContainer");
  document.getElementById("search").appendChild(canvas);
  //percentile work
  let percentile = new Percentile(robotData);
  percentile.convertRawToObject().processObjectData().sortPercentile()
  //td = team data
  let td = percentile.findAverageOfTeam(team)
  //d = data, which gets put into the chart
  let d = [
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Auto Points")], "Auto Points"),
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Tele Cubes")], "Tele Cubes"),
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Tele Cones")], "Tele Cones"),
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Tele Accuracy")], "Tele Accuracy"),
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Endgame Points")], "Endgame Points"),
    percentile.findPercentileOf(td[percentile.percentileObject[0].indexOf("Defense Time")], "Defense Time")
  ]
  //chart setup
  const data = {
    labels: [
      'Auto points', 
      'Tele cubes',
      'Tele cones',
      'Tele Accuracy',
      'Endgame points',
      'Defense time',
    ],
    datasets: [{
      label: ("Team " + team + " Percentiles"),
      data: d,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };
  //making the chart
  new Chart(
    document.getElementById("chartContainer"), {
      type: "radar", 
      data: data,
      options : {
        elements:{
          line: {
            borderWidth: 3
          }
        }
      }
    }
  )
  
}
//=============== COMPARE ===============
let cRobotData = []
onChildAdded(ref(db, dataStructure.getPath("Robots")), (snapshot)=>{
  cRobotData.push(snapshot.val())
})
console.log(cRobotData)

//generates stab data for team
function comptext(team){
  if(!team){
    team = document.getElementById("c-searchbar").value;
    document.getElementById("c-searchbar").innerHTML = team;
  }
  if(document.getElementById("c-barContainer").classList.contains("default")){
    document.getElementById("c-barContainer").classList.remove("default")
    document.getElementById("c-barContainer").classList.add("active")
  }

  let teams = [];
  let teamData = [];
  for(let i = 0; i < cRobotData.length; i++){
    teams.push(Object.values(robotData[i])[0]["Team"])
  }
  if(!teams.includes(team)){
    alert("Team does not exist in databse")
    return;
  }
  else{
    for(let i = 0; i < cRobotData.length; i++){
      if(team == Object.values(cRobotData[i])[0]["Team"]){
        teamData = Object.values(cRobotData[i])
      }
    }
  }
  console.log(teamData)
  teams = undefined;

  var gencomparedata = new AddTable()
  let genlabels = ["Match", "Team", "Position", "Scout", 
  "Mobility", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", 
  "High Cube", "Mid Cube", "Low Cube", "High Cone", "Mid Cone", "Low Cone", "Fumbled", "Climb", "Park",
  "Defense Time", "Penalty Count", "Oof Time"]
  gencomparedata.addHeader(genlabels);
  
  for(let i = 0; i < teamData.length; i++){
    var row = document.createElement("tr");
    var name = gencomparedata.getTableBody();
    name.appendChild(row);
    gencomparedata.addCells(genlabels, teamData[i], row);
  }  
  document.getElementById("c-dataContainer").appendChild(gencomparedata.table);

  var qatacomparedata = new AddTable();
  let qatalabels = ["Match", "Position", "Scout", "Climb QATA", "Link QATA", "QATA"];
  qatacomparedata.addHeader(qatalabels);

  for(let i = 0; i < teamData.length; i++){
    var row = document.createElement("tr");
    var name = qatacomparedata.getTableBody();
    name.appendChild(row);
    qatacomparedata.addCells(qatalabels, teamData[i], row);
  }
  document.getElementById("c-qataContainer").appendChild(qatacomparedata.table);
}


//chart function -- generates radar chart
function compchart(team){
  if(!team){
    team = document.getElementById("c-searchbar").value;
    document.getElementById("c-searchbar").innerHTML = team;
  }

  let percentile;
  onValue(ref(db, 'Events/Nep2nTest/Robots/'), (data)=>{
    data = data.val()
    percentile = new Percentile(data);
    percentile.convertRawToObject().processObjectData()
    percentile.sortPercentile();
  })
  const data = {
    labels: [
      "Auto Total",
      "Tele Total",
      "Climb Total",
      "Defense Time",
      "Fumbled Total",
      "Penalty Total"
    ],
    datasets: [{
      label: ("Team " + team + " Percentiles"),
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };
  new Chart(
    document.getElementById("c-chartContainer"), {
      type: "radar", 
      data: data,
      options : {
        elements:{
          line: {
            borderWidth: 3
          }
        }
      }
    }
  )
}

//REAL COMPARE FUNCTION WOOOOOO
function compare(){
  comptext(document.getElementById("c-searchbar").value);


  compchart(document.getElementById("c-searchbar").value);
}
//=============== RANKING ===============
var rankHeadNames = dataStructure.createDataLabels("Rank","Team","Score",
"Mobility",
"Auto High Cube",
"Auto Mid Cube",
"Auto Low Cube",
"Auto High Cone",
"Auto Mid Cone",
"Auto Low Cone",
"Auto Fumbled",
"Auto Climb", 
"High Cube",
"Mid Cube",
"Low Cube",
"High Cone",
"Mid Cone",
"Low Cone",
"Fumbled",
"Climb", 
"Park", 
"Defense Time",
"Penalty Count",
"Oof Time");
  //general table generation
  const rankTable = new AddTable();
  rankTable.addHeader(rankHeadNames);
  var rankTableBody = rankTable.getTableBody();
  document.getElementById("rank-container").appendChild(rankTable.getTable());

  function displayRankings(data, rankHeadNames){
    var robotNames = Object.keys(data)
    var dataLabelsToCalc = rankHeadNames.splice(3);
    //for loop over each robot
    for(var i=0;i<robotNames.length;i++){
    var robot = data[robotNames[i]];
    dataStructure.calcRobotPtAvgs(dataLabelsToCalc, robot);
    }
    //sorts all the avgs
    var robotRankByPt = dataStructure.calcRobotRanking();
    var storedRobotsTotalPtAvg = dataStructure.getStoredRobotsTotalPtAvg();
    var storedRobotsAvgPtVals = dataStructure.getStoredRobotsAvgPtVals();
    var allRobotPts = Object.keys(storedRobotsTotalPtAvg);
    var rank_counter = 1;

    //has to reset everytime, see above for reason why (firebase api)
    rankTableBody.innerHTML = ""
    //goes through all the avg, the by each avg, from greatest to least, checks all robots that have that avg then displays it in the table
    for(var i=robotRankByPt.length-1;i>=0;i--){
      for(var f=0; f<allRobotPts.length;f++){
        if(storedRobotsTotalPtAvg[allRobotPts[f]] == robotRankByPt[i]){
        
          var row = document.createElement("tr");
          rankTableBody.appendChild(row);
          rankTable.addCell(rank_counter, row);
          rankTable.addCell(allRobotPts[f], row);
          rankTable.addCell(storedRobotsTotalPtAvg[allRobotPts[f]], row);

          //adds avg data to the row, then is displayed on the table
          
          var robotAvgVals = storedRobotsAvgPtVals[allRobotPts[f]]
          rankTable.addCells(dataLabelsToCalc, robotAvgVals, row);
        }
      }
      rank_counter+=1
    }
  }

  setPath = dataStructure.getPath("Robots");
  onValue(ref(db, setPath), (snapshot)=>{
    const data = snapshot.val()
    displayRankings(data,rankHeadNames)
  }
  )

//=============== PREDICT ===============
// uses robotData object in Search 
let avgFilterLabelsAuto = dataStructure.getFilterLabelsAuto();
let avgFilterLabelsTele = dataStructure.getFilterLabelsTele();
let autoPtValues = dataStructure.getAutoPtValues();
let telePtValues = dataStructure.getTelePtValues();
function predict() {
  // reset html elements
  document.getElementById("blueVals").innerHTML = "";
  document.getElementById("redVals").innerHTML = "";
  // get team numbers and set up variables for team info
  let blues = [
    parseInt(document.getElementById("blue1").value),
    parseInt(document.getElementById("blue2").value),
    parseInt(document.getElementById("blue3").value)
  ];
  let reds = [
    parseInt(document.getElementById("red1").value),
    parseInt(document.getElementById("red2").value),
    parseInt(document.getElementById("red3").value)
  ];
  let blueInfo = {0: {}, 1: {}, 2: {}};
  let redInfo = {0: {}, 1: {}, 2: {}};
  // set scores to start at 0
  let blueScores = {"auto" : {}, "teleop" : {}, "total" : {}};
  let redScores = {"auto" : {}, "teleop" : {}, "total" : {}};
  let blueScore = 0;
  let redScore = 0;
  // initialize tables with headers
  const blueAllianceTable = new AddTable();
  var blueTableBody = blueAllianceTable.getTableBody();
  const redAllianceTable = new AddTable();
  var redTableBody = redAllianceTable.getTableBody();
  var blueRobotsHeader = dataStructure.createDataLabels("Blue Teams", ...blues);
  var redRobotsHeader = dataStructure.createDataLabels("Red Teams", ...reds);
  blueAllianceTable.addHeader(blueRobotsHeader);
  redAllianceTable.addHeader(redRobotsHeader);
  // vertical headers
  var gameStageHeader = dataStructure.createDataLabels("Auto", "Teleop", "Total");
  // getting data on each robot
  for (let i = 0; i < robotData.length; i++) {
    let team = Object.values(robotData[i])[0]["Team"];
    for (let j = 0; j < blues.length; j++) {
      if (blues[j] == team) blueInfo[j] = Object.values(robotData[i]);
    }
    for (let j = 0; j < reds.length; j++) {
      if (reds[j] == team) redInfo[j] = Object.values(robotData[i]);
    }
  }
  // calculating scores for each robot on each team
  for (let i = 0; i < blues.length; i++) {
    let currentRobotData = blueInfo[i];
    let autoScore = 0.0;
    let teleScore = 0.0;
    if (currentRobotData.length == undefined) {
      blueScores["auto"][i] = -1;
      blueScores["teleop"][i] = -1;
      blueScores["total"][i] = -1;
      continue;
    }

    autoScore += dataStructure.calcAutoPts(currentRobotData)

    teleScore += dataStructure.calcTelePts(currentRobotData)

    console.log(dataStructure.storedRobotAutoPts)
    console.log(dataStructure.storedRobotTelePts)

    blueScores["auto"][i] = autoScore;
    blueScores["teleop"][i] = teleScore;
    blueScores["total"][i] = autoScore + teleScore;
    blueScore += autoScore + teleScore;
  }
  for (let i = 0; i < reds.length; i++) {
    let currentRobotData = redInfo[i];
    let autoScore = 0.0;
    let teleScore = 0.0;
    if (currentRobotData.length == undefined) {
      redScores["auto"][i] = -1;
      redScores["teleop"][i] = -1;
      redScores["total"][i] = -1;
      continue;
    }

    for (let j = 0; j < avgFilterLabelsAuto.length; j++) {
      let avgVal = 0.0;
      for (let k = 0; k < currentRobotData.length; k++) {
        avgVal += currentRobotData[k][avgFilterLabelsAuto[j]] / currentRobotData.length;
      }
      autoScore += avgVal * autoPtValues[j];
    }
    for (let j = 0; j < avgFilterLabelsTele.length; j++) {
      let avgVal = 0.0;
      for (let k = 0; k < currentRobotData.length; k++) {
        avgVal += currentRobotData[k][avgFilterLabelsTele[j]] / currentRobotData.length;
      }
      teleScore += avgVal * telePtValues[j];
    }

    redScores["auto"][i] = autoScore;
    redScores["teleop"][i] = teleScore;
    redScores["total"][i] = autoScore + teleScore;
    redScore += autoScore + teleScore;
  }
  for (let i = 0; i < gameStageHeader.length; i++) {
    var blueRow = document.createElement("tr");
    var redRow = document.createElement("tr");
    blueTableBody.appendChild(blueRow);
    redTableBody.appendChild(redRow);
    // add vertical headers
    blueAllianceTable.addCell(gameStageHeader[i], blueRow, true);
    redAllianceTable.addCell(gameStageHeader[i], redRow, true);
    for (let j = 0; j < 3; j++) {
      console.log(blueScores[gameStageHeader[i].toLowerCase()][j])
      let blueScoreVal = blueScores[gameStageHeader[i].toLowerCase()][j].toFixed(1);
      if (blueScoreVal == -1) {
        blueScoreVal = "NA"
      }
      let redScoreVal = redScores[gameStageHeader[i].toLowerCase()][j].toFixed(1);
      if (redScoreVal == -1) {
        redScoreVal = "NA"
      }
      blueAllianceTable.addCell(blueScoreVal, blueRow);
      redAllianceTable.addCell(redScoreVal, redRow);
    }
  }
  document.getElementById("blueVals").appendChild(blueAllianceTable.getTable());
  document.getElementById("redVals").appendChild(redAllianceTable.getTable());
  document.getElementById("points").innerHTML = "Blue: " + blueScore.toFixed(1) + "<br>Red: " + redScore.toFixed(1);
  // set winner
  let w = document.getElementById("winner");
  if (blueScore > redScore) {
    w.innerHTML = "BLUE WINS";
  } else if (redScore > blueScore) {
    w.innerHTML = "RED WINS";
  } else {
    w.innerHTML = "TIE";
  }
}
//=============== SETTINGS ===============
var settingWghtHeadNames = dataStructure.createDataLabels("Mobility",
"Auto High Cube",
"Auto Mid Cube",
"Auto Low Cube",
"Auto High Cone",
"Auto Mid Cone",
"Auto Low Cone",
"Auto Fumbled",
"Auto Climb", 
"High Cube",
"Mid Cube",
"Low Cube",
"High Cone",
"Mid Cone",
"Low Cone",
"Fumbled",
"Climb", 
"Park", 
"Defense Time",
"Penalty Count",
"Oof Time");

//general table generation
const settingWghtTable = new AddTable();
settingWghtTable.addHeader(settingWghtHeadNames);
var settingWghtTableBody = settingWghtTable.getTableBody();
document.getElementById("settings-wght-container").appendChild(settingWghtTable.getTable());

var row = document.createElement("tr");
settingWghtTableBody.appendChild(row);
var txtBoxes = [];

for(var i=0;i<settingWghtHeadNames.length;i++){
  var weights = dataStructure.getWghtValues()
  txtBoxes.push(settingWghtTable.addTextCell(weights[i], row));
}
function getNewWeights(){
  var newWeights = [];
  for(var i=0;i<settingWghtHeadNames.length;i++){
    newWeights.push(txtBoxes[i].value)
  }
  dataStructure.changeWghtValues(newWeights)
  var rankHeadNames = dataStructure.createDataLabels("Rank","Team","Score",
"Mobility",
"Auto High Cube",
"Auto Mid Cube",
"Auto Low Cube",
"Auto High Cone",
"Auto Mid Cone",
"Auto Low Cone",
"Auto Fumbled",
"Auto Climb", 
"High Cube",
"Mid Cube",
"Low Cube",
"High Cone",
"Mid Cone",
"Low Cone",
"Fumbled",
"Climb", 
"Park", 
"Defense Time",
"Penalty Count",
"Oof Time");
  setPath = dataStructure.getPath("Robots");
  get(ref(db, setPath)).then((snapshot) => {
    var data = snapshot.val()
    displayRankings(data,rankHeadNames)
  })
}
document.getElementById("wghtBtn").addEventListener("click", getNewWeights);



