var report1_butt = document.getElementById('report1');
var report2_butt = document.getElementById('report2');
var report3_butt = document.getElementById('report3');
$(".switch:not([checked])").on('change' , function(){
    $(".switch").not(this).prop("checked" , false);
  });    
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