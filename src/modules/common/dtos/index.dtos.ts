import { IsUUID } from 'class-validator';

export class UUIDDto {
  @IsUUID('all', { message: 'invalid uuid' })
  uuid: string;
}
