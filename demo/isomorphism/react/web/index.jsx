const React     = require('react');
const ReactDom  = require('react-dom');
const List      = require('../components/list.jsx');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: initData,
            sort: initSort,
            filter: {
                type: initType,
            },
        };
    }
    render() {
        const changeUrlQuery = (sort, type) => {
            window.history.pushState(null, '', `${window.location.pathname}?sort=${sort}&type=${type}`);
        }
        const getData = (sort, type) => {
            fetch(`./api?sort=${sort}&type=${type}`)
                .then(data => data.json())
                .then(res => {
                    this.setState({
                        data: res,
                        sort,
                        filter: {type},
                    });
                    changeUrlQuery(sort, type);
                })
        };
        return (
            <List
                data={this.state.data}
                filt={{type: this.state.filter.type}}
                sort={this.state.sort}
                sortFn={(sort) => {
                    getData(sort, this.state.filter.type);
                }}
                filtFn={({type} = {}) => {
                    getData(this.state.sort, type);
                }}
            />
        )
    }
}

// ReactDom.render(
//     <App />,
//     document.getElementById('app')
// );

ReactDom.hydrate(
    <App />,
    document.getElementById('app'),
)
