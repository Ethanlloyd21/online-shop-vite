import {
  Card,
  Flex,
  Badge,
  StepperField,
  Button,
  Image,
  Text,
} from "@aws-amplify/ui-react";
// import React from "react";
import viteLogo from "/vite.svg";

const Home = () => {
  return (
    <>
      <Card variation="elevated">
        <Flex alignItems="flex-start">
          <Image src={viteLogo} alt="Amplify" width="8rem" />
          <Flex direction="column" gap="xs">
            <Flex>
              <Badge variation="success">New</Badge>
            </Flex>
            <div style={{textAlign: "left"}}>
              <Text fontSize="large" fontWeight="semibold">
                Product title
              </Text>
              <Text color="font.tertiary">Product description</Text>
              <Text fontSize="large" color="secondary">
                $199.99
              </Text>
            </div>
            <Flex>
              <StepperField
                label="Quantity"
                min={0}
                max={10}
                step={1}
                defaultValue={1}
                labelHidden
              />
              <Button variation="primary">Add to cart</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default Home;
