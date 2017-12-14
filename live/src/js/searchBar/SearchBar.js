import React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
var FieldCheckbox = require('../table/FieldCheckbox.js');

class SearchBar extends React.Component {
	constructor(props) {
        super(props);
    }

    render() {
		var MultiSearchCheckbox = this.props.fields.map((item, i) => {
            var key = dropdownKeyGen(item)
            return (
                <FieldCheckbox
                    updateSearchFields={this.props.updateSearchFields}
                    key={i}
                    _type={item["name"]}
                    _key={key}
                    checked={item["checked"]}
                />
            );
        });

        return (
            <div className="search-bar">
                <input className="search-bar-input form-control"
                    type="text"
                    name="query1"
                    placeholder="Search criteria"
                    onChange={this.props.handleQueryInput}/>
                <input className="search-bar-input form-control"
                    type="text"
                    name="query2"
                    placeholder="Additional search criteria"
                    onChange={this.props.handleQueryInput}/>
                <input className="search-bar-input form-control"
                    type="text"
                    name="query3"
                    placeholder="Additional search criteria"
                    onChange={this.props.handleQueryInput}/>
                <Dropdown
                    className="dejavu-dropdown pull-right "
                    pullRight={true}
                    id='ab-dropdown'
                >
                <Dropdown.Toggle className="fa fa-cog" />
                <Dropdown.Menu>
                    <MenuItem header className='centered-text'>Query by field</MenuItem>
                    <MenuItem divider/>
                    {MultiSearchCheckbox}
                </Dropdown.Menu>
                </Dropdown>
                <button className="search-bar-btn btn-danger btn btn-default submit-btn" onClick={this.props.makeQuery}>Search</button>
            </div>
        );
    }
}

module.exports = SearchBar;