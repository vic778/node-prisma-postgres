const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.patch('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)


module.exports = router