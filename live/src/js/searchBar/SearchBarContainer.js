import React from 'react';
var SearchBar = require('./SearchBar.js');

class SearchBarContainer extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            query: {
                query : {
                    match_all: {}
                }
            },
            fields: [{name: "Answer", checked: true}, {name: "Question", checked: true}, {name:"Opportunity", checked: true}, {name: "Comments", checked: true}]
        }
    }

    handleQueryInput = (queryInput) => {
        var query = this.formatQuery(queryInput.target.value);
        this.setState({ query: query });
    };

    makeQuery = () => {
        var query = this.updateQueryFields(this.state.query);
        this.props.externalQuery(query);
    }

    formatQuery = (queryInput) => {
        var query = {
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: queryInput,
                                fields: [
                                ]
                            }
                        }
                    ]
                }
            }
        };
        return {query: query, type:["data"]};
    }

    updateQueryFields = (query) => {
        query = JSON.parse(JSON.stringify(query));
        this.state.fields.forEach((item) => {
            if (item["checked"]) {
                query["query"]["query"]["bool"]["must"][0]["multi_match"]["fields"].push(item["name"]);
            }
        });
        return query;
    }

    updateSearchFields = (field) => {
        var newFields = this.state.fields.map((item) => {
            if (item["name"] == field) {
                item["checked"] = !item["checked"];
            }
            return item;
        });
        this.setState({ fields: newFields});
    }

    render() {
        return (
            <SearchBar query={this.state.query}
                externalQuery={this.props.externalQuery}
                handleQueryInput={this.handleQueryInput}
                makeQuery={this.makeQuery}
                updateSearchFields={this.updateSearchFields}
                fields={this.state.fields} />
        );
    }
}

module.exports = SearchBarContainer;