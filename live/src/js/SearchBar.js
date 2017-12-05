import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            query: {
                query : {
                    match_all: {}
                }
            }
        }
    }

    handleQueryInput = (queryInput) => {
        var query = this.formatQuery(queryInput.target.value);
        this.setState({ query: query });
    };

    makeQuery = () => {
        this.props.externalQuery(this.state.query);
    }

    formatQuery = (queryInput) => {
        var query = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                Question: queryInput
                            }
                        }
                    ]
                }
            }
        };
        return {query: query, type:["data"]};
    };

    render() {
        return (
            <div className="search-bar">
                <input className="search-bar-input form-control"
                    type="text"
                    name="query"
                    placeholder="Enter a question"
                    onChange={this.handleQueryInput}/>
                <button className="search-bar-btn btn-danger btn btn-default submit-btn" onClick={this.makeQuery}>Query</button>
            </div>
        );
    }
}

module.exports = SearchBar;