'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://sendinfo-cs-java.tpddns.cn:12222"',
    DEFAULT_GATEWAY:'"admin"'
})
