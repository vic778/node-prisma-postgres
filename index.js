const express = require('express')

const app = express()
app.use(express.json())

app.use('/products', require('./routes/productRoute'))
app.use('/categories', require('./routes/categoryRoute'))

app.listen(3000, () => console.log('Server started on port 3000'))