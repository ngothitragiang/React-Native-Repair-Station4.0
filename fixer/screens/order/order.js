import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ItemOrder from '../../components/order/orderItem';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';

class Order extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllOrder();
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
              renderItem={({item}) => <ItemOrder item={item} />}
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
    getAllOrder: () => {
      dispatch(orderAction.getAllOrder());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
