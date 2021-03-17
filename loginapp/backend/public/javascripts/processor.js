class processor{

    constructor()
    {

    }
    processFile(e){
        return new Promise((resolve, reject) => {
        
        var reader = new FileReader ();
        reader.readAsText(e.target.files[0])
        reader.onload =() =>{
        let dic = this.get_dict(reader);
        let df = new dfd.DataFrame(dic)
        df.to_json().then((json) => {
            console.log(json);
            resolve(JSON.parse(json))
        }).catch((err) => {
            console.log(err);
        }) 
         
    }
   
       });
    }
   get_dict(reader){

    var allTextLines = reader.result.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {

        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var row = {};
            for (var j=0; j< headers.length; j++) {
               row[headers[j].trim()] = data[j].trim();

            }
            lines.push(row);
        }
    }
    console.log(lines);
    return lines
  }
   
}