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
import {showNotification, showModalNavigation} from '../../navigation/function';
import {AsyncStorage} from 'react-native';
import { Icon, Header, ListItem, Card } from 'react-native-elements'
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
    // const {dataOrders} = this.props;
    // const newOrder = dataOrders.filter(element => {
    //   return element.status === WAITING;
    // });
    // if (newOrder.length > 0) {
    //   showModalNavigation('notificationNewOrder', newOrder, 'Bạn có cuốc mới');
    // }
  }
  render() {
    const {dataOrders, loading} = this.props;
    console.log('8888888888888888', JSON.stringify(dataOrders, null, 4));

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
