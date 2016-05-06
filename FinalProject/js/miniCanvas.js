var MiniCanvas = React.createClass({

    mousePos: {startX: 0, startY: 0, endX: 0, endY: 0},
    mouseDown: false,
    clickRate: 0,

    getInitialState: function() {
        return {lines: this.props.primitives[this.props.name].lines};
    },

    handleCanvasMouseDown: function(e) {
        this.mouseDown = true;

        var canvas = document.getElementById("miniCanvas_" + this.props.name);
        var boundingRect = canvas.getBoundingClientRect();

        this.mousePos.startX = (e.clientX - boundingRect.left) * canvas.width / boundingRect.width;
        this.mousePos.startY = (e.clientY - boundingRect.top) * canvas.height / boundingRect.height;
    },


    handleCanvasMouseUp: function(e) {
        this.mouseDown = false;

        this.props.primitives[this.props.name].lines = this.state.lines;
        this.props.handlePrimitivesChange(this.props.primitives);
    },

    handleCanvasMouseMove: function(e) {
        if (!this.mouseDown) {
            return;
        }
        // optimization to save fewer lines
        this.clickRate += 1;
        if (this.clickRate % 5 !== 0) {
            return;
        }

        var canvas = document.getElementById("miniCanvas_" + this.props.name);
        var context = canvas.getContext("2d");
        var boundingRect = canvas.getBoundingClientRect();
        var endX = (e.clientX - boundingRect.left) * canvas.width / boundingRect.width;
        var endY = (e.clientY - boundingRect.top) * canvas.height / boundingRect.height;

        // optimization to save fewer lines (2)
        var xSq = (endX - this.mousePos.startX) * (endX - this.mousePos.startX);
        var ySq = (endY - this.mousePos.startY) * (endY - this.mousePos.startY);
        if (Math.sqrt(xSq + ySq) < 8.5) {
            return;
        }

        this.mousePos.endX = endX;
        this.mousePos.endY = endY;

        context.strokeStyle = this.props.primitives[this.props.name].color;
        context.lineCap = "round";
        context.strokeWidth = 2;
        context.beginPath();
        context.moveTo(this.mousePos.startX, this.mousePos.startY);
        context.lineTo(this.mousePos.endX, this.mousePos.endY);
        context.stroke();
        context.closePath();

        var nextLines = [];
        for (var i = 0, line; line = this.state.lines[i]; i++) {
            nextLines.push(line);
        }

        nextLines.push({
            startX: this.mousePos.startX - canvas.width / 2 ,
            startY: this.mousePos.startY - canvas.height / 2,
            endX: this.mousePos.endX - canvas.width / 2,
            endY: this.mousePos.endY - canvas.height / 2
        });

        this.mousePos.startX = this.mousePos.endX;
        this.mousePos.startY = this.mousePos.endY;

        this.setState({lines: nextLines});
    },

    componentWillReceiveProps: function(nextProps) {
        // make sure state reflects new props in case of clearing drawing
        this.setState({lines: nextProps.primitives[nextProps.name].lines});
    },

    componentDidUpdate: function() {
        this.drawCanvas();
    },

    drawCanvas: function() {
        var canvas = document.getElementById("miniCanvas_" + this.props.name);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "rgba(55, 55, 55, 0.25)";
        context.beginPath();
        for (var i = 1; i < 6; i++) {
            // vertical lines
            context.moveTo(i * canvas.width / 6, 0);
            context.lineTo(i * canvas.width / 6, canvas.height);

            // horizontal lines
            context.moveTo(0, i * canvas.height / 6);
            context.lineTo(canvas.width, i * canvas.height / 6);
        }
        context.stroke();
        context.closePath();

        // draw initial primitive lines
        context.strokeStyle = this.props.primitives[this.props.name].color;
        context.strokeWidth = 2;
        context.beginPath();
        for (var i = 0, line; line = this.state.lines[i]; i++) {
            context.moveTo(line.startX + canvas.width / 2, line.startY + canvas.height / 2);
            context.lineTo(line.endX + canvas.width / 2, line.endY + canvas.height / 2);
            context.stroke();
        }
        context.closePath();
    },

    componentDidMount: function() {
        this.drawCanvas();
    },

    render: function() {
        return (
            <canvas
                width={"150px"}
                height={"150px"}
                id={"miniCanvas_" + this.props.name}
                className={"miniCanvas"}
                onMouseDown={this.handleCanvasMouseDown}
                onMouseMove={this.handleCanvasMouseMove}
                onMouseUp={this.handleCanvasMouseUp} />
        );
    }
});
