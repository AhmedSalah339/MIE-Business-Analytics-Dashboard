var webAuth = new auth0.WebAuth({
  domain:       'dev-8tto1d7k.eu.auth0.com',
  clientID:     'B7L6Fztdma1RJBZx830uTvwLl5ihgeoE'
});

function get_access_state(){
  return new Promise((resolve, reject) => {

var uploadButt = document.getElementById('upload');
uploadButt.onclick = function (e){
  uploadButt.value='';
}
// initialize webauth object

// get access token and state from the link
authResult = window.location.hash;
if (authResult.includes( "#access_token")){
authResult = authResult.slice('#access_token='.length,);
accessToken = authResult.split('&')[0]

state = authResult.split('&').filter(x => x.startsWith('state'))[0].slice('state='.length,);
console.log(state)}
resolve ([state,accessToken])
})}

get_access_state().then( (res) =>{
  var state = res[0]

  var accessToken = res[1]
if (state == localStorage.getItem('state') )
{
  // if all ok request user info and log it
  var report1_butt = document.getElementById('report1');
  report1_butt.checked = true;
console.log(accessToken);
  // webAuth.client.userInfo(accessToken, function(err, user) {
  //     // This method will make a request to the /userinfo endpoint
  //     // and return the user object, which contains the user's information,
  //     // similar to the response below.
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(user);
  // });
  // upload functionality
  
  const upload = new up();
  const emb = new embed();
  
  upload.upload_data(accessToken);
  emb.embed_report(accessToken,1);
  localStorage.setItem('accessToken', accessToken);
  //button animation and logout functionality
  var $button = document.querySelector('#log_out');
  $button.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
  webAuth.logout({
    returnTo: 'http://localhost:3000/',
    client_id: 'B7L6Fztdma1RJBZx830uTvwLl5ihgeoE'
  });

});

}

else{
  url = 'https://localhost:3000/unauthorized';
  console.log('not authorized');
  window.location.href = url;
}
})