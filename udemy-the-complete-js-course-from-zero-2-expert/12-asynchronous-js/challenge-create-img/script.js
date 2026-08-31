'use strict';

const containerImages = document.querySelector('.images');

const createImg = function(imgPath) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;
        img.addEventListener('load', function() {
            containerImages.append(img);
            resolve(img);
        });

        img.addEventListener('error', function() {
            reject(new Error('Image not found'));
        });
    });
}


const pause = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    })
};

// let loadedImg;

// createImg('./img/img-1.jpg').
//     then(img => {
//         loadedImg = img;
//         console.log(`${img.src} loaded`);
//         return pause(2);
//     }).
//     then(() => {
//         loadedImg.style.display = 'none';
//         return createImg('./img/img-2.jpg');
//     }).
//     then(img => {
//         loadedImg = img;
//         console.log(`${img.src} loaded`);
//         return pause(2);
//     }).
//     then(() => {
//         loadedImg.style.display = 'none';
//     }).
//     catch(err => console.error(err.message));


const loadNPause = async function() {
    try {
        let img = await createImg('./img/img-1.jpg');
        console.log('Image 1 loaded');
        await pause(2);
        img.style.display = 'none';
        img = await createImg('./img/img-2.jpg');
        console.log('Image 2 loaded');
        await pause(2);
        img.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
};

// loadNPause();

const loadAll = async function(imgArr) {
    try {
        const imgs = imgArr.map(async imgPath => await createImg(imgPath));

        console.log(imgs);
        const imgElts = await Promise.allSettled(imgs);
        console.log(imgElts);
        imgElts.forEach(img => img.value.classList.add('parallel'));
    } catch (err) {
        console.error(err.message);
    }
}

const imgArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];
const imgs = loadAll(imgArr);
console.log(imgs);