class AddBlock{

    
    constructor(){
        this.row;
        this.cell;
        this.cellText;
        this.cellP;
    }

    
    addRow(rowHeadNames, data, type){
        //needs to take data and return row that is passed onto something else
            this.row = document.createElement("tr")
        for(var g=0;g<rowHeadNames.length;g++){
            let color = data["Position"][0]
            this.cell = document.createElement("td");
            this.cellText = document.createElement("div");
            this.cellP = document.createElement("p");

            pushinP.innerHTML = data[headNames[g]];
  
            row.appendChild(cell);
            cell.appendChild(cellText);
            cellText.appendChild(pushinP);
            //console.log(data[color[i]][j+1][headNames[g]])
            
            row.style.backgroundColor = "var(--" + color + ")"
            row.style.color = "var(--text-color)"
          }

        return this.row;
    }
}