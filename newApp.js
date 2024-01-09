const apiUrl ="https://crudcrud.com/api/03d2308f77764ac1bdf5bacfe467b8c9/Data";

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("des").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  addCandy(name, description, price, quantity);
}

async function addCandy(name, description, price, quantity) {
  const candyData = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };

  try {
    await axios.post(apiUrl, candyData);
    await displayCandies();
  } 
  catch (error) {
    console.error("Error adding candy:", error);
  }
}

async function displayCandies() {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    const data = response.data;
    const candyList = document.getElementById("candy-list");
    candyList.innerHTML = "";

    data.forEach((candy) => {
      const candyItem = document.createElement("div");
      candyItem.innerHTML = `
            <div>
              <h2>${candy.name}</h2>
              <p>${candy.description}</p>
              <p>Price: ${candy.price} rs</p>
              <p>Quantity: <span id="quantity-${candy._id}">${candy.quantity}</span></p>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}', '${candy.price}', 1, '${candy.quantity}')">Buy 1</button>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}','${candy.price}', 2, '${candy.quantity}')">Buy 2</button>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}','${candy.price}', 3, '${candy.quantity}')">Buy 3</button>
            </div>
          `;

      candyList.appendChild(candyItem);
    });
  } catch (error) {
    console.error("Error fetching candies:", error);
  }
}

async function buyCandy(
    id,
    name,
    description,
    price,
    quantityToBuy,
    currentQuantity
  ) {
    const updatedQuantity = currentQuantity - quantityToBuy;
  
    if (updatedQuantity >= 0) {
      try {
        await axios.put(`${apiUrl}/${id}`, {
          quantity: updatedQuantity,
          name: name,
          description: description,
          price: price,
        });
        displayCandies();
        
      } catch (error) {
        console.error("Error updating candy quantity:", error);
      }
    } else {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        alert("Item not available");
        await displayCandies(); 
      } catch (err) {
        console.error("Error deleting candy:", err);
      }
    }
  }
  

displayCandies();
