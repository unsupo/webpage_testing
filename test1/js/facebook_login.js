// /**
//  * Created by jarndt on 1/10/17.
//  */


window.fbAsyncInit = function() {
    FB.init({
        appId   : '622129601327484',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });

};

function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... '+response.authResponse);
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token //send to server
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', {fields: 'name,email,birthday,isVerified,languages,location,sports'}, function(response) {
                console.log(response);
                user_email = response.email; //get user email
                user_name = response.name;
                // you can store this data into your database
                var xhr = sendRequest('facebook', access_token);
                xhr.onload = function() {
                    console.log('Signed in as: ' + xhr.responseText);
                    if(JSON.parse(xhr.responseText)['content'] === "SUCCESS!") {
                        var win = window.open("html/index_1.html", "_self");
                        win.document.write("<p>Hello " + user_name +"</p>");
                        win.document.write("<p>You're Now Logged In: "+response+"</p>");
                        win.document.write("<p>Email:  "+ user_email +"</p>");
                        win.document.write("<br/><br/><a href=\"index.html\" onclick=\"signOut();\">Sign out</a>");
                    }else{
                        window.alert("Failed to log in");
                    }
                };
                xhr.send();
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,user_friends,email'
    });
}
(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    // document.getElementById('fb-root').appendChild(e);
}());