/**
 * Utilities
 * @author Amarsingh
 */


/**
 * Utility method to format string by replacing whitespace with '+' char.
 * @param {string} str string to be formatted.
 */
exports.encodeSpaceForURI = (str) => {
  if(!str) return str;

  return str.replace(/\s/g, '+');
}

/**
 * Utility method to prepare URL to request Track Metadata.
 * @param {string} apiKey Developer API Key
 * @param {string} artist Valid name of the artist
 * @param {string} track Valid name of the track
 */
exports.prepareMetadataURI = (apiKey, artist, track) => {
  let host = `http://ws.audioscrobbler.com/2.0/`;
  return `${host}?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`;
}

/**
 * Returns requested AWS Secret.
 * @param {string} ask Type of AWS secret to be returned
 */
exports.getAWSSecret = (ask) => {
  // TODO obfuscate data, maybe use env or base64
  switch(ask) {
    case "access-id":
      return 'AKIAJTIOOIVBOK7R4YTQ';
    case "access-key":
      return '3XLXySJKQxYh16fZKUCA/eOJtU/sY+jcbc3QhbSG';
  }
}

/**
 * Returns Last.fm Developer API key.
 */
exports.getLastFmKey = () => {
  // TODO obfuscate data, maybe use env or base64
  return '205b0a29edbc5854544d3fc696c5763b';
}
