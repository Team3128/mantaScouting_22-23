const dataStructure = new DataStructure();
const db = dataStructure.getFireBase();
console.log("success")

//
//=======================
//SEARCH TAB
var searchState = true;

//gathers all the data under the path, not sure what it returns if path does not exist yet
//displays all the data that can be gathered
  function search(team) {
    document.getElementById("miscData").innerHTML = "";
    document.getElementById("graphContainer").innerHTML = "";
    document.getElementById("dataContainer").innerHTML = "";
    document.getElementById("qataContainer").innerHTML = "";
    document.getElementById("imgContainer").innerHTML = "";
    document.getElementById("pitsData").innerHTML = "";
    //transition to display page
    if (searchState) {
        document.getElementById("searchbar").classList.remove("searchmain");
        document.getElementById("searchbar").classList.add("searchbar");
        searchState = false;
    }

    function generateRobotData(robotData){
      if(robotData){
        //gets the specific robots data
      var matches = Object.keys(robotData)
      //as of right now it is called misc, should be changed for redability
      //displays the drive train and shooter from the match date from scouting app, code should be changed
      //to scan over the data and take the most said drivetrain/shooter, not just taking the first matches data
      let misc_container = document.getElementById("miscData"); 
      let misc_arr = [
          ["Drivetrain", "Shooter"],
          [robotData[matches[0]]["Drivetrain Type"], robotData[matches[0]]["Shooter Type"]]
      ]
      const tbl = document.createElement("table");
      const tblBody = document.createElement("tbody");
      for (let i = 0; i < 2; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < 2; j++) {
              const cell = document.createElement("td");
              cell.innerHTML = misc_arr[j][i];
              row.appendChild(cell);
          }
          tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
      misc_container.appendChild(tbl);
  
  
      //displays the graph, is really janky due to lack of time, pulls robot avg from robot_avg_tracker in table cache.js
      //takes taxi, auto high, tele high, climb level and defense time avg to display
      var graphLabels = ["Taxi", "Auto High", "Tele High", "Climb Level", "Defence Time"]
      var marksData = {
        labels: graphLabels,
        datasets: [{
          label: team,
          backgroundColor: "rgba(255,0,0,0.2)",
          data: [
            storedRobotsAvgPtVals[team]["Taxi"],
            storedRobotsAvgPtVals[team]["Auto High"],
            storedRobotsAvgPtVals[team]["Tele High"],
            storedRobotsAvgPtVals[team]["Climb Level"],
            storedRobotsAvgPtVals[team]["Defence Time"]
        ]
        }
      ]
      }
      var holder = document.createElement("canvas")
      var robotChart = new Chart(holder, {
          type: "radar",
          data: marksData,
          options:{
  
          }
      })
      document.getElementById("graphContainer").appendChild(holder)
  
      
      //displays the data from the all the matches the robot played
      //this is the specific data that we want pulled from the matches
      var data_display = [
        "ZMatch Number",
        "Alliance Color",
        "Taxi",
        "Auto High",
        "Auto Low",
        "Auto Missed",
        "Tele High",
        "Tele Low",
        "Tele Missed",
        "Attempted Climb",
        "Climb Level",
        "Climb Time",
        "Defence Time",
        "Penalty",
        "Yeet",
        "Oof"
      ];
    //using the data_display above, it creates a table header and prepares the body for code below
      let tb2 = document.createElement("table");
    let tb2thead = document.createElement("thead")
    tb2.appendChild(tb2thead)
    let tb2Body = document.createElement("tbody");
    let tb2headRow = document.createElement("tr")
    tb2thead.appendChild(tb2headRow)
    tb2.appendChild(tb2Body);
      for(var b =0; b<data_display.length; b++){
        const headCell = document.createElement("th");
        tb2headRow.appendChild(headCell);
        headCell.classList.add("headCell")
        headCell.setAttribute("id", `head_cell_${b}`)
        headCell.innerHTML = data_display[b]
      }
      document.getElementById("dataContainer").appendChild(tb2);
      //this is the code that goes into the body, going match by match and adding a new row to the table body for each match
      //currentlty is not ordered by match, due to matching numbering error (01 is counted as a string, messing things up)
      for(var f=0;f<matches.length;f++){
         var row = document.createElement("tr");
        for(var g=0;g<data_display.length;g++){
          const cellText = document.createElement("div");
          const pushinP = document.createElement("p");
          const cell = document.createElement("td");
    
          pushinP.innerHTML = robotData[matches[f]][data_display[g]];
    
          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);
          //console.log(data[color[i]][j+1][headNames[g]])
          
          let color = robotData[matches[f]]["Alliance Color"][0];
          row.style.backgroundColor = "var(--" + color + ")"
          row.style.color = "var(--text-color)"
    
        }
        tb2.appendChild(row)
      }
    
      
      //similar to the code above for the match data, it pulls from the same spot except this time it is just the qata
      //below for setting up the qata display is bad code, can be condensed, cleaned up
      let tb3 = document.createElement("table");
      let tb3thead = document.createElement("thead")
      tb3.appendChild(tb3thead)
      let tb3Body = document.createElement("tbody");
      let tb3headRow = document.createElement("tr")
      tb3thead.appendChild(tb3headRow)
      tb3.appendChild(tb3Body);
      var headCell = document.createElement("th");
      tb3headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = "Matches"
      headCell = document.createElement("th");
      tb3headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = "QATA"
      tb3.appendChild(tb3Body);
      //like above code it gets all the qata by match and displays it, out of order as of right now, problem with formatting in db
      for(var d=0;d<matches.length;d++){
        var row = document.createElement("tr");
        var cellText = document.createElement("div");
        var pushinP = document.createElement("p");
        var cell = document.createElement("td");
    
        pushinP.innerHTML = matches[d];
    
        row.appendChild(cell);
        cell.appendChild(cellText);
        cellText.appendChild(pushinP);
  
        cellText = document.createElement("div");
        pushinP = document.createElement("p");
        cell = document.createElement("td");
    
        pushinP.innerHTML = robotData[matches[d]]["QATA"];
    
        row.appendChild(cell);
        cell.appendChild(cellText);
        cellText.appendChild(pushinP);
        tb3Body.appendChild(row)
      }
  
      document.getElementById("qataContainer").appendChild(tb3);
      
      }else{ //just displays that the data is not available
        document.getElementById("miscData").innerHTML = "NO MISC AVAILABLE YET";
      document.getElementById("graphContainer").innerHTML = "NO GRAPH AVAILABLE YET";
      document.getElementById("dataContainer").innerHTML = "NO DATA AVAILABLE YET";
      document.getElementById("qataContainer").innerHTML = "NO QATA AVAILABLE YET";
      }
    }
    dataStructure.searchAndShowRobotData("Robots", team, db, generateRobotData);

    //dispalys image, if robot does not exist under it say data unavailable
    if(robotImgs){
      var imgData = robot_imgData[team]
      var imgamount = Object.keys(imgData)
      if (imgamount.length != 0) {
        let link = imgData[imgamount[0]]["Image of Robot"]
        let container = document.getElementById("imgContainer");
        let image = document.createElement("img");
        image.style.width="auto";
        image.style.maxWidth="100%";
        image.style.height="auto";
        image.style.maxHeight="100%";
        //image.style.height="100%";
        image.src = link
        container.appendChild(image)
      }
    }else{
      document.getElementById("imgContainer").innerHTML = "NO IMAGE AVAILABLE YET";
    }
    //Pitscout data, want to make it so it displays all pitscouted data but lack of time could not do it
    // also displays no data if the robot does not exist
    if(robotPitData){
      var pitData = robot_pitData[team]
      let pits_container = document.getElementById("pitsData"); //change later to array, not object. really fucking scrappy code v2
      var pitstuff = ["Robot Weight", "Drivetrain Motors", "Motor Type"]

      var pitDatatimes = Object.keys(pitData)
      //goes through all the pitscouted data to get all the info that is wanted, will stop once the first instance of all wanted are provided
      var weight = false;
      var motornum = false;
      var motortyp = false;
      var temp_trac = ["NA","NA","NA"]
      for(var e=0;e<pitDatatimes.length;e++){
        if(weight && motornum && motortyp){
          break;
        }
        if(pitData[pitDatatimes[e]]["Robot Weight"] != "None"){
          temp_trac[0] = (pitData[pitDatatimes[e]]["Robot Weight"])
          weight = true;
        }
        if(pitData[pitDatatimes[e]]["Number of Motors FOR DRIVETRAIN"] != "None"){
          temp_trac[1] = (pitData[pitDatatimes[e]]["Number of Motors FOR DRIVETRAIN"])
          motornum = true;
        }
        if(pitData[pitDatatimes[e]]["Motor Type"] != "None"){
          temp_trac[2] = (pitData[pitDatatimes[e]]["Motor Type"])
          motortyp = true;
        }
      }
    let misc_arr = [
        pitstuff,
        temp_trac
    ]
    //displays the data if got, else shows up as NA
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
            const cell = document.createElement("td");
            cell.innerHTML = misc_arr[j][i];
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    pits_container.appendChild(tbl);
    }else{
      document.getElementById("pitsData").innerHTML = "NO PIT DATA AVAILABLE YET";
    }
    

  };
  //detects when ever a robot is searched for
  window.onload=function(){
    document.getElementById("searchbar").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        console.log("enter pressed")
          event.preventDefault();
          if (currentTab == "search") {
            search(document.getElementById("searchbar").value)
          }
      }
    })
  }

  //HOME TAB
  //picks up the match, both new or changed match, does not update if the data is deleted from the db, have to refresh
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



  //RANKING TAB
  //updates everytime a robot gets a new match
  //code runs over every robot due to trash firebase api and its ability to grab the data desired well
  //so everytime there is a new match, it kind of has to calculate everything again and have to redisplay all the data
  var rankHeadNames = dataStructure.createDataLabels("Rank","Team","Score","Taxi","Auto High","Auto Low","Auto Missed","Tele High","Tele Low","Tele Missed","Attempted Climb","Climb Points","Climb Time","Defense Time","Penalty","Oof Time");
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
          //bad code
          var row = document.createElement("tr");
          rankTableBody.appendChild(row);
          rankTable.addCell(rank_counter, row);
          rankTable.addCell(allRobotPts[f], row);
          rankTable.addCell(storedRobotsTotalPtAvg[allRobotPts[f]], row);

          //adds avg data to the row, then is displayed on the table

          robotAvgVals = storedRobotsAvgPtVals[allRobotPts[f]]
          rankTable.addCells(dataLabelsToCalc, robotAvgVals, row);
        }
      }
    }

  }
  )
  //percentile work
  /*onValue(ref(db, 'Events/BB2022/Robots/'), (data)=>{
    data = data.val()

    let percentile = new Percentile(data);
    percentile.convertRawToObject().processObjectData()
    
  })*/