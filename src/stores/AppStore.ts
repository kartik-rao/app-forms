import { useLocalStore } from "mobx-react-lite";
import { createAuthStore } from "./AuthStore";
import { createRouterStore } from "./RouterStore";
import { createViewStore } from "./ViewStore";
import { AppConfig } from "../config";

export const createAppStore = (appConfig: AppConfig) => {
    const store = {
        auth: useLocalStore(createAuthStore),
        view : useLocalStore(createViewStore),
        router: useLocalStore(createRouterStore),
        config : appConfig
    }
    return store;
}

export type AppStoreType = ReturnType<typeof createAppStore>;