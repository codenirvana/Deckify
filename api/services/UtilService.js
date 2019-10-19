module.exports = {
  scrape: (targetUrl, cb) => {
    const metascraper = require('metascraper')([
        require('metascraper-image')(),
        require('metascraper-title')()
      ]),
      got = require('got');

    if (!targetUrl) {
      return cb(new Error('badRequestError'));
    }

    (async () => {
      const { body: html, url } = await got(targetUrl),
        metadata = await metascraper({ html, url });

      return cb(null, metadata);
    })();
  }
};
