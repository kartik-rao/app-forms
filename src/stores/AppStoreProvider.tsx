import * as React from "react";
import { AppStoreType, createAppStore } from "./AppStore";

export const appStoreContext = React.createContext<AppStoreType | null>(null);

export interface AppStoreProviderProps {
  store? : AppStoreType;
}

export const AppStoreProvider: React.FC<AppStoreProviderProps> = ({store, children}) => {

    if(!store) {
      store = createAppStore();
    }
    return (
      <appStoreContext.Provider value={store}>
        {children}
      </appStoreContext.Provider>
    )
}