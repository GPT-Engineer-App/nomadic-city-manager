import { useState, useEffect } from "react";
import { Container, VStack, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, IconButton, Box, Heading } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [activeCity, setActiveCity] = useState(null);
  const [newCityName, setNewCityName] = useState("");

  useEffect(() => {
    // Fetch cities from the API
    fetch("https://sheetdb.io/api/v1/your_api_key")
      .then((response) => response.json())
      .then((data) => setCities(data));
  }, []);

  const handleAddCity = () => {
    // Add city to the database
    fetch("https://sheetdb.io/api/v1/your_api_key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCityName }),
    }).then(() => {
      setCities([...cities, { name: newCityName }]);
      onAddClose();
    });
  };

  const handleEditCity = () => {
    // Update city in the database
    fetch(`https://sheetdb.io/api/v1/your_api_key/name/${activeCity.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCityName }),
    }).then(() => {
      const updatedCities = cities.map((city) => (city.name === activeCity.name ? { ...city, name: newCityName } : city));
      setCities(updatedCities);
      onEditClose();
    });
  };

  const handleDeleteCity = () => {
    // Delete city from the database
    fetch(`https://sheetdb.io/api/v1/your_api_key/name/${activeCity.name}`, {
      method: "DELETE",
    }).then(() => {
      const filteredCities = cities.filter((city) => city.name !== activeCity.name);
      setCities(filteredCities);
      onDeleteClose();
    });
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">City Manager</Heading>
        </Box>
        {cities.map((city, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px">
            <Text fontWeight="bold">{city.name}</Text>
            <IconButton
              aria-label="Edit City"
              icon={<FaEdit />}
              onClick={() => {
                setActiveCity(city);
                onEditOpen();
              }}
            />
            <IconButton
              aria-label="Delete City"
              icon={<FaTrash />}
              onClick={() => {
                setActiveCity(city);
                onDeleteOpen();
              }}
            />
          </Box>
        ))}
        <Button leftIcon={<FaPlus />} colorScheme="teal" variant="solid" onClick={onAddOpen}>
          Add City
        </Button>
      </VStack>

      {/* Add City Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new city</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="City name" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddCity}>
              Add City
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit City Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit city</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="City name" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditCity}>
              Update City
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete {activeCity?.name}?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteCity}>
              Delete City
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
