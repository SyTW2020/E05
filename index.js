const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());

app.use(express.static("./public"));
app.use(express.json());

app.use('/api', require('./routes/index'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});