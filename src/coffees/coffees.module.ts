import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
})
export class CoffeesModule {}