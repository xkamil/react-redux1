import CollapsableContent from "../CollapsableContent";
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class TableRow extends Component {

    render() {
        const {record} = this.props;

        return (
            <tr>
                {Object.getOwnPropertyNames(record)
                    .map((item, idx) => <td key={idx}>{transformData(record[item])}</td>)}
            </tr>
        )
    }
}

TableRow.propTypes = {
    record: PropTypes.object.isRequired
};

function transformData(obj) {
    if (typeof obj === 'object') {
        return <CollapsableContent>
            <pre>{JSON.stringify(obj, null, 2)}</pre>
        </CollapsableContent>;
    } else {
        return obj;
    }
}

export default TableRow;