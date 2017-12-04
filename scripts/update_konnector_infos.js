'use-strict'

const fs = require('fs')
const request = require('request')

const KONNECTORS_FILE = `${__dirname}/../src/config/konnectors.json`

// 1. Parse konnectors file
// 2. For the specified slug / For each konnectors :
// 2.1 fetch manifest from source
// 2.2 get data, and put in konnectors obj.
// 2.3 serialize and write back konnector file.


const konnectors = require(KONNECTORS_FILE)

const slug = process.argv[2]
const index = konnectors.findIndex(k => k.lsug === slug)

const konnector = konnectors[index]


let uri = konnector.source

if (uri.indexOf('git://github.com/') === 0) {
  //"source": "git://gitlab.cozycloud.cc/gjacquart/cozy-konnector-enedis.git#build"
  [base, branch] = uri.split('#')
  uri = `https${base.slice(3, -4)}/blob/${branch}/manifest.konnector`
  //https://github.com/cozy/cozy-konnector-orangevod/blob/build/manifest.konnector
} else if (uri.indexOf('git://gitlab.cozycloud.cc/') === 0) {
  //"source": "git://github.com/briced/cozy-konnector-v3-ameli.git#build"
  [base, branch] = uri.split('#')
  uri = `https${base.slice(3, -4)}/raw/${branch}/manifest.konnector`
  //https://gitlab.cozycloud.cc/gjacquart/cozy-konnector-enedis/raw/build/manifest.konnector
}



request.get({ uri, json: true }, (err, data) => {
  konnector.name = data.name
  konnector.
    dataType: data.dataType ,
    : data. ,
    : data. ,
    : data. ,
    : data. ,
    : data. ,
    : data. ,
    : data. ,
    : data. ,

... TODO ...
})







