const async = require('async')

const asyncHelper = {

  mapLimitPromise: (arrayOfData, concurrentCount, promiseFunction) => {

    return new Promise((resolve, reject) => {

      async.mapLimit(arrayOfData, concurrentCount, promiseFunction, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })

    })

  },
  sleep: (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

}

module.exports = asyncHelper

