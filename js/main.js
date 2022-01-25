var productName = document.getElementById("productName");
var productCount = document.getElementById("productCount");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addOrUpdateBtn = document.getElementById('addOrUpdateBtn');
var searchInput = document.getElementById("searchInput");
//create global var wa hsweh be index bt3 al item aly dost 3lih update
var currentIndex = 0;

///hycheck law al local storage mesh fadya hy5od al data bt3t al myproducts
//wa y7wlha le json (array of objects) wa y7otha fe al product array
//law fdya hy3rfa al productlist be array fadya
var productList;
if (localStorage.getItem("myProducts") != null) {
    productList = JSON.parse(localStorage.getItem("myProducts"));
    displayProduct();
}
else {
    productList = [];
}

function addOrUpdate() {
    if (addOrUpdateBtn.innerHTML == "Add Product") {
        addProduct();
    }
    else {
        updateProduct();
        addOrUpdateBtn.innerHTML = "Add Product";
    }
    displayProduct();
}

function addProduct() {
    if (validName() && validPrice() && validCategory() && validDescription()) {


        var product = {
            name: productName.value,
            count: productCount.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value
        }
        productList.push(product);
        //b3d ma hy push al object fe al array hy5zno fe al local storage
        localStorage.setItem("myProducts", JSON.stringify(productList));
        //wa b3d keda hy3rdo fe al table
        // displayProduct();
    }
}
function displayProduct() {
    var temp = ``;
    for (var i = 0; i < productList.length; i++) {
        temp += `<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].count}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-outline-success" onclick="updateCount(${i},${1})"><i class="fas fa-plus-circle"></i></button></td>
        <td><button class="btn btn-outline-info" onclick="updateCount(${i},${-1})"><i class="fas fa-minus-circle"></i></button></td>
        <td><button class="btn btn-outline-warning" onclick="updateProductItem(${i})">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = temp;
}

function updateProductItem(productIndex) {
    currentIndex = productIndex;
    productName.value = productList[productIndex].name;
    productPrice.value = productList[productIndex].price;
    productCategory.value = productList[productIndex].category;
    productDesc.value = productList[productIndex].desc;
    addOrUpdateBtn.innerHTML = "Update Product"
}

function updateProduct() {
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].desc = productDesc.value;
    localStorage.setItem("myProducts", JSON.stringify(productList));
}

function deleteProduct(productIndex) {
    productList.splice(productIndex, 1);
    //b3d ma yms7 al item hyms7o mn al local 3n tri2 ano hyset al array tany
    // mn gded fe al local storage
    localStorage.setItem("myProducts", JSON.stringify(productList));

    displayProduct();

}

function searchProduct() {
    var term = searchInput.value;
    var temp = ``;
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())
            || productList[i].category.toLowerCase().includes(term.toLowerCase())
            || productList[i].desc.toLowerCase().includes(term.toLowerCase())
            || productList[i].price.toString().includes(term)) {
            temp += `<tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].count}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td><button class="btn btn-outline-success" onclick="updateCount(${i},${1})"><i class="fas fa-plus-circle"></i></button></td>
                <td><button class="btn btn-outline-info" onclick="updateCount(${i},${-1})"><i class="fas fa-minus-circle"></i></button></td>
                <td><button class="btn btn-outline-warning" onclick="updateProductItem(${i})">update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`
        }

    }
    document.getElementById("tBody").innerHTML = temp;
}


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

function validName() {
    var validName = /^[A-Z][a-z]{3,10}[0-9]?$/;
    if (validName.test(productName.value)) {
        document.getElementById("alertName").style.display = "none";
        return true;

    }
    else {
        document.getElementById("alertName").style.display = "block";
        return false;
    }
}

function validPrice() {
    var validPrice = /^[0-9]{1,5}$/;
    if (validPrice.test(productPrice.value)) {
        document.getElementById("alertPrice").style.display = "none";
        return true;
    }
    else {
        document.getElementById("alertPrice").style.display = "block";
        return false;
    }
}
function validCategory() {
    var validCategory = /^[a-z]{2,10}$/;
    if (validCategory.test(productCategory.value)) {
        document.getElementById("alertCategory").style.display = "none";
        return true;

    }
    else {
        document.getElementById("alertCategory").style.display = "block";
        return false;
    }
}

function validDescription() {
    var validDesc = /^[A-Z][a-z]{3,10}[0-9]?$/;
    if (validDesc.test(productDesc.value)) {
        document.getElementById("alertDescription").style.display = "none";
        return true;

    }
    else {
        document.getElementById("alertDescription").style.display = "block";
        return false;
    }
}

// 3mlnha fe function w7da 3n tre2 hnzwed al argument x
// wa hndeholho ya be 1 for increase ya -1 decrease
// bdal alcommentted 2 functions aly t7d
function updateCount(index, x) {
    if (productList[index].count == 0 && x == -1) {
        productList[index].count = 0;
    }
    else {
        productList[index].count = Number(productList[index].count) + Number(x);
        localStorage.setItem("myProducts", JSON.stringify(productList));

        displayProduct()
    }

}
/*
//for increase count
function increaseCount(index, x) {
   
        productList[index].count++;
        localStorage.setItem("myProducts", JSON.stringify(productList));

        displayProduct()
    

}

//for decrease count
function decreaseCount(index, x) {
    if (productList[index].count == 0 && x==-1){
        productList[index].count=0;
    }
    else{
        productList[index].count--;
        localStorage.setItem("myProducts", JSON.stringify(productList));

        displayProduct()
    }

} */