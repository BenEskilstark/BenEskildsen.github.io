var SubRegionTab = React.createClass({
    handleClick: function(e) {
        this.props.changeView(this.props.subRegion);
    },

    render: function () {
        var tabClass = "subRegionTab";
        if (this.props.currentlyViewing === this.props.subRegion) {
            tabClass = "highlightedSubRegionTab";
        }
        if (!this.props.subRegion.stars) {
            return (
                <div className={tabClass}
                     id={this.props.id}i
                     onClick={this.handleClick}>
                    <img src={"images/" + this.props.subRegion.urls[0]} width="80" height="80" />
                    <div className={'tabText'}>
                        <b>{this.props.subRegion.name}</b>
                        <br />
                        {this.props.subRegion.shortDescription}
                    </div>

                </div>
            );
        } else {
            var stars = "";
            for (var i = 0; i < this.props.subRegion.stars; i++) {
                stars += "*";
            }
            return (
                <div className={tabClass}
                     id={this.props.id}i
                     onClick={this.handleClick}>
                    <img src={"images/" + this.props.subRegion.urls[0]} width="80" height="80" />
                    <div className={'tabText'}>
                        <b>{this.props.subRegion.name}</b>
                        <br />
                        {this.props.subRegion.shortDescription}
                        <br />
                        {"Difficulty: " + this.props.subRegion.difficulty}
                        <br />
                        {"Stars: " + stars}
                    </div>

                </div>
            );
        }
    }
});
