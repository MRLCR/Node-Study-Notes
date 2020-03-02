const React = require('react');
const ListItem = require('./list-item.jsx');

class List extends React.Component {
    render() {
        const {
            data = [],
            sort,
            filt = {},
            sortFn = () => null,
        } = this.props;
        const {type = 0} = filt;
        if (Array.isArray(data)) {
            const TYPES = [
                {type: 0, label: '全部'},
                {type: 1, label: '疫情'},
                {type: 2, label: '娱乐'},
                {type: 3, label: '技术'},
            ];
            const handleChange = (event) => {
                this.props.filtFn.call(this, {type: event.target.value});
            };
            return (
                <div className="list">
                    <div className="filter">
                        <div className="filter-item solt">
                            <button
                                type="button"
                                className="btn"
                                onClick={sortFn.bind(this, sort === 0 ? 1 : 0)}
                            >{sort === 0 ? '升序' : '降序'}</button>
                        </div>
                        <div className="filter-item type">
                            <select className="select" defaultValue={type} onChange={handleChange}>
                                {
                                    TYPES.map((item, index) => (
                                        <option
                                            value={item.type}
                                            key={`${item.type}${index}`}
                                        >{item.label}</option>)
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    {
                        data.map((item, index) => <ListItem data={item} key={`${item.id}${index}`} />)
                    }
                    <p className="no-more">- 没有更多数据了 -</p>
                </div>
            )
        }
        return (<div className="data-error">服务器故障，请稍后重试~~</div>)
    }
}

module.exports = List;
