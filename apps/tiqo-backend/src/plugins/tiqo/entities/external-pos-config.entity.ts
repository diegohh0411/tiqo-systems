import {
  Channel,
  DeepPartial,
  SoftDeletable,
  VendureEntity,
} from "@vendure/core";
import { Column, DeleteDateColumn, Entity, OneToOne } from "typeorm";

export enum ChannelPosProvider {
  NONE = "NONE",
  PARROT = "PARROT_POS",
}

@Entity()
export class ExternalPosConfig extends VendureEntity implements SoftDeletable {
  constructor(input?: DeepPartial<ExternalPosConfig>) {
    super(input);
  }

  @Column()
  posProvider: ChannelPosProvider;

  @Column({
    nullable: true,
  })
  bearerToken: string;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => Channel, (channel) => channel.customFields.externalPosConfig)
  channel: Channel;
}
