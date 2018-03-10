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
  Button,
  AsyncStorage,
  Image
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';

const uiTheme = {
  palette: {
      primaryColor: COLOR.blue600,
  },
  toolbar: {
      container: {
          height: 50,
      },
  },
};

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn:false,
      userName:'',
      groupNumber:''
    }

    // THIS IS FOR TESTING TO REMOVE ASYNC STORAGE (SHOW LOGIN PAGE) UNTIL I SETUP LOGOUT FUNCTIONALITY
    AsyncStorage.removeItem('userName');

    AsyncStorage.getItem('userName').then((userNameStr)=>{
      if (userNameStr != null) {
        const userName = JSON.parse(userNameStr);
        this.setState({
          userName:userName.userName,
          loggedIn:true
        });
      }
    });
  }
  signIn(userName, pass) {
    var obj = this;

    // Do database check, get group number - TODO

    AsyncStorage.setItem("userName", JSON.stringify({'userName':userName}));

    obj.setState({
      userName:userName,
      loggedIn:true
    });
  }
  signUp(userName, pass) {

    // Do database check, get group number - TODO
    // Set async storage and refresh state

    alert(userName + " " + pass);
  }
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>

          <MenuBarNotLoggedIn />

          {/*<Text style={styles.instructions}>{instructions}</Text>*/}

          {!this.state.loggedIn && 
            <LoginBox signIn={this.signIn.bind(this)} signUp={this.signUp.bind(this)} userName={this.state.userName}/>
          }
          {this.state.loggedIn && 
            <Text>Welcome {this.state.userName}</Text>
          }
        </View>
      </ThemeProvider>
    );
  }
}

/*
  MAY ADD SEARCHABLE MENU BAR SELECTION BACK IN LATER

      return (
      <Toolbar
        leftElement="home"
        rightElement="menu"
        centerElement="Searchable"
        searchable={{
          autoFocus: true,
          placeholder: 'Search'}}/>
    );
*/

class MenuBarNotLoggedIn extends React.Component {
  render() {
    return (
      <Toolbar
        leftElement="home"
        rightElement="menu" />
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
  render() {
    return (
      <View style={{flex:1,width: '80%', maxWidth:'40%', justifyContent: 'space-between'}}>
        <View style={{alignItems:'center',height:'40%',justifyContent: 'center'}}>
          <Image source={require('./images/SuperShop.png')} style={{}}/>
        </View>
        <View>
          <TextInput style={{fontSize:20}} {...this.props} editable={true} maxLength={40} 
            placeholder={"Username"} value={this.state.userName} 
            onChangeText={(text) => this.changeUserName(text)} />
          <TextInput style={{fontSize:20}} {...this.props} editable={true} maxLength={40} 
            placeholder={"Password"} value={this.state.userPass} 
            onChangeText={(text) => this.changeUserPass(text)} secureTextEntry={true} />
        </View>
        <View style={{maxHeight:'30%', flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={{width: 75, height: 50}} >
            <Button
              onPress={() => this.props.signIn(this.state.userName, this.state.userPass)}
              title="Sign In"
              color="#3399ff"
              accessibilityLabel="Sign In"/>
          </View>
          <View style={{width: 75, height: 50}} >
            <Button
              onPress={() => this.props.signUp(this.state.userName, this.state.userPass)}
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
    justifyContent: 'flex-start',
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
