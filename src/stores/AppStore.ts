import { useLocalStore } from "mobx-react";
import { createAuthStore } from "./AuthStore";
import { createRouterStore } from "./RouterStore";
import { createViewStore } from "./ViewStore";

export const createAppStore = () => {
    const store = {
        auth: useLocalStore(createAuthStore),
        view : useLocalStore(createViewStore),
        router: useLocalStore(createRouterStore)
    }
    return store;
}

export type AppStoreType = ReturnType<typeof createAppStore>;