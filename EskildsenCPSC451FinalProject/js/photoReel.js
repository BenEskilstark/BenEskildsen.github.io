var PhotoReel = React.createClass({
    render: function () {
        var photos = [];
        for (var i = 0; i < this.props.photos.length; i++) {
            if (i != this.props.imageIndex) {
                photos.push(this.props.photos[i]);
            }
        }
        return (
            <div className={'photoReel'}>
                {this.props.photos.map(function(url, i) {
                    if (i == this.props.imageIndex) {
                        return <span />;
                    }
                    return (
                        <img
                            key={url}
                            onClick={function(e) {this.props.setIndex(i)}.bind(this)}
                            className={'photo'}
                            src={"images/" + url}
                            width="80" height="80" />
                    );
                }.bind(this))}
            </div>
        );
    }
});
