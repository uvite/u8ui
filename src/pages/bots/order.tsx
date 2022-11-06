
import { Grid, RowData, InputEditor } from "@visualjs/grid";
import "@visualjs/grid/dist/style.css";
import "@visualjs/grid/dist/themes/default.css";
import React from 'react';
import {useRef} from 'react';
import molecule from '@dtinsight/molecule';
import styled from "styled-components";

import API from "../../api";

const CreateDataSource = styled.div`
    width: 100%;
    height:500px;

`


export class GridView extends React.Component {

    state = {
        data: [],
        currentDataSource: undefined
    }

    formRef: React.RefObject<HTMLElement>;

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef();
    }


    reload() {
        this.fetchData();
    }

    async fetchData() {
            const params={
              exchange:"binance",
              symbol:"ETHUSDT"
            }
            const res = await API.getTrade(params);

            this.setState({
                data: res.trades || []
            });
            console.log(this.state.data)
            this.initGrid()

    }
    initGrid(){
        let container: HTMLElement | null;
        container = this.formRef.current;

        const rows: RowData[] = this.state.data;

        // @ts-ignore
        const grid = new Grid( container, {
            rows:rows,
            columns: [
                { field: "gid", headerName: "gid", resizable: true, width: 100 },
                { field: "exchange", headerName: "exchange", resizable: true, width: 100 },
                { field: "side", headerName: "side", resizable: true, width: 100 },
                { field: "isFutures", headerName: "isFutures", resizable: true, width: 100 },
                { field: "orderID", headerName: "orderID", resizable: true, width: 100, flex: 1 }
            ]
        });
    }

    componentDidMount() {
        this.fetchData();
        console.log(this.state.data)
        molecule.event.EventBus.subscribe('addDataSource', () => { this.reload() });


    }



    render() {
        return (
            <CreateDataSource className="dataSource__create">
                 <div ref={this.formRef as React.RefObject<HTMLDivElement>} className="v-grid-default-theme aaa">

                </div>

            </CreateDataSource>
         );
    }
}

export default GridView;

