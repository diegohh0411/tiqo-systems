import { ID } from "@vendure/core";

export interface CreateTableDto {
  extName: string;
  extId?: string;
}

export interface ReadTableDto {
  id: ID;
}

export interface UpdateTableDto {
  id: ID;

  name: string;
}

export interface DeleteTableDto {
  id: ID;
}

export interface FindOneOrCreateItDto {
  extName: string | null;
  extId: string;
}
