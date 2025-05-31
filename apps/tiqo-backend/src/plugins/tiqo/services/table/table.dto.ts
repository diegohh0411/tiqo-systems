import { ID } from "@vendure/core";

export interface CreateTableDto {
  name: string;
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
  name: string | null;
  extId: string;
}
