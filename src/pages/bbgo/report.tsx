
import { Grid, RowData, InputEditor } from "@visualjs/grid";
import "@visualjs/grid/dist/style.css";
import "@visualjs/grid/dist/themes/default.css";
import React from 'react';
import {useRef} from 'react';
import molecule from '@pmker/molecule';
import styled from "styled-components";
import './style.css';
import API from "../../api";

const CreateDataSource = styled.div`
  width: 100%;
  height:500px;

`


export class Report extends React.Component {

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
        const res = await API.getReport();

        this.setState({
            data: res.report || []
        });


    }

    componentDidMount() {
        this.fetchData();

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

export default Report;

