const express = require('express');
const app = express();

const port = 9000

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));