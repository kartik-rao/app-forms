import * as React from 'react';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const Loading : React.FC<any> = () => {
    return <div style={{'textAlign': 'center'}}><Spin indicator={antIcon} /></div>
}