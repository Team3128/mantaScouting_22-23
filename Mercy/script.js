
const encoder = new Encoder();
const dataStructure = new DataStructure();
const db = dataStructure.getFireBase();
console.log("success")

function uploadData() {
  document.getElementById("status").innerHTML = "";
  var all_data = document.getElementById("input").value;
  if(all_data == ''){
    document.getElementById("status").innerHTML = "Empty Push, Not Registered";
    return;
  }
  var sep_data = all_data.split(/\n/);
  var sort_dict = {}
  var sort_arr = []
  var sorted_data = []
  for(var i=0;i<sep_data.length;i++){
    if(sep_data[i] == ''){
      continue;
    }
    var data = sep_data[i].split(',');
      //data[0] = robot number, data[1] = match number
      if(data[0].length !=2){
        data[0] = "0" + data[0];
      }
      if(sort_dict.hasOwnProperty(data[0] + data[2])){
        continue
      }else{
        sort_dict[data[0] + data[2]] = data
        sort_arr.push(data[0] + data[2])
      }
  }

  sort_arr.sort()
  for(var i=0;i<sort_arr.length;i++){
    sorted_data.push(sort_dict[sort_arr[i]])
  }
  
  for(var i=0;i<sorted_data.length;i++){
          var data = sorted_data[i];
          
          formattedData = encoder.rawDataToFormattedData(data, dataStructure.dataLabels);

          uploadStatus = encoder.uploadFormattedData(db, formattedData, dataStructure)

          if(uploadStatus == true){
            document.getElementById("status").innerHTML += "Successful Upload for " + formattedData["Match"] + "-" + formattedData["Position"] + "<br>" ;
          }
          else{
            document.getElementById("status").innerHTML += "Failed Upload for "+ formattedData["Match"] + "-" + formattedData["Position"] + ": " + uploadStatus + "<br>";
            console.log(uploadStatus)
          }
          
 
    }
  }
document.getElementById("button").addEventListener("click", uploadData);
