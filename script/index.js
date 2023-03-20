let quantityInCart = 0;
let totalProductValue = 0;

function createList(productsList) { // Renders all cards from the database
  const ulTag = document.querySelector('#cardsList');
  
  for (let i = 0; i < productsList.length; i++) {
    let liTag = addCard(productsList, i);
    ulTag.appendChild(liTag);
  }
};

function addCard(list, i) {
  // Creating the elements
  const liTag = document.createElement('li'); 
  const divImg = document.createElement('div'); 
  const imgTag = document.createElement('img'); 
  const divContent = document.createElement('div'); 
  const spanTagCategory = document.createElement('span'); 
  const h2Tag = document.createElement('h2'); 
  const pTag = document.createElement('p'); 
  const spanTagPrice = document.createElement('span'); 
  const anchorTag = document.createElement('a'); 

  // Configuring the elements
  imgTag.src = list[i].img;
  imgTag.alt = list[i].nameItem;
  spanTagCategory.innerText = list[i].tag;
  h2Tag.innerText = list[i].nameItem;
  pTag.innerText = list[i].description;
  spanTagPrice.innerText = `R$ ${list[i].value.toFixed(2).toString().replace('.', ',')}`;
  anchorTag.innerText = list[i].addCart;
  anchorTag.href = '#';
  
  liTag.id = `li-${list[i].id}`;
  anchorTag.id = `a-${list[i].id}`;
  
  // Configuring element classes
  liTag.classList = 'card-list';
  divImg.classList = 'img-position';
  imgTag.classList = 'product-img';
  divContent.classList = 'description-position';
  spanTagCategory.classList = `category category-${list[i].tag[0]}`;
  h2Tag.classList = 'product-tittle';
  pTag.classList = 'product-description';
  spanTagPrice.classList = 'product-price';
  anchorTag.classList = 'addToCart';

  // Inserting in HTML
  divImg.appendChild(imgTag);
  divContent.append(spanTagCategory, h2Tag, pTag, spanTagPrice, anchorTag);
  liTag.append(divImg, divContent);

  anchorTag.addEventListener('click', function(e){
    let id = parseInt(e.target.id.substring(2));
    const cartEmpty = document.querySelector('.cart-empty');
    const cartProducts = document.querySelector('.cart-products');
    const productValueSum = document.querySelector('#product-value');
    let counter = document.querySelector('#counter');
    let cartList = document.querySelector('.cart-list');

    cartEmpty.style.display = 'none';
    cartProducts.style.display = 'block';
    cartProducts.style.height = '417.67px';

    quantityInCart++;
    counter.innerHTML = quantityInCart;

    let productValue = list[i].value;
    productValueSum.innerText = totalCalculation(productValue, 'sum');

    let card = searchCard(id, list);
    let sendToCart = shoppingCartList(card);
    cartList.appendChild(sendToCart);
  })
  return liTag;
}

function shoppingCartList(card){
  // Creating the elements
  const liTag = document.createElement('li');
  const divImg = document.createElement('div');
  const divContext = document.createElement('div');
  const imgTag = document.createElement('img');
  const h3Tag = document.createElement('h3');
  const spanTag = document.createElement('span');
  const spanALink = document.createElement('span');
  const anchorTag = document.createElement('a');

  // Configuring the elements
  liTag.id = `d_${card.id}`;
  imgTag.src = card.img;
  imgTag.alt = card.nameItem;
  h3Tag.innerText = card.nameItem;
  spanTag.innerText = `R$ ${card.value.toFixed(2).toString().replace('.', ',')}`;
  anchorTag.innerText = 'Remover produto';
      
  // Configuring element classes
  liTag.classList = 'cart-product-area';
  imgTag.classList = 'img-cart-area';
  divContext.classList = 'context-cart-product';
  h3Tag.classList = 'cart-item-tittle';
  spanTag.classList = 'cart-item-description';
  anchorTag.classList = 'anchor-remove'

  anchorTag.addEventListener('click', function(e){
      e.preventDefault();
      const counter = document.querySelector('#counter');
      const productValueSum = document.querySelector('#product-value');
      const cartEmpty = document.querySelector('.cart-empty');
      const cartProducts = document.querySelector('.cart-products');
      let listRemove = document.querySelector(`#d_${card.id}`);

      quantityInCart--;
      counter.innerHTML = quantityInCart;
      
      productValueSum.innerText = totalCalculation(card.value, 'sub');

      if (cartEmpty.style.display == 'none' && parseInt(counter.innerText) == 0) {
        cartEmpty.style.display = 'flex';
        cartProducts.style.display = 'none';
      } else if (parseInt(counter.innerText) > 0){
        cartProducts.style.display = 'block';
      }
      listRemove.remove();
    });
    
    // Inserting in HTML
    divImg.appendChild(imgTag);
    spanALink.appendChild(anchorTag);
    divContext.append(h3Tag, spanTag, spanALink);
    liTag.append(divImg, divContext);
  
  return liTag;
};

function totalCalculation(productValue, condition){ // Calculates and formats the total amount in the cart
  if(condition == 'sum') {
    totalProductValue = totalProductValue + productValue;
    return `R$ ${totalProductValue.toFixed(2).toString().replace('.', ',')}`;
  } else if (condition == 'sub') {
    totalProductValue = totalProductValue - productValue;
  }
  return `R$ ${totalProductValue.toFixed(2).toString().replace('.', ',')}`;
};

function searchCard(id, list){ // Search which card will enter the cart
  for (let i = 0; i < list.length; i++){
    if(list[i].id == id){
      return list[i];
    }
  }
};

const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', function(e){ // On click, filter by input text
  e.preventDefault();
  let listProducts = data;
  let textFromSearch = '';
  const sectionTag = document.querySelector('.main-cards');
  
  let inputSearch = document.getElementById('input-text').value;
  textFromSearch = removeSpecialChar(inputSearch);
  
  const newUlTag = document.createElement('ul');
  newUlTag.id = 'cardsList';
  
  for (let i = 0; i < listProducts.length; i++) {
    let nameProduct = removeSpecialChar(listProducts[i].nameItem);
    let valueProduct = listProducts[i].value;
    const liCard = addCard(listProducts, i);

    if ((nameProduct.includes(textFromSearch)) || (valueProduct == textFromSearch)){
      sectionTag.innerHTML = '';
      newUlTag;
      newUlTag.appendChild(liCard);
      sectionTag.appendChild(newUlTag);
    }
  }
});

const allItemsli = document.getElementById('all-items');

allItemsli.addEventListener('click', function(e){ // Filter by "All" in the site header
  e.preventDefault();
  const cardlist = document.querySelector('#cardsList');

  cardlist.innerHTML = '';
  createList(data);
});

const accessoriesItemsli = document.getElementById('accessories-items');

accessoriesItemsli.addEventListener('click', function(e){ // Filter by "Accessories" in the site header
  e.preventDefault();
  let listProducts = data;
  const sectionTag = document.querySelector('.main-cards');

  const cardlist = document.querySelector('#cardsList');
  cardlist.innerHTML = '';
  createList(listProducts);
  
  const newUlTag = document.createElement('ul');
  newUlTag.id = 'cardsList';

  const accessories = document.querySelector('.category-Acessórios');
  let formatAcessories = removeSpecialChar(accessories.innerText);

  for (let i = 0; i < listProducts.length; i++){
    const liCard = addCard(listProducts, i);
    let categoryList = removeSpecialChar(listProducts[i].tag[0]);

    if (categoryList == formatAcessories){
      sectionTag.innerHTML = '';
      newUlTag;
      newUlTag.appendChild(liCard);
    } 
  }
  sectionTag.appendChild(newUlTag);
})

const tshirtItemsli = document.getElementById('tshirt-items');

tshirtItemsli.addEventListener('click', function(e){ // Filter by "T-shirts" in the site header
  e.preventDefault();
  let listProducts = data;
  const sectionTag = document.querySelector('.main-cards');

  const cardlist = document.querySelector('#cardsList');
  cardlist.innerHTML = '';
  createList(listProducts);

  const newUlTag = document.createElement('ul');
  newUlTag.id = 'cardsList';

  const tshirt = document.querySelector('.category-Camisetas');
  let formatTshirt = removeSpecialChar(tshirt.innerText);
  
  for (let i = 0; i < listProducts.length; i++) {

    const liCard = addCard(listProducts, i);
    let categoryList = removeSpecialChar(listProducts[i].tag[0]);
    
    if (categoryList == formatTshirt) {
      sectionTag.innerHTML = '';
      newUlTag;
      newUlTag.appendChild(liCard);
    } 
  }
  sectionTag.appendChild(newUlTag);
})

const home = document.getElementById('logo-start');

home.addEventListener('click', function(e){ // Reset and go to the beginning of the site
  e.preventDefault();
  const cardlist = document.querySelector('#cardsList');
  cardlist.innerHTML = '';
  createList(data);
});

function removeSpecialChar(str){ // Function checks if the user typed any special characters. Then remove the special character
  let specialChar = ' !"#-$%&()*+./:;<=>?@[]^_{|}~';
  let strTemp = '';

  for (let i = 0; i < str.length; i++) {
    if(!specialChar.includes(str[i].toLowerCase())){
      strTemp += str[i];
    }
  }
  return strTemp.toLowerCase();
}

createList(data);