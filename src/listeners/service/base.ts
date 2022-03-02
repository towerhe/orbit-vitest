import { RecordIdentity, UninitializedRecord } from "@orbit/records";
import { MessagePlugin } from "tdesign-vue-next";

interface IServiceListener {
  beforeQuery(): void;
  afterQuery(): void;
  failedQuery(e: Error): void;
  beforeCreate(record: UninitializedRecord): void;
  afterCreate(record: RecordIdentity): void;
  failedCreate(record: RecordIdentity, e: Error): void;
  beforeUpdate(record: RecordIdentity): void;
  afterUpdate(record: RecordIdentity): void;
  failedUpdate(record: RecordIdentity, e: Error): void;
  beforeDestroy(record: RecordIdentity): void;
  afterDestroy(record: RecordIdentity): void;
  failedDestroy(record: RecordIdentity, e: Error): void;
}

class DefaultServiceListener implements IServiceListener {
  beforeQuery(): void {
    console.log(...arguments);
  }
  afterQuery(): void {
    console.log(...arguments);
  }
  failedQuery(e: Error): void {
    console.log(e);
  }
  beforeCreate(record: UninitializedRecord): void {
    console.log(record);
  }
  afterCreate(record: RecordIdentity): void {
    MessagePlugin.success("创建成功！");
    console.log(record);
  }
  failedCreate(record: RecordIdentity, e: Error): void {
    MessagePlugin.error("创建失败！");
    console.log(record, e);
  }
  beforeUpdate(record: RecordIdentity): void {
    console.log(record);
  }
  afterUpdate(record: RecordIdentity): void {
    MessagePlugin.success("更新成功！");
    console.log(record);
  }
  failedUpdate(record: RecordIdentity, e: Error): void {
    MessagePlugin.error("更新失败！");
    console.log(record, e);
  }
  beforeDestroy(record: RecordIdentity): void {
    console.log(record);
  }
  afterDestroy(record: RecordIdentity): void {
    MessagePlugin.success("删除成功！");
    console.log(record);
  }
  failedDestroy(record: RecordIdentity, e: Error): void {
    MessagePlugin.error("删除失败！");
    console.log(record, e);
  }
}

export {
  IServiceListener, DefaultServiceListener
}
