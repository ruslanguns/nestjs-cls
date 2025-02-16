import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ClsMiddleware, ClsModule } from '../../src';
import { ItemModule } from './item/item.module';

@Module({
    imports: [
        ClsModule.register({ global: true }),
        ItemModule,
        GraphQLModule.forRoot({
            autoSchemaFile: __dirname + 'schema.gql',
        }),
    ],
})
export class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        new ClsMiddleware({
            useEnterWith: true,
            generateId: true,
            idGenerator: () => {
                return Math.random().toString(36).slice(-8);
            },
        }).use,
    );
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
