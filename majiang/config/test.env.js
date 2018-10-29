'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  API_HOST: '"https://stage.oopsdaily.com"'  // 測試环境接口地址
})
