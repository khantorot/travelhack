let user = {};

chekUser();
function chekUser() {
    if (sessionStorage.getItem('user') != null) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
}


window.addEventListener('load', function(){
    if (document.documentElement.clientWidth <= 900) {
        hideSideBar();
    }
})


const nav = document.querySelector('.nav');
const side_bar = document.querySelector('.side_bar');
const side_bar_container = document.querySelector('.side_bar_container');
const container = document.querySelector('.container');

let sb_w = side_bar_container.offsetWidth;

nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('menu_btn')) {
        side_bar.style.transform = 'translateX(0px)';
    } else if (e.target.classList.contains('profile_btn')) {
        side_bar.style.transform = 'translateX(' + (-sb_w) + 'px)';
    } else if (e.target.classList.contains('notification_btn')) {
        side_bar.style.transform = 'translateX(' + -(sb_w * 2) + 'px)';
    } else if (e.target.classList.contains('close_btn')) {
        if (nav.classList.contains('nav_hide')) {
            nav.classList.remove('nav_hide');
            side_bar_container.style.transform = 'translateX(0)';
            nav.style.transform = 'translateX(0px)';
            container.style.transform = 'translateX(' + (sb_w) + 'px)';
            document.querySelector('.close_btn p').innerHTML = 'закрыть';
        } else {
            hideSideBar()
        }
    }
})








const profile_data = document.querySelector('.profile_data');
let profile_data_inner = '';

profile_data_inner += '<p>' + user.name + '</p>';
profile_data_inner += '<p>' + user.phone + '</p>';
profile_data_inner += '<p>' + user.email + '</p>';
if (user.role == 'guest') {
    profile_data_inner += '<p>Я ' + 'турист' + '</p>';
} else {
    profile_data_inner += '<p>Я ' + 'местный' + '</p>';
}


profile_data.innerHTML = profile_data_inner;





const menu_list = document.querySelectorAll('.menu a');


menu_list.forEach(element => {
    element.addEventListener('click', function () {
        if (document.documentElement.clientWidth <= 900) {
            hideSideBar();
        }
    })
});

function hideSideBar() {
    nav.classList.add('nav_hide');
    side_bar_container.style.transform = 'translateX(-100%)';
    nav.style.transform = 'translateX(' + -(sb_w - 50) + 'px)';
    container.style.transform = 'translateX(' + (sb_w - 150) + 'px)';
    document.querySelector('.close_btn p').innerHTML = 'открыть';
}





// menu link
let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.6;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
        e.preventDefault();
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash
            }
        }
    }, false);
}