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
            filters: {},
            order: -1,
            orderBy: 'time'
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

    changeOrder(field) {
        this.setState({...this.state, orderBy: field, order: this.state.order * -1});
    }

    sort(data) {
        let dataCopy = JSON.parse(JSON.stringify(data));

        let idx = this.state.headers.indexOf(this.state.orderBy);

        if(idx !== -1){
            dataCopy.sort((a, b) => {
                if (a[idx] < b[idx]) {
                    return -1 * this.state.order;
                } else if (b[idx] < a[idx]) {
                    return 1 * this.state.order;
                }
                return 0;
            });
        }

        return dataCopy;
    }

    render() {
        const {headers} = this.state;
        const filteredData = this.filterData();

        console.log(filteredData);
        
        const testData = this.sort(filteredData);

        console.log(testData);
        const filterInput = (id) => <input
            type="text"
            style={{width: '100%', height: 25}}
            id={id} value={this.state.filters[id] || ''}
            onChange={this.handleFilerChange.bind(this)}/>;

        return (
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    {headers.map((header, idx) => <th key={idx} onClick={this.changeOrder.bind(this, header)}>{header}</th>)}
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