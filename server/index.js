require('newrelic');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(bodyParser.json());
app.use(compression());

app.use('/:id', express.static('public'));

app.set('port', process.env.PORT || 8080);

app.get('/api/reviews/:nameOrId', proxy('ec2-34-216-225-31.us-west-2.compute.amazonaws.com'));
app.post('/api/reviews', proxy('ec2-34-216-225-31.us-west-2.compute.amazonaws.com'));

app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});
