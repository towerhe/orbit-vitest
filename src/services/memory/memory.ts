import { IServiceListener } from "@/listeners/service/base";
import memory from "@/orbit/sources/memory";
import MemorySource from "@orbit/memory";
import {
  FilterParam,
  InitializedRecord,
  RecordIdentity,
  RecordQueryBuilder,
  RecordQueryResult,
  RecordTransformResult,
  UninitializedRecord,
} from "@orbit/records";
import { camelize } from "inflected";
import IService from "../interface";

export default class implements IService {
  private listeners: Array<IServiceListener> = [];

  constructor(type: string, listeners?: Array<IServiceListener>) {
    if (listeners != null) {
      this.listeners = listeners;
    }
  }

  newRecord(
    record: UninitializedRecord
  ): UninitializedRecord | InitializedRecord {
    return {
      type: record.type,
      id: record.id,
      attributes: {},
      relationships: {},
    };
  }

  doQuery(
    type: string,
    pageNumber?: number,
    pageSize?: number,
    filters?: FilterParam<RecordIdentity>,
    id?: string
  ): Promise<RecordQueryResult<InitializedRecord>> {
    return this.run(
      "query",
      () => {
        return this.source().query(this.buildQuery(type, filters), {}, id);
      },
      arguments
    );
  }

  create(
    record: UninitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>> {
    return this.run(
      "create",
      () => this.source().update((t) => t.addRecord(record)),
      record
    );
  }

  load(
    record: RecordIdentity
  ): Promise<RecordTransformResult<InitializedRecord>> {
    return this.run(
      "load",
      () => this.source().query((q) => q.findRecord(record)),
      record
    );
  }

  update(
    record: InitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>> {
    if (record.attributes) {
      delete record.attributes.createdAt;
      delete record.attributes.updatedAt;
    }

    return this.run(
      "update",
      () => this.source().update((t) => t.updateRecord(record)),
      record
    );
  }

  destroy(
    record: RecordIdentity
  ): Promise<RecordTransformResult<InitializedRecord>> {
    return this.run(
      "destroy",
      () => this.source().update((t) => t.removeRecord(record)),
      record
    );
  }

  save(
    record: UninitializedRecord | InitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>> {
    return record.id == null
      ? this.create(record)
      : this.update(record as InitializedRecord);
  }

  source(): MemorySource {
    return memory;
  }

  protected async run(action: string, runnable: () => any, args: any) {
    try {
      this.notify(action, "before", [args]);
      let result = await runnable();
      this.notify(action, "after", [args, result]);

      return result;
    } catch (e) {
      this.source().requestQueue.skip();
      this.notify(action, "failed", [args, e]);
    }
  }

  protected notify(action: string, stage: string, args: Array<any>) {
    let method: string = `${stage}${camelize(action)}`;
    let flatted = args.flat();

    this.listeners.forEach((listener: IServiceListener) =>
      listener[method](...flatted)
    );
  }

  private buildQuery(type: string, filters?: FilterParam<RecordIdentity>) {
    return filters == null
      ? (q: RecordQueryBuilder) => q.findRecords(type)
      : (q: RecordQueryBuilder) => q.findRecords(type).filter(filters);
  }
}
