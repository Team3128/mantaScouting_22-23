class Encoder{
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


}