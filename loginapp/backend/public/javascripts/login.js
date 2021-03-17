function randomString(length = 32) {
  const bytes = new Uint8Array(length);
  const result = [];
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

  const crypto = window.crypto || window.msCrypto;
  const random = crypto.getRandomValues(bytes);
  for (let i = 0; i < random.length; i += 1) result.push(charset[random[i] % charset.length]);

  return result.join('');
} 
 state = randomString();
 console.log(state);
 // jelly button
 
var $button = document.querySelector('.button');
$button.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
  // authontication
  var webAuth = new auth0.WebAuth({
    domain:       'dev-8tto1d7k.eu.auth0.com',
    clientID:     'B7L6Fztdma1RJBZx830uTvwLl5ihgeoE'
  });
  // localStorage.setItem('webAuth', JSON.stringify(webAuth));
  // Calculate URL to redirect to
  var url = webAuth.client.buildAuthorizeUrl({
    clientID: "B7L6Fztdma1RJBZx830uTvwLl5ihgeoE", // string
    responseType: 'token', // code or token
    redirectUri: 'http://localhost:3000/welcome/',
    scope: 'openid profile email',state:state,
    audience :'BI'
  });
  localStorage.setItem("state", state);
  window.location.href = url;
  // window.location.replace(url);
});
