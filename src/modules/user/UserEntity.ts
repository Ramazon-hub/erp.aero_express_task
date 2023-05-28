// import { AppDataSource } from "../../config/typeormconfig";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../lib/BaseEntity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({name:"phone_number", type: "varchar" })
  phone_number!: string;

  @Column({name:"password", type: "varchar" })
  password!: string;
}

// export const UserRepository =  AppDataSource.getRepository(UserEntity);
