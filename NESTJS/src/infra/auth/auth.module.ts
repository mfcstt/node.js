import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { createPrivateKey, createPublicKey } from 'node:crypto'
import { Env } from '../env'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256', allowInsecureKeySizes: true },
          privateKey: createPrivateKey({
            key: Buffer.from(privateKey, 'base64'),
            format: 'der',
            type: 'pkcs1',
          }),
          publicKey: createPublicKey({
            key: Buffer.from(publicKey, 'base64'),
            format: 'der',
            type: 'spki',
          }),
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}