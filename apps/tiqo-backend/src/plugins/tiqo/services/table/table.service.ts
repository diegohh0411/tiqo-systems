import { Injectable, NotFoundException } from "@nestjs/common";
import { Logger, RequestContext, TransactionalConnection } from "@vendure/core";
import {
  CreateTableDto,
  DeleteTableDto,
  FindOneOrCreateItDto,
  ReadTableDto,
  UpdateTableDto,
} from "./table.dto";
import { Table } from "../../entities/table.entity";
import { Debug, DebugAction } from "../../debug.logging";

@Injectable()
export class TableService {
  constructor(private connection: TransactionalConnection) { }
  private loggerCtx = "TableService";

  repository(ctx: RequestContext) {
    return this.connection.getRepository(ctx, Table);
  }

  async createTable(ctx: RequestContext, dto: CreateTableDto) {
    const repository = this.repository(ctx);
    const newTable = repository.create({
      name: dto.name,
      extId: dto.extId,
      channels: [ctx.channel],
    });

    return await repository.save(newTable);
  }

  async readTable(ctx: RequestContext, dto: ReadTableDto) {
    Debug(
      DebugAction.EXECUTING,
      `function 'readTable' with dto: ${JSON.stringify(dto)}`,
      this.loggerCtx,
    );

    const repository = this.repository(ctx);

    const table = await repository.findOne({ where: { id: dto.id } });
    if (!table) {
      throw new NotFoundException("Table not found");
    }

    return table;
  }

  async readTables(ctx: RequestContext) {
    Logger.debug(
      `Executing readTables, for channel ${ctx.channel.code}`,
      this.loggerCtx,
    );

    const repository = this.repository(ctx);
    const tables = await repository.find({
      relations: ["orders"],
    });
    return tables;
  }

  async updateTable(ctx: RequestContext, dto: UpdateTableDto) {
    const repository = this.repository(ctx);

    const existingTable = await this.readTable(ctx, dto);

    return repository.save(
      repository.create({
        ...existingTable,
        ...dto,
      }),
    );
  }

  async deleteTable(ctx: RequestContext, dto: DeleteTableDto) {
    const repository = this.repository(ctx);

    const existingTable = await this.readTable(ctx, dto);

    await repository.softRemove(existingTable);
    return existingTable;
  }

  async findOneOrCreateIt(ctx: RequestContext, args: FindOneOrCreateItDto) {
    Debug(
      DebugAction.EXECUTING,
      `function 'findOneOrCreateIt' with args: ${JSON.stringify(args)}`,
      this.loggerCtx,
    )

    const repository = this.repository(ctx);

    const existingTable = await repository.findOne({
      where: {
        extId: args.extId
      },
    });

    if (existingTable) {
      Debug(
        DebugAction.FOUND,
        `table with extId ${args.extId}`,
        this.loggerCtx,
      );
      return existingTable;
    }

    Debug(
      DebugAction.DIDNT_FIND,
      `table with extId ${args.extId}, creating it`,
      this.loggerCtx,
    );
    return await this.createTable(ctx, {
      extId: args.extId,
      name: args.name || "Mesa sin nombre",
    });
  }

  async save(ctx: RequestContext, args: Table) {
    return this.repository(ctx).save(args);
  }
}
