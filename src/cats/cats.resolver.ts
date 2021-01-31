import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './input/cats.input';

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
    return this.catsService.create(input);
  }
}
