const express = require('express');
const exphbs = require('express-handlebars');
const path =  require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRoute = require('./routes');

// Set port
const port = 3000;

// Init app
const app = express();

// View Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Method override
// To do delete requests from a form
app.use(methodOverride('_method'));

// Router
app.use('/', indexRoute);


app.listen(port, () => console.log(`Server started on Port ${port}`));