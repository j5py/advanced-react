import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <HStack>
      <VStack borderRadius="lg" bg="white" color="black" align="left">
        <Image src={imageSrc} borderRadius="lg" />
        <VStack p="5" align="left">
          <Heading as="h2" size='sm'>{title}</Heading>
          <Text opacity="0.6">{description}</Text>
          <Text>
            <button>
              See more <FontAwesomeIcon icon={faArrowRight} size="1x" />
            </button>
          </Text>
        </VStack>        
      </VStack>
    </HStack>
  )
};

export default Card;
