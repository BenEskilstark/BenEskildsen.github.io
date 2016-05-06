var PatternSelect = React.createClass({

    handlePatternSelect: function() {
        var pattern = document.getElementById("selectPattern").value;
        this.props.handlePatternSelect(pattern);
    },

    render: function() {
        return <div className="menu">
            <h2>{"Select Pattern"}</h2>
            {"Current Pattern: "}
            <select
                onChange={this.handlePatternSelect}
                value={this.props.currentPattern}
                id={"selectPattern"}>
                {this.props.patterns.map(function(pattern, i) {
                    return <option key={pattern.name}
                        value={i}>
                        {pattern.name}
                    </option>;
                })}
            </select>
            <button
                className="fancybutton"
                onClick={this.props.patternToString}>
                {"Print this pattern to the console"}
            </button>
        </div>;
    }
});
