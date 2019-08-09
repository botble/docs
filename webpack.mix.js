let glob = require('glob');

glob.sync('./packages/*/webpack.mix.js').forEach(config => {
    require(config);
});
