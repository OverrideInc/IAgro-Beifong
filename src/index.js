const express = require('express');

const settings = require('./initializers/settings');

const port = settings['PORT'];

const app = express()

app.listen(port, () => {
	console.log('Listening on port: ' + port);
})
