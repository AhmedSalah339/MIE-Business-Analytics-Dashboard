const upload = new up();

// initialize webauth object
var webAuth = new auth0.WebAuth({
  domain:       'dev-8tto1d7k.eu.auth0.com',
  clientID:     'B7L6Fztdma1RJBZx830uTvwLl5ihgeoE'
});
// get access token and state from the link
authResult = window.location.hash;
if (authResult.includes( "#access_token")){
authResult = authResult.slice('#access_token='.length,);
accessToken = authResult.split('&')[0]

state = authResult.split('&').filter(x => x.startsWith('state'))[0].slice('state='.length,);
console.log(state)
if (state == localStorage.getItem('state') )
{
  // if all ok request user info and log it
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
  cols = ['DATE','COUNTRY','CITY','STORE','BRAND','PRODUCT','SOLDUNITS','ONHANDUNITS','SOLDAMOUNT','ONHANDAMOUNT']
  table = 'pos'
  upload.upload_data(accessToken,cols,table);
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
  
  console.log('error on state')
  window.location.href = url;
}
}else{
  url = 'https://localhost:3000/unauthorized';
  console.log('not authorized');
  window.location.href = url;
}
