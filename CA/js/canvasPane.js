var CanvasPane = React.createClass({

    getDefaultProps: function() {
        return {
            width: 1000,
            height: 750,
            backgroundColor: "lightgray"
        };
    },

    componentDidUpdate: function(nextProps) {
        this.drawGrid();
    },

    componentDidMount: function() {
        this.drawGrid();
    },

    drawGrid: function() {
        var width = this.props.width;
        var height = this.props.height;
        var grid = this.props.grid;
        var rules = this.props.rules;

        var canvas = document.getElementById("mainCanvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");

        context.fillStyle = this.props.backgroundColor;
        context.fillRect(0, 0, width, height);

        var xRes = width / grid.length;
        var yRes = height / grid[0].length;

        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[0].length; y++) {
                if (grid[x][y].alive > 0) {
                    context.fillStyle = "steelblue";
                    context.fillRect(x * xRes, y * yRes, xRes, yRes);
                }
            }
        }

        context.strokeStyle = "black";
        context.lineWidth = 0.1;
        for (var i = 1; i < 9; i++) {
            context.moveTo(i/9 * width, 0);
            context.lineTo(i/9 * width, height);

            context.moveTo(0, i/9 * height);
            context.lineTo(width, i/9 * height);
        }
        context.stroke();
    },

    render: function() {
        return <canvas
            id="mainCanvas"
            className="renderArea"
            width={this.props.width}
            height={this.props.height}
        />
    }

});
