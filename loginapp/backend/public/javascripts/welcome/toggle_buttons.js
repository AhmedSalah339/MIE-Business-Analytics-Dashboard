
$(".switch:not([checked])").on('change' , function(){
    $(".switch").not(this).prop("checked" , false);
  });
  let emb = new embed();
  let report1 = $("#report1").get(0);
  let report2 = $("#report2").get(0);
  let report3 = $("#report3").get(0);
  // let reportContainer = $("#report-container").get(0);
  report1.addEventListener('change',function(){
    if(this.checked){
      powerbi.reset(reportContainer);
      const accessToken =  localStorage.getItem('accessToken');
      emb.embed_report(accessToken,1)
    }
  } )
  report2.addEventListener('change',function(){
    if(this.checked){
      powerbi.reset(reportContainer);
      const accessToken =  localStorage.getItem('accessToken');
      emb.embed_report(accessToken,2)
    }
  } )
  report3.addEventListener('change',function(){
    if(this.checked){
      powerbi.reset(reportContainer);
      const accessToken =  localStorage.getItem('accessToken');
      emb.embed_report(accessToken,3)
    }
  } )
// function arrayRemove(arr, value) { 
    
//     return arr.filter(function(ele){ 
//         return ele != value; 
//     });
// }
// function toggle(n){
// let nums = [1,2,3];
// let nums = arrayRemove(nums, n);
// for (elem in nums){

// }
// }