import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
  Image,
  Loader,
  Rating,
  // StepperField,
  Text,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { addtoCart } from "../../redux/features/cart/cartSlice";

export default function Home() {
  const { storeInventory, isLoading } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  
  // const [currentPainting, setCurrentPainting] = useState(storeInventory && !isLoading ? storeInventory[0] : undefined);
  const [currentPainting, setCurrentPainting] = useState({
    avgRating: 0,
    src: "",
    title: "",
    artist: "",
    reviews: 0,
    price: 0,
    description: "",
    inStock: false,
    bestSeller: false,
    isNew: false,
    limitedSupply: false,
    amount: 0
  });
  const [image, setImage] = useState(currentPainting.src);

  useEffect(() => {
    if (!isLoading && storeInventory && storeInventory.length > 1) {
      setCurrentPainting(storeInventory[0]);
      setImage(storeInventory[0].src);
    }
  }, [storeInventory, isLoading]);

  if (isLoading && storeInventory.length <= 1) {
    return <div className="center-home"><Loader size="large"/></div>;
  }

  return (
    <div className="center-home">
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <>
          <View
            width="100%"
            maxWidth="50rem"
            padding={{ base: 0, large: "2rem" }}
          >
            <Card variation="outlined">
              <Flex
                direction={{ base: "column", large: "row" }}
                justifyContent="space-evenly"
              >
                <Flex direction="column" gap="5rem" alignItems="center">
                  <View width="15rem" height="19rem">
                    <Image
                      src={image}
                      alt={`${currentPainting.title} abstract painting`}
                      width="100%"
                      height="21rem"
                    />
                  </View>
                  <Collection
                    type="grid"
                    items={Array.isArray(storeInventory) ? storeInventory : []}
                    templateColumns="1fr 1fr 1fr 1fr"
                    templateRows="1fr 1fr"
                    width="14rem"
                  >
                    {(item: any, index) => (
                      <Flex
                        width="100%"
                        onMouseOver={() => setImage(item.src)}
                        onMouseLeave={() =>
                          setImage(currentPainting ? currentPainting.src : "")
                        }
                        key={index}
                        justifyContent="center"
                      >
                        <Image
                          src={item.src}
                          alt={`${item.title} abstract painting`}
                          width="2rem"
                          height="2.5rem"
                          onClick={() => setCurrentPainting(item)}
                          borderRadius="5px"
                          padding="3px"
                          marginBottom="1rem"
                          style={{
                            cursor: "pointer",
                            ...(currentPainting.src === item.src && {
                              border: "1px solid #e77600",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 8px",
                            }),
                          }}
                        />
                      </Flex>
                    )}
                  </Collection>
                </Flex>
                <Flex direction="column" justifyContent="space-between">
                  <Flex direction="column" gap="0.7rem">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Heading level={3}>
                        {currentPainting ? currentPainting.title : ""}
                      </Heading>
                      <Flex height="1.8rem">
                        {currentPainting && currentPainting.bestSeller ? (
                          <Badge variation="success">Bestseller</Badge>
                        ) : null}
                        {currentPainting && currentPainting.isNew ? (
                          <Badge variation="info">New</Badge>
                        ) : null}
                        {currentPainting && currentPainting.limitedSupply ? (
                          <Badge variation="warning">Limited supply</Badge>
                        ) : null}
                      </Flex>
                    </Flex>
                    <Text fontWeight="bold">
                      {currentPainting && currentPainting.artist}
                    </Text>
                    <Flex
                      direction={{ base: "column", large: "row" }}
                      alignItems="baseline"
                    >
                      <Rating
                        value={currentPainting.avgRating}
                        fillColor="#f4a41d"
                      ></Rating>
                      <Text fontSize="small" fontWeight="lighter">
                        {currentPainting.reviews} reviews
                      </Text>
                    </Flex>
                    <Divider />
                    <Flex alignItems="baseline">
                      <Text fontSize="medium" fontWeight="bold">
                        Price:
                      </Text>
                      <Text fontSize="large" color="#B12704" fontWeight="bold">
                        ${currentPainting.price} USD
                      </Text>
                    </Flex>
                    <Text fontSize="small" paddingBottom="1rem">
                      {currentPainting.description}
                    </Text>

                    {!currentPainting.inStock ? (
                      <Alert variation="error">Out of stock!</Alert>
                    ) : null}
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={{ base: "column", large: "row" }}
                  >
                    <Text variation="success" as="span">
                      {
                        currentPainting.limitedSupply ? "Online only!" : "Available in store!"
                      }
                    </Text>
                    <Button
                      variation="primary"
                      onClick={() => dispatch(addtoCart(currentPainting))}
                      disabled={!currentPainting.inStock}
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </View>
        </>
      </Flex>
    </div>
  );
}
