const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/id/:id/site/:site', (req, res) => {
  console.log(req.params);
});


app.listen(port, () => console.log(`Listening on port ${port}!`))