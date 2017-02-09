require('es6-object-assign').polyfill();
require('es6-promise').polyfill();
require('isomorphic-fetch');
const app = require("express")();
const vendor = require('webpack')(require('./build/webpack/vendor.js'));
vendor.run(function (err, stats) {
		console.log("DLL READY");
		const compiler = require('webpack')(require('./build/webpack/dev.js'));
		app.use(require('webpack-dev-middleware')(compiler));
		app.use(require('webpack-hot-middleware')(compiler.compilers.find(compiler => compiler.name === 'client')));
		app.use(require('webpack-hot-server-middleware')(compiler, {chunkName: 'server'}));
		app.use(require("morgan")('combined'));
		app.listen(5000, "0.0.0.0");

	}
);

