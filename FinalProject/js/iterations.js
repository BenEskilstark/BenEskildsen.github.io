var Iterations = React.createClass({

    handleSpeedChange: function() {
        var speed = parseInt(document.getElementById("slider_iterationsSpeed").value);
        this.props.handleSpeedChange(speed);
    },

    render: function() {

        var playButton = <img
            src={"play.png"}
            width="80px" height="80px"
            onClick={this.props.handlePlayClick}
            className="play"/>;
        if (this.props.play) {
            playButton = <img
                src={"pause.png"}
                width="80px" height="80px"
                onClick={this.props.handlePauseClick}
                className="play" />;
        }

        return (
            <div className="menu">
                <h2>{"Iteration Controls"}</h2>
                <div style={{padding: "5px"}}>
                    {playButton}
                    <div
                        style={{paddingLeft: "10px"}}>
                        <Slider {...this.props}
                            id={"iterations"}
                            name="Iterations"
                            min={0}
                            changeHandler={this.props.handleIterationsChange}
                            max={this.props.maxIterations}
                            sliderValue={this.props.iterations} />
                        <Slider {...this.props}
                            id={"maxIterations"}
                            name="Max. Iterations"
                            min={0}
                            changeHandler={this.props.handleMaxIterationsChange}
                            max={50}
                            sliderValue={this.props.maxIterations} />
                        <Slider {...this.props}
                            id={"iterationsSpeed"}
                            name="Play Speed"
                            min={0}
                            changeHandler={this.handleSpeedChange}
                            max={2000}
                            sliderValue={this.props.step} />
                    </div>
                </div>
            </div>
        );
    }
});
