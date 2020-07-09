import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import OrderItem from '../../components/order/orderItem';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {showNotification} from '../../navigation/function';
import {AsyncStorage} from 'react-native';
import {WAITING} from '../../constants/orderStatus';
class Order extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const stationId = await AsyncStorage.getItem('stationId');
    this.props.getAllOrder(stationId);
  };
  componentDidUpdate() {
    const {dataOrders} = this.props;
    const newOrder = dataOrders.filter(element => {
      return element.status === WAITING;
    });
    if (newOrder.length > 0) {
      showNotification(
        'notificationNewOrder',
        'Bạn có cuốc mới',
        null,
        newOrder,
      );
    }
  }
  render() {
    const {dataOrders, loading} = this.props;
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <FlatList
              data={dataOrders}
              renderItem={({item}) => <OrderItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = store => {
  return {
    dataOrders: store.OrderReducers.dataOrder,
    loading: store.OrderReducers.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: stationId => {
      dispatch(orderAction.getAllOrder(stationId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
