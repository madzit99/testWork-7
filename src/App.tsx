import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Order } from './types';
import FoodComponent from './Components/FoodComponent';
import FOOD from './Constant';
import OrderComponent from './Components/OrderComponent';


const  App = () => {
 const [orders, setOrders] = useState<Order[]>([]);
 
 const addOrder = (name: string) => {
  setOrders((prevState) => {
    const orderExist = prevState.find((order) => order.name === name);
    if (orderExist) {
      return prevState.map((order) => order.name === name ? {...order, count: order.count + 1} : order);
    } else {
      return [...prevState, {name: name, count: 1}];
    };
  });
 };

 const deleteOrder = (name: string) => {
    setOrders((prevState) => {
      const newState = prevState.filter((order) => order.name !== name);
      return newState;
    });
  };


  const findCost = (name: string, count: number): number => {
    const foodInfo = FOOD.find((item) => item.name === name);
    if (foodInfo) {
      const cost = foodInfo?.cost * count;
      return cost;
    } else {
      throw new Error("Ошибка!");
    }
  };



  return (
    <div className='container'>
      <div className="row">
        <div className="col mt-4">
           <h4 className="bg-white p-3 rounded-5">Ваш заказ</h4>
           <div className="orders bg-white p-3 rounded-5">
            {orders.length === 0 ? (
              <span className='fs-3'>
              Заказ пуст! <br />
              Пожалуйста, добавьте несколько позиций!
            </span>
              ) : (
                orders.map((order) => (
                  <OrderComponent name={order.name} count={order.count} func={() => findCost(order.name, order.count)} onDelete={deleteOrder} />
                ))
              )}
           </div>
        </div>
        <div className="col-8 mt-4">
          <h4>Добавить блюдо</h4>
          <div className="row">
            {FOOD.map((food) => (
              <FoodComponent name={food.name} cost={food.cost} img={food.img} onAdd={() => addOrder(food.name)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;
