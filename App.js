/**
 * SuperShop sample react-native application
 * https://github.com/NateThurmond/SuperShop
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Supershop click below to sign up
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <LoginBox />
      </View>
    );
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props); // Will allow accessing props within constructor, may not be needed

    this.state = {
      userName:'',
      userPass:''
    };
  }
  changeUserName(value) {
    this.setState({
      userName:value
    });
  }
  changeUserPass(value) {
    this.setState({
      userPass:value
    });
  }
  signIn() {
    alert(this.state.userName + " " + this.state.userPass);
  }
  signUp() {
    alert(this.state.userName + " " + this.state.userPass);
  }
  render() {
    return (
      <View style={{flex:1,width: '80%', maxWidth:250, justifyContent: 'space-between'}}>
        <View style={{}}>
          <TextInput {...this.props} editable={true} maxLength={40} 
            placeholder={"Username"} value={this.state.userName} 
            onChangeText={(text) => this.changeUserName(text)} />
          <TextInput {...this.props} editable={true} maxLength={40} 
            placeholder={"Password"} value={this.state.userPass} 
            onChangeText={(text) => this.changeUserPass(text)} secureTextEntry={true} />
        </View>
        <View style={{maxHeight:'30%', flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={{width: 100, height: 50}} >
            <Button
              onPress={() => this.signIn()}
              title="Sign In"
              color="#3399ff"
              accessibilityLabel="Sign In"/>
          </View>
          <View style={{width: 100, height: 50}} >
            <Button
              onPress={() => this.signUp()}
              title="Sign Up"
              color="#3399ff"
              accessibilityLabel="Sign Up"/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
