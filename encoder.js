import { ref, remove, set, child } from "firebase/database";
export class Encoder{
    constructor(){
        this.rawDataToEncode = [];
        this.formattedJsonData = {}
    }

    rawDataToFormattedData(arr, labels){
        this.rawDataToEncode = arr;
        for(let i=0;i<labels.length;i++){
            this.formattedJsonData[labels[i]] = this.rawDataToEncode[i];
        }
        return this.formattedJsonData;
    }

    uploadFormattedData(database, data, dataStructure){
        try{
            let setPath = dataStructure.getPath("Robots");
            set(child(ref(database, setPath + data["Team"] + '/'), data["Match"]), data)
            
            setPath = dataStructure.getPath("Matches");
            remove(ref(database, setPath + data["Match"] + "-" + data["Position"] + "/"), data)
  
            setPath = dataStructure.getPath("Matches");
            set(child(ref(database, setPath), (data["Match"] + "-" + data["Position"])), data)
            
            return true;
        }
        catch(err){
          return err.message;
          }

    }


}