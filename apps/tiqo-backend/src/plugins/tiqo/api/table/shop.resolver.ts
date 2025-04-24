import { Args, Query, Resolver } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";
import { ReadTableDto } from "../../services/table/table.dto";
import { TableService } from "../../services/table/table.service";

@Resolver()
export class TableShopResolver {
  constructor(private tableService: TableService) {}

  @Query()
  async readTable(@Ctx() ctx: RequestContext, @Args() args: ReadTableDto) {
    return this.tableService.readTable(ctx, args);
  }

  @Query()
  async readTables(@Ctx() ctx: RequestContext) {
    return this.tableService.readTables(ctx);
  }
}
