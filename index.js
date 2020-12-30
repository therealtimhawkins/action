const webpush = require("web-push")
const core = require("@actions/core")
const github = require("@actions/github")

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  const publicVapidKey = core.getInput("public_vapid_key")
  const privateVapidKey = core.getInput("private_vapid_key")
  const subscription = {
    endpoint: core.getInput("endpoint"),
    keys: {
      auth: core.getInput("auth"),
      p256dh: core.getInput("p256dh"),
    },
  }

  webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  )

  const sendNotification = (dataToSend = "Github Action #2131231 Started!") => {
    webpush.sendNotification(subscription, dataToSend)
  }

  sendNotification()
} catch (error) {
  core.setFailed(error.message)
}