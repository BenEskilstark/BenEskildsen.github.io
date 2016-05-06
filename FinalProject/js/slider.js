var Slider = React.createClass({

    onSliderChange: function() {
        var slider = document.getElementById("slider_" + this.props.id);
        var number = document.getElementById("number_" + this.props.id);

        var newValue = parseInt(slider.value);
        if (parseInt(number.value) !== newValue) {
            number.value = newValue;
        }

        this.props.changeHandler(newValue);
    },

    onNumberChange: function() {
        var slider = document.getElementById("slider_" + this.props.id);
        var number = document.getElementById("number_" + this.props.id);

        var newValue = parseInt(number.value);
        if (parseInt(slider.value) !== newValue) {
            slider.value = newValue;
        }

        this.props.changeHandler(newValue);
    },

    render: function() {
        var name = this.props.name + ": ";
        var scaleValue = this.props.sliderValue;
        if (this.props.isScale) {
            scaleValue = scaleValue / 10;
        }

        return (
            <div>
                {name}
                <span className={"sliderRHS"}>
                    <input
                        id={"slider_" + this.props.id}
                        type="range"
                        min={this.props.min}
                        max={this.props.max}
                        className={"slider"}
                        value={this.props.sliderValue}
                        onChange={this.onSliderChange} />
                    <input
                        id={"number_" + this.props.id}
                        type="number"
                        className="sliderNumber"
                        min={this.props.min}
                        max={this.props.max}
                        value={scaleValue}
                        onChange={this.onNumberChange} />
                </span>
            </div>
        );
    }
});
