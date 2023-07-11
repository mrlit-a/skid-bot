const axios = require('axios')

const getBuffer = async (url, opciones) => {
  try {
    opciones = opciones || {};
    const post = await axios({
      method: "get",
      url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...opciones,
      responseType: 'arraybuffer',
    });
    return post.data;
  } catch (error) {
    console.log(color(`Error identificado: ${error}`, "red"));
  }
};


module.exports = { getBuffer };