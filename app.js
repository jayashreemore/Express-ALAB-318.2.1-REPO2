const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001; // You can choose any port you prefer

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy data for demonstration
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
];

// Route to render the home page
app.get('/', (req, res) => {
    res.render('index', { products });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    console.log(req.body); // Log form data
    res.send('Success'); // Send success response
});

// Route with parameter to render a specific product page
app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    res.render('product', { product });
});
////////////this displays Product not find on browser after localhost:3000/product/:id 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static('public'));

// Route to handle image download
app.get('/download', (req, res) => {
    const filePath = __dirname + '/public/example.jpg'; // Path to your image file
    res.download(filePath, 'example.jpg'); // Send the file as a download
});

app.get('/download', (req, res) => {
    const filePath = __dirname + '/public/example.jpg';
    res.setHeader('Content-Disposition', 'attachment; filename=example.jpg');
    res.sendFile(filePath);
});

