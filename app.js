//We are importing the express module and morgan,body-Parser middleware
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Middleware: Morgan for logging requests to the console
app.use(morgan('dev'));

// Middleware: Body parser to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

app.get('/about', (req, res) => {
    res.send('We are building a basic server using Express and third-party middleware.');
});

// Middleware: Handle undefined routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message
        }
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});