class Producto {
  constructor(name, price, year) {
    this.name = name,
      this.price = price,
      this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productsList = document.getElementById('products-list');
    const element = document.createElement('div');
    element.innerHTML = `
  <div class="card text-center mb-4">
    <div class="card-body">
      <strong>Product</strong>: ${product.name}
      <strong>Price</strong>: ${product.price}
      <strong>Year</strong>: ${product.year}
      <a href="#" class="btn btn-danger" name="delete">Delete</a>
    </div>
  </div>
 `;
    productsList.appendChild(element);
    
  }
  resetForm() {
    document.getElementById('product-form').reset();
  }
  deleteProduct(element) {
    if(element.name === 'delete'){
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage('Producto Eliminado', 'info');
    }
  }
  showMessage(message, cssClass) {
    const divDelete = document.createElement('div');
    divDelete.className = `alert alert-${cssClass} mt-2`;
    divDelete.appendChild(document.createTextNode(message));
    //Showing in DOM
    const conainer = document.querySelector('.container');
    const app = document.querySelector('#App');
    conainer.insertBefore(divDelete, app);
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },1500)
  }
}

//dom event
document.getElementById('product-form').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const year = document.getElementById('year').value;

  const product = new Producto(name, price, year);
  const ui = new UI();
  if(name === '' || price === '' || year === ''){
    return ui.showMessage('Error','danger');
  }
  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage('Producto añadido correctamente', 'success');
  e.preventDefault();
});

document.getElementById('products-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteProduct(e.target);
})