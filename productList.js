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

    fetch('https://www.empikfoto.pl/product/formats')
      .then(res => res.json())
      .then(format => {
        const formatsList = format.formats;
        formatsList.forEach(item => {

          if (item.id === listItem.formatId) {
            const format = item.name;

            if (item.typeId === listItem.typeId) {
              const type = item.typeName;

              const newProduct = document.importNode(listTemplate.content, true);
              const listTitle = newProduct.querySelector('.list__id');
              const listBody = newProduct.querySelector('.list__product');
              const listFormat = newProduct.querySelector('.list__format');
              const listTyp = newProduct.querySelector('.list__typ');

              listTitle.innerText = productId;
              listBody.innerText = product;
              listFormat.innerText = format
              listTyp.innerText = type;

              listSection.appendChild(newProduct);

            }

          }
        })
      })
  })
}