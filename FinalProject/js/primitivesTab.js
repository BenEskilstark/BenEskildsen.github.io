var PrimitivesTab = React.createClass({

    getInitialState: function() {
        return {collapsed: false};
    },

    addPrimitive: function() {
        var nextPrimitives = this.props.primitives;
        var length = 0;
        for (var key in this.props.primitives) {
            if (this.props.primitives.hasOwnProperty(key)) {
                length += 1;
            }
        }
        var defaultName = String.fromCharCode(length + 65);
        nextPrimitives[defaultName] = {
            name: defaultName,
            lines: [],
            color: "black"
        };

        var nextProductionRules = this.props.productionRules;
        var matrix = makeEmptyMatrix();
        nextProductionRules[defaultName] = [{
            source: nextPrimitives[defaultName],
            productions: [{
                primitive: nextPrimitives[defaultName],
                transformations: [{scale: 1, rotation: 0, transX: 0, transY: 0}],
                matrix: matrix
            }],
        }];

        this.props.handlePrimitivesChange(nextPrimitives);
        this.props.handleProductionRulesChange(nextProductionRules);
    },

    handleCollapseClick: function() {
        this.setState({collapsed: true}, this.forceUpdate());
    },

    handleExpandClick: function() {
        this.setState({collapsed: false});
    },

    render: function() {
        var primitivesList = [];
        for (var p in this.props.primitives) {
            primitivesList.push(this.props.primitives[p]);
        }

        var collapseString = "Collapse this Panel";
        var display = "inline";
        var clickHandler = this.handleCollapseClick;
        if (this.state.collapsed) {
            collapseString = "Expand this Panel";
            display= "none";
            clickHandler = this.handleExpandClick;
        }

               // <button className="fancyButton" onClick={clickHandler}>
               //    {collapseString}
               // </button>
        return (
            <div className="menu">
                <h2>{"Symbols"}</h2>
                <span style={{display: display}}>
                    {primitivesList.map(function(primitive, i) {
                        return (
                            <span key={"primSpan_" + primitive.name}>
                                <Primitive {...this.props}
                                    key={"primitive_" + primitive.name + i}
                                    name={primitive.name} />
                                <div className="divider" key={"divprim_" + primitive.name} />
                            </span>
                        );
                    }.bind(this))}
                <button className="fancyButton" onClick={this.addPrimitive}>
                    {"Add Symbol"}
                </button>
                </span>
            </div>
        );
    }
});
