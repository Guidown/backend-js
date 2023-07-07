import { readFile, readFileSync, writeFileSync } from 'fs';
import {} from 'fs.promises'
export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(data) {
    try {
        await this.getProducts();
        if (
            !data.title ||
            !data.description ||
            !data.price ||
            !data.thumbnail ||
            !data.code ||
            !data.stock  
        ) {
            console.log('Todos los campos son obligatorios')
        }

        const exist = this.products.find((product) => product.code === data.code);
        if (exist) {
            throw new Error(`Ya existe un producto con el código '${data.code}'`)
        }

        //la estrategía de this.products.length + 1 trajo inconvenientes al borrar y agregar productos
const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = {
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnails: data.thumbnails,
            code: data.code,
            stock: data.stock ?? 1,
            id: newId
        };


        this.products.push(newProduct);
        await writeFileSync(this.path, JSON.stringify(this.products, null, 2));

    } catch (error) {
        console.log('Error al agregar el producto');
        throw error;
        }

    }
 
 
 
 getProducts() {
    try {
      const data = readFileSync(this.path, 'utf8');
      if (data === '') {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de productos:', error);
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id) || null;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProducts(products);
      return products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    const initialLength = products.length;
    products = products.filter((product) => product.id !== id);
    if (products.length !== initialLength) {
      this.saveProducts(products);
      return true;
    }
    return false;
  }

  saveProducts(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      writeFileSync(this.path, data, 'utf8');
      console.log('Productos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }
}