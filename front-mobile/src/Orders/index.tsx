import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView , Alert} from 'react-native';
import Header from '../Header';
import OrderCard from '../OrderCard';
import {fecthOrders} from '../api';
import {Order} from '../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';

function Orders() {

  const [isloading, setIsloading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([])
  const navigation = useNavigation(); 
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsloading(true)
    fecthOrders() 
      .then(response => setOrders(response.data))
      .catch( () =>  Alert.alert('Houve um erro ao buscar os pedidos') )
      .finally( () => setIsloading(false))
  }

  useEffect( () => {
    if (isFocused) {
       fetchData();
    }
  }, [isFocused])

  const handlerOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', {
      order
    });
}


  return (
        <>
        <Header />
        <ScrollView style={styles.container}>
          {isloading ? (
              <Text>Buscando Pedidos ...</Text>
          ) : (
            orders.map(order => (
              <TouchableWithoutFeedback 
                 key={order.id} 
                 onPress={ () => handlerOnPress(order)}>
                  <OrderCard order={order} />
              </TouchableWithoutFeedback>
            ))
          )}
        </ScrollView>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  }
});

export default Orders;
