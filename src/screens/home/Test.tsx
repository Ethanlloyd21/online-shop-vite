import { useState } from 'react';
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
  Rating,
  StepperField,
  Text,
  View,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { PAINTINGS } from './paintings';

export default function Test() {
  const [currentPainting, setCurrentPainting] = useState(PAINTINGS[0]);
  const [image, setImage] = useState(PAINTINGS[0].src);
  const [quantity, setQuantity] = useState(1);
 
  


  return (
    <View width="100%" maxWidth="50rem" padding={{ base: 0, large: '2rem' }}>
      <Card variation="outlined">
        <Flex
          direction={{ base: 'column', large: 'row' }}
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
              items={PAINTINGS}
              templateColumns="1fr 1fr 1fr 1fr"
              templateRows="1fr 1fr"
              width="14rem"
            >
              {(item, index) => (
                <Flex
                  width="100%"
                  onMouseOver={() => setImage(item.src)}
                  onMouseLeave={() => setImage(currentPainting.src)}
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
                      cursor: 'pointer',
                      ...(currentPainting.src === item.src && {
                        border: '1px solid #e77600',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 8px',
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
                <Heading level={3}>{currentPainting.title}</Heading>
                <Flex height="1.8rem">
                  {currentPainting.bestSeller ? (
                    <Badge variation="success">Bestseller</Badge>
                  ) : null}
                  {currentPainting.isNew ? (
                    <Badge variation="info">New</Badge>
                  ) : null}
                  {currentPainting.limitedSupply ? (
                    <Badge variation="warning">Limited supply</Badge>
                  ) : null}
                </Flex>
              </Flex>
              <Text fontWeight="bold">{currentPainting.artist}</Text>
              <Flex
                direction={{ base: 'column', large: 'row' }}
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
                  {currentPainting.price}
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
              direction={{ base: 'column', large: 'row' }}
            >
              <Flex alignItems="center" gap="5px">
                <Text>Qty:</Text>
                <StepperField
                  label="Quantity"
                  value={quantity}
                  onStepChange={setQuantity}
                  min={0}
                  max={10}
                  step={1}
                  labelHidden
                  width="10rem"
                  isDisabled={!currentPainting.inStock}
                />
              </Flex>
              <Button
                variation="primary"
                // onClick={handleAddToCart}
                disabled={!currentPainting.inStock || !quantity}
              >
                Add to Cart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
}