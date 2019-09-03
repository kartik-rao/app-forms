import API, { graphqlOperation } from "@aws-amplify/api";
import { EditorStoreProvider } from "@kartikrao/lib-forms";
import { createFormStore, Factory, EmptyForm, FormStoreType } from "@kartikrao/lib-forms-core";
import { Layout } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { toJS } from "mobx";

export interface ICanvasViewProps {
    mode: string,
    formId?: string
}
const Canvas = React.lazy(() => import(/* webpackChunkName: "app-canvas" */ "@kartikrao/lib-forms/lib/components/canvas/Canvas").then((module) => {return {default: module.Canvas}}));

export const CanvasView : React.FC<ICanvasViewProps> = (props: ICanvasViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        form: {
            formData:{...EmptyForm}
        } as any,
        errors: null as any,
        showCanvas: false as boolean,
        formStore: createFormStore()
    }));

    React.useEffect(() => {
        localStore.showCanvas = false;
        let fetch = async () => {
            try {
                store.view.loading = true;
                let form = await API.graphql(graphqlOperation(queries.getForm, {formId: props.formId}));
                localStore.form = form['data']['getForm'];
                if (!localStore.form.formData) {
                    localStore.form.formData = {...EmptyForm};
                }
                localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.form.formData))
                store.view.loading = false;
                localStore.showCanvas = true;
            } catch (error) {
                this.errors = error;
            }
        };

        if(props.mode == "edit") {
            fetch();
        } else {
            localStore.formStore.setForm(Factory.makeForm(localStore.formStore, localStore.form.formData));
            // localStore.formStore["__id"] = "X12345";
            localStore.showCanvas = true;
            // console.log("In CanvasView", toJS(formStore.form));
        }
    }, [props.formId]);

    return useObserver(() => {
        {
           return <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <React.Suspense fallback="Loading...">
            {localStore.showCanvas && localStore.formStore.form && <EditorStoreProvider formStore={localStore.formStore}>
                     <Canvas />
                </EditorStoreProvider>
            }
            </React.Suspense>
            </Layout>
        }
    })
}