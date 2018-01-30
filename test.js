launchbox.Container.clearSessionCookies()

    .then(function () {


            console.log('ok')

    })

    .catch(function (error) {
        console.log("not ok");
    });


var authenticator = launchbox.Authentication.authenticator(launchbox.Authentication.Type.PEGA_AUTHENTICATOR);
authenticator.url = 'http://eng-killerbees04.rpega.com:8080/prweb/';
authenticator.isLoggedIn().then(function () {
    console.log('ok')
})