import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {myInformation} = this.props;
    return (
      <View style={styles.container}>
        <Text>Ten cua hang: {myInformation.name}</Text>
        <TouchableOpacity
          style={styles.buttonLogOut}
          onPress={() => this.props.logOut()}>
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogOut: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 30,
  },
});
const mapStateToProps = store => {
  return {
    myInformation: store.AuthenticationReducers.myInformation,
    onLogin: store.AuthenticationReducers.onLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(authenticationAction.logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
