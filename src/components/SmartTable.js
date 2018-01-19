/**
 * Displays beautiful table
 * Takes one param as argument to extract headers and data from it. For example:
 *  [
 *    {name: "Roman", age: 22, childrens: []},
 *    {name: "Franek", age: 44, childrens: []},
 *    {name: "Anna", age: 66, childrens: ['Adam','Pawel']}
 *  ]
 *
 *  For this example data table will have fallowing headers: name, age, childrens
 *  Childrens is not plain data so it will be displayed collapsed in one table cell
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import CollapsableContent from "./CollapsableContent";
import {areEqualDeep} from "../utils/comparators";

class SmartTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            headers: [],
            filters: {}
        };
    }

    componentDidMount() {
        this.updateState(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        if (!areEqualDeep(this.props.data, nextProps.data)) {
            this.updateState(nextProps.data)
        }
    }

    updateState(rawData) {
        let headers = this.extractHeaders(rawData);
        let data = this.extractData(rawData);

        this.setState({...this.state, headers, data})
    }

    extractHeaders(data) {
        let headers = [];
        if (data && data.length > 0) {
            Object.getOwnPropertyNames(data[0]).forEach(header => headers.push(header));
        }
        return headers;
    }

    filterData() {
        const {data, headers} = this.state;

        return data.filter(record => {
            let valid = true;

            Object.getOwnPropertyNames(this.state.filters).forEach(filteredPropertyName => {
                let headerIdx = headers.indexOf(filteredPropertyName);

                if (headerIdx !== -1 && JSON.stringify(record[headerIdx]).indexOf(this.state.filters[filteredPropertyName]) === -1) {
                    valid = false;
                }
            });

            return valid;
        });
    }

    transform(obj) {
        if (typeof obj === 'object') {
            return <CollapsableContent>
                <pre>{JSON.stringify(obj, null, 2).replace(/({)|(})|(")|(,)/g, '')}</pre>
            </CollapsableContent>;
        } else {
            return obj;
        }
    }

    extractData(data) {
        let users = [];

        if (data instanceof Array) {
            data.forEach(record => {
                let arrRecord = [];

                Object.getOwnPropertyNames(record).forEach(item => {
                    let obj = this.transform(record[item]);
                    arrRecord.push(obj);
                });

                users.push(arrRecord)
            });
        }
        return users;
    }

    handleFilerChange(e) {
        let id = e.target.getAttribute('id');
        let value = e.target.value;

        this.setState({...this.state, filters: {...this.state.filters, [id]: value}})
    }

    render() {
        const {headers} = this.state;
        const filteredData = this.filterData();

        const filterInput = (id) => <input
            type="text"
            id={id} value={this.state.filters[id] || ''}
            onChange={this.handleFilerChange.bind(this)}/>;

        return (
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    {headers.map((header, idx) => <th key={idx}>{header}</th>)}
                </tr>
                </thead>

                <tbody>
                <tr>
                    {headers.map((header, idx) => <td key={idx}>{filterInput(header)}</td>)}
                </tr>
                {filteredData.map((record, idx) => (
                    <tr key={idx}>
                        {record.map((items, idx2) => <td key={idx2}>{items}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

SmartTable.propTypes = {
    data: PropTypes.array.isRequired
};

export default SmartTable;