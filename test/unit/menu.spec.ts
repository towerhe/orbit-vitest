import { describe, test, expect } from "vitest";
import { MenuItemService } from "../../src/services/memory";

describe("Menu", () => {
  describe("MenuItem", () => {
    const service = new MenuItemService();

    const item = {
      type: "menuItem",
      attributes: {
        path: "/items",
        name: "items",
        title: "Menu Item 1",
      },
    };

    test("create a menu item", async () => {
      let created = await service.create(item);

      expect(created[0]?.attributes?.title).toEqual("Menu Item 1");
    });

  });
});
