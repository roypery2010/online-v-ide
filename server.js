const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/run', (req, res) => {
    const code = req.body.code;
    fs.writeFileSync('code.v', code);

    exec('v run code.v', (err, stdout, stderr) => {
        if (err || stderr) {
            res.json({ error: stderr || err.message });
        } else {
            res.json({ output: stdout });
        }
    });
});

app.listen(port, () => {
    console.log(`V IDE backend listening at http://localhost:${port}`);
});