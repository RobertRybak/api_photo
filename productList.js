const listSection = document.querySelector('#lists');
const listTemplate = document.querySelector('#list-template');

getData();

async function getData() {
  const listStream = await fetch('https://www.empikfoto.pl/product/list');
  const lists = await listStream.json();
  const productLists = lists.products;

  productLists.forEach(listItem => {
    const productId = listItem.productId;
    const product = listItem.product;

    const newProduct = document.importNode(listTemplate.content, true);
    const listTitle = newProduct.querySelector('.list__id');
    const listBody = newProduct.querySelector('.list__product');

    listTitle.innerText = productId;
    listBody.innerText = product;

    listSection.appendChild(newProduct);

  })

}