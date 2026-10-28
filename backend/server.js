const express = require('express');
const client = require('prom-client');
const app = express();
const PORT = 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'node_' });

// التصحيح هنا: استخدام express.json() مباشرة
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسار افتراضي للتأكد من عمل الخادم
app.get('/', (req, res) => {
    res.send('Hello from Express Server!');
});



app.get('/metrics', async (req, res) => {
    try {
        res.setHeader('Content-Type', client.register.contentType);
        res.send(await client.register.metrics());
    } catch (ex) {
        res.status(500).send(ex);
    }
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
