import * as React from "react";
import { createAuthStore } from "./AuthStore";
import { useLocalStore } from "mobx-react";
import { createRouterStore } from "./RouterStore";
export const appStoreContext = React.createContext(null);
export const AuthStoreProvider = ({ children }) => {
    const store = {
        auth: useLocalStore(createAuthStore),
        router: useLocalStore(createRouterStore)
    };
    return (React.createElement(appStoreContext.Provider, { value: store }, children));
};
//# sourceMappingURL=AppStoreProvider.js.map