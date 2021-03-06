declare const require: any;
let compression = require('compression');
let express = require('express');
let morgan = require('morgan');
const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.static("www"));
app.use(morgan("combined"));
app.use(require("./middleware").default());
app.listen(5000);
