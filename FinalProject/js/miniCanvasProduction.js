var MiniCanvasProduction = React.createClass({

    mousePos: {startX: 0, startY: 0, endX: 0, endY: 0},
    mouseDown: false,

    componentDidUpdate: function() {
        this.drawCanvas();
    },

    drawCanvas: function() {
        var canvas = document.getElementById("miniCanvasProduction_" + this.props.name);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "rgba(55, 55, 55, 0.25)";
        context.lineCap = "round";
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

        // Draw the production
        var toDraw = this.props.rule.productions;
        console.log(toDraw);
        for (var i = 0; i < toDraw.length; i++) {
            var mat = toDraw[i].matrix;
            context.save();
            context.beginPath();
            // get to the right transformation context (should never need the actual loop, could use 0)
            for (var t = 0, transform; transform = toDraw[i].transformations[t]; t++) {
                context.transform(mat[0][0], mat[1][0], mat[0][1], mat[1][1], mat[0][2] + canvas.width / 2, mat[1][2] + canvas.height/2);
            }

            drawPrimitiveInProduction(canvas, context, toDraw[i].primitive);
            context.restore();
            context.closePath();
        }
    },

    handleCanvasMouseDown: function() {
        this.mouseDown = true;

        var canvas = document.getElementById("miniCanvasProduction_" + this.props.name);
        var box = canvas.getBoundingClientRect();
        this.mousePos.startX = (e.clientX - box.left) * canvas.width / box.width;
        this.mousePos.startY = (e.clientY - box.top) * canvas.height / box.height;
    },

    handleCanvasMouseUp: function() {
        this.mouseDown = false;

        var canvas = document.getElementById("miniCanvasProduction_" + this.props.name);
        var box = canvas.getBoundingClientRect();
        this.mousePos.endX = (e.clientX - box.left) * canvas.width / box.width;
        this.mousePos.endY = (e.clientY - box.top) * canvas.height / box.height;

        // TODO: finish this part
    },

    componentDidMount: function() {
        this.drawCanvas();
    },

    render: function() {
        return (
            <canvas
                style={{cursor: "pointer"}}
                width={"150px"}
                height={"150px"}
                id={"miniCanvasProduction_" + this.props.name}
                className={"miniCanvas"}
                onMouseDown={this.handleCanvasMouseDown}
                onMouseMove={this.handleCanvasMouseMove}
                onMouseUp={this.handleCanvasMouseUp} />
        );
    }
});

function drawPrimitiveInProduction(canvas, context, primitive) {
    context.strokeStyle = primitive.color;
    for (var j = 0, line; line = primitive.lines[j]; j++) {
        context.moveTo(line.startX, line.startY);
        context.lineTo(line.endX, line.endY);
        context.stroke();
    }
}
