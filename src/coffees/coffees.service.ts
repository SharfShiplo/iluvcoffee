import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Coffee 01',
      brand: 'Nestle',
      flavors: ['chocolate'],
    },
  ];

  findAll(): any[] {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Could not find ${id} coffee`);
    }

    return coffee;
  }

  create(createCoffeeDto: any): void {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: number, updateCoffeeDto: any): void {
    const coffee = this.findOne(id);
    if (updateCoffeeDto) {
      // update existing coffee
    }
  }

  delete(id: number): void {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id);
    if (coffeeIndex >= -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
