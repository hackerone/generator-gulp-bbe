path = require 'path'

module.exports = (app) ->

  (req, res, next) ->
    render = res.render

    res.render = (view, options = {}, fn) ->

      self = this
      fn ?= (err, str) ->
        return req.next(err) if err
        self.send str

      render.call self, view, options, (err,str) ->
        return fn err,str if err

        options.content = str
        layout = path.join app.get("views"), app.get("layouts"), options.layout || "index"
        render.call self, layout, options, fn
        
    next()

