const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createProduct = async (req, res) => {
    const prodName = req.body.name;
    const prodPrice = req.body.price;
    const prodCategoryId = req.body.categoryId;
    const prodDescription = req.body.description;
    try {

        if (!prodName) {
            return res.status(422).json({ error: "Product name is required" });
        }

        if (!prodPrice) {
            return res.status(422).json({ error: "Product price is required" });
        } else {
            if (isNaN(prodPrice) || prodPrice <= 0) {
                return res.status(422).json({ error: "Product price must be a positive number" });
            }
        }

        if (!prodCategoryId) {
            return res.status(422).json({ error: "Category ID is required" });
        } else {
            const category = await prisma.category.findUnique({ where: { id: parseInt(prodCategoryId) } });
            if (!category) {
                return res.status(422).json({ error: "Category ID does not exist" });
            }
        }
        if (!prodDescription) {
            return res.status(422).json({ error: "Product description is required" });
        }

        const product = await prisma.product.findUnique({ where: { name: prodName } });
        if (product) {
            return res.status(409).json({ error: `${prodName} product already exists` });
        }
        const newProduct = await prisma.product.create({
            data: {
                name: prodName,
                price: parseFloat(prodPrice),
                categoryId: parseInt(prodCategoryId),
                description: prodDescription
            }
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: {
                name: 'desc'
            }
        });

        return res.status(200).json({ products: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getProductById = async (req, res) => {
    const prodId = req.params.id;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(prodId) },
            include: {
                category: true
            }
        })
        
        if(await !product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const prodId = req.params.id;
    const prodName = req.body.name;
    const prodPrice = req.body.price;
    const prodCategoryId = req.body.categoryId;
    const prodDescription = req.body.description;

    try {
        if (!prodName) {
            return res.status(422).json({ error: "Product name is required" });
        }

        if (!prodPrice) {
            return res.status(422).json({ error: "Product price is required" });
        } else {
            if (isNaN(prodPrice) || prodPrice <= 0) {
                return res.status(422).json({ error: "Product price must be a positive number" });
            }
        }

        if (!prodCategoryId) {
            return res.status(422).json({ error: "Category ID is required" });
        } else {
            const category = await prisma.category.findUnique({ where: { id: parseInt(prodCategoryId) } });
            if (!category) {
                return res.status(422).json({ error: "Category ID does not exist" });
            }
        }
        if (!prodDescription) {
            return res.status(422).json({ error: "Product description is required" });
        }

        const product = await prisma.product.findUnique({ where: { id: parseInt(prodId) } });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(prodId) },
            data: {
                name: prodName,
                price: parseFloat(prodPrice),
                categoryId: parseInt(prodCategoryId),
                description: prodDescription
            }
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteProduct = async (req, res) => {
    const prodId = req.params.id;

    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(prodId) } })
        
        if(await !product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await prisma.product.delete({ where: { id: parseInt(prodId) } });

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}