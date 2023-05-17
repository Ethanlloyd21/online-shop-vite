import CartItem from "./CartItem";
import { Button, Divider } from "@aws-amplify/ui-react";
import { CartItemProps } from "../../state/typeofCarts";
import "../../assets/css/cart.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { clearCart } from "../../redux/features/cart/cartSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  console.log(cartItems);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <>
      <section className="cart">
        <header>
          <h2>your bag</h2>
        </header>
        <div>
          {cartItems.map((item: CartItemProps) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>

        <footer>
          <Divider orientation="horizontal" />
          <div className="cart-total">
            <h4>
              total
              <div>
                <span>${total.toFixed(2)} </span>{" "}
                {cartItems.length ? (
                  <Button variation="link">Checkout</Button>
                ) : null}
              </div>
            </h4>
          </div>
          {cartItems.length ? (
            <Button
              variation="warning"
                onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          ) : null}
        </footer>
      </section>
    </>
  );
};

export default CartContainer;
