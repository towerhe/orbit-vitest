import {
  FilterSpecifier,
  InitializedRecord,
  RecordIdentity,
  RecordTransformResult,
  UninitializedRecord
} from "@orbit/records";

export default interface IService {
  newRecord(record: UninitializedRecord): UninitializedRecord | InitializedRecord;

  create(
    record: UninitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>>;

  load(
    record: RecordIdentity
  ): Promise<RecordTransformResult<InitializedRecord>>;

  update(
    record: InitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>>;

  destroy(
    record: RecordIdentity
  ): Promise<RecordTransformResult<InitializedRecord>>;

  save(
    record: UninitializedRecord | InitializedRecord
  ): Promise<RecordTransformResult<InitializedRecord>>;
}
