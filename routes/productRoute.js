const router = require('express').Router()
const { r } = require('tar')
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router