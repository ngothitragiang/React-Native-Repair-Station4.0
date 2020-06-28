import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import InputText from '../../components/textInput';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '0368947845',
      email: 'Abc123456#',
      address: 'Abc123456#',
      phoneError: null,
      emailError: null,
      addressError: null,
    }
  }

  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { phoneError, emailError, addressError } = this.state;
    const { myInformation } = this.props;
    return (
      <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Image
          style={{ width: '100%', height: 150 }}
          source={require("../../assets/image/background-avatar-profile.png")}
          resizeMode={'cover'}
        />
        <View style={{ flex: 1, width: '100%' }}>
          <Image
            style={{ top: -60, width: 120, height: 120, borderRadius: 30, overflow: 'hidden', alignSelf: 'center' }}
            source={require("../../assets/image/icon-avatar-profile.png")}
            resizeMode={'contain'}
          />
          <View style={{ flex: 1, width: '100%', marginTop: -60, marginBottom: 30, alignItems: 'center', backgroundColor: '#fbfbfb' }}>
            <View style={{ width: '90%', marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text numberOfLines={1} style={{ flex: 1, marginHorizontal: 20, fontSize: 30 }}>{myInformation.name.toUpperCase()}</Text>
            </View>
            <View style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <InputText
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => {
                  this.focusNextField('address');
                }}
                onchangeText={value => this.onchangeText('email', value)}
                title="Email *"
                error={emailError}
                icon="https://img.icons8.com/ios/2x/email.png"
                type="email-address"
                value={myInformation.email}
              />
            </View>
            <View style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <InputText
                ref={ref => (this.phone = ref)}
                onSubmitEditing={() => {
                  this.focusNextField('email');
                }}
                onchangeText={value => this.onchangeText('phone', value)}
                title="Số điện thoại *"
                error={phoneError}
                icon="https://img.icons8.com/ios/2x/phone.png"
                type="numeric"
                value={myInformation.phoneNumber}
              />
            </View>
            <View style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <InputText
                ref={ref => (this.address = ref)}
                onchangeText={value => this.onchangeText('address', value)}
                title="Địa chỉ *"
                error={addressError}
                icon="https://img.icons8.com/ios/2x/address.png"
                type="default"
                value={myInformation.address}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
                <Image source={{uri: "https://img.icons8.com/ios/2x/cancel.png"}} style={{ width: 30, height: 30, marginHorizontal: 10 }} /> 
                <Text>Huỷ</Text>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
                <Image source={{uri: "https://img.icons8.com/ios/2x/checked.png"}} style={{ width: 30, height: 30, marginHorizontal: 10 }} /> 
                <Text>Cập nhật</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
