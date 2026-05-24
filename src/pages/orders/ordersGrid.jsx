import { OrderHeader } from "./orderHeader";
import { OrderDetailsGrid } from "./orderDetailGrid";

export function OrdersGrid( {orders , fetchCart} ) {
  return (
    <div className="orders-grid">
              {
                orders.map((order) => {
                  return (
                    <div key={order.id} className="order-container">
    
                     
                      <OrderHeader order={order } />
                      <OrderDetailsGrid order={order} fetchCart={fetchCart} />
                    </div>
                  );
                })
              }
            </div>
  );
}