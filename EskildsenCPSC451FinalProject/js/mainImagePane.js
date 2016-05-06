var MainImagePane = React.createClass({

    getInitialState: function() {
        return {imageIndex: 0};
    },

    setIndex: function(nextIndex) {
        this.setState({imageIndex: nextIndex});
    },

    render: function () {
        return (
            <div className={'mainImagePane'}>
                <img
                    src={"images/" + this.props.area.urls[this.state.imageIndex]}
                    width="643" height="500" />
                <div className={'mainText'}>
                    <PhotoReel
                        setIndex={this.setIndex}
                        imageIndex={this.state.imageIndex}
                        photos={this.props.area.urls} />
                    <h1>{this.props.area.name}</h1>
                    {this.props.area.shortDescription}
                </div>
            </div>
        );
    }
});
