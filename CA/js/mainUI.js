var MainUI = React.createClass({

    getInitialState: function() {
        return {
            speed: 100,
            play: true,
            axes: {
                xDimension: "none",
                yDimension: "none"
            },
            rules: {
                create: 3,
                starve: 2,
                suffocate: 6,
                generation: 0,
                wrapAround: false
            },
            settings: {
                xDimension: 600,
                yDimension: 450,
                seedProbability: 0.01
            },
            grid: makeGrid(600, 450),
        };
    },

    restartSimulation: function() {
        var nextGrid = makeGrid(
            this.state.settings.xDimension,
            this.state.settings.yDimension);
        seedGrid(nextGrid, this.state.settings.seedProbability, this.state.axes);
        this.setState({grid: nextGrid});
    },

    playFunction: function() {
        if (this.state.play) {
            this.setState({grid: applyRules(this.state.grid, this.state.rules, this.state.axes)});
        }
    },

    componentDidMount: function() {
        this.interval = setInterval(this.playFunction, this.state.speed);
        this.restartSimulation();
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    handleSpeedChange: function(nextSpeed) {
        this.setState({speed: nextSpeed}, function() {
            clearInterval(this.interval);
            this.interval = setInterval(this.playFunction, nextSpeed);
        });
    },

    handleRulesChange: function(nextRules) {
        this.setState({rules: nextRules});
    },

    handlePlayClick: function() {
        this.setState({play: true});
    },

    handlePauseClick: function() {
        this.setState({play: false});
    },

    handleSettingsChange: function(nextSettings) {
        this.setState({settings: nextSettings}, this.restartSimulation());
    },

    handleDimensionSelect: function(axis, dimension) {
        var nextAxes = this.state.axes;
        nextAxes[axis] = dimension;
        this.setState({axes: nextAxes});
    },

    render: function() {
        return (
            <span>
                <CanvasPane
                    grid={this.state.grid}
                    rules={this.state.rules}
                />
                <SideBarPane
                    rules={this.state.rules}
                    speed={this.state.speed}
                    settings={this.state.settings}
                    handleSpeedChange={this.handleSpeedChange}
                    handleRulesChange={this.handleRulesChange}
                    handleSettingsChange={this.handleSettingsChange}
                    play={this.state.play}
                    handlePlayClick={this.handlePlayClick}
                    handlePauseClick={this.handlePauseClick}
                    handleDimensionSelect={this.handleDimensionSelect}
                    dimensions={["none","create","starve","suffocate","seed","generate"]}
                    axes={this.state.axes}
                />
            </span>
        );
    },
});

React.render(<MainUI />, document.getElementById('container'));
