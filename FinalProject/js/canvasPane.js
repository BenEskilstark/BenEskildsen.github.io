var CanvasPane = React.createClass({

    componentDidUpdate: function(nextProps) {
        this.drawGrammar();
    },

    componentDidMount: function() {
        this.drawGrammar();
    },

    drawGrammar: function() {
        var canvas = document.getElementById("mainCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineCap = "round";

        // draw out the grammar production
        var toDraw = this.props.iterationProductions[this.props.iterations];

        for (var i = 0; i < toDraw.length; i++) {
            var primitive = this.props.primitives[toDraw[i].primitive.name];
            var matrix = toDraw[i].matrix;

            // get to the right transformation context
            context.save();
            context.transform(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]);
            context.lineWidth = 2;

            drawPrimitive(context, primitive);
            context.restore();
        }
    },

    render: function() {
        return <canvas id="mainCanvas" className="renderArea" width={1000} height={750}/>;
    }
});

function drawPrimitive(context, primitive) {
    context.strokeStyle = primitive.color;
    context.beginPath();
    for (var j = 0, line; line = primitive.lines[j]; j++) {
        context.moveTo(line.startX, line.startY);
        context.lineTo(line.endX, line.endY);
        context.stroke();
    }
    context.closePath();
}
