var report1_butt = document.getElementById('report1');
var report2_butt = document.getElementById('report2');
var report3_butt = document.getElementById('report3');
var emb = new embed();
class up{
 
    constructor()
    {

    }
 

    upload_data(jwt){
        function get_cols_table(){
            return new Promise((resolve, reject) => {
            
            
            if (report1_butt.checked===true){
                let cols = ['DATE','COUNTRY','CITY','STORE','BRAND','PRODUCT','SOLDUNITS','ONHANDUNITS','SOLDAMOUNT','ONHANDAMOUNT']
                let table = 'pos'
                console.log('here');
                resolve([cols,table])
            }
            else if (report2_butt.checked===true){
                let cols = ['MONTH','COMPANY','COSTCENTER','REVENUES','OPERATINGCOSTS','OPERATINGEXPENSES','DEPRECIATIONSAMORTIZATIONS','INTERESTSTAXES','CURRENTASSETS','CURRENTLIABILITIES','TOTALASSETS','TOTALLIABILITIES']
                let table = 'financial'
                resolve([cols,table])
            }
            else if (report3_butt.checked===true){
                let cols = ['DATE','STORE','ITEMFAMILY','ITEM','QUANTITYINSTOCK','UNITVALUE','TARGETSTOCKMIN','TARGETSTOCKMAX']
                let table = 'inventory'
                resolve([cols,table])
            }
        })
        }
        var uploadButt = document.getElementById('upload');
        console.log('reeee')
        
        const processor1 = new processor();

        uploadButt.onchange = function(e) {
            console.log('reeee')
            
           
            
        
            
        let promise = processor1.processFile(e);
        
        promise.then((json_df) => {
            get_cols_table().then( (res)=>{
            let cols = res[0]
            let table = res[1]
            console.log(cols)
            console.log(table)
            console.log(json_df);
            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', 'Bearer '+jwt);

            fetch('http://127.0.0.1:5000/upload_data', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({'data':json_df,'cols':cols,'table':table}),
            }).then(response => response.json()).then(response =>{
                console.log(response);
                if(response['success']){
                    var dataset_num = 0;
                    if (report1_butt.checked===true){
                        dataset_num=1}
                    else if (report2_butt.checked===true){dataset_num=2}else if (report3_butt.checked===true){dataset_num=3}
                    $.ajax({
                        type: "GET",
                        url: '/refresh?accessToken='+jwt+'&dataset_num='+dataset_num,
                        dataType: "json",
                        success: function (response) {
                            console.log('refreshed');
                            console.log(response)
                            
                        // emb.embed_report(accessToken,dataset_num,false);
                    }})

                    
                    // fetch('https://localhost:3000/refresh?dataset_num='+dataset_num, {
                    // method: 'GET',
                    // headers: myHeaders}).then(response => response.json()).then(response =>console.log(response)).then(response =>{
                    //     var accessToken = localStorage.getItem('accessToken');
                    //     embed_report(accessToken,dataset_num);
                    // }

                    // )

                }})
        })
    });

        }
    }
        
}