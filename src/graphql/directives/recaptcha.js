/* eslint-disable new-cap */
const reCAPTCHA = require('recaptcha2')
const { NO_RECAPTCHA, INVALID_RECAPTCHA } = require('../error')

const recaptcha = new reCAPTCHA({
  siteKey: process.env.RECAPTCHA_SITE_KEY,
  secretKey: process.env.RECAPTCHA_SECRET_KEY
})

module.exports = {
  async recaptcha(next, _, requires, { recaptchaData }) {
    const { key, ip } = recaptchaData
    if (!key || key === '') {
      throw new Error(NO_RECAPTCHA)
    }
    try {
      await recaptcha.validate(key, ip)
    } catch (err) {
      throw new Error(INVALID_RECAPTCHA)
    }
    return next()
  }
}
