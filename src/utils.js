const chromiumArgs = [
    '--disable-web-security', '--no-sandbox', '--disable-web-security',
    '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
    '--disable-offline-load-stale-cache', '--disk-cache-size=0',
    '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
    '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
    '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
    '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list'
  ]


const options = {
  folderNameToken: 'tokens', //folder name when saving tokens
  mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
  headless: true, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserWS: '', // If u want to use browserWSEndpoint
  browserArgs: chromiumArgs, // Parameters to be added into the chrome browser instance
  puppeteerOptions: {}, // Will be passed to puppeteer.launch
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
  disableWelcome: true, // Will disable the welcoming message which appears in the beginning
  updatesLog: true, // Logs info updates automatically in terminal
  autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
  createPathFileToken: false, //crea
}
module.exports = {options}