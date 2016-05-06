var ProductionRules = React.createClass({

    getInitialState: function() {
        return {collapsed: false};
    },

    // TODO: fix this
    addProductionRule: function() {
        var nextPrimitives = this.props.primitives;
        nextPrimitives.push(String.fromCharCode(this.props.primitives.length + 65));

        var nextProductionRules = {};
        var nextPrimitiveLines = {};
        for (var p = 0, primitive; primitive = this.props.primitives[p]; p++) {
            if (this.props.productionRules[primitive]) {
                nextProductionRules[primitive] = this.props.productionRules[primitive];
                nextPrimitiveLines[primitive] = this.props.primitiveLines[primitive];
            } else {
                nextProductionRules[primitive] = [];
                nextPrimitiveLines[primitive] = [];
            }
        }

        console.log(nextPrimitiveLines);
        this.props.handlePrimitiveLinesChange(nextPrimitiveLines);
        this.props.handlePrimitivesChange(nextPrimitives);
    },

    renderPrimitiveSelect: function(startValue) {
        var primitives = [];
        for (p in this.props.primitives) {
            primitives.push(this.props.primitives[p]);
        }

        var select = <select
            value={startValue}
            onChange={this.handlePrimitiveSelect}
            id={"selectProductionPrimitive_" + this.props.name}>
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

    handleCollapseClick: function() {
        this.setState({collapsed: true});
    },

    handleExpandClick: function() {
        this.setState({collapsed: false});
    },

    render: function() {
        var productionRules = [];
        for (var rule in this.props.productionRules) {
            productionRules.push(this.props.productionRules[rule]);
        }

        var collapseString = "(Click to Collapse this Panel)";
        var display = "inline";
        var clickHandler = this.handleCollapseClick;
        if (this.state.collapsed) {
            collapseString = "(Click to Expand this Panel)";
            display= "none";
            clickHandler = this.handleExpandClick;
        }

                // <button className="fancyButton" onClick={clickHandler}>
                //     {collapseString}
                // </button>
        return (
            <div className="menu">
                <h2>{"Production Rules"}</h2>
                <span style={{display: display}}>
                    {productionRules.map(function(rule) {
                        return (<span key={"spP_" + rule[0].source.name}>
                            {"Source Symbol: " + rule[0].source.name}
                            <Production {...this.props}
                                key={"productionRule_" + rule[0].source.name}
                                rule={rule[0]}
                                name={rule[0].source.name} />
                            <div className="divider" key={"divP_"+rule[0].source.name}></div>
                        </span>);
                    }.bind(this))}
                </span>
            </div>
        );
        return null;
    }
});
