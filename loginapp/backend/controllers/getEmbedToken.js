var CONFIG = require('../config.json');
const utils = require(__dirname + "/../helpers/utils.js");
let embedToken = require(__dirname + '/../helpers/embedConfigService.js');
module.exports.getEmbedToken = async function (req, res) {

    // Validate whether all the required configurations are provided in config.json
    const accessToken = req.query.accessToken
    console.log(accessToken)
    configCheckResult = utils.validateConfig();
    if (configCheckResult) {
        return {
            "status": 400,
            "error": configCheckResult
        };
    }
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo(accessToken);
    console.log(result.embedUrl)
    // result.embedUrl = result.embedUrl+'&filter=Date%2FYear%20eq%20%27CY2016%27'
    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
}