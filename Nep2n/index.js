// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { DataStructure } from "./modules/dataStructure";
import { Percentile } from "./modules/percentile";
import { DataConverter } from "./modules/decode";
import { getDatabase, ref, child, get } from "firebase/database";
import { SwitchPage } from "./modules/switchPage";



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
const dbRef = ref(getDatabase());

get(child(dbRef, "Events/BB2022/Robots")).then((snapshot) => {
})


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
})

//Home
var homeHeadNames = dataStructure.createDataLabels("Match" , "Team"  , "Position", "Scout" , "Taxi"   , "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Points", "Climb Time", "Defense Time", "Penalty", "Oof Time", "Yeet");
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
            //console.log(data[color[i]][j+1][headNames[g]])
          }
        }
        homeCache[data["Match"]] = matchPlaceholder;
      }

      var replaced_row = homeCache[data["Match"]][data["Position"]]
      var row = document.createElement("tr")
      homeTable.addCells(homeHeadNames, data, row);
      let color = data["Position"][0]
      row.style.backgroundColor = "var(--" + color + ")"
      row.style.color = "var(--text-color)"
      homeTableBody.replaceChild(row, replaced_row)
      homeCache[data["Match"]][data["position"]] = row
}
)

