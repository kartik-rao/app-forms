import { EditorStoreProvider } from "@kartikrao/lib-forms";
import { GetForm, IGetFormQuery, IGetFormVersionQuery, GetFormVersion, IQueryGetFormVersionArgs } from "@kartikrao/lib-forms-api";
import { createFormStore, EmptyForm, Factory, IFormProps } from "@kartikrao/lib-forms-core";
import "@kartikrao/lib-forms/lib/forms.editors.m.css";
import { Layout } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";
import SaveFormVersionView from "./SaveFormVersionView";

export interface ICanvasViewProps {
    formId   : string;
    accountId: string;
    versionId?: string;
}

const Canvas = React.lazy(() => import(/* webpackChunkName: "app-canvas" */ "@kartikrao/lib-forms/lib/components/canvas/Canvas").then((module) => {return {default: module.Canvas}}));

export const CanvasView : React.FC<RouteComponentProps<ICanvasViewProps>> = ({match, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        version: null as IGetFormVersionQuery["getFormVersion"],
        formData: null as IFormProps,
        errors: null as any,
        showCanvas: false as boolean,
        formStore: createFormStore(),
        showSaveVersion: false,
        onSaveComplete : function(response) {
            console.log("CanvasView.onSave Complete", response);
            localStore.showSaveVersion = false;
        },
        onCancel: function() {
            localStore.showSaveVersion = false;
        },
        onClose: function() {
            history.push(`/account/${match.params.accountId}/forms/${match.params.formId}`)
        }
    }));

    React.useEffect(() => {
        localStore.showCanvas = false;
        let fetch = async function () {
            try {
                store.view.setLoading({show: true, message: "Loading form data", status: "active", type : "line", percent: 100});
                let response = await withGraphQl<IGetFormVersionQuery>(GetFormVersion, {versionId: match.params.versionId} as IQueryGetFormVersionArgs);
                let version = response.data.getFormVersion;
                store.view.idNameMap[version.id] = version.displayName;
                localStore.version = version;
                localStore.formData = version.formData ? JSON.parse(version.formData) : {...EmptyForm}
                localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.formData))
                store.view.resetLoading();
                localStore.showCanvas = true;
            } catch (error) {
                this.errors = error;
            }
        };
        if(match.params.versionId) {
            fetch();
        } else {
            localStore.formData = EmptyForm
            localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.formData))
            localStore.showCanvas = true;
        }
    }, []);

    return useObserver(() => {
        return <Layout style={{height: '100%', overflow: 'hidden'}}>
        {localStore.showCanvas && <EditorStoreProvider formStore={localStore.formStore}>
            <React.Suspense fallback="Loading...">
                <Canvas onSave={() => {localStore.showSaveVersion = true}} onClose={localStore.onClose}/>
            </React.Suspense>
            {localStore.showSaveVersion && <SaveFormVersionView formId={match.params.formId}
                sourceVersionId={match.params.versionId}
                tenantId={match.params.accountId}
                versionName={localStore.version ? localStore.version.displayName : "New Version"}
                formData={localStore.formStore.form.asPlainObject}
                onSave={localStore.onSaveComplete}
                onCancel={localStore.onCancel}/>}
        </EditorStoreProvider>
        }
        </Layout>
    });
}