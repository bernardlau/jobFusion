const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('../database/index');
const fs = require('fs');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/id/:id/site/:site', (req, res) => {
  const jobInfo = {job_id: req.params.id, site: req.params.site}
  db.postAppliedJob(jobInfo, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Successfully Applied');
    }
  });
});

app.get('/jobs', (req, res) => {
  db.getScrapedJobs((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/applied/jobs', (req, res) => {
  db.getAppliedJobs((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/aboutme', (req, res) => {
  fs.readFile(__dirname + '/aboutme.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get('/appliedJob', (req, res) => {
  const jobInfo = {job_id: req.query.job_id, site: req.query.site}
  db.getAppliedJobInfo(jobInfo, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`))