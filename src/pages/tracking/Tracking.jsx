import "./Tracking.css";
import { Header } from "../../Components/Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";


export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);




  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }


  const isPrepared = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;




  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/tracking-favicon.png " />
      <Header cart={cart} />

      <div class="tracking-page">
        <div class="order-tracking">
          <Link to="/orders" class="back-to-orders-link link-primary">
            View all orders
          </Link>

          <div class="delivery-date">
             
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div class="product-info">
            {orderProduct.product.name}        </div>

          <div class="product-info">
            Quantity: {orderProduct.quantity}        </div>

          <img class="product-image" src={orderProduct.product.image} />

          <div class="progress-labels-container">
            <div class={`progress-label ${isPrepared ? 'current-status' : ''}`}>
              Preparing
            </div>
            <div class={`progress-label ${isShipped ? 'current-status' : ''}`}>
              Shipped
            </div>
            <div class={`progress-label ${isDelivered ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div className="progress-bar"></div>
            <div className="progress-bar" style={{
              width: `${deliveryPercent}%`
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
}