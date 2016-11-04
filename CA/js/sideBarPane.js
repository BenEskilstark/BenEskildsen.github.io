var SideBarPane = React.createClass({

    handleSpeedChange: function() {
        this.props.handleSpeedChange(
            parseInt(document.getElementById("slider_simulation_speed").value)
        );
    },

    handleRulesChange: function() {
        var create = parseInt(document.getElementById("slider_simulation_create").value);
        var starve = parseInt(document.getElementById("slider_simulation_starve").value);
        var suffocate = parseInt(document.getElementById("slider_simulation_suffocate").value);
        var generation = parseInt(document.getElementById("slider_simulation_generation").value);
        var wrapAround = this.props.rules.wrapAround;

        this.props.handleRulesChange({
            create: create,
            starve: starve,
            suffocate: suffocate,
            generation: generation,
            wrapAround: wrapAround
        });
    },

    handleSettingsChange: function() {
        var xDimension = parseInt(document.getElementById("slider_simulation_width").value);
        var yDimension = parseInt(document.getElementById("slider_simulation_height").value);
        var seed = parseInt(document.getElementById("slider_simulation_seed").value) / 100.0;

        this.props.handleSettingsChange({
            xDimension: xDimension,
            yDimension: yDimension,
            seedProbability: seed
        });
    },

    renderPlayPause: function() {
        var playButton = <img
            src={"play.png"}
            width={"80px"} height={"80px"}
            onClick={this.props.handlePlayClick}
            className="play" />;
        if (this.props.play) {
            playButton = <img
                src={"pause.png"}
                width={"80px"} height={"80px"}
                onClick={this.props.handlePauseClick}
                className="play" />;
        }

        return playButton;
    },

    render: function() {
        var playButton = this.renderPlayPause();

        return <div className="sideBarPane">
            <Slider
                name={"X Dimension Width"}
                id={"simulation_width"}
                min={0}
                max={1000}
                sliderValue={this.props.settings.xDimension}
                changeHandler={this.handleSettingsChange} />
            <Slider
                name={"Y Dimension Height"}
                id={"simulation_height"}
                min={0}
                max={1000}
                sliderValue={this.props.settings.yDimension}
                changeHandler={this.handleSettingsChange} />
            <Slider
                name={"Initial Seed %"}
                id={"simulation_seed"}
                min={0}
                max={100}
                sliderValue={this.props.settings.seedProbability * 100}
                changeHandler={this.handleSettingsChange} />
            {playButton}
            <Slider
                name={"Speed"}
                id={"simulation_speed"}
                min={0}
                max={1000}
                sliderValue={this.props.speed}
                changeHandler={this.handleSpeedChange} />
            <Slider
                name={"Create"}
                id={"simulation_create"}
                min={0}
                max={8}
                sliderValue={this.props.rules.create}
                changeHandler={this.handleRulesChange} />
            <Slider
                name={"Starve"}
                id={"simulation_starve"}
                min={0}
                max={8}
                sliderValue={this.props.rules.starve}
                changeHandler={this.handleRulesChange} />
            <Slider
                name={"Suffocate"}
                id={"simulation_suffocate"}
                min={0}
                max={8}
                sliderValue={this.props.rules.suffocate}
                changeHandler={this.handleRulesChange} />
            <Slider
                name={"Spontaneous Generation %"}
                id={"simulation_generation"}
                min={0}
                max={100}
                sliderValue={this.props.rules.generation}
                changeHandler={this.handleRulesChange} />

            <DimensionSelect
                handleDimensionSelect={this.props.handleDimensionSelect}
                axis={"xDimension"}
                currentDimension={this.props.axes["xDimension"]}
                dimensions={this.props.dimensions} />
            <DimensionSelect
                handleDimensionSelect={this.props.handleDimensionSelect}
                axis={"yDimension"}
                currentDimension={this.props.axes["yDimension"]}
                dimensions={this.props.dimensions} />
        </div>;
    }
});
