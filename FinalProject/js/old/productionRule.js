var ProductionRule = React.createClass({

    getInitialState: function() {
        return {
            lines: []
        };
    },

    handleLineAdded: function(nextLines) {
        this.setState({lines: nextLines});
    },

    // TODO: do I actually need this function? What does it do?
    handleNameChange: function(newName) {
        if (newName != "") {
            this.setState({name: newName});
        }
    },

    render: function() {
        return (
            <div className="productionRule">
                <Primitive {...this.props}
                    handleLineAdded={this.handleLineAdded}
                    name={this.props.name} />
                <div className="arrow">
                    {"=>"}
                </div>
                <Production {...this.props}
                    primitiveLines={this.state.lines} />
            </div>
        );
    }
});
