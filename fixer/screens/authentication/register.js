import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import firebase from 'react-native-firebase';
import {Navigation} from 'react-native-navigation';

import startApp from '../../navigation/bottomTab';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'nam nam',
      email: 'abc3312@gmail.com',
      password: '123123123',
      confirmPassword: '123123123',
      phone: '123123123',
      emailError: null,
      passwordError: null,
      userNameError: null,
      confirmPasswordError: null,
      phoneError: null,
      tokenDevice: null,
    };
  }

  componentDidUpdate() {
    const {onLogin} = this.props;
    if (onLogin) {
      startApp();
    }
  }

  componentDidMount() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log('token   ', fcmToken);
          this.onchangeText('tokenDevice', fcmToken);
        } else {
          // user doesn't have a device token yet
        }
      });
  }
  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  register = () => {
    const {
      email,
      password,
      userName,
      phone,
      confirmPassword,
      emailError,
      passwordError,
      userNameError,
      confirmPasswordError,
      phoneError,
      tokenDevice,
    } = this.state;

    if (email && password && userName && phone && confirmPassword) {
      const user = {
        email: email,
        password: password,
        userName: userName,
        phoneNumber: phone,
        token: tokenDevice,
      };
      this.props.register(user);
    } else {
      if (!email) this.onchangeText('emailError', 'Nhập Email');
      else this.onchangeText('emailError', null);
      if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
      else this.onchangeText('passwordError', null);
      if (!userName) this.onchangeText('userNameError', 'Nhập tên đăng nhập');
      else this.onchangeText('userNameError', null);
      if (!phone) this.onchangeText('phoneError', 'Nhập số điện thoại');
      else this.onchangeText('phoneError', null);
      if (confirmPassword !== password)
        this.onchangeText(
          'confirmPasswordError',
          'Mật khẩu đó không khớp, hãy thử lại',
        );
      else this.onchangeText('confirmPasswordError', null);
    }
  };
  render() {
    const {
      emailError,
      passwordError,
      userNameError,
      phoneError,
      confirmPasswordError,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng kí</Text>
          <View>
            <InputText
              ref={ref => (this.userName = ref)}
              onSubmitEditing={() => {
                this.focusNextField('Email');
              }}
              onchangeText={value => this.onchangeText('userName', value)}
              title="Tên đăng nhập *"
              error={userNameError}
              icon="https://img.icons8.com/windows/2x/name.png"
            />
            <InputText
              ref={ref => (this.email = ref)}
              onSubmitEditing={() => {
                this.focusNextField('phone');
              }}
              onchangeText={value => this.onchangeText('email', value)}
              title="Email *"
              error={emailError}
              icon="https://img.icons8.com/ios/2x/send-mass-email.png"
            />
            <InputText
              ref={ref => (this.phone = ref)}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              type="numeric"
              onchangeText={value => this.onchangeText('phone', value)}
              title="Số điện thoại *"
              error={phoneError}
              icon="https://img.icons8.com/ios/2x/phone.png"
            />
            <InputText
              ref={ref => (this.password = ref)}
              onSubmitEditing={() => {
                this.focusNextField('confirmPassword');
              }}
              onchangeText={value => this.onchangeText('password', value)}
              title="Mật khẩu *"
              error={passwordError}
              icon="https://img.icons8.com/ios/2x/password.png"
            />
            <InputText
              ref={ref => (this.confirmPassword = ref)}
              onchangeText={value =>
                this.onchangeText('confirmPassword', value)
              }
              title="Xác nhận mật khẩu *"
              error={confirmPasswordError}
              icon="https://img.icons8.com/ios/2x/reviewer-female.png"
            />
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Navigation.dismissModal(this.props.componentId)}>
              <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#00a7e7'}]}
              onPress={() => this.register()}>
              <Text style={{color: 'white'}}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    register: data => {
      dispatch(authenticationAction.register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
