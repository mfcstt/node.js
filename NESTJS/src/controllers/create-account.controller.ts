import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import z from "zod";


const createAccountSchema = {
  name: z.string(),
  email: z.email(),
  password: z.string().min(6)
}

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService){}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(z.object(createAccountSchema)))
  async createAccount(@Body() body: any){
    const { name, email, password } = body;

    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if(emailAlreadyExists){
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });


  }
}