/**
 * Created by jarndt on 1/12/17.
 */
function default_login() {

    var password = document.getElementById("user-pw").value;
    var username = document.getElementById("user-email").value;

    // if(!validateEmail()) {
    //     alert("invalid email address entered");
    //     return;
    // }
    // console.log(password+" "+username);

    sendUserInfo(username,password);
}

function default_create_account() {
    var password1 = document.getElementById("user-pw-create").value;
    var password2 = document.getElementById("user-pw-repeat-create").value;
    var username = document.getElementById("user-email-create").value;

    if(password1 != password2) {
        alert("Passwords Don't Match");
        return;
    }

    sendUserInfo(username,password1);
}


function sendUserInfo(username, password) {
    var passhash = CryptoJS.MD5(password);
    var access_token = username+"|"+passhash;

    var xhr = sendRequest('default', access_token);
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
        if(JSON.parse(xhr.responseText)['content'] === "SUCCESS!") {
            var win = window.open("html/index_1.html", "_self");
            win.document.write("<p>Hello " + username +"</p>");
            win.document.write("<p>You're Now Logged In: </p>");
            win.document.write("<br/><br/><a href=\"index.html\" onclick=\"signOut();\">Sign out</a>");
        }else{
            if(xhr.responseText['result'] === "NEW_USER" )
                window.alert("Failed to log in, you're a new user, please sign up");
            else
                window.alert("Failed to log in");
        }
    };
    xhr.send();
}
