import { IServiceListener } from "@/listeners/service/base";
import { MenuItem } from "@/model";
import MemoryService from "./memory";

export default class MenuItemService extends MemoryService {
  constructor(listeners?: Array<IServiceListener>) {
    super("menuItem", listeners);
  }

  query(): Promise<MenuItem[]> {
    return super
      .source()
      .query((q) => q.findRecords("menuItem"));
  }

}
