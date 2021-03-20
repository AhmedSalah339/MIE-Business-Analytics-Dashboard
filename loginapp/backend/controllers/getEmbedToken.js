var CONFIG = require('../config.json');
const utils = require(__dirname + "/../helpers/utils.js");
let embedToken = require(__dirname + '/../helpers/embedConfigService.js');
module.exports.getEmbedToken = async function (req, res) {

    // Validate whether all the required configurations are provided in config.json
    configCheckResult = utils.validateConfig();
    if (configCheckResult) {
        return {
            "status": 400,
            "error": configCheckResult
        };
    }
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo();

    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
}