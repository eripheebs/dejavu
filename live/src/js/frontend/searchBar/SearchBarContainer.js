import React from 'react';
var SearchBar = require('./SearchBar.js');

class SearchBarContainer extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            queries: [],
            fields: [{name: "Answer", checked: false}, {name: "Question", checked: true}, {name:"Opportunity", checked: false}, {name: "Comments", checked: false}]
        }
    }

    handleQueryInput = (queryInput) => {
        var queries = queryInput.target.value;
        var queryArray = this.parse(queries);
        this.setState({queries: queryArray});
    }

    parse = (queries) => {
        return queries.split(/[\n;]/);
    }

    onlyOneQuery = () => {
        return (this.state.queries.length == 1);
    }

    makeQuery = () => {
        if (this.onlyOneQuery()) {
            var query = this.formatESQuery(this.state.queries[0]);
            this.props.externalQuery(query);
        } else {
            var formattedQueries = []
            this.state.queries.forEach((query) => {
                if (query != "") {
                    formattedQueries.push(this.formatMultiESQuery(query))
                }
            });
            this.props.multiExternalQuery(formattedQueries);
        }
    }

    formatESQuery  = (queryInput) => {
        return this.updateQueryFields(this.formatQuery(queryInput));
    }

    formatMultiESQuery  = (queryInput) => {
        return this.addMaxQuerySize(this.updateQueryFields(this.formatQuery(queryInput)));
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
            },
            sort: [
                "_score"
            ]
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

    addMaxQuerySize = (query) => {
        query = JSON.parse(JSON.stringify(query));
        query["query"]["size"] = 3;
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