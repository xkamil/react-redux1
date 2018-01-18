import React, {Component} from 'react';

class CollapsableContent extends Component {

    static baseZIndex = 100;
    zindex;

    constructor(props) {
        super(props);
        CollapsableContent.baseZIndex--;
        this.zindex = CollapsableContent.baseZIndex;

        this.state = {
            visible: false
        }
    }

    show(e) {
        e.preventDefault();
        this.setState({visible: true})
    }

    hide(e) {
        this.setState({visible: false})
    }

    render() {
        return (
            <div onMouseEnter={this.show.bind(this)} onMouseLeave={this.hide.bind(this)} style={{
                position: 'absolute',
                backgroundColor: this.state.visible ? '#eee' : 'none',
                zIndex: this.zindex,
                padding: 5
            }}>
                {this.state.visible && this.props.children}
                {!this.state.visible && <small style={{color: '#999', cursor: 'pointer'}}>hover expand...</small>}
            </div>
        );
    }
}

export default CollapsableContent;
