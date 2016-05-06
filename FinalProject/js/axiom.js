var Axiom = React.createClass({

    handleChange: function() {
        var name = document.getElementById("axiomInput").value;

        var scale = parseFloat(document.getElementById("slider_axiomScale").value / 10);
        var rotation = parseInt(document.getElementById("slider_axiomRotation").value);
        var transX = parseInt(document.getElementById("slider_axiomTransX").value);
        var transY = parseInt(document.getElementById("slider_axiomTransY").value);

        var sin = Math.sin(rotation * Math.PI / 180);
        var cos = Math.cos(rotation * Math.PI / 180);

        var axiom = {
            name: name,
            primitive: this.props.primitives[name],
            transformations: [{
                scale: scale,
                rotation: rotation,
                transX: transX,
                transY: transY
            }],
            matrix: [[scale * cos, scale * -sin, transX], [scale * sin, scale * cos, transY], [0, 0, 1]]
        };
        this.props.handleAxiomChange(axiom);
    },

    renderPrimitiveSelect: function() {
        var primitives = [];
        for (p in this.props.primitives) {
            primitives.push(this.props.primitives[p]);
        }

        var select = <select
            onChange={this.handleChange}
            value={this.props.axiom.primitive.name}
            id={"axiomInput"}>
            {primitives.map(function(primitive) {
                return <option
                    value={primitive.name}
                    key={primitive.name}>
                        {primitive.name}
                    </option>
            })}
        </select>;

        return select;
    },

    render: function() {
        var select = this.renderPrimitiveSelect();
        return (
            <div className="menu">
                <h2>{"Initial Conditions"}</h2>
                <div style={{paddingLeft: "5px"}}>
                    {"Initial Symbol: "}{select}
                    <Slider
                        name={"Scale"}
                        id={"axiomScale"}
                        sliderValue={this.props.axiom.transformations[0].scale * 10}
                        min={0}
                        max={50}
                        isScale={true}
                        changeHandler={this.handleChange} />
                    <Slider
                        name={"Rotate"}
                        id={"axiomRotation"}
                        min={0}
                        max={360}
                        sliderValue={this.props.axiom.transformations[0].rotation}
                        changeHandler={this.handleChange} />
                    <Slider
                        id={"axiomTransX"}
                        name={"Tran X"}
                        min={0}
                        max={1000}
                        sliderValue={this.props.axiom.transformations[0].transX}
                        changeHandler={this.handleChange} />
                    <Slider
                        id={"axiomTransY"}
                        name={"Tran Y"}
                        min={0}
                        max={700}
                        sliderValue={this.props.axiom.transformations[0].transY}
                        changeHandler={this.handleChange} />
                </div>
            </div>
        );
    }
});
