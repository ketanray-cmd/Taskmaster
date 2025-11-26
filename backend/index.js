// backend/index.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({status: 'ok'}));
app.listen(process.env.PORT || 3000, () => console.log('Server started'));

