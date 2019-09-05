import API, { graphqlOperation } from "@aws-amplify/api";
import { EditorStoreProvider } from "@kartikrao/lib-forms";
import { createFormStore, EmptyForm, Factory, IFormProps } from "@kartikrao/lib-forms-core";
import "@kartikrao/lib-forms/lib/forms.editors.m.css";
import { Layout } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import AddFormVersionView from "./AddFormVersionView";


export interface ICanvasViewProps {
    mode: string,
    formId: string
}
const Canvas = React.lazy(() => import(/* webpackChunkName: "app-canvas" */ "@kartikrao/lib-forms/lib/components/canvas/Canvas").then((module) => {return {default: module.Canvas}}));

export const CanvasView : React.FC<RouteComponentProps<ICanvasViewProps>> = ({match}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    console.log("Canvas Params", match.params);
    const localStore = useLocalStore(() => ({
        formId: match.params.formId as string,
        form: {
            formData: null as IFormProps
        } as any,
        errors: null as any,
        showCanvas: false as boolean,
        formStore: createFormStore(),
        showAddVersion: false,
        onSaveComplete : function(response) {
            console.log("onSave Complete", response);
            localStore.showAddVersion = false;
        },
        onCancel: function() {

        }
    }));

    React.useEffect(() => {
        localStore.showCanvas = false;
        let fetch = async function () {
            try {
                store.view.showLoading();
                let response = await API.graphql(graphqlOperation(queries.getForm, {formId: match.params.formId}));
                let form = response['data']['getForm'];
                let parsed  = {
                    ...form,
                    formData : form.version && form.version.formData ? JSON.parse(form.version.formData) : {...EmptyForm}
                }
                window["parsed"] = parsed;
                console.log("Got formdata", parsed);
                localStore.form = parsed;
                localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.form.formData))
                store.view.hideLoading();
                localStore.showCanvas = true;
            } catch (error) {
                this.errors = error;
            }
        };

        if(match.params.mode == "edit") {
            fetch();
        } else {
            localStore.form.formData = {...EmptyForm}
            localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.form.formData));
            localStore.showCanvas = true;
        }
    }, []);

    return useObserver(() => {
        return <><Layout style={{height: '100%', overflow: 'hidden'}}>
        {localStore.showCanvas && <EditorStoreProvider formStore={localStore.formStore}>
            <React.Suspense fallback="Loading...">
                <Canvas onSave={() => {localStore.showAddVersion = true}}/>
            </React.Suspense>
        </EditorStoreProvider>
        }
        </Layout>
        {localStore.showAddVersion && <AddFormVersionView formId={localStore.formId} tenant={localStore.form.accountId} formData={localStore.formStore.form.asPlainObject} onSave={localStore.onSaveComplete} onCancel={localStore.onCancel}/>}
        </>
    });
}