import { Coffee } from './coffee.entity';

export class Flavor {
  id: number;
  name: string;
  coffees: Coffee[];
}
