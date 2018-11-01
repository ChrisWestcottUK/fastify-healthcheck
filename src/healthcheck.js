/*
 * Copyright 2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict'

// standalone script, to get content from the running web application
// for example it can be called by container health checks

// use Node.js 'http' integrated module,
// even to avoid dependencies clash
const http = require('http')

const options = {
  timeout: 5000, // 5 sec
  log: true // if enabled, write log to console
}
const url = process.argv[2] || 'http://localhost:3000/health'
if (options.log === true) {
  console.log(`call healthcheck at: ${url} ...`)
}

const request = http.get(url, (res) => {
  if (options.log === true) {
    console.log(`status: ${res.statusCode}`)
  }
  if (res.statusCode === 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})
request.setTimeout(options.timeout)

request.on('error', (err) => {
  if (options.log === true) {
    console.log(`error: ${err.message}`)
  }
  process.exit(1)
})

request.end()