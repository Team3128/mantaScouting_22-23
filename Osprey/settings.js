let settings = {
  "imported":{
    "transitionMode": "auto"
  },
  "auto": [
    //cube cone buttons
    {
      "label": "A High ❒",
      "trigger": "s", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 1,
      "writeType": "int"
    },
    {
      "label": "A High △",
      "trigger": "j", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 4,
      "writeType": "int"
    },
    {
      "label": "A Mid ❒",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 2,
      "writeType": "int"
    },
    {
      "label": "A Mid △",
      "trigger": "k", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 5,
      "writeType": "int"
    },
    {
      "label": "A Low ❒",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 3,
      "writeType": "int"
    },
    {
      "label": "A Low △",
      "trigger": "l", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 6,
      "writeType": "int"
    },
    //cube cone buttons end
    {
      "label": "A fumble",
      "trigger": "n", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 7,
      "writeType": "int"
    },
    {
      "label": "A fuck you(climb time)",
      "trigger": "m", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 8,
      "writeType": "inc"
    },
    {
      "label": "Oof",
      "trigger": "h", 
      "columnStart": 4,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 20,
      "writeType": "inc"
    },
    {
      "label": "Moblility",
      "trigger": "h", 
      "columnStart": 3,
      "columnEnd": 4,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 0,
      "writeType": "bool"
    },
    {
      "label": "Defene",
      "trigger": "a", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 4,
      "rowEnd": 5,
      "writeLoc": 18,
      "writeType": "bool"
    }
  ],





  "tele":[
    //cube cone buttons
    {
      "label": "T High ❒",
      "trigger": "s", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 9,
      "writeType": "int"
    },
    {
      "label": "T High △",
      "trigger": "j", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 12,
      "writeType": "int"
    },
    {
      "label": "T Mid ❒",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 10,
      "writeType": "int"
    },
    {
      "label": "T Mid △",
      "trigger": "k", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 13,
      "writeType": "int"
    },
    {
      "label": "T Low ❒",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 11,
      "writeType": "int"
    },
    {
      "label": "T Low △",
      "trigger": "l", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 14,
      "writeType": "int"
    },
    //cube cone buttons end
    {
      "label": "fumble",
      "trigger": "n", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 15,
      "writeType": "int"
    },
    {
      "label": "Penalty",
      "trigger": "m", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 19,
      "writeType": "int"
    },
    {
      "label": "Park",
      "trigger": "h", 
      "columnStart": 3,
      "columnEnd": 4,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 17,
      "writeType": "bool"
    },
    {
      "label": "Oof",
      "trigger": "h", 
      "columnStart": 4,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 20,
      "writeType": "inc"
    },
    {
      "label": "Defene",
      "trigger": "a", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 4,
      "rowEnd": 5,
      "writeLoc": 18,
      "writeType": "bool"
    }
  ], 

  "after":[
    {
      "label":"Climbed?",
      "writeLoc": 16,
      "writeType": "cyc",
      "cycOptions": [0, 6, 10 ],
      "writeCycOptions": 3
    },
     
    {
      "label": "Drive Train",
      "writeLoc": 24,
      "writeType": "str",
      "placeholder": "e.g. tank, swerve"
    },
    {
      "label": "Climbing Capabilities?",
      "writeLoc": 21,
      "writeType": "str",
      "placeholder": "e.g. write about climb, can balance?, very slow?"
    },
    {
      "label": "Links?", 
      "writeLoc": 22, 
      "writeType": "str",
      "placeholder": "e.g. arm, suction, other"
    },
    {
      "label": "QATA",
      "writeLoc": 23,
      "writeType": "str",
      "placeholder": "e.g. defence, penalties, speed"
    }

  ]
  
}

//let dataValues = [false, 0, 0, 0, 0, 0, 0, false, null, 0, 0, false, "", false, "", "", ""];
//let dataLabels = ["Taxi", "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Level", "Climb Time", "Defence Time", "Penalty", "Yeet", "Oof", "QATA", "Drivetrain Type", "Shooter Type"];
//YUBO help me
//                0     1 2 3 4 5 6 7 8 9 1011121314151617    18192021 22 23 24
let dataValues = [false,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false,0,0,0,"","","",""];
let dataLabels = [ "Mobility", "Auto High Cube", "Auto Mid Cube", "Auto Low Cube", "Auto High Cone", "Auto Mid Cone", "Auto Low Cone", "Auto Fumbled", "Auto Climb", "High Cube", "Mid Cube", "Low Cube",  "High Cone", "Mid Cone", "Low Cone", "Fumbled", "Climb", "Park","Defense Time", "Penalty Count", "Oof Time", "Climb QATA", "Link QATA", "QATA", "Drivetrain"];

// let tempFix = [{
//   "label": "Attempted Climb",
//   "writeLoc": 7,
//   "writeType": "bool"
// }]