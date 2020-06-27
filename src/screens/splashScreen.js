import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as authenticationAction from '../redux/authentication/actions/actions';
import * as stationAction from '../redux/station/actions/actions';
import {AsyncStorage} from 'react-native';
import startApp from '../navigation/bottomTab';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getMyAccount();
    await this.props.getMyStation();
  }

  async componentDidUpdate() {
    const {allStation} = this.props;
    if (allStation.length) {
      let firstStationId = allStation[0].id;
      await AsyncStorage.setItem('stationId', firstStationId);
      await this.props.getStationById(firstStationId);
      startApp();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
const mapStateToProps = store => {
  return {
    allStation: store.StationReducers.allStation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMyAccount: () => {
      dispatch(authenticationAction.getMyAccount());
    },
    getMyStation: () => {
      dispatch(stationAction.getMyStation());
    },
    getStationById: id => {
      dispatch(stationAction.getStationById(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
