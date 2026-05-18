const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const offerRoutes = require('./src/routes/offerRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Routes
app.use('/', offerRoutes);

app.get('/', (req, res) => {
    res.render('offer-letter', { 
        candidateName: '', 
        position: '', 
        salary: '', 
        startDate: '',
        companyName: 'Spacesyntax'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});