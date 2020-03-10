import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import firebase from 'react-native-firebase';
import {showModalNavigation} from '../../navigation/function';
import startApp from '../../navigation/bottomTab';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'oke@gmail.com',
      password: '12345678',
      emailError: null,
      passwordError: null,
    };
  }

  componentDidUpdate() {
    const {onLogin} = this.props;
    if (onLogin) {
      startApp();
    }
  }
  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  login = () => {
    const {email, password, emailError, passwordError} = this.state;

    if (email && password) {
      const user = {
        email: email,
        password: password,
      };
      this.props.login(user);
    } else {
      if (!email) this.onchangeText('emailError', 'Nhập Email');
      if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
    }
  };
  render() {
    const {emailError, passwordError} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View>
          <InputText
            ref={ref => (this.email = ref)}
            onSubmitEditing={() => {
              this.focusNextField('password');
            }}
            onchangeText={value => this.onchangeText('email', value)}
            title="Email *"
            error={emailError}
            icon="https://img.icons8.com/ios/2x/send-mass-email.png"
          />
          <InputText
            ref={ref => (this.password = ref)}
            onchangeText={value => this.onchangeText('password', value)}
            title="Mật khẩu *"
            error={passwordError}
            icon="https://img.icons8.com/ios/2x/password.png"
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#00a7e7'}]}
            onPress={() => this.login()}>
            <Text style={{color: 'white'}}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showModalNavigation('register')}>
            <Text style={styles.text}>Đăng Kí</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Quên mật khẩu?</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 20,
  },
  text: {
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderColor: '#00a7e7',
    borderWidth: 1,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
});
const mapStateToProps = store => {
  return {
    onLogin: store.AuthenticationReducers.onLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      dispatch(authenticationAction.login(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
