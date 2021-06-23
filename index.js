const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());

app.use(express.static(process.cwd()+"/dist"));
app.use(express.json());

app.use('/api', require('./routes/index'));

app.listen(3000);
console.log('Server listening on port 3000');