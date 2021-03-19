class up{
 
    constructor()
    {

    }
    upload_data(jwt){
        var report1_butt = document.getElementById('report1');
        var report2_butt = document.getElementById('report2');
        var report3_butt = document.getElementById('report3');
        if (report1_butt.checked){
            let cols = ['DATE','COUNTRY','CITY','STORE','BRAND','PRODUCT','SOLDUNITS','ONHANDUNITS','SOLDAMOUNT','ONHANDAMOUNT']
            let table = 'pos'
        }
        else if (report2_butt.checked){
            let cols = ['MONTH','COMPANY','COSTCENTER','REVENUES','OPERATINGCOSTS','OPERATINGEXPENSES','DEPRECIATIONSAMORTIZATIONS','INTERESTSTAXES','CURRENTASSETS','CURRENTLIABILITIES','TOTALASSETS','TOTALLIABILITIES']
            let table = 'financial'
        }
        else if (report3_butt.checked){
            let cols = ['DATE','STORE','ITEMFAMILY','ITEM','QUANTITYINSTOCK','UNITVALUE','TARGETSTOCKMIN','TARGETSTOCKMAX']
            let table = 'inventory'
        }



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