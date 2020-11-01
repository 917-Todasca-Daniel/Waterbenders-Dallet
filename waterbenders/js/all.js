//Making carousel

function fullHeightFun($el) {
    let fullHeight = $(window).outerHeight();
    $el.css("height", fullHeight);
}

function carouselPhotoFun($el) {
    let fullWidth = $(window).outerWidth();
    let fullHeight = $(window).outerHeight();
    $el.css({
        "width": parseFloat(fullWidth) * 0.3,
        "height": parseFloat(fullHeight) * 0.4
    });
}

function customCarouselWidth($el, $photo) {
    let width = 0;
    $photo.each(function () {
        width += $(this).outerWidth();
    });
    $el.css("width", width);
}

function rotatePhoto($photo) {
    let currentDegrees = 0;
    let degree = 360 / $photo.length;
    $photo.each(function () {
        $(this).css({
            "transform": "translate(-10%, -40%) rotate(" + currentDegrees + "deg)"
        });
        currentDegrees += degree;
    });
}

function makeR() {
    return $(window).outerWidth() * 3;
}

function resetValues($photo) {
    $photo.css({
        "top": "0",
        "left": "0"
    });
}

function makeCarousel($photo, r, i) {
    if (i < $photo.length) {
        //console.log(r);
        let a = 360 / $photo.length * i;

        //r = math.sqrt(x^2+y^2)
        //sina = y/r    y = sina*r
        //cosa = x/r
        //tga = y/x

        let alfaRadian = a * Math.PI / 180;

        let y = Math.round(Math.sin(alfaRadian) * r);
        let x = Math.round(Math.cos(alfaRadian) * r);

        if (i < $photo.length) {
            $photo.eq(i).css({
                "top": "-=" + x,
                "left": "+=" + y
            });
        }

        i++
        makeCarousel($photo, r, i);
    } else {
        i = 0;
        return 0;
    }

}

function centerCarousel($el, $photo, r) {
    let h = $(window).outerHeight();
    let w = $(window).outerWidth();
    let photoW = $photo.outerWidth() / 2;
    let photoH = $photo.outerHeight() / 2;

    $el.css({
        "top": r + h / 2,
        "left": w / 2 - photoW,
        "transformOrigin": '' + photoH + 'px ' + photoH / 4 + 'px ' + '0px'
    });
}

//Rotating carousel
function toggleArrows($cursor) {
    $cursor.find("i").toggle();
}


function rotateCarousel(e, $photo, $el, $fullWidthModule) {
    let a = 360 / $photo.length;

    let currentX = e.pageX;
    let differnceX = currentX - startX;
    startX = currentX;

    checkRotate += differnceX;

    currentRotateValue += differnceX * 0.02;

    $el.css({
        "transform": "rotate(" + currentRotateValue + "deg)"
    });
}

function rotateUp($photo, $el) {
    let a = 360 / $photo.length;
    let difference = currentRotateValue % a;
    currentRotateValue -= difference;
    $el.css({
        "transform": "rotate(" + currentRotateValue + "deg)"
    });
}

//Custom cursor
function customCursorMove(e, $cursor) {
    $cursor.css({
        "top": e.pageY,
        "left": e.pageX
    });
}

//seba

function startSeba($fullWidthModule, $this, $photo){
    $this.next().html("Not for Pan Seba");
    $fullWidthModule.css({
        "background": "linear-gradient(to bottom, #ffff89 0%,#ffff89 9%,#ffff89 13%,#59ff5e 41%,#59ff5e 49%,#eeff07 100%)"
    });
    
    $photo.css({
        "background-image": "url('https://mdbootstrap.com/img/Photos/Avatars/sebastian%20(1).jpg')"
    });
}

$(function () {
    const $fullWidthModule = $(".full-width-module");
    const $customCarousel = $(".custom-carousel");
    const $carouselPhotoContainer = $(".carousel-photo-container");
    const $customCursor = $(".custom-cursor");
    currentRotateValue = 0;
    checkRotate = 0;

    //Making carousel

    fullHeightFun($fullWidthModule);
    carouselPhotoFun($carouselPhotoContainer);
    rotatePhoto($carouselPhotoContainer);
    var r = makeR($carouselPhotoContainer);
    makeCarousel($carouselPhotoContainer, r, 0);
    centerCarousel($customCarousel, $carouselPhotoContainer, r);

    $(window).on("resize", function () {
        fullHeightFun($fullWidthModule);
        carouselPhotoFun($carouselPhotoContainer);
        r = makeR();
        resetValues($carouselPhotoContainer);
        makeCarousel($carouselPhotoContainer, r, 0);
        centerCarousel($customCarousel, $carouselPhotoContainer, r);
    });

    //Rotating carousel
    $fullWidthModule.on("mousedown", function (e) {
        toggleArrows($customCursor);
        startX = e.pageX;
        $fullWidthModule.on("mousemove", function (e) {
            rotateCarousel(e, $carouselPhotoContainer, $customCarousel, $fullWidthModule);
        });
    });

    $fullWidthModule.on("mouseup", function () {
        $fullWidthModule.off("mousemove");
        rotateUp($carouselPhotoContainer, $customCarousel);
        toggleArrows($customCursor);
    });

    //Custom cursor
    $(window).on("mousemove", function (e) {
        customCursorMove(e, $customCursor)
    });

    const sebaExe = $(".design");
    
    sebaExe.on("click", function(){
        currentRotateValue+=360;
        startSeba($fullWidthModule, $(this), $carouselPhotoContainer);
    });

});

