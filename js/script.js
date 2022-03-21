/*--------Прокрутка---------*/

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                bodyUnLock();
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
                main.classList.remove('links_blocked');
                console.log("MAIN ON");
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

/*--------Меню---------*/

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const main = document.querySelector('main');

if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        const iconMenuActive = document.querySelector('.menu__icon._active');
        if (iconMenuActive === null) {
            iconMenu.classList.add('_active');
            menuBody.classList.add('_active');
            main.classList.add('links_blocked');
            bodyLock();
            console.log("MAIN OFF");
        } else {
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
            main.classList.remove('links_blocked');
            bodyUnLock();
            console.log("MAIN ON");
        }
    });
}

/*-------Img/Video Switch---------*/

const mediaSwitchs = document.querySelectorAll('.media__swiths');
const containerMedia = document.querySelector('.container__media');
const videoEl = document.getElementsByTagName('video')[0];

console.log(videoEl);


if (mediaSwitchs.length > 0) {
    for (let index = 0; index < mediaSwitchs.length; index++) {
        const mediaSwitch = mediaSwitchs[index];
        mediaSwitch.addEventListener("click", function(e) {
            const switchName = mediaSwitch.getAttribute('id');
            moveOpen(switchName);
            e.preventDefault();
            console.log(switchName)
            console.log(mediaSwitch)

        });
    }
}

function moveOpen(switchName) {
    if (switchName == 'video') {
        containerMedia.classList.add('move');
        playVideo();
    } else {
        containerMedia.classList.remove('move');
        pauseVideo();
    };
}

/*-------Video: Play/Pause---------*/

//const videoEl = document.getElementsByTagName('video')[0];
//const playBtn = getElementById('pictures');
//const pauseBtn = getElementById('video');



function playVideo() {
    videoEl.play();
};

function pauseVideo() {
    videoEl.pause();
};



/*-------popup---------*/

const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock_padding');


let unlock = true;

const timeout = 1200;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();

        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }

}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActiv = document.querySelector('.popup.open');
        console.log('activ ' + popupActiv);
        if (popupActiv) {
            popupClose(popupActiv, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content_img' || '.popup__content_map')) {
                popupClose(e.target.closest('.popup'))
            }
        });
    }
}

function popupClose(popupActiv, doUnlock = true) {
    console.log('doUnlock ' + doUnlock);
    if (unlock) {
        popupActiv.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
            console.log('unlock' + doUnlock);
        }
    }
}

/*--'.lock=padding' для фиксированных объектов--*/

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    console.log(lockPaddingValue);

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
};