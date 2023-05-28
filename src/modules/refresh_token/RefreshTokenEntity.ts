import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../lib/BaseEntity";
import { UserEntity } from "../../modules/user/UserEntity";
import { AppDataSource } from "../../config/typeormconfig";

@Entity({ name: "refresh_tokens" })
export class RefreshTokenEntity extends BaseEntity {
  @OneToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ name: "token",type:"varchar" })
  token!: string;
}

// export const RefreshTokenRepository = AppDataSource.getRepository(RefreshTokenEntity);
