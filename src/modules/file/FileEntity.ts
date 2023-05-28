import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../lib/BaseEntity";

@Entity({ name: "files" })
export class FileEntity extends BaseEntity {
  @Column({ name: "file_name", type: "varchar" })
  file_name!: string;

  @Column({ name: "file_extension", type: "varchar" })
  file_extension!: string;

  @Column({ name: "mime_type", type: "varchar" })
  mime_type!: string;

  @Column({ name: "size", type: "int" })
  size!: number;
}
