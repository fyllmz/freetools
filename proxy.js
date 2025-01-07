const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());



//cors ayarları
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


app.post('/api/scan/list', async (req, res) => {
    try {
        const response = await axios.post('https://api.s4e.io/api/scan/list', req.body, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Something went wrong' });
    }
});

app.post('/api/scan/start-group-scan', async (req, res) => {
    try {
        const response = await axios.post('https://api.s4e.io/api/scan/start-group-scan', req.body, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Something went wrong' });
    }
});

app.post('/api/scan/get-activity-logs', async (req, res) => {
    try {
        const response = await axios.post('https://api.s4e.io/api/scan/get-activity-logs', req.body, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Something went wrong' });
    }
});

app.listen(5000, () => {
    console.log('Proxy server running on http://localhost:5000');
});
