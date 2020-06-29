import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import CheckBoxItem from '../../components/order/checkBoxService';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {format} from 'date-fns';
import {DONE, WAITING, ACCEPTED, REJECTED} from '../../constants/orderStatus';
import {ERROR_COLOR, APP_COLOR} from '../../utils/colors';
import {AsyncStorage} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      serviceSelected: [],
      totalPrice: null,
    };
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidUpdate = async () => {
    // const {loading} = this.props;
    // if (loading) {
    //   const stationId = await AsyncStorage.getItem('stationId');
    //   this.props.getAllOrder(stationId);
    // }
  };

  onValueChange = valueCheckBox => {
    let {serviceSelected} = this.state;

    try {
      let found = serviceSelected.find(
        element => element.id === valueCheckBox.id,
      );
      if (found) {
        serviceSelected = serviceSelected.filter(item => {
          return item.id !== valueCheckBox.id;
        });
      } else {
        serviceSelected = [...serviceSelected, valueCheckBox];
      }
    } catch (error) {
      console.log('error', error);
    }

    this.setState({serviceSelected: serviceSelected});
  };

  setDefaultValueServices = async value => {
    await this.setState({serviceSelected: []});
    let {serviceSelected} = this.state;
    serviceSelected = [...serviceSelected, value];
    this.setState({serviceSelected: serviceSelected});
  };

  handleService = () => {
    const {serviceSelected} = this.state;
    this.props.addServiceToOrder(serviceSelected, this.props.value.id);
    this.setModalVisible(!this.state.modalVisible);
  };

  countStars = (starsRating, styleChecked, styleUnChecked) => {
    let star = [];
    for (var i = 0; i < 5; i++) {
      if (i < starsRating) {
        star[i] = <Icon name="ios-star" style={styleChecked} size={40} />;
      } else {
        star[i] = <Icon name="ios-star" style={styleUnChecked} size={40} />;
      }
    }
    return star;
  };

  totalPrice = order => {
    let totalPrice = 0;

    if (order.services) {
      order.services.forEach(element => {
        totalPrice += parseInt(element.price);
      });
    }

    return totalPrice;
  };

  filterOrderId = () => {
    const {value, dataOrders} = this.props;
    return dataOrders.find(order => order.id === value.id);
  };

  render() {
    const {listService, value, loading} = this.props;
    const order = this.filterOrderId();
    return (
      <ScrollView>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: deviceWidth - 70,
                  paddingTop: 10,
                }}>
                <View>
                  <Text style={styles.textModal}>DỊCH VỤ</Text>
                  <View style={{maxHeight: 400}}>
                    <ScrollView>
                      <FlatList
                        data={listService}
                        renderItem={({item}) => (
                          <CheckBoxItem
                            onValueChange={valueCheckBox =>
                              this.onValueChange(valueCheckBox)
                            }
                            setDefaultValueServices={value => {
                              this.setDefaultValueServices(value);
                            }}
                            item={item}
                            serviceSelected={order.services}
                          />
                        )}
                        keyExtractor={item => item.id}
                      />
                    </ScrollView>
                  </View>
                </View>
                <View
                  style={[
                    styles.row,
                    {justifyContent: 'flex-end', marginRight: 10},
                  ]}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: APP_COLOR}]}
                    onPress={() => this.handleService()}>
                    <Text style={{color: 'white'}}>Hoàn tất</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={[styles.title, {textAlign: 'center', marginBottom: 10}]}>
            Thông tin khách hàng
          </Text>
          <View style={styles.row}>
            <Text style={styles.idOrder}>Mã đặt chuyến: </Text>
            <Text style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
              {order.id.length > 18
                ? order.id.substring(0, 18) + '...'
                : order.id}
            </Text>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.idOrder}>Điện thoại:</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {order.customerPhone}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.idOrder}>Địa chỉ:</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {order.address}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.idOrder}>Khoảng cách:</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {order.distance / 1000} Km
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.idOrder}>Thời gian:</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {format(new Date(order.createdOn), 'dd-MM-yyyy H:mma')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.idOrder}>Tình trạng:</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {order.status}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.idOrder]}>Sử dụng xe lưu động</Text>
              <Text
                style={[styles.idOrder, {color: 'gray', textAlign: 'right'}]}>
                {order.useAmbulatory ? 'Có' : 'Không'}
              </Text>
            </View>
          </View>

          <View style={styles.line} />
          <View>
            <Text style={[styles.title, {textAlign: 'center'}]}>
              Cước sửa xe
            </Text>

            <FlatList
              data={order.services}
              renderItem={({item}) => (
                <View style={styles.between}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.price} Vnd</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />

            <View style={styles.between}>
              <Text style={styles.text}>khuyến mại</Text>
              <Text style={styles.text}>- 0 Vnd</Text>
            </View>
            <View style={styles.center}>
              {order.status === ACCEPTED ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={[
                    {
                      backgroundColor: 'red',
                    },
                    styles.bigButton,
                  ]}>
                  <Text style={[styles.textModal, {color: 'white'}]}>
                    Thêm dịch vụ
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.between}>
            <View style={styles.row}>
              <Icon
                name="ios-cash"
                color="black"
                size={30}
                style={styles.icon}
              />
              <Text style={styles.title}>Thanh toán tiền mặt</Text>
            </View>
            <Text style={[styles.title, {marginVertical: 8}]}>
              {this.totalPrice(order)} Vnd
            </Text>
          </View>

          <View style={styles.review}>
            {order.status === DONE ? (
              <Text style={{textAlign: 'center', margin: 10}}>
                Đánh giá của khách hàng
              </Text>
            ) : null}

            <View style={[styles.row, {justifyContent: 'center'}]}>
              {order.status === DONE
                ? this.countStars(
                    order.star,
                    styles.iconRankChecked,
                    styles.iconRankUnchecked,
                  )
                : null}
              {order.status === WAITING ? (
                <View style={[styles.row]}>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: ERROR_COLOR,
                      },
                      styles.bigButton,
                    ]}
                    onPress={() =>
                      this.props.onUpdateStatus(REJECTED, order.id)
                    }>
                    {loading ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <Text style={[styles.textModal, {color: 'white'}]}>
                        Từ chối
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: APP_COLOR,
                      },
                      styles.bigButton,
                    ]}
                    onPress={() =>
                      this.props.onUpdateStatus(ACCEPTED, order.id)
                    }>
                    {loading ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <Text style={[styles.textModal, {color: 'white'}]}>
                        Chấp nhận
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : null}

              {order.status === ACCEPTED ? (
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: APP_COLOR,
                    },
                    styles.bigButton,
                  ]}
                  onPress={() => this.props.onUpdateStatus(DONE, order.id)}>
                  {loading ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <Text style={[styles.textModal, {color: 'white'}]}>
                      Thanh toán
                    </Text>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 7,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  idOrder: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '50%',
  },
  line: {
    backgroundColor: 'gray',
    height: 0.5,
    marginVertical: 15,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 8,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  review: {
    marginTop: 30,
  },
  text: {
    fontSize: 16,
  },
  textModal: {
    fontSize: 20,
    textAlign: 'center',
  },
  iconRankChecked: {
    color: '#fda942',
    marginRight: 3,
    top: -1,
  },
  iconRankUnchecked: {
    color: '#bcbcbc',
    marginRight: 3,
    top: -1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
  },
  bigButton: {
    width: 150,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    margin: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4c49',
    opacity: 0.9,
  },
});
const mapStateToProps = store => {
  return {
    listService: store.ServiceReducers.services,
    dataOrders: store.OrderReducers.dataOrder,
    loading: store.OrderReducers.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addServiceToOrder: (data, orderId) => {
      dispatch(orderAction.addServiceToOrder(data, orderId));
    },
    onUpdateStatus: (status, orderId) => {
      dispatch(orderAction.updateStatus(status, orderId));
    },
    getAllOrder: stationId => {
      dispatch(orderAction.getAllOrder(stationId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
