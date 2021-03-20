
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