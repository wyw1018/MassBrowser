import connect from 'connect'
import http from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import fs from 'fs-extra'

import { debug, warn, error } from '@utils/log'
import { AutoUpdateError } from '@utils/errors'
import config from '@utils/config'
import { getDataDir } from '@utils'


class NoHostHandlerService {
  constructor () {
    this.app = connect()
    this.server = null

    this.initializeApp(this.app)
  }

  start() {
    let port = config.noHostHandlerPort
    this.server = http.createServer(this.app)
    this.server.listen(port, () => debug(`No-host handler started on port ${port}`))
  }

  initializeApp(app) {
    app.use('/v2', function(req, res)  {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'text/plain')
      res.end('pong')
    })

    app.use('/', function(req, res, next)  {
      res.setHeader('Access-Control-Allow-Origin', '*')
      /* TODO give better message, redirect to web panel */
      res.end("Must access website with domain name")
    })
  }
}

export const noHostHandlerService = new NoHostHandlerService()
export default noHostHandlerService
