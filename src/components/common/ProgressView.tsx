import * as React from "react";
import {Progress} from "antd";

export interface ProgressViewProps {
    show: boolean;
    message: string;
    percent : number;
    width? : number;
    type: "line" | "circle"
    status : "exception" | "success" | "normal" | "active";
    showInfo? : boolean;
}
export const ProgressView : React.FC<ProgressViewProps> = (props: ProgressViewProps) => {
    return <span>
        {props.show && <>
            <small style={{marginRight: "5px"}}>{props.message || ""}</small>
            <Progress type={props.type} percent={props.percent} size="small" status={props.status} showInfo={!!props.showInfo ? props.showInfo : false} style={{width: props.width ? props.width : 150}}/>
            </>
        }
    </span>
}