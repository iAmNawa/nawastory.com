var xhr = require('xhr')

var loginEl = document.querySelector('#login')
var passEl = document.querySelector('#password')

document.querySelector('button').addEventListener('click', buttonclick, false)

function buttonclick (e) {
  xhr({
    uri:'/login',
    method: 'post',
    json: {
      login:loginEl.value,
      pass:passEl.value,
    }
  }, (err, resp)=>{
    document.location.reload()
  })
}
