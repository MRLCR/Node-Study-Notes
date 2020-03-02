const React = require('react');
const List  = require('../components/list.jsx');

module.exports = function(data, sort = 0, {type} = {}) {
    return (
        <List
            data={data}
            filt={{type}}
            sort={sort}
        />
    )
}
