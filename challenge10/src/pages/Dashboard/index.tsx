import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [foods, setFoods] = useState<IFoodPlate[]>([]);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const { data } = await api.get('/foods');
      setFoods(data);
    }

    loadFoods();
  }, []);

  async function handleAddFood({
    name,
    image,
    description,
    price,
  }: Omit<IFoodPlate, 'id' | 'available'>): Promise<void> {
    try {
      const food: IFoodPlate = {
        name,
        image,
        description,
        price,
        id: foods.length + 1,
        available: true,
      };
      setFoods([food, ...foods]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood({
    name,
    description,
    image,
    price,
  }: Omit<IFoodPlate, 'id' | 'available'>): Promise<void> {
    const foodsDoesntEdited = foods.filter(food => food.id !== editingFood.id);

    const food: IFoodPlate = {
      name,
      description,
      image,
      price,
      id: editingFood.id,
      available: editingFood.available,
    };

    setFoods([food, ...foodsDoesntEdited]);
  }

  async function handleDeleteFood(id: number): Promise<void> {
    const foodsDoesntDeleted = foods.filter(food => food.id !== id);
    setFoods(foodsDoesntDeleted);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    toggleEditModal();
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
