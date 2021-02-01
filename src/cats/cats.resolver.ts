import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './input/cats.input';

const pubSub = new PubSub();
@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'lo con cac hihi';
  }

  @Query(() => [CreateCatDto])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CreateCatDto)
  async createCat(@Args('input') input: CatInput) {
    const newCat = this.catsService.create(input);

    pubSub.publish('catAdded', newCat);
    return newCat;
  }

  @Subscription(() => CreateCatDto, {
    name: 'catAdded',
    resolve: value => value,
  })
  catAdded() {
    return pubSub.asyncIterator('catAdded');
  }
}
