import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersTable, OrderDetail } from './components';
import mockData from './data';
// import { number } from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [users] = useState(mockData);
  const [orderDetail, setOrderDetail] = useState([]);

  // transfer order number between sibling component
  // const [ orderNumber, setOrderNumber ] = useState(mockData[0].orderID);
  const [ orderNumber, setOrderNumber ] = useState([]);

  const handleSelect = orderNumber => {
    setOrderNumber(orderNumber);
    getOrderDetail(orderNumber);
  }
  console.log(orderNumber);

  const [ orderHistory, setOrderHistory ] = useState([]);
  useEffect(() => {
    console.log('useEffect called')
    getOrderHistory()
      .then(data => setOrderHistory(data));
  }, []);

  // console.log('orderHistory -->', orderHistory);

  async function getOrderHistory() {
    axios.post('http://localhost:5000/history', {
      user_id : 'abc',
    })
      .then(response => {
        console.log('order history data -->', response.data);
        setOrderHistory(response.data);
        return response.data[0];
      })
      .then(data => {
        console.log('last response -> ', data['Order ID']);
        setOrderNumber(data['Order ID']);
        return data['Order ID'];
      })
      .then(data => {
        console.log(data);
        getOrderDetail(data);
      })
      .catch(error => console.log(error));
  }

  async function getOrderDetail() {
    axios.post('http://localhost:5000/detail', {
      // order_id : 'number',
      order_id : 'number',
    })
      .then(response => {
        console.log(response.data);
        // setOrderNumber(orderNumber);
        setOrderDetail(response.data);
      })
      .catch(error => console.log(error));
  }

  // const getOrderDetail = (number) => {
  //   console.log(number);
  //   axios.post('http://localhost:5000/detail', {
  //     // order_id : 'number',
  //     order_id : number,
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       setOrderDetail(response.data);
  //     })
  //     .catch(error => console.log(error));
  // }


  // const getOrderHistory = async () => {
  //   axios.post('http://localhost:5000/history', {
  //     user_id : 'abc',
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       setOrderHistory(response.data);
  //     })
  //     .catch(error => console.log(error));
  // }

  return (
    <div className={classes.root}>
      <div>
        {/*<OrderDetail orderDetail = {orderDetail}/>*/}
        <OrderDetail orderDetail = { orderDetail } orderNumber = {orderNumber}/>
      </div>
      {/*<UsersToolbar />*/}
      <div className={classes.content}>
        <UsersTable
          users={users}
          orderHistory = { orderHistory }
          handleSelect = { handleSelect }
          getOrderDetail = { getOrderDetail }
        />
      </div>
    </div>
  );
};

export default UserList;
