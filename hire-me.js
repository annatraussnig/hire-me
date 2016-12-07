window.scrollTo(0,0);

hidePath('#light-fitting');
hidePath('#face');
hidePath('#hair1');
hidePath('#hair2');
hidePath('#hair3');
hidePath('#hair4');

window.addEventListener("scroll", function(e) {
    toggleClass('#visit-card', [0.01, 2], 'hide-small');

    // bulb appears
    changeOnScroll('#lightbulb', [0.03, 0.04], [30, 18], setRadius);
    changeOnScroll('#light-fitting', [0.03, 0.07], [0, 1], revealPath);
    changeOnScroll('#lightbulb', [0.06, 0.08], [18, 21.6], setRadius)
    changeOnScroll('#top-shadow-straight', [0.07, 0.1], [0, 1], setOpacity);
    changeOnScroll('#bottom-shadow-straight', [0.07, 0.1], [0, 1], setOpacity);
    colorOnScroll('#lightbulb', [0.1, 0.12], ['#877F5C', '#F89406'])
    toggleClass('#list', [0.01, 0.06], 'reveal-p') // TEXT
    toggleClass('#idea', [0.07, 0.15], 'reveal-p') // TEXT
    
    // bulb drops
    changeOnScroll('#lightbulb-container', [0.25, 0.35], [-5, 30], setTop);
    colorOnScroll('#lightbulb', [0.25, 0.26], ['#F89406', '#000000']);
    changeOnScroll('#top-shadow-straight', [0.26, 0.28], [1, 0], setOpacity);
    changeOnScroll('#bottom-shadow-straight', [0.26, 0.28], [1, 0], setOpacity);
    toggleClass('#no-dev', [0.2, 0.34], 'reveal-p') // TEXT

    // floor gets drawn
    changeOnScroll('#face', [0.15, 0.27], [0, 0.8], revealPathReverse);
    // face appears
    changeOnScroll('#face', [0.34, 0.39], [0.8, 1], revealPathReverse);
    // floor disappears
    changeOnScroll('#face', [0.39, 0.41], [1, 0.15], revealPath);

    // bulb reaches face
    colorOnScroll('#lightbulb', [0.3, 0.39], ['#000000', '#F89406']);
    changeOnScroll('#top-shadow-tilted', [0.38, 0.385], [0, 1], setOpacity);
    changeOnScroll('#bottom-shadow-tilted', [0.38, 0.385], [0, 1], setOpacity);
    toggleClass('#no-problem', [0.37, 0.42], 'reveal-p') // TEXT
    toggleClass('#dot1', [0.39, 0.45], 'reveal') // TEXT
    toggleClass('#dot2', [0.40, 0.45], 'reveal') // TEXT
    toggleClass('#dot3', [0.41, 0.45], 'reveal') // TEXT

    // hairs appear
    changeOnScroll('#hair1', [0.43, 0.48], [0, 1], revealPath);
    toggleClass('#intelligence', [0.43, 0.48], 'hair1-color');
    
    changeOnScroll('#hair2', [0.48, 0.53], [0, 1], revealPathReverse);
    toggleClass('#creativity', [0.48, 0.53], 'hair2-color');

    changeOnScroll('#hair3', [0.53, 0.58], [0, 1], revealPath);
    toggleClass('#competences', [0.53, 0.58], 'hair3-color');

    changeOnScroll('#hair4', [0.58, 0.63], [0, 1], revealPathReverse);
    toggleClass('#experience', [0.58, 0.63], 'hair4-color');

    toggleClass('#qualities', [0.43, 0.62], 'reveal-p') // TEXT

    // face switch
    changeOnScroll('#face', [0.65, 0.78], [1, 0], setOpacity);
    changeOnScroll('#face-up', [0.65, 0.72], [0, 1], setOpacity);
    toggleClass('#vision', [0.63, 0.7], 'reveal-p') // TEXT

    // bulb goes up again
    changeOnScroll('#lightbulb-container', [0.68, 0.85], [30, -5], setTop);
    changeOnScroll('#top-shadow-tilted', [0.68, 0.75], [1, 0], setOpacity);
    changeOnScroll('#bottom-shadow-tilted', [0.68, 0.75], [1, 0], setOpacity);
    toggleClass('#interest', [0.72, 0.77], 'reveal-p') // TEXT

    // all lines disappear
    changeOnScroll('#light-fitting', [0.82, 0.93], [1, 0], revealPath);
    changeOnScroll('#hair1', [0.85, 0.93], [1, 0], setOpacity);
    changeOnScroll('#hair2', [0.85, 0.93], [1, 0], setOpacity);
    changeOnScroll('#hair3', [0.85, 0.93], [1, 0], setOpacity);
    changeOnScroll('#hair4', [0.85, 0.93], [1, 0], setOpacity);
    toggleClass('#contact', [0.78, 1.3], 'reveal-p') // TEXT

    setVisitCardColor();
});


window.onbeforeunload = function(){ window.scrollTo(0,0); }

function toggleClass(selector, scrollPositions, className) {
    var object = document.querySelector(selector);
    var scrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

    if (scrollFraction > 0 && scrollFraction < 1) {
        object.classList.add(className);
    } else {
        object.classList.remove(className);
    }
}


function setVisitCardColor() {
    var object = document.querySelector('#visit-card');
    var color = getCurrentBackgroundColor();
    object.style.color = color;
}


function getCurrentBackgroundColor() {
    var gradientColors = ['#336E7B','#1F282F','#679283','#d35400'];
    var scrollFraction = getTotalScrollFraction();
    var currentBackgroundColor = '#000000';
    
    if (scrollFraction < 0.33) {
        currentBackgroundColor = getColorMix(gradientColors[0], gradientColors[1], scrollFraction * 3);
    } else if (scrollFraction > 0.66) {
        currentBackgroundColor = getColorMix(gradientColors[2], gradientColors[3], (scrollFraction - 0.66) * 3);
    } else {
        currentBackgroundColor = getColorMix(gradientColors[1], gradientColors[2], (scrollFraction - 0.33) * 3);
    }

    return currentBackgroundColor;
}


function colorOnScroll(selector, scrollPositions, colors) {
    var object = document.querySelector(selector);
    var scrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

    if (scrollFraction > 0 && scrollFraction < 1) {
        object.style.fill =  getColorMix(colors[0], colors[1], scrollFraction);

        // security clauses
        if (scrollFraction < 0.1) {
            object.style.fill = colors[0];
        } else if (scrollFraction > 0.9) {
            object.style.fill = colors[1];
        }
    }
}


function getColorMix(color1, color2, factor) {
    var rgb1 = hexToRgb(color1);
    var rgb2 = hexToRgb(color2);
    var newRgb = [];
        
    for (var i = 0; i < 3; i ++) {
        newRgb.push(rgb1[i] + factor * (rgb2[i] - rgb1[i]));
    }

    return rgbToHex(newRgb);
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}


function rgbToHex(colorArray) {
    var hex = [];
    for (var i = 0; i < 3; i++) {
        hex.push(Math.clip(colorArray[i], 0, 255).toString(16).substring(0,2));
    }

    return "#" + hex.join("");
}


function changeOnScroll(selector, scrollPositions, values, setValue) {
    var object = document.querySelector(selector);
    var scrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

    if (scrollFraction > 0 && scrollFraction < 1) {
        var newValue = values[0] + scrollFraction * (values[1] - values[0]);
        setValue(selector, newValue);

        // security clauses
        if (scrollFraction < 0.1) {
            setValue(selector, values[0]);
        } else if (scrollFraction > 0.9) {
            setValue(selector, values[1]);
        }
    }
}


function revealPath(selector, value) {
    changeDashOffset(selector, value, 1);
}


function revealPathReverse(selector, value) {
    changeDashOffset(selector, value, -1);
}


function changeDashOffset(selector, value, direction) {
    var path = document.querySelector(selector);
    var pathLength = path.getTotalLength();
    var drawLength = pathLength * value;

    path.style.strokeDashoffset = pathLength - (direction * drawLength);
}


function setRadius(selector, radius) {
    document.querySelector(selector).setAttribute('r', radius);
}


function setOpacity(selector, opacity) {
    document.querySelector(selector).setAttribute('opacity', opacity);
}


function setTop(selector, top) {
    document.querySelector(selector).style.top = top + 'vh';
}


function hidePath(selector) {
    var path = document.querySelector(selector);
    var pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
    path.getBoundingClientRect();
}


function getScrollFraction(startPoint, endPoint) {
    var totalScrollFraction = getTotalScrollFraction();

    var scrollFractionWithinPoints = (totalScrollFraction - startPoint) / (endPoint - startPoint)

    return Math.clip(scrollFractionWithinPoints, 0, 1);
}


function getTotalScrollFraction() {
    return (document.documentElement.scrollTop + document.body.scrollTop) / 
           (document.documentElement.scrollHeight - document.documentElement.clientHeight);
}


Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max));
}