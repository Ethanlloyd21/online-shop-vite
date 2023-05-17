//Redux-toolkit
import {
  Card,
  Flex,
  View,
  Image,
  Text,
  StepperField,
  Rating,
  Button,
} from "@aws-amplify/ui-react";
import {
  removeItem,
  increase,
  decrease,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { CartItemProps } from "../../state/typeofCarts";
import "../../assets/css/cart.css";

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  src,
  amount,
  reviews,
  artist,
  avgRating,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="center-component">
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          alignContent="flex-start"
          wrap="nowrap"
          gap="1rem"
        >
          <View
            width="100%"
            // maxWidth="150rem"
            padding={{ base: 0, large: "0.5rem" }}
          >
            <Card variation="outlined">
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                alignContent="space-between"
                wrap="nowrap"
                gap="1rem"
              >
                <Flex alignItems="flex-start">
                  <Image src={src} alt={title} width="8rem" />

                  <Flex direction="column" gap="xs">
                    <Text fontSize="large" fontWeight="semibold">
                      {title}
                    </Text>
                    <Text fontWeight="bold">{artist}</Text>
                    <Flex
                      direction={{ base: "column", large: "row" }}
                      alignItems="baseline"
                    >
                      <Rating value={avgRating} fillColor="#f4a41d"></Rating>
                      <Text fontSize="small" fontWeight="lighter">
                        {reviews} reviews
                      </Text>
                    </Flex>

                    <Flex>
                      <StepperField
                        label="Quantity"
                        min={0}
                        max={10}
                        step={1}
                        defaultValue={amount}
                        labelHidden
                        onIncrease={() => {
                          dispatch(increase({ id }));
                        }}
                        onDecrease={() => {
                          if (amount === 1) {
                            dispatch(removeItem(id));
                            return;
                          }
                          dispatch(decrease({ id }));
                        }}
                      />
                    </Flex>
                    <Flex>
                      <Button
                        variation="link"
                        onClick={() => {
                          dispatch(removeItem(id));
                        }}
                      >
                        remove
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alignItems="flex-end">
                  <Text>{amount} x</Text>
                  <Text color="secondary">${price}</Text>
                </Flex>
              </Flex>
            </Card>
          </View>
        </Flex>
      </div>
    </>
  );
};
export default CartItem;
