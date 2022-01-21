const config = {
  consumer_key:         process.env.CON_KEY || 5000,
  consumer_secret:      process.env.CON_SEC || 5000,
  access_token:         process.env.ACC_TOK || 5000,
  access_token_secret:  process.env.ACC_SEC || 5000
}

module.exports = config;
