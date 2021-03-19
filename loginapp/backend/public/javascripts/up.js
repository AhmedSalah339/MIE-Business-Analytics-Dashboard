class up{
 
    constructor()
    {

    }
    upload_data(jwt,cols,table){
        var uploadButt = document.getElementById('upload');
        const processor1 = new processor();

        uploadButt.onchange = function(e) {
        let promise = processor1.processFile(e);
        promise.then((json_df) => {
            console.log(json_df);
            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', 'Bearer '+jwt);

            fetch('http://127.0.0.1:5000/upload_data', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({'data':json_df,'cols':cols,'table':table}),
            }).then(response => response.json()).then(response =>console.log(response))
        })

        }
    }
}