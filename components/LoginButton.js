import React, { Component } from 'react';
import { Button } from 'react-native';

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Button
            title="Login"
            color='#a67a5b'
            onPress={() => this.props.userLogin() }
        />;
    }
}
