class AddTable{
    constructor(){
        this.row;
        this.cell;
        this.cellText;
        this.cellP;
        
        
        this.table = document.createElement("table");
        this.tHead = document.createElement("thead");
        this.tableBody = document.createElement("tbody");
        this.hRow = document.createElement("tr");

        this.table.appendChild(this.tHead)
        this.tHead.appendChild(this.hRow)
        this.table.appendChild(this.tableBody);
    }
    getTable(){
        return this.table;
    }
    getTableBody(){
        return this.tableBody;
    }
    
    addHeader(rowHeadNames){
        for(var i=0; i<rowHeadNames.length; i++){
            const headCell = document.createElement("th");
            this.hRow.appendChild(headCell);
            headCell.innerHTML = rowHeadNames[i]
        }
    }

    addRow(rowHeadNames, data){
        //needs to take data and return row that is passed onto something else
            this.row = document.createElement("tr")
        for(var i=0;i<rowHeadNames.length;i++){
            let color = data["Position"][0]
            this.cell = document.createElement("td");
            this.cellText = document.createElement("div");
            this.cellP = document.createElement("p");

            this.cellP.innerHTML = data[rowHeadNames[i]];
  
            this.row.appendChild(this.cell);
            this.cell.appendChild(this.cellText);
            this.cellText.appendChild(this.cellP);
            //console.log(data[color[i]][j+1][headNames[g]])
            
            this.row.style.backgroundColor = "var(--" + color + ")"
            this.row.style.color = "var(--text-color)"
          }

        return this.row;
    }
}