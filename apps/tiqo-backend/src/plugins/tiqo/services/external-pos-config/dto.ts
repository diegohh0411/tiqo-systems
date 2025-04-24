import { ID } from "@vendure/common/lib/shared-types";
import { ChannelPosProvider } from "../../entities/external-pos-config.entity";

export interface CreateExternalPosConfigInput {
  posProvider: ChannelPosProvider;
  bearerToken: string;
}

export interface UpdateExternalPosConfigInput {
  id: ID;
  posProvider: ChannelPosProvider;
  bearerToken: string;
}
