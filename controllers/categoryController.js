const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createCategory = async (req, res) => {
    const Catname = req.body.name;
    try {
        if (!Catname) {
            return res.status(400).json({ error: "Product name is required" });
        }

        if (await prisma.Category.findUnique({ where: { name: Catname } })) {
            return res.status(409).json({ error: `${Catname} category already exists` });
        }

        const newCategory = await prisma.category.create({
            data: {
                name: Catname
            }
        });
        
        return res.status(201).json(newCategory);
    } catch (error) {
        // console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'desc'
            }
        });

        return res.status(200).json({ categories: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCategoryById = async (req, res) => {
    const CatId = req.params.id;

    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(CatId) } })
        
        if(await !category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    const CatId = req.params.id;
    const Catname = req.body.name;

    try {
        if (!Catname) {
            return res.status(400).json({ error: "Product name is required" });
        }

        const category = await prisma.category.findUnique({ where: { id: parseInt(CatId) } })
        
        if(await !category) {
            return res.status(404).json({ error: "Category not found" });
        }

        if (await prisma.category.findUnique({ where: { name: Catname } })) {
            return res.status(409).json({ error: `${Catname} category already exists` });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(CatId) },
            data: { name: Catname }
        });

        return res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    const CatId = req.params.id;

    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(CatId) } })
        
        if(await !category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await prisma.category.delete({ where: { id: parseInt(CatId) } });

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}