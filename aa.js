async addProduct(data) {
    try {
        await this.getProducts();
        if (
            !data.title ||
            !data.description ||
            !data.code ||
            !data.price ||
            !data.status ||
            !data.stock ||
            !data.category
        ) {
            throw new Error('Todos los campos son obligatorios')
        }

        const exist = this.products.find((product) => product.code === data.code);
        if (exist) {
            throw new Error(`Ya existe un producto con el código '${data.code}'`)
        }

        //la estrategía de this.products.length + 1 trajo inconvenientes al borrar y agregar productos
        const newId = generateId()

        const newProduct = {
            id: newId,
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            status: data.status ?? true,
            stock: data.stock ?? 1,
            category: data.category,
            thumbnails: data.thumbnails ?? [],
        };


        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));

    } catch (error) {
        console.log('Error al agregar el producto');
        throw error;
        }

    }