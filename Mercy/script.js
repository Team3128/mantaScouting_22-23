
const mercy_Encoder = new Encoder();
const mercy_DataStructure = new DataStructure();
const db = mercy_DataStructure.getFireBase();
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
      if(data[1].length !=2){
        data[1] = "0" + data[1];
      }
      if(sort_dict.hasOwnProperty(data[1] + data[3])){
        continue
      }else{
        sort_dict[data[1] + data[3]] = data
        sort_arr.push(data[1] + data[3])
      }
  }

  sort_arr.sort()
  for(var i=0;i<sort_arr.length;i++){
    sorted_data.push(sort_dict[sort_arr[i]])
  }
  
  for(var i=0;i<sorted_data.length;i++){
      try{
          var data = sorted_data[i];
          
          formattedData = mercy_Encoder.rawDataToFormattedData(data, mercy_DataStructure.dataLabels);

          set(child(ref(db, 'Events/BB2022/Robots/' + data[0] + '/'), data[1]), formattedData)

          remove(ref(db, 'Events/BB2022/Matches/' + data[1] + "-" + data[3] + "/"), formattedData)

          set(child(ref(db, `Events/BB2022/Matches/`), (data[1] + "-" + data[3])),formattedData)
          
          document.getElementById("status").innerHTML += "Successful Upload for " + data[1] + "-" + data[3] + "<br>" ;
      }
      catch(err){
        document.getElementById("status").innerHTML += "Failed Upload for "+ data[1] + "-" + data[3] + ": " + err.message + "<br>";
        console.log(err)
        }
 
    }
  }
document.getElementById("button").addEventListener("click", uploadData);
