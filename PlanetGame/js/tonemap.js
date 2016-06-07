// scaling for display

//////////////////////////////////////////////////////////////
// Assignment 6 q4
var TONETYPE = "max";
function tone_map (img) {
    if (TONETYPE == "max") {
        return maxToneMap(img);
    } else if (TONETYPE == "median") {
        return medianToneMap(img);
    }
}
function medianToneMap (img) {
    // find median
    var medI = 0;
    var imgCopy = [];
    // add to imgCopy only non-(0,0,0) values:
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            var index = (x  * 3) + (y * width * 3);
            var wasAllZero = true;
            for (k = 0; k < 3; k++){
                 if (img[index+k] != 0){
                     wasAllZero = false;
                 }
            }
            if (!wasAllZero) {
                for (k = 0; k < 3; k++){
                     imgCopy.push(img[index+k]);
                }
            }
        }
    }
    imgCopy.sort(function(a,b) {return a - b;} );
    var half = Math.floor(imgCopy.length/2);
    if(imgCopy.length % 2 != 0) {
        medI = imgCopy[half];
    } else {
        medI = (imgCopy[half-1] + imgCopy[half]) / 2.0;
    }
    // adjust
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            var index = (x  * 3) + (y * width * 3);
            for (k = 0; k < 3; k++){
                 img[index+k] *= (128 / medI);
                 if (img[index+k] > 255){
                     img[index+k] = 255;
                 };
            }
        }
    }
    return(img);
}
//////////////////////////////////////////////////////////////

function maxToneMap (img) {
    var maxI = 0;
    var L = [ ];

    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            var index = (x * 3) + (y * width * 3);
            L[index] = .3*img[index]+.5*img[index+1]+.2*img[index+2];
            if (L[index] > maxI) {
                maxI= L[index]
            };
        }
    }
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            var index = (x  * 3) + (y * width * 3);
            for (k = 0; k < 3; k++){
                 img[index+k] *= (255./maxI);
                 if (img[index+k] > 255){
                     img[index+k] = 255;
                 };
            }
        }
    }
    return(img);
}
