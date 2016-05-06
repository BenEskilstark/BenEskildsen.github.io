var SideBar = React.createClass({
    changeView: function(subRegion) {
        this.props.changeView(subRegion, this.props.subRegions);
    },

    render: function () {
        var backButton = <span />;
        if (this.props.backButton > 0) {
            backButton = <div
                className="subRegionTab"
                onClick={this.props.backView}>
                {"Go Back"}
            </div>;
        }


        return (
            <div className={'sideBar'}>
                {this.props.subRegions.map(function(subRegion, i){
                    return (
                        <SubRegionTab
                            currentlyViewing={this.props.currentlyViewing}
                            changeView={this.changeView}
                            subRegion={subRegion}
                            key={subRegion.name}
                            name={subRegion.name}
                            type={subRegion.type}
                            id={this.props.side + "subRegion" + i}
                            />
                    );
                }.bind(this))}
                {backButton}
            </div>
        );
    }
});
