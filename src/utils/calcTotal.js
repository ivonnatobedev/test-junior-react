export function calcTotal(array, productsList) {
  if(array.length == 0) return 0;
  let list = array.map(item => {
    let tmp = productsList.find(prod => {
      return item.product_id == prod.id;
    });
    return {...item, ...tmp}
  });
  if(array.length == 1) return list[0].price * list[0].quantity;
  return list.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity)
  }, 0);
}