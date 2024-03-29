import { observable } from 'mobx';
import { ProgressViewProps } from '../components/common/ProgressView';

let withFirstUpper = function(str: string) : string {
    if(!str) {
        return "";
    }
    return str[0].toUpperCase() + str.substring(1);
}

export const createViewStore = () => {
    const store = {
        currentPath : location.pathname as string,
        loading: {} as ProgressViewProps,
        idNameMap: {} as any,
        debug: location.href.indexOf('localhost') > -1 as boolean,
        inAccountMenuCollapsed: true as boolean,
        get collapseAccountMenu() : boolean {
            return this.inAccountMenuCollapsed;
        },
        toggleAccountMenu: function() {
            this.inAccountMenuCollapsed = !this.inAccountMenuCollapsed;
        },
        setLoading: function(progress: ProgressViewProps) {
            this.loading = progress;
        },
        resetLoading: function() {
            this.loading = {};
        },
        isUUID(str: string) : boolean {
            if(!str) {
                return false;
            } else {
                let matches = str.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/i)
                return matches != null && matches.length > 0;
            }
        },
        get lastPathFragment() : string {
            if (!this.currentPath) {
                return "";
            }
            // remove leading slash
            let path = this.currentPath.substring(1);
            // remove trailing slash
            if(path.lastIndexOf("/") == path.length -1) {
                path = path.substring(0, path.length -1)
            }


            let segments = path.split("/");

            if(segments[0] == "account") {
                // In account pages
                // Account home page
                let parts = path.match(/([\-|\w]+)/gi);

                if (segments.length == 2) {
                    return segments[0];
                } else if(segments.length == 3) {
                    // /forms | /users
                    // let parts = path.match(/(account)\/([\w-]+)\/([\w]+)/)
                    return parts[parts.length - 1];
                } else if(segments.length == 3){
                    // entity detail page
                    // /account/e618b451-9686-4773-9b75-161b768ea763/forms/eef306bd-045d-4b7b-9ad7-07ee1fc744f3
                    return parts[parts.length - 2];
                } else {
                    // canvas
                    // /account/e618b451-9686-4773-9b75-161b768ea763/forms/eef306bd-045d-4b7b-9ad7-07ee1fc744f3/canvas/0460ffd1-f07d-424f-bb1a-c1b608f42ae2
                    return parts[parts.length - 1];
                }
            } else {
                return segments[0];
            }
        },
        get breadcrumb(): string {
            if (!this.currentPath) {
                return "";
            }
            // remove leading slash
            let path = this.currentPath.substring(1);
            // remove trailing slash
            if(path.lastIndexOf("/") == path.length -1) {
                path = path.substring(0, path.length -1)
            }
            let segments : string[] = path.split("/");
            let self = this;
            let translated = segments.map((s: string) => {
                if(this.isUUID(s)) {
                    return self.idNameMap[s] ? self.idNameMap[s] : s;
                } else {
                    return withFirstUpper(s);
                }
            });
            return translated.join(" / ")
        }
    };
    return observable(store);
}

export type ViewStoreType = ReturnType<typeof createViewStore>;