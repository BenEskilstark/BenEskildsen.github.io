var WIDTH = 1110;
var HEIGHT = 750;

var xAxisPrevious = {samples: 1};
var yAxisPrevious = {samples: 1};

function renderer(obj, xAxis, yAxis, propsToUse) {
    var renderArea = document.getElementById("renderArea");
    clearRenderArea(xAxisPrevious, yAxisPrevious);

    // (potentially) use previous axis values
    if (!xAxis || xAxis.usePrevious) {
        xAxis = xAxisPrevious;
    }
    if (!yAxis || yAxis.usePrevious) {
        yAxis = yAxisPrevious;
    }
    xAxisPrevious = xAxis;
    yAxisPrevious = yAxis;

    for (prop in obj) {
        if (isSliderProperty(prop)) {
            obj[prop.slice(7)] = obj[prop].value;

            var slider = document.getElementById(prop.slice(7));
            if (!slider) {
                makeSlider(obj, prop.slice(7), obj[prop]);
            }
            if (xAxis.prop != prop.slice(7)) {
                document.getElementById("xAxis_" + prop.slice(7)).checked = false;
                document.getElementById("xSamples_" + prop.slice(7)).style.visibility = "hidden";
            }
            if (yAxis.prop != prop.slice(7)) {
                document.getElementById("yAxis_" + prop.slice(7)).checked = false;
                document.getElementById("ySamples_" + prop.slice(7)).style.visibility = "hidden";
            }
        }
    }
    if (propsToUse) {
        for (nextProp in propsToUse) {
            document.getElementById("slider_" + nextProp).value = propsToUse[nextProp];
            document.getElementById("val_" + nextProp).value = propsToUse[nextProp];
            obj[nextProp] = propsToUse[nextProp];
        }
    }

    for (var y = 0; y < yAxis.samples; y++) {
        for (var x = 0; x < xAxis.samples; x++) {
            var canvas = document.createElement("canvas");
            canvas.id = "canvas_" + x + y;
            canvas.height = HEIGHT / yAxis.samples;
            canvas.width = WIDTH / xAxis.samples;
            renderArea.appendChild(canvas);


            if (xAxis.prop && xAxis.samples > 1) {
                var sliderObj = obj["SLIDER_" + xAxis.prop];
                xFactor = x / xAxis.samples;
                obj[xAxis.prop] = Math.round(
                    sliderObj.min + (sliderObj.max - sliderObj.min) * xFactor
                );
            }
            if (yAxis.prop && yAxis.samples > 1) {
                var sliderObj = obj["SLIDER_" + yAxis.prop];
                yFactor = y / yAxis.samples;
                obj[yAxis.prop] = Math.round(
                    sliderObj.min + (sliderObj.max - sliderObj.min) * yFactor
                );
            }

            var nextPropsToUse = sliderClone(obj);
            canvas.onclick = function() {
                console.log(nextPropsToUse);
                renderer(obj, {samples: 1}, {samples: 1}, nextPropsToUse);
            };

            obj.render(canvas);
        }
    }


}

function isSliderProperty(propertyName) {
    return propertyName.slice(0,6) == "SLIDER"
}

function clearRenderArea(xAxis, yAxis) {
    for (var x = 0; x < xAxis.samples; x++) {
        for (var y = 0; y < yAxis.samples; y++) {
            var renderArea = document.getElementById("renderArea");
            var canvas = document.getElementById("canvas_" + x + y);
            if (canvas) {
                canvas.remove();
            }
        }
    }
}

function sliderClone(obj) {
    var newObj = {};
    for (prop in obj) {
        if (isSliderProperty(prop)) {
            newObj[prop.slice(7)] = parseInt(obj[prop.slice(7)]);
        }
    }
    return newObj;
}
