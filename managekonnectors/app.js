'use-strict'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('[role=application]')
  cozy.client.init({
    cozyURL: '//' + app.dataset.cozyDomain,
    token: app.dataset.cozyToken,
  })


  window.cozy.bar.init({ appName: 'Manage konnectors' })


  document.getElementById('update').onclick = () => {
    displayMessage('Updating konnector')
    work('PUT')
  }

  document.getElementById('install').onclick = () => {
    displayMessage('Installing konnector ...')
    work('POST')
  }
})

function work (verb) {
  const slug = document.getElementById('slug').value
  const source = document.getElementById('repositoryuri').value
  return cozy.client.fetchJSON(verb, `/konnectors/${slug}?Source=${encodeURIComponent(source)}`) //, '', { headers: { 'Accept': 'text/event-stream' } })
  .then(() => displayMessage('done'))
  .catch((err) => displayMessage(err))
}

function displayMessage (msg) {
  const messageElem = document.getElementById('message')
  messageElem.innerHTML = msg
}
