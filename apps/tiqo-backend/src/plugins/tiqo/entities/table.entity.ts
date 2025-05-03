import { DeepPartial } from "@vendure/common/lib/shared-types";
import {
  Channel,
  ChannelAware,
  Order,
  SoftDeletable,
  VendureEntity,
} from "@vendure/core";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
} from "typeorm";

import { UnprocessableEntityException } from "@nestjs/common";

@Unique(["extName", "channelsAsString", "deletedAt"]) // This is to prevent the table from being created if it already exists. But still allows a new table to be created with the same name if the previous one was deleted.
@Entity()
export class Table
  extends VendureEntity
  implements ChannelAware, SoftDeletable {
  constructor(input?: DeepPartial<Table>) {
    super(input);
  }

  @Column({
    comment: "The name of the table, used for display purposes.",
    nullable: false,
  })
  extName: string;

  @Column({
    comment: "The key of the table on the external POS system.",
    nullable: true,
  })
  extId: string;

  @OneToMany(() => Order, (order) => order.customFields.placedAt, {
    eager: true,
  })
  orders: Array<Order>;

  @ManyToMany(() => Channel, { eager: true })
  @JoinTable()
  channels: Channel[];

  @Column({
    comment:
      "The channels of the table, serialized to a string, to enforce uniqueness.",
  })
  channelsAsString: string;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Validation checks

  @BeforeInsert()
  @BeforeUpdate()
  validateName() {
    if (!this.extName) {
      throw new UnprocessableEntityException(
        "The `name` property must never be empty.",
      );
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  serializeChannels() {
    this.channelsAsString = JSON.stringify(
      this.channels.map((channel) => channel.id),
    );
  }
}
