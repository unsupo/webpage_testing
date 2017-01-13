var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '628531512920-arim9k90e5j7bf4aomg8rb56dr0cp9vt.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        // Sign in the user if they are currently signed in.
        if (auth2.isSignedIn.get() == true) {
            signOut();
        }
        attachSignin(document.getElementById('googleV'));
    });
};
function attachSignin(element) {
//        console.log(element.id);
    auth2.attachClickHandler(element, {},
        function onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;

            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            console.log('TOKEN: '+id_token);

            var xhr = sendRequest('google', id_token);
            xhr.onload = function() {
                console.log('Signed in as: ' + xhr.responseText);
                if(JSON.parse(xhr.responseText)['content'] === "SUCCESS!") {
                    var win = window.open("html/index_1.html", "_self");
                    win.document.write("<p>Hello " + profile.getName()+"</p>");
                    win.document.write("<p>You're Now Logged In</p>");
                    win.document.write("<p>Email:  "+ profile.getEmail()+"</p>");
                    win.document.write("<img src='"+profile.getImageUrl()+"'>");
                    win.document.write("<br/><br/><a href=\"index.html\" onclick=\"signOut();\">Sign out</a>");
                }else{
                    window.alert("Failed to log in");
                }
            };
            xhr.send();

        },function(error) {
            alert(JSON.stringify(error, undefined, 2));
        }
    );
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}