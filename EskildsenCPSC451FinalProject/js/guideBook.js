var GuideBook = React.createClass({
    getInitialState: function() {
        return {
            currentlyViewing: AREAS[1],
            siblingRegions: AREAS,
            parentStack: [],
        };
    },

    changeView: function(subRegion, siblings) {
        var shouldSaveParent = true;
        for (var i = 0, sibling; sibling = siblings[i]; i++) {
            if (sibling.name === this.state.currentlyViewing.name) {
                shouldSaveParent = false;
            }
        }

        if (shouldSaveParent) {
            var parentRegion = {
                currentlyViewing: this.state.currentlyViewing,
                siblingRegions: this.state.siblingRegions
            };
            this.state.parentStack.push(parentRegion);
        }

        this.setState({
            currentlyViewing: subRegion,
            siblingRegions: siblings,
            parentStack: this.state.parentStack
        });
    },

    backView: function() {
        var parentRegion = this.state.parentStack.pop();
        if (!parentRegion) {
            console.log("no parent stack");
            return;
        }
        this.setState({
            currentlyViewing: parentRegion.currentlyViewing,
            siblingRegions: parentRegion.siblingRegions,
            parentStack: this.state.parentStack
        });
    },

    render: function() {
        if (this.state.currentlyViewing.subRegions) {
            return (<span>
                <SideBar
                    currentlyViewing={this.state.currentlyViewing}
                    changeView={this.changeView}
                    backView={this.backView}
                    backButton={this.state.parentStack.length}
                    subRegions={this.state.siblingRegions} />
                <MainImagePane
                    area={this.state.currentlyViewing} />
                <SideBar
                    currentlyViewing={this.state.currentlyViewing}
                    changeView={this.changeView}
                    backButton={0}
                    subRegions={this.state.currentlyViewing.subRegions} />
            </span>);
        } else {
            return (<span>
                <SideBar
                    backView={this.backView}
                    backButton={this.state.parentStack.length}
                    currentlyViewing={this.state.currentlyViewing}
                    changeView={this.changeView}
                    subRegions={this.state.siblingRegions} />
                <MainImagePane
                    area={this.state.currentlyViewing} />
            </span>);
        }
    }
});


React.render(<GuideBook />, document.getElementById('container'));
