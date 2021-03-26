const config = require(__dirname + "/../config/config.json");
const fetch = require('node-fetch');

let embedToken = require(__dirname + '/../helpers/embedConfigService.js');

module.exports.refresh = async function(req,res){


    
    var dataset_num = req.query.dataset_num;
    var dataset_id = config.dataset_id[dataset_num-1];
    // var report_id = config.dataset_id[dataset_num-1];
    var workspaceId = config.workspaceId;
    const headers = await embedToken.getRequestHeader();
    try{
    const result = await fetch('https://api.powerbi.com/v1.0/myorg/groups/'+workspaceId+'/datasets/'+dataset_id+'/refreshes', {
                    method: 'POST',
                    headers:headers
                } );
    if (!result.ok) {
        throw result;
    }
    const resultJson = await result.json();
    console.log(resultJson);
    res.status(resultJson.status).send(resultJson);

    }catch (err) {console.log(err)}
    
}