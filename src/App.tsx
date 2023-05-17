import { useEffect } from "react";
import {
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import "./App.css";
import { calculateTotals } from './redux/features/cart/cartSlice';
import { getCartItems } from './redux/features/store/storeSlice';
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Navigation from "./screens/Navigation";

function App() {
  console.log(
    useAppSelector((store) => {
      console.log(store);
    })
  );
  const colorMode = "dark";
  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  const { cartItems } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCartItems());
  },[dispatch]);


  return (
    <>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
