var SideBarPane = React.createClass({

    getInitialState: function() {
        return {
            collapsed: {
                iterations: true,
                primitives: true,
                productionRules: true,
                axiom: true
            },
            collapseFunctions: {
                iterations:
    function() {handleCollapseButtonClick("iterations");},
                primitives: function() {handleCollapseButtonClick("primitives");},
                productionRules: function() {handleCollapseButtonClick("productionRules");},
                axiom: function() {handleCollapseButtonClick("axiom");},
            }
        };
    },

    handleCollapseButtonClick: function(buttonName) {
        var nextCollapsed = {};
        for (var index in this.state.collapsed) {
            nextCollapsed[index] = this.state.collapsed[index];
            if (index === buttonName) {
                nextCollapsed[index] = !nextCollapsed[index];
            }
        }
        this.setState({collapsed: nextCollapsed});
    },

    makebutton: function(buttonName) {
        var collapsed = "Expand";
        if (!this.state.collapsed[buttonName]) {
            collapsed = "Collapse";
        }
        var button = <input
            className="collapseButton"
            type="button"
            value={collapsed}
            onClick={this.state.collapseFunctions[buttonName]} />;

        return button;
    },

    render: function() {
        var pattern = <PatternSelect {...this.props} />;
        var iterations = <Iterations {...this.props} />;
        var primitives = <PrimitivesTab {...this.props} />;
        var productionRules = <ProductionRules {...this.props} />;
        var axiom = <Axiom {...this.props} />;
        return (
            <div className="sideBarPane">
                {pattern}
                {primitives}
                {productionRules}
                {axiom}
                {iterations}
            </div>
        );
    }
});
