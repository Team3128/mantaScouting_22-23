// Import the functions you need from the SDKs you need
import { getDatabase, ref, child, get, onChildAdded, onValue } from "firebase/database";
import { Chart } from "chart.js/auto"
import { initializeApp } from "firebase/app";
import { DataStructure } from "./modules/dataStructure";
import { Percentile } from "./modules/percentile";
import { DataConverter } from "./modules/decoder";
import { SwitchPage } from "./modules/switchPage";
import { AddTable } from "./modules/addTable"


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
    
  }
})

pageChange.switchEvent("search")

//=============== HOME ===============
var matchData = []
var homeHeadNames = dataStructure.createDataLabels("Match" , "Team"  , "Position", "Scout" , "Taxi"  , "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Points", "Climb Time", "Defense Time", "Penalty", "Oof Time", "Yeet");

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
  console.log(teamData)
  teams = undefined;
  // Image generation here wallim do it

  //General data: Purely quantitative data, no descriptions or words, only numbers and bools
  var generalSearchData = new AddTable()
  let generalLabels = ["Match", "Position", "Auto High", "Auto Low", "Auto Missed", "Taxi", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Points", "Climb Time", "Defense Time", "Penalty", "Oof Time"]
  generalSearchData.addHeader(generalLabels);
  //gettin each match
  for(let i=0; i<teamData.length; i++){
    //appending each match to a row
    generalSearchData.getTableBody().appendChild(generalSearchData.addCells(generalLabels, teamData[i], generalSearchData.createRow()))
  }
   document.getElementById("dataContainer").appendChild(generalSearchData.table);

   //Qualatative data (Qata): Only descriptions/words
   var qataSearchData = new AddTable()
   let qataLabels = ["Match", "Position", "Scout", "Yeet", "QATA"]
   qataSearchData.addHeader(qataLabels);
   //gettin each match
   for(let i=0; i<teamData.length; i++){
     //appending each match to a row
     qataSearchData.getTableBody().appendChild(qataSearchData.addCells(qataLabels, teamData[i], qataSearchData.createRow()))
   }
    document.getElementById("qataContainer").appendChild(qataSearchData.table);

  //Misc data: Drivetrain, turret

  //chart/graph: Radar graph of most important data
  let percentile;
  onValue(ref(db, 'Events/Nep2nTest/Robots/'), (data)=>{
    data = data.val()
    percentile = new Percentile(data);
    percentile.convertRawToObject().processObjectData()
    percentile.sortPercentile();
  })
  const data = {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
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

//func starts here
function compare(team1, team2){
  //args for compare
  if(!team1){
    team1 = document.getElementById("1-searchbar").value;
    document.getElementById("1-searchbar").innerHTML = team1;
  }
  if(!team2){
    team2 = document.getElementById("2-searchbar").value;
    document.getElementById("2-searchbar").innerHTML = team2;
  }
  //move searchbar from default
  if(document.getElementById("1-barContainer").classList.contains("default")){
    document.getElementById("1-barContainer").classList.remove("default")
    document.getElementById("1-barContainer").classList.add("active")
  }
  if(document.getElementById("2-barContainer").classList.contains("default")){
    document.getElementById("2-barContainer").classList.remove("default")
    document.getElementById("2-barContainer").classList.add("active")
  }

  //does it exist? yoinked from search
  let teams = [];
  let teamDataOne = [];
  let teamDataTwo = [];
  for(let i = 0; i < cRobotData.length; i++){
    teams.push(Object.values(cRobotData[i])[0]["Team"])
  }
  //t1
  if(!teams.includes(team1)){
    alert("Team 1 does not exist in databse")
    return;
  }
  else{
    for(let i = 0; i < cRobotData.length; i++){
      if(team1 == Object.values(cRobotData[i])[0]["Team"]){
        teamDataOne = Object.values(cRobotData[i])
      }
    }
  }

  //t2
  if(!teams.includes(team2)){
    alert("Team 2 does not exist in databse")
    return;
  }
  else{
    for(let i = 0; i < cRobotData.length; i++){
      if(team2 == Object.values(cRobotData[i])[0]["Team"]){
        teamDataTwo = Object.values(cRobotData[i])
      }
    }
  }

  console.log(teamDataOne);
  console.log(teamDataTwo);
  teams = undefined;

  //gen data
  //t1
  var genDataOne = new AddTable()
  let genLabels = ["Match", "Team", "Position", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", "High Cube", "Mid Cube", "Low Cube", "High Cone", "Mid Cone", "Low Cone", "Fumbled", "Climb", "Park", "Defense Time", "Penalty Count", "Oof Time"]
  genDataOne.addHeader(genLabels);

  //pull match
  for(let i = 0; i<teamDataOne.length; i++){
    genDataOne.getTableBody().appendChild(genDataOne.addCells(genLabels, teamData[i], genDataOne.createRow()))
  }
  document.getElementById("1-dataContainer").appendChild(genDataOne.table);

  //t2
  var genDataTwo = new AddTable();
  genDataTwo.addHeader(genLabels);

  //pull match
  for(let i = 0; i<teamDataTwo.length; i++){
    genDataTwo.getTableBody().appendChild(genDataTwo.addCells(genLabels, teamData[i], genDataTwo.createRow()))
  }
  document.getElementById("2-dataContainer").appendChild(genDataTwo.table);

  //qata things
  //t1
  var qataOne = new AddTable()
  let qataLabels = ["Match", "Position", "Scout", "Climb QATA", "Link QATA", "QATA"]
  qataOne.addHeader(qataLabels);
  //pull match
  for(let i = 0; i < teamDataOne.length; i++){
    qataOne.getTableBody().appendChild(qataOne,addCells(qataLabels, teamDataOne[i], qataOne.createRow()))
  }
  document.getElementById("1-qataContainer").appendChild(qataOne.table);

  //t2
  let qataTwo = new AddTable()
  qataTwo.addHeader(qataLabels);
  //pull match
  for(let i = 0; i < teamDataTwo.length; i++){
    qataTwo.getTableBody().appendChild(qataOne, addCells(qataLabels, teamDataTwo[i], qataTwo.createRow()))
  }
  document.getElementById("2-qataContainer").appendChild(qataTwo.table);

  //graphs -- do later 
}

