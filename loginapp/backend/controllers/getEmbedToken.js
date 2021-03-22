var CONFIG = require('../config.json');
const utils = require(__dirname + "/../helpers/utils.js");
let embedToken = require(__dirname + '/../helpers/embedConfigService.js');
module.exports.getEmbedToken = async function (req, res) {
    const config = require(__dirname + "/../config/config.json");
    console.log(config.reportId[0])
    // Validate whether all the required configurations are provided in config.json
    const accessToken = req.query.accessToken
    const report_num = req.query.report_num
    console.log(accessToken)
    configCheckResult = utils.validateConfig();
    console.log(configCheckResult)
    if (configCheckResult) {
        return {
            "status": 400,
            "error": configCheckResult
        };
    }
    
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo(accessToken,report_num);
    console.log(result.embedUrl)
    // result.embedUrl = result.embedUrl+'&filter=Date%2FYear%20eq%20%27CY2016%27'
    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
}