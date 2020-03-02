const React = require('react');

class ListItem extends React.Component {
    render() {
        const {data = {}} = this.props;
        return (
            <div className="internet-post">
                <p className="title">{data.id}: {data.title || ''}</p>
                <p className="content">{data.content}</p>
                <div className="other">
                    <div className="likes-num">
                        <span>{data.likesNum}</span>
                    </div>
                    <div className="comment-num">
                        <span>{data.commentNum}</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ListItem;