function makeSlider(objToDraw, name, sliderObj) {
    var min = sliderObj.min;
    var max = sliderObj.max;
    var defaultValue = sliderObj.value;
    var sideBar = document.getElementById("sliderSideBar");

    // Slider's pane around it
    var menu = document.createElement("div");
    menu.className = "menu";
    menu.id = name;
    var header = document.createElement("b");
    header.appendChild(document.createTextNode(name.charAt(0).toUpperCase()+name.slice(1)+": "));
    menu.appendChild(header);
    menu.appendChild(document.createTextNode("(" + min + " - " + max + ")"));
    menu.appendChild(document.createElement("br"));
    menu.appendChild(document.createTextNode("Value: "));

    // Main Slider
    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.id = "slider_" + name;
    slider.value = defaultValue;
    slider.onchange = function() {
        objToDraw["SLIDER_" + name].value = slider.value;
        renderer(objToDraw, {usePrevious: true}, {usePrevious: true});
        document.getElementById("val_" + name).value = slider.value;
    };
    menu.appendChild(slider);

    // Slider value displayed next to slider
    var sliderVal = document.createElement("input");
    sliderVal.id = "val_" + name;
    sliderVal.value = defaultValue;
    sliderVal.className = "numBox";
    sliderVal.onchange = function() {
        if (sliderVal.value > max) {
            sliderVal.value = max;
        }
        if (sliderVal.value < min) {
            sliderVal.value = min;
        }
        objToDraw["SLIDER_" + name].value = sliderVal.value;
        renderer(objToDraw, {usePrevious: true}, {usePrevious: true});
        document.getElementById("slider_" + name).value = sliderVal.value;
    };
    menu.appendChild(sliderVal);

    // Assign to an axis
    menu.appendChild(document.createElement("br"));
    var xAxis = document.createElement("input");
    xAxis.type = "checkbox";
    xAxis.id = "xAxis_" + name;
    xAxis.onclick = function() {
        if (xAxis.checked) {
            document.getElementById("xSamples_" + name).style.visibility = "visible";
            var axis = {samples: document.getElementById("xRange_" + name).value, prop: name};
            renderer(objToDraw, axis, null);
        } else {
            document.getElementById("xSamples_" + name).style.visibility = "hidden";
            renderer(objToDraw, {samples: 1}, null);
        }
    };
    menu.appendChild(xAxis);
    menu.appendChild(document.createTextNode("Assign to X axis  "));

    var yAxis = document.createElement("input");
    yAxis.type = "checkbox";
    yAxis.id = "yAxis_" + name;
    yAxis.onclick = function() {
        if (yAxis.checked) {
            document.getElementById("ySamples_" + name).style.visibility = "visible";
            var axis = {samples: document.getElementById("yRange_" + name).value, prop: name};
            renderer(objToDraw, null, axis);
        } else {
            document.getElementById("ySamples_" + name).style.visibility = "hidden";
            renderer(objToDraw, null, {samples: 1});
        }
    };
    menu.appendChild(yAxis);
    menu.appendChild(document.createTextNode("Assign to Y axis"));

    // Samples to show from that range
    var xSamples = document.createElement("div");
    xSamples.className = "sampleBox";
    xSamples.style.visibility = "hidden";
    xSamples.id = "xSamples_" + name;
    xSamples.appendChild(document.createTextNode("Samples: "));
    var xRangeSlider = document.createElement("input");
    xRangeSlider.type = "number";
    xRangeSlider.id = "xRange_" + name;
    xRangeSlider.className = "numBox";
    xRangeSlider.value = 5;
    xRangeSlider.onchange = function() {
        var xAxis = {samples: xRangeSlider.value, prop: name};
        renderer(objToDraw, xAxis, null);
    }
    xSamples.appendChild(xRangeSlider);
    menu.appendChild(xSamples);

    var ySamples = document.createElement("div");
    ySamples.className = "sampleBox";
    ySamples.style.visibility = "hidden";
    ySamples.id = "ySamples_" + name;
    ySamples.appendChild(document.createTextNode("Samples: "));
    var yRangeSlider = document.createElement("input");
    yRangeSlider.type = "number";
    yRangeSlider.id = "yRange_" + name;
    yRangeSlider.className = "numBox";
    yRangeSlider.value = 4;
    yRangeSlider.onchange = function() {
        var yAxis = {samples: yRangeSlider.value, prop: name};
        renderer(objToDraw, null, yAxis);
    }
    ySamples.appendChild(yRangeSlider);
    menu.appendChild(ySamples);

    sideBar.appendChild(menu);
}
