//////////////////////////////////////////////////////////////////////////////
// configuration
var WIDTH = 600;
var HEIGHT = 500;
var SPEED = 20;
var CELLWIDTH = 5; // pixels per side of cell
var PHEROMONE = 1000;
var PCUTOFF = 00;
var NUMANTS = 100;
var XMARGIN = 285;
var YMARGIN = 10;
var FRAMERATE = 1;
//////////////////////////////////////////////////////////////////////////////
var World = React.createClass({
    getInitialState: function() {
        return {
            simulation: initializeSimulation(WIDTH/CELLWIDTH, HEIGHT/CELLWIDTH, NUMANTS)
        };
    },

    componentDidMount: function() {
        this.interval = setInterval(this.step, SPEED);
        // this.mouseInterval = setInterval(this.placePheromone, SPEED);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
        // clearInterval(this.mouseInterval);
    },

    step: function() {
        this.setState({simulation: updateSimulation(this.state.simulation)});
    },

    handleMouseDown: function(evt) {
        this.mouse = {x: evt.clientX - XMARGIN, y: evt.clientY - YMARGIN};
    },

    handleMouseUp: function() {
        this.mouse = false;
    },

    placePheromone: function(evt) {
        if (this.mouse) {
            this.mouse.x = evt.clientX - XMARGIN;
            this.mouse.y = evt.clientY - YMARGIN;
            var s = parseInt(document.getElementById("p").value) * 100;
            var x = Math.floor(this.mouse.x / CELLWIDTH);
            var y = Math.floor(this.mouse.y / CELLWIDTH);
            this.setState({simulation: placePheromone(this.state.simulation, x, y, s)});
        }
    },

    age: 0,

    renderGrid: function() {
        var grid = [];
        for (var x = 0; x < this.state.simulation.grid.length; x++) {
            for (var y = 0; y < this.state.simulation.grid[x].length; y++) {
                var cell = this.state.simulation.grid[x][y];
                if (cell.contains.type != "EMPTY" || cell.pheromone > PCUTOFF) {
                    grid.push(
                        <Cell
                            pheromone={cell.pheromone}
                            key={""+cell.contains.type+x+ ","+y}
                            type={cell.contains.type}
                            x={x}
                            y={y}
                        />
                    );
                }
            }
        }
        return grid;
    },

    render: function() {
        if (this.age % FRAMERATE == 0) {
            return (
                <div
                    className={'world'}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.placePheromone}
                    style={{"width":WIDTH, "height":HEIGHT}}>
                    {this.renderGrid()}
                </div>
            );
        }
        this.age++;
    }
});
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
var Cell = React.createClass({
    render: function() {
        var color = "#A0522D";
        if (this.props.type == "ant") {
            color = "#FF0000";
        } else if (this.props.pheromone > 0) {
            // TODO: use a better function for pheromone opacity
            color = "rgba(0,200,0,"+(this.props.pheromone/PHEROMONE+0.1)+")";
        }
        return (
            <div
                style={{
                    "left": this.props.x * CELLWIDTH,
                    "top": this.props.y * CELLWIDTH,
                    "width": CELLWIDTH,
                    "height": CELLWIDTH,
                    "position": "absolute",
                    "backgroundColor": color
                }} />
        );
    }
});

//////////////////////////////////////////////////////////////////////////////

React.render(<World />, document.getElementById('container'));
