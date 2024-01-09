async function crudcrud(event) {
    event.preventDefault();

    const itemname1 = document.getElementById('itemName').value;
    const description1 = document.getElementById('description').value;
    const price1 = document.getElementById('price').value;
    const quantity1 = document.getElementById('quantity').value;

    const stock = {
        itemname1,
        description1,
        price1,
        quantity1
    }

    try {
        const res = await axios.post("https://crudcrud.com/api/03d2308f77764ac1bdf5bacfe467b8c9/Data", stock);
        console.log(res.data);
        showDataOnScreen(res.data);
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get("https://crudcrud.com/api/03d2308f77764ac1bdf5bacfe467b8c9/Data")
        for (var i = 0; i < res.data.length; i++) {
            showDataOnScreen(res.data[i]);
        }
    }
    catch (err) {
        console.log(err);
    }
})

function showDataOnScreen(stock) {

    const parentNode = document.getElementById('list');
    const childHTML = `<li id=${stock._id} > Item Name:-${stock.itemname1} - Description:- ${stock.description1} - Price:- ${stock.price1} - Quamtity:-${stock.quantity1}
                        <button onclick="buyCandy('${stock._id}','${stock.itemname1}', '${stock.description1}', '${stock.price1}','${stock.quantity1}',1)">Buy 1</button> 
                        <button onclick="buyCandy('${stock._id}','${stock.itemname1}', '${stock.description1}', '${stock.price1}','${stock.quantity1}',2)">Buy 2</button> 
                        <button onclick="buyCandy('${stock._id}','${stock.itemname1}', '${stock.description1}', '${stock.price1}','${stock.quantity1}',3)">Buy 3</button> 
                        <button onclick=deleteDataFromCrudCrud('${stock._id}')>Delete</button>
                        </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

async function buyCandy(id,name,description,price,currentQuantity,buyQuantity){
    const updatedQuantity = currentQuantity-buyQuantity;
    const obj ={
        itemname1: name,
        description1: description,
        price1: price,
        quantity1: updatedQuantity
    }
    if(updatedQuantity>=0)
    {
        try{
            await axios.put(`https://crudcrud.com/api/03d2308f77764ac1bdf5bacfe467b8c9/Data/${id}`,obj)
            obj['_id']=id  
            showDataOnScreen(obj);
            removeUserOnScreen(id)
        }
        catch(err){
            console.log(err);
        }
    }
}

async function deleteDataFromCrudCrud(id) {
    try {
        await axios.delete(`https://crudcrud.com/api/03d2308f77764ac1bdf5bacfe467b8c9/Data/${id}`)
        removeUserOnScreen(id);
    }
    catch (err) {
        console.log(err)
    }
}
function removeUserOnScreen(id) {
    const parentaNode = document.getElementById('list');
    const deletedNode = document.getElementById(id);
    if (deletedNode) {
        parentaNode.removeChild(deletedNode)
    }
}
