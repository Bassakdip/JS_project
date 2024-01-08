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
        const res = await axios.post("https://crudcrud.com/api/cb5715609ecb41f29f3cddfc8661cefe/Data", stock);
        console.log(res.data);
        showDataOnScreen(res.data);
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get("https://crudcrud.com/api/cb5715609ecb41f29f3cddfc8661cefe/Data")
        for (var i = 0; i < res.data.length; i++) {
            showDataOnScreen(res.data[i]);
        }
    }
    catch (err) {
        console.log(err);
    }
})

function showDataOnScreen(stock) {
    if (!stock) {
        console.error('undefined or null stock');
        return;
    }
    let ul = document.getElementById('list');
    let li = document.createElement('li');
    let liText = document.createTextNode(`Name:${stock.itemname1}, Description:${stock.description1}, Price:${stock.price1}, Quantity:${stock.quantity1}`);
    li.appendChild(liText);
    ul.append(li);

    let buy1 = document.createElement('button');
    let buy1Name = document.createTextNode('BUY 1');
    buy1.appendChild(buy1Name);
    ul.append(buy1);

    let buy2 = document.createElement('button');
    let buy2Name = document.createTextNode('BUY 2');
    buy2.appendChild(buy2Name);
    ul.append(buy2);

    let buy3 = document.createElement('button');
    let buy3Name = document.createTextNode('BUY 3');
    buy3.appendChild(buy3Name);
    ul.append(buy3);

    let deletebtn = document.createElement('button');
    let deleteRow = document.createTextNode('Delete');
    deletebtn.appendChild(deleteRow);
    ul.append(deletebtn);
    

    buy1.addEventListener('click', (e) => update(e, stock, 1));
    buy2.addEventListener('click', (e) => update(e, stock, 2));
    buy3.addEventListener('click', (e) => update(e, stock, 3));
    deletebtn.addEventListener('click',(e)=>{
        ul.removeChild(li);
        deleteDataFromCrudCrud(stock._id);
        
    })
}

async function update(event, data, buyQuan) {
    try {
        const newRes = await axios.get(`https://crudcrud.com/api/cb5715609ecb41f29f3cddfc8661cefe/Data/${data._id}`);

        let updataData = newRes.data;
        let updatedObj = updataData[0];

        if (buyQuan > updatedObj.quantity1 && updatedObj.quantity1 !== 0) {
            alert(`You have only ${updatedObj.quantity1} left`);
            buyQuan = updatedObj.quantity1;
        }

        if (updataData.length === 0) {
            alert('No Stock');
            deleteDataFromCrudCrud(data._id);
            location.reload();
        } else {
            const updatedRes = await axios.put(`https://crudcrud.com/api/cb5715609ecb41f29f3cddfc8661cefe/Data/${data._id}`, {
                itemname1: updatedObj.itemname1,
                description1: updatedObj.description1,
                price1: updatedObj.price1,
                quantity1: updatedObj.quantity1 - buyQuan,
            });

            console.log(updatedRes.data); // You might want to handle the response as needed.
        }
    } catch (err) {
        console.log(err);
    }
}


function deleteDataFromCrudCrud(id){
    axios.delete(`https://crudcrud.com/api/cb5715609ecb41f29f3cddfc8661cefe/Data/${id}`)
    .catch((err)=>{
        console.log(err);
    })
}
