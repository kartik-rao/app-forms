import { Empty } from "antd";
import { useLocalStore } from "mobx-react-lite";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface FormVersionPreviewProps {
    accountId: string;
    formId: string;
    versionId: string;
}

export const FormVersionPreview : React.FC<FormVersionPreviewProps> = (props: FormVersionPreviewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        errors: [] as any[],
        loading: false,
        hasContent: false,
        versionContent:  "<h1>Loading</h1>"
    }));

    const {endpoint} = store.config.envConfig.api.rest;

    React.useEffect(() => {
        
        let fetch = async function () {
            localStore.loading = true;
            try {
                store.view.setLoading({show: true, message: "Loading version html", status: "active", type : "line", percent: 100});
                let response = await store.auth.withSession(`${endpoint}/app/view/${props.formId}/${props.versionId}`, "GET", null, "text/html");
                localStore.versionContent = response;
                localStore.hasContent = true;
            } catch (errorResponse) {
                console.error("queries.getAccount.forms", errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.versionContent || localStore.versionContent.length == 0) {
                localStore.hasContent = false;
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, []);

    let staticPath = "https://dev-static.forms.li";
    let reactEnv = "development";

    return <iframe style={{border: "none", width:"800px", height: "600px"}}>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href={`${staticPath}/vendor~main.vendor~main.chunk.css`} rel="stylesheet"/>
            <link href={`${staticPath}/main.main.chunk.css`} rel="stylesheet"/>
            <div id="root"></div>
            <script src={`${staticPath}/public/react.${reactEnv}.js`}></script>
            <script src={`${staticPath}/public/react-dom.${reactEnv}.js`}></script>
            <script src={`${staticPath}/public/moment.min.js`}></script>
            <script src={`${staticPath}/public/moment-timezone-with-data-2012-2022.min.js`}></script>
            <script src={`${staticPath}/public/antd.min.js`}></script>
            <script src={`${staticPath}/runtime~main.bundle.js`}></script>
            <script src={`${staticPath}/vendor~main.chunk.js`}></script>
            <script src={`${staticPath}/main.chunk.js`}></script>
            <script>
                Forms.renderForm("#root", null, `${localStore.versionContent}`);
            </script>
    </iframe>
}
