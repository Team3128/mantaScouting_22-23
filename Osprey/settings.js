let settings = {
  "imported":{
    "transitionMode": "auto"
  },
  "auto": [
    //cube cone buttons
    {
      "label": "High ❒",
      "trigger": "s", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 1,
      "writeType": "int"
    },
    {
      "label": "High △",
      "trigger": "j", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 2,
      "writeType": "int"
    },
    {
      "label": "Mid ❒",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 5,
      "writeType": "int"
    },
    {
      "label": "Mid △",
      "trigger": "k", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 6,
      "writeType": "int"
    },
    {
      "label": "Low ❒",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 7,
      "writeType": "int"
    },
    {
      "label": "Low △",
      "trigger": "l", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 8,
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
      "writeLoc": 3,
      "writeType": "int"
    },
    {
      "label": "fuck you(climb thing)",
      "trigger": "m", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 4,
      "writeType": "inc"
    },
    {
      "label": "Moblility",
      "trigger": "h", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 0,
      "writeType": "bool"
    }
  ],





  "tele":[
    //cube cone buttons
    {
      "label": "High ❒",
      "trigger": "s", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 9,
      "writeType": "int"
    },
    {
      "label": "High △",
      "trigger": "j", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 2,
      "writeLoc": 10,
      "writeType": "int"
    },
    {
      "label": "Mid ❒",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 11,
      "writeType": "int"
    },
    {
      "label": "Mid △",
      "trigger": "k", 
      "columnStart": 2,
      "columnEnd": 3,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 12,
      "writeType": "int"
    },
    {
      "label": "Low ❒",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 2,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 13,
      "writeType": "int"
    },
    {
      "label": "Low △",
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
      "label": "fuck you(climb thing)",
      "trigger": "m", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 2,
      "rowEnd": 3,
      "writeLoc": 16,
      "writeType": "inc"
    },
    {
      "label": "Moblility",
      "trigger": "h", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 17,
      "writeType": "bool"
    }
  ], 

  "after":[
    {
      "label":"Climb Level",
      "writeLoc": 8,
      "writeType": "cyc",
      "cycOptions": ["N","L", "M", "H", "T"],
      "writeCycOptions": 5
    },
    {
      "label":"Penalty",
      "writeLoc": 11,
      "writeType": "bool",
    }, 
    {
      "label":"Oof", 
      "writeLoc": 13,
      "writeType": "bool"
    },
    {
      "label": "Drive Train",
      "writeLoc": 15,
      "writeType": "str",
      "placeholder": "e.g. tank, swerve"
    },
    {
      "label": "Shooting Distance",
      "writeLoc": 12,
      "writeType": "str",
      "placeholder": "e.g. tarmac, bumper"
    },
    {
      "label": "Shooter", 
      "writeLoc": 16, 
      "writeType": "str",
      "placeholder": "e.g. hood, turret, other"
    },
    {
      "label": "Other Qata",
      "writeLoc": 14,
      "writeType": "str",
      "placeholder": "e.g. defence, penalties, speed"
    }

  ]
  
}

let dataValues = [false, 0, 0, 0, 0, 0, 0, false, null, 0, 0, false, "", false, "", "", ""];
let dataLabels = ["Taxi", "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Level", "Climb Time", "Defence Time", "Penalty", "Yeet", "Oof", "QATA", "Drivetrain Type", "Shooter Type"];

let tempFix = [{
  "label": "Attempted Climb",
  "writeLoc": 7,
  "writeType": "bool"
}]