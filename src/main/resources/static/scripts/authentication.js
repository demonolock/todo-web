import {signIn} from "./authUtils.js";
import {signUp} from "./authUtils.js";

function reset() {
    let errors = document.getElementsByClassName('error');

    Array.from(errors).forEach(function (value) {
        value.classList.add('hide');
    });

    document.querySelector('.success').classList.add('hide');

    let inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(function (value) {
        if(value.type !== 'submit')
            value.value = "";
    })
}

function signInOn() {
    reset();
    document.title = 'Sign In';
    document.querySelector('.signIn-form').classList.remove('hide');
    document.querySelector('.signUp-form').classList.add('hide');
}

function singUpOn() {
    reset();
    document.title = 'Sign Up';
    document.querySelector('.signIn-form').classList.add('hide');
    document.querySelector('.signUp-form').classList.remove('hide');
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
    setCookie(cname, '', -1);
}

function init() {

    let signInFrom = document.querySelector('.signIn-form');
    if(signInFrom){

        signInFrom.addEventListener('submit', function (ev) {
            ev.preventDefault();

            let formData = new FormData(this);

            let user = {};
            formData.forEach(function(value, key){
                user[key] = value;
            });

            reset();
            signIn(user, function (id) {
                deleteCookie('userId');
                setCookie('userId', id, 1);
                document.location.href = "index.html";
            }, function (message) {
                document.querySelector('.authError').innerHTML = message;
                document.querySelector('.authError').classList.remove('hide');
            });
        });
    }

    let signUpFrom = document.querySelector('.signUp-form');
    if(signUpFrom){

        signUpFrom.addEventListener('submit', function (ev) {
            ev.preventDefault();

            let formData = new FormData(this);

            let user = {};
            formData.forEach(function(value, key){
                user[key] = value;
            });

            signUp(user, function () {
                signInOn();
                document.querySelector('.success').classList.remove('hide');
            }, function (message) {
                document.querySelector('.regError').innerHTML = message;
                document.querySelector('.regError').classList.remove('hide');
            });
        });
    }

}


document.addEventListener('DOMContentLoaded', init);