import { Theme } from "./theme.mjs";
import { DeferredTask } from "./DeferredTask.mjs";

// TODO:
export class Settings {
  constructor(userSettings) {
    window.THEME = new Theme(userSettings);
  }

  exists(setting) {
    // if the setting can exist
  }

  has(setting) {
    // if the setting is defined
  }

  get(setting) {
    // the current value
  }

  set(setting, value) {}

  updateSettings(args) {
    if (!CURRENT_USER?.id) {
      return;
    }

    if (!this.updateTask) {
      this.updateTask = new DeferredTask(
        (callbackArgs) => {
          return fetch(UPDATE_USER_SETTINGS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(callbackArgs),
            keepalive: true,
          });
        },
        1000,
        { finalizeBeforeUnload: true },
      );
    }
    this.updateTask.arm(args);
  }
}
