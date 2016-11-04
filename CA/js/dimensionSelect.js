var DimensionSelect = React.createClass({

    handleDimensionSelect: function() {
        var dimension = document.getElementById("selectDimension_" + this.props.axis).value;
        this.props.handleDimensionSelect(this.props.axis, dimension);
    },

    render: function() {
        return <div className="menu">
            {"Current " + this.props.axis + ": "}
            <select
                onChange={this.handleDimensionSelect}
                value={this.props.currentDimension}
                id={"selectDimension_" + this.props.axis}>
                {this.props.dimensions.map(function(dimension, i) {
                    return <option key={dimension} value={dimension}>
                        {dimension}
                    </option>;
                })}
            </select>
        </div>;
    }
});
