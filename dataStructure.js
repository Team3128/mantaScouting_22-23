//0,0,r1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
export class DataStructure {
    constructor() {
    //                0         1         2           3         4          5            6           7              8            9           10             11                 12              13            14              15         16          17        18       
        this.dataValues = [0,0,"","",
            false,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,false,
            0,0,0,"","",""];
        this.dataLabels = ["Match", "Team", "Position", "Scout", 
            "Mobility", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", 
            "High Cube", "Mid Cube", "Low Cube", "High Cone", "Mid Cone", "Low Cone", "Fumbled", "Climb", "Park",
            "Defense Time", "Penalty Count", "Oof Time", "Climb QATA", "Link QATA", "QATA"];
        this.dataTypes  = ["number", "number", "string", "string",
            "number", "number", "number", "number", "number", "number", "number", "number", "number",
            "number", "number", "number", "number", "number", "number", "number", "number", "number", 
            "number", "number", "number", "string", "string", "string"];            
        this.avgFilterLabels=[
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
            "Oof Time"
        ]
        this.wghtValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.ptValues = [3, 6, 4, 3, 6, 4, 3, 0, 12, 5, 3, 2, 5, 3, 2, 0, 10, 2, 0, 0, 0];
        this.storedRobotsTotalPtAvg = {}
        this.storedRobotsAvgPtVals = {}

        this.pitscoutLabels = ["Team", "Scout Name", "Drivetrain", "Robot Weight", "Number of Motors", "Motor Type", "Vision", "Auto", "Auto Climb", "Endgame Climb", "Piece Type", "Manipulator", "Aluminum Assistance", "Miscellaneous"];

        this.firebasePath = "Events/Nep2nTest/";
        this.firebaseConfig = {
            apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
            authDomain: "escouting-7b4e0.firebaseapp.com",
            databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
            projectId: "escouting-7b4e0",
            storageBucket: "escouting-7b4e0.appspot.com",
            messagingSenderId: "377179821867",
            appId: "1:377179821867:web:cedab35ab708c12986976e",
            measurementId: "G-8VWYRF9QY6"
        };
        this.app;
        this.database;

    }

    getDataValues() {
        return this.dataValues;
    }
    getDataValue(i) {
        return this.dataValues[i];
    }
    getDataLabels() {
        return this.dataLabels;
    }
    getDataLabel(i) {
        return this.dataLabels[i];
    }
    getDataTypes() {
        return this.dataTypes;
    }
    getDataType(i) {
        return this.dataTypes[i];
    }
    getPitscoutLabels() {
        return this.pitscoutLabels;
    }
    getPitscoutLabel(i) {
        return this.pitscoutLabels[i];
    }
    getPath(type) {
        return this.firebasePath + type + "/";
    }

    setDataValues(arr) {
        this.dataValues = arr;
    }
    setDataValues(i, val) {
        this.dataValues[i] = val;
    }
    getWghtValues() {
        return this.wghtValues;
    }
    getPtValues() {
        return this.ptValues;
    }
    getStoredRobotsTotalPtAvg(){
        return this.storedRobotsTotalPtAvg;
    }
    getStoredRobotsAvgPtVals(){
        return this.storedRobotsAvgPtVals;
    }

    validateValues() {

    }

    getFireBase(){
        this.app = initializeApp(this.firebaseConfig);
        this.database = getDatabase(this.app);
        return this.database;
    }

    createDataLabels(...givenLabels){
        this.lableArray = [];
        for(var i =0; i<givenLabels.length;i++){
            this.lableArray.push(givenLabels[i])
        }
        return this.lableArray;
    }

    calcRobotPtAvgs(dataLabelsToCalc, robot){
        this.matches = Object.keys(robot)
        this.totalPtAvg = 0;
        this.robotAvgPtVals={}
        //for loop over all data points wanted to be avg 
        for(var i=0; i<dataLabelsToCalc.length;i++){
        this.singlePtAvg = 0
        //adds up all match data for that data point wanted to be avged
        for(var j=0; j<this.matches.length; j++){
                    //adds value to temp val, which is the value that will later be avged
            this.singlePtAvg += parseInt(robot[this.matches[j]][dataLabelsToCalc[i]])
        }
        //takes the the avg and rounds it to the tenth, then multiply by weight then equalizer, later want to make weight easily changeable
        //stores this avg int avg_tracker in table_cache
        this.singlePtAvg/= this.matches.length
        this.singlePtAvg = this.singlePtAvg.toFixed(1)
        this.robotAvgPtVals[dataLabelsToCalc[i]] = this.singlePtAvg
        this.singlePtAvg*= this.wghtValues[i] * this.ptValues[i];
        this.singlePtAvg = this.singlePtAvg.toFixed(1)
        this.totalPtAvg+=parseFloat(this.singlePtAvg)
        }
        //puts the total avg to the robot, and vice versa
        this.totalPtAvg = this.totalPtAvg.toFixed(1)
        this.storedRobotsAvgPtVals[robot[this.matches[0]]["Team"]] = this.robotAvgPtVals

        this.storedRobotsTotalPtAvg[robot[this.matches[0]]["Team"]] = this.totalPtAvg
    }

    calcRobotRanking(){
        this.robotRankByPt = [];
        this.allRobotPts = Object.keys(this.storedRobotsTotalPtAvg)
        for(var i=0;i<this.allRobotPts.length;i++){
          if(this.robotRankByPt.indexOf(this.storedRobotsTotalPtAvg[this.allRobotPts[i]]) == -1){
            this.robotRankByPt.push(this.storedRobotsTotalPtAvg[this.allRobotPts[i]])
          }
        }
        this.robotRankByPt.sort(function(a,b){return a-b})
        return this.robotRankByPt;
    }
    
    searchAndShowRobotData(path, team, db, func) {
        this.setPath = this.getPath(path + "/" + team);
        get(ref(db, this.setPath)).then((snapshot) => {
            this.data = snapshot.val()
            func(this.data)
        })
    }

}