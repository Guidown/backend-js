import { readFile, readFileSync, writeFileSync } from 'fs';

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Error: Todos los campos son obligatorios.");
      return 
    }

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      return console.log("Error: El código del producto ya existe.");
    }

    product.id = this.products.length + 1;
    this.products.push(product);

    this.guardarProductos();
    console.log("Producto agregado correctamente.");
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer los productos:', err);
          return reject(err);
        }
        if (data === '') {
          return resolve([]);
        }
        const products = JSON.parse(data);
        return resolve(products);
      });
    });
  }

  getProductById(id) {
    return this.getProducts()
      .then((products) => {
        const product = products.find((product) => product.id === id);
        return product;
      })
      .catch((error) => {
        console.log('Error al obtener el producto:', error);
        return error;
      });
  }

  updateProduct(id, updateProduct) {
    this.getProducts()
      .then((products) => {
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
          return;
        }

        products[productIndex].title = updateProduct.title;
        products[productIndex].description = updateProduct.description;
        products[productIndex].price = updateProduct.price;
        products[productIndex].thumbnail = updateProduct.thumbnail;
        products[productIndex].code = updateProduct.code;
        products[productIndex].stock = updateProduct.stock;

        this.guardarProductos(products);
        console.log('Producto actualizado');
      })
      .catch((e) => {
        console.log('Error al obtener el producto:', e);
        return e;
      });
  }

  deleteProduct(id) {
    console.log(id)
    let products = this.leerProductos();
    const productIndex = products.findIndex((p) => p.id == id);
    if (productIndex == -1) {
      return console.log('Producto no encontrado');
    }

    products.splice(productIndex, 1);
    this.guardarProductos();

    console.log('Producto eliminado');
  }

  leerProductos() {
    try {
      const data = readFileSync(this.path, 'utf-8');
      if (data == '') {
        console.log(data);
        return [];
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Error al leer los productos:', err);
      return [];
    }
  }

  guardarProductos(products) {
    try {
      const data = JSON.stringify(products || this.products, null, 2);
      writeFileSync(this.path, data, 'utf-8');
      console.log('Productos guardados correctamente');
    } catch (err) {
      console.log('Error al guardar los productos', err);
    }
  }
}

const manager = new ProductManager('./data.json');

/*
 manager.addProduct({
   title: "Zapatillas",
   description: "Zapatillas deportivas",
   price: 59.99,
   thumbnail: "img/zapatillas.jpg",
   code: "5678",
   stock: 10,
 });
*/
// manager.getProducts()
//   .then((products) => {
//     console.log(products);
//   })
//   .catch((err) => {
//     console.error('Error al obtener los productos:', err);
//   });

// manager.getProductById(1)
//   .then((product) => {
//     console.log(product);
//   })
//   .catch((err) => {
//     console.error('Error al obtener el producto:', err);
//   });

// manager.updateProduct(1, {
//   title: "Camiseta",
//   description: "Camiseta de algodón",
//   price: 19.99,
//   thumbnail: "img/camiseta.jpg",
//   code: "5678",
//   stock: 5,
// });

// manager.deleteProduct(1);