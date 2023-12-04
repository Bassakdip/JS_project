
var row = null;
function addItem() {
    var dataEntered = Data();
    var readData = dataFromLocalStorage(dataEntered);
    if(row == null){
        insert(readData);
        msg.innerHTML="Data insert";
    }
    else{
        update();
        msg.innerHTML="Data Update";
    }
    
}

//Create data from form
function Data() {
    var itemName = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;

    var arr = [itemName, description, price, quantity]
    return arr;
}
function dataFromLocalStorage(dataEntered) {
    var n = localStorage.setItem("name", dataEntered[0]);
    var d = localStorage.setItem("description", dataEntered[1]);
    var p = localStorage.setItem("price", dataEntered[2]);
    var q = localStorage.setItem("quantity", dataEntered[3]);

    //getting values from local to tabel

    var n1 = localStorage.getItem("name", n);
    var d1 = localStorage.getItem("description", d);
    var p1 = localStorage.getItem("price", p);
    var q1 = localStorage.getItem("quantity", q);

    var arr = [n1, d1, p1, q1]
    return arr;
}
function insert(readData) {
    var row = table.insertRow();
    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML = readData[3];
    row.insertCell(4).innerHTML = "<button onclick = edit(this)>BUY1</button><button onclick = remove(this)>BUY2</button>"
}
//edit
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("name").value = row.Cells[0].innerHTML;
    document.getElementById("description").value = row.Cells[1].innerHTML;
    document.getElementById("price").value = row.Cells[2].innerHTML;
    document.getElementById("quantity").value = row.Cells[3].innerHTML;
}
//update
function update() {
    row.Cells[0].innerHTML = document.getElementById("name").value;
    row.Cells[1].innerHTML = document.getElementById("description").value;
    row.Cells[2].innerHTML = document.getElementById("price").value;
    row.Cells[3].innerHTML = document.getElementById("quantity").value;

    row = null;
}
//delete
function remove(td){
    row = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex)
}
