express = require 'express'
app = express()

requirefu = require 'require-fu'

require('./app/config') app, express

requirefu(__dirname + '/app/routes') app


app.listen app.port, ->
  console.log "Server up and running @ #{app.port}"
