import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './Utilisateur/utilisateur.module';
import { CommandeModule } from './commande/commande.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ProduitModule } from './produit/produit.module';
import { CategorieModule } from './categorieid/categorieid.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'zD87s9fhsd8fyshdfsdyf@#jksdf908sdjfhsdjf',
      signOptions: { expiresIn: '1s' },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
        type:'mysql',
        host:'127.0.0.1',
        port:3306,
        username:'root',
        password:'faneva130904',
        database:'bddcmada1.0',
        entities:[__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:false,
    }),
    UtilisateurModule,
    CommandeModule,
    MailModule,
    AuthModule,
    ProduitModule,
    CategorieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
