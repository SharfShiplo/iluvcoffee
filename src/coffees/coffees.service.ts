import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  private notFound(id: string) {
    throw new NotFoundException(`Could not find ${id} coffee`);
  }

  async findAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    // const coffee = await this.coffeeRepository.findOneBy({
    //   id: parseInt(id, 10),
    // });
    const coffee = await this.coffeeRepository.findOne({
      relations: ['flavors'],
    });
    if (!coffee) {
      this.notFound(id);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      this.notFound(id);
    }
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({
      id: parseInt(id, 10),
    });
    if (!coffee) {
      this.notFound(id);
    }
    return this.coffeeRepository.remove(coffee);
  }
}
