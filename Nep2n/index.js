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
      compgen();
    }
  }
})

pageChange.switchEvent("search")

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
    generalSearchData.getTableBody().appendChild(generalSearchData.addCells(generalLabels, teamData[i], generalSearchData.appendChild(row)))
  }
   document.getElementById("dataContainer").appendChild(generalSearchData.table);

   //Qualatative data (Qata): Only descriptions/words
   var qataSearchData = new AddTable()
   let qataLabels = ["Match", "Position", "Scout", "Climb", "Park", "Defense Time", "Penalty Count", "Oof Time", "Climb QATA", "Link QATA", "QATA"]
   qataSearchData.addHeader(qataLabels);
   //gettin each match
   for(let i=0; i<teamData.length; i++){
     //appending each match to a row
     qataSearchData.getTableBody().appendChild(qataSearchData.addCells(qataLabels, teamData[i], qataSearchData.createRow()))
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
function compgen(team){
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

//REAL COMPARE FUNCTION WOOOOOO
// function compare(){

// }
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

  setPath = dataStructure.getPath("Robots");
  onValue(ref(db, setPath), (snapshot)=>{
    const data = snapshot.val()
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
  )
//=============== PREDICT ===============
function predict() {
  // get team numbers
  let b1 = parseInt(document.getElementById("blue1").value);
  let b2 = parseInt(document.getElementById("blue2").value);
  let b3 = parseInt(document.getElementById("blue3").value);
  let r1 = parseInt(document.getElementById("red1").value);
  let r2 = parseInt(document.getElementById("red2").value);
  let r3 = parseInt(document.getElementById("red3").value);
  // set scores
  let blueScore = 0;
  let redScore = 0;
  console.log(b1 + " " + b2 + " " + b3 + " " + r1 + " " + r2 + " " + r3);
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