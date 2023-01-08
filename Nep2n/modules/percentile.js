export class Percentile{
    data;
    value;
    snapshot;

    constructor(data){
        this.data = data;
        this.percentileObject = {};
        this.percentileObjectSorted = [];
    }

    convertRawToObject(){
        let dataArray = []
        let AllDataArr = Object.values(this.data)
        let AllMatchArr = []
        for(let i=0; i<AllDataArr.length; i++){
            let keys = Object.keys(AllDataArr[i])
            for(let j=0; j<keys.length; j++){
                AllMatchArr.push(Object.values(AllDataArr[i][keys[j]]))
            }
        }
        
        for(let i=0; i<AllMatchArr[i].length; i++){
            dataArray.push([]);
        }
        
        for(let i=0; i<AllMatchArr.length; i++){
            for(let j=0; j<AllMatchArr[i].length; j++){
                dataArray[j][i] = AllMatchArr[i][j]
            }
        }
        
        let keys = Object.keys(Object.values(Object.values(this.data)[0])[0]) //should reference global obj
        for(let i=0; i<keys.length; i++){
            this.percentileObject[keys[i]] = dataArray[i]
        }
        return(this);
        
    }
    processObjectData(){
        

        this.percentileObject.autoPoints = []
        this.percentileObject.teleAccuracy = []
        this.percentileObject.autoAccuracy = []
        this.percentileObject.shootingPoints = []
        
        for(let i=0; i<this.percentileObject["Match"].length; i++){ //should reference global obj
            if(this.percentileObject["Taxi"][i] == "false"){
                this.percentileObject["Taxi"][i] = "0"
            }
            if(this.percentileObject["Taxi"][i] == "true"){
                this.percentileObject["Taxi"][i] = "1"
            }
            let auto_pts = (this.percentileObject["Auto High"][i]*4) + (this.percentileObject["Auto Low"][i]*2) + (this.percentileObject["Taxi"][i]*2)


            let auto_high = parseInt(this.percentileObject["Auto High"][i]), auto_low = parseInt(this.percentileObject["Auto Low"][i]), auto_missed = parseInt(this.percentileObject["Auto Missed"][i]);
            let auto_acc = (auto_high + auto_low)/(auto_high + auto_low + auto_missed);

            let tele_high = parseInt(this.percentileObject["Tele High"][i]), tele_low = parseInt(this.percentileObject["Tele Low"][i]), tele_missed = parseInt(this.percentileObject["Tele Missed"][i]);
            let tele_acc = (tele_high + tele_low)/(tele_high + tele_low + tele_missed);

            let shooting_pts = (parseInt(this.percentileObject["Tele High"][i])*2) + (parseInt(this.percentileObject["Tele Low"][i])*1)

            this.percentileObject.autoPoints.push(auto_pts);
            if(!isNaN(auto_acc)){
                this.percentileObject.autoAccuracy.push(auto_acc);
            }
            if(!isNaN(tele_acc)){
                this.percentileObject.teleAccuracy.push(tele_acc);
            }
            this.percentileObject.shootingPoints.push(shooting_pts);
        }
    }
    sortPercentile(){
        let percentileArr = Object.values(this.percentileObject);
        let percentileKeys = Object.keys(this.percentileObject);
        for(let i=0; i< percentileArr.length; i++){
            for(let j=0; j<percentileArr[i].length; j++){
                if(percentileArr[i][j] == "true"){
                    percentileArr[i][j] = 1
                }
                else if(percentileArr[i][j] == "false"){
                    percentileArr[i][j] = 0
                }
                else if(!isNaN(Number(percentileArr[i][j]))){
                    percentileArr[i][j] = Number(percentileArr[i][j]);
                }
                else{
                    //do nothing
                }
            }
           this.percentileObjectSorted[percentileKeys[i]] = percentileArr[i].sort(function(a, b){return a - b});
        }
        return this;
    }
    findPercentileOf(val, name, sorted_data){
        for(let i=0; i<this.percentileObjectSorted[name].length; i++){
            if(this.percentileObjectSorted[name][i] > val){
                return(i/this.percentileObjectSorted[name].length);
            }
        }
    }
    addNewMatchToPercentile(snapshot){

    }

}