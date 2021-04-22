import React, { Component } from "react";
import "./Header.css";


class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className="divHeader">
                    <span className="spanHeader">
                        {this.props.children}
                    </span>
                </div>
                <hr className="hrHeader" />
            </>
        );
    }
}

export default Header;
