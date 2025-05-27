import { Logger } from "@vendure/core";

export enum DebugAction {
  CREATING = "Creating",
  SAVED = "SAVED",
  UPDATING = "Updating",
  EXECUTING = "Executing",
  EXITING = "Exiting",
  ENDING_FUNCTION = "Ending function",
  RESOLVING = "Resolving",

  DIDNT_FIND = "Did not find",
  FOUND = "Found",
  CALCULATING = "Calculating",
  CALCULATED = "Calculated",
}

export const Debug = (
  debugAction: DebugAction,
  message: string,
  loggerCtx: string,
) => {
  Logger.debug(`${debugAction} ${message}`, loggerCtx);
};
