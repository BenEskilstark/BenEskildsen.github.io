
var SliderSideBar = React.createClass({
    getInitialState: function () {
        return {
            menus: [
                {
                    name: "Recursive Iterations",
                    type: "iterations",
                },
                {
                    name: "Length of Segments",
                    type: "length",
                },
                {
                    name: "Angle of Turns",
                    type: "angle",
                },
                {
                    name: "Initial State",
                    type: "initial",
                },
                {
                    name: "Production Rule #1",
                    type: "production",
                },
                {
                    name: "Add Production Rule",
                    type: "add rule",
                }
            ],
            numProductionRules: 1,
        };
    },

    addProductionRule: function () {
        var newProductionRule = {
            name: "Production Rule #" + (this.state.numProductionRules + 1),
            type: "production"
        }

        var newMenus = this.state.menus;
        newMenus.splice(newMenus.length - 1, 0, newProductionRule);
        this.setState({
            menus: newMenus,
            numProductionRules: this.state.numProductionRules + 1
        });
    },

    render: function () {
        return (
            <div className={'sliderSideBar'}>
                {this.state.menus.map(function(menu, i){
                    return (
                        <Menu
                            onAction={this.props.onAction}
                            addProductionRule={this.addProductionRule}
                            key={menu.name}
                            name={menu.name}
                            type={menu.type}
                            id={"menu" + i}
                            />
                    );
                }.bind(this))}
            </div>
        );
    }
});

var Menu = React.createClass({

    handleAddRule: function(e) {
        this.props.addProductionRule();
    },

    render: function () {
        if (this.props.type === "iterations") {
            return (
                <div className={'menu'}
                     id={this.props.id}
                     onChange={this.props.onAction}>
                    <b>{this.props.name}</b>
                    <br />
                    {"0 - 25:"}
                    <input type="range" min="0" max="24"/>
                </div>
            );
        } else if (this.props.type === "length") {
            return (
                <div className={'menu'}
                     id={this.props.id}
                     onChange={this.props.onAction}>
                    <b>{this.props.name}</b>
                    <br />
                    {"1 - 20:"}
                    <input type="range" min="1" max="20"/>
                </div>
            );
        } else if (this.props.type === "angle") {
            return (
                <div className={'menu'}
                     id={this.props.id}
                     onChange={this.props.onAction}>
                    <b>{this.props.name}</b>
                    <br />
                    {"0 - 180:"}
                    <input type="range" min="0" max="180"/>
                </div>
            );
        } else if (this.props.type === "initial") {
            return (
                <div className={'menu'}
                     id={this.props.id}
                     onChange={this.props.onAction}>
                    <b>{this.props.name}</b>
                    <br />
                    <input type="text" />
                </div>
            );
        } else if (this.props.type === "production") {
            return (
                <div className={'menu'}
                     id={this.props.id}
                     onChange={this.props.onAction}>
                    <b>{this.props.name}</b>
                    <br />
                    <input type="text" /> {'-->'} <input type="text" />
                </div>
            );
        } else if (this.props.type === "add rule") {
            return (
                <div className={'menu'}>
                    <b>{this.props.name}</b>
                    <br />
                    <input type="button" value="Add Rule" onClick={this.handleAddRule}/>
                </div>
            );
        } else {
            return null;
        }
    }
});

var RenderArea = React.createClass({

    getInitialState: function() {
        return {
            productions: [],
        };
    },

    update: function() {
        // grab the menus from the sidebar
        var menus = [];
        for (var i = 0, menu; menu = document.getElementById("menu"+i); i++) {
            menus.push(menu);
        }

        // collect the production rules
        var initial = menus[3].children[2].value;
        var productionRules = [];
        for (var i = 4, rule; rule = menus[i]; i++) {
            productionRules.push({
                lhs: rule.children[2].value,
                rhs: rule.children[6].value
            });
        }

        // run the production rules
        var productions = [initial];
        var iterations = parseInt(menus[0].children[3].value);
        for (var i = 1; i <= iterations; i++) {
            productions.push(
                this.nextProduction(productionRules, productions[productions.length - 1])
            );
        }

        // TODO: will need to change this to handle split axes
        var length = parseInt(menus[1].children[3].value);
        var angle = parseInt(menus[2].children[3].value);
        renderGrammar(productions[productions.length - 1], 1125, 750, length, angle);

        this.setState({
            productions: productions
        });
    },

    // This is context-free, ie can only handle single-symbol lhs's at a time
    nextProduction: function(productionRules, prevProduction) {
        var nextProduction = "";
        for (var i = 0; i < prevProduction.length; i++) {
            var foundRule = false;
            for (var j = 0, rule; rule = productionRules[j]; j++) {
                if (rule.lhs === prevProduction[i]) {
                    foundRule = true;
                    nextProduction += rule.rhs;
                }
            }
            if (!foundRule) {
                nextProduction += prevProduction[i];
            }
        }

        return nextProduction;
    },

    render: function () {
        return (
            <span>
                <SliderSideBar onAction={this.update}/>
                <div className={'renderArea'}>
                    <canvas id={'generatorCanvas'} className={'generatorCanvas'} width='1125' height='750' />
                </div>
            </span>
        );
    }
});


React.render(<RenderArea />, document.getElementById('container'));
