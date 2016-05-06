var Primitive = React.createClass({

    handleNameChange: function() {
        var newName = document.getElementById("primitiveName_" + this.props.name).value;

        var nextPrimitives = {};
        for (var p in this.props.primitives) {
            var primitive = this.props.primitives[p];
            if (this.props.name == primitive.name) {
                nextPrimitives[newName] = primitive;
                nextPrimitives[newName].name = newName;
            } else {
                 nextPrimitives[p] = primitive;
            }
        }
        this.props.handlePrimitivesChange(nextPrimitives);
    },

    handleUndo: function() {
        this.props.primitives[this.props.name].lines.pop();
        this.props.handlePrimitivesChange(this.props.primitives);
    },

    handleColorSelect: function() {
        var select = document.getElementById("colorSelect_" + this.props.name);
        this.props.primitives[this.props.name].color = select.value;
        this.props.handlePrimitivesChange(this.props.primitives);
    },

    handleClearDrawing: function() {
        this.props.primitives[this.props.name].lines = [];
        this.props.handlePrimitivesChange(this.props.primitives);
    },

    render: function() {
        return (
            <div className="primitive">
                <div className="primitiveLHS">
                    {"Name: "}<input type={"text"}
                                     id={"primitiveName_" + this.props.name}
                                     value={this.props.name}
                                     onChange={this.handleNameChange} />
                    <br />{"Color: "}
                    <select
                        id={"colorSelect_" + this.props.name}
                        onChange={this.handleColorSelect}
                        value={this.props.primitives[this.props.name].color}>
                        <option value="black" key="black">{"black"}</option>
                        <option value="red" key="red">{"red"}</option>
                        <option value="green" key="green">{"green"}</option>
                        <option value="blue" key="blue">{"blue"}</option>
                        <option value="brown" key="brown">{"brown"}</option>
                        <option value="purple" key="purple">{"purple"}</option>
                    </select>
                    <br />
                    <button className={"fancyButton"} onClick={this.handleUndo} >
                        {"Undo Last Line"}
                    </button>
                    <button className={"fancyButton"} onClick={this.handleClearDrawing}>
                        {"Clear Drawing"}
                    </button>
                </div>
                <MiniCanvas {...this.props}
                    name={this.props.name}
                    editable={true} />
            </div>
        );
    }
});
