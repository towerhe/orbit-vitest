import { RecordSchema } from "@orbit/records";

export default new RecordSchema({
  models: {
    menuItem: {
      attributes: {
        path: { type: "string" },
        title: { type: "string" },
        icon: { type: "string" },
        disabled: { type: "boolean" },
        hidden: { type: "boolean" },
      },
      relationships: {
        parent: { kind: "hasOne", type: "menuItem", inverse: "children" },
        children: { kind: "hasMany", type: "menuItem", inverse: "parent" },
      },
    },
  },
});
