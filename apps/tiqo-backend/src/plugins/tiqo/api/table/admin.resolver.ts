import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Ctx, RequestContext, Transaction } from "@vendure/core";
import {
  CreateTableDto,
  DeleteTableDto,
  ReadTableDto,
  UpdateTableDto,
} from "../../services/table/table.dto";
import { TableService } from "../../services/table/table.service";
import { TransposerService } from "../../services/transposer/transposer.service";

@Resolver()
export class TableAdminResolver {
  constructor(
    private tableService: TableService,
    private transposerService: TransposerService,
  ) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async readTables(@Ctx() ctx: RequestContext) {
    return await this.tableService.readTables(ctx);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async readTable(@Ctx() ctx: RequestContext, @Args() args: ReadTableDto) {
    return await this.tableService.readTable(ctx, args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async createTable(@Ctx() ctx: RequestContext, @Args() args: CreateTableDto) {
    return await this.tableService.createTable(ctx, args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async updateTable(@Ctx() ctx: RequestContext, @Args() args: UpdateTableDto) {
    return await this.tableService.updateTable(ctx, args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async deleteTable(@Ctx() ctx: RequestContext, @Args() args: DeleteTableDto) {
    return await this.tableService.deleteTable(ctx, args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async syncOrders(@Ctx() ctx: RequestContext) {
    return await this.transposerService.syncOrders(ctx);
  }
}
