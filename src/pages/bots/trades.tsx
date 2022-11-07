/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {useMemo, useState,useEffect} from 'react';

import {ActionBar, Menu, useContextView} from '@dtinsight/molecule/esm/components';
//
// import { Grid, RowData, InputEditor } from "@visualjs/grid";
// import "@visualjs/grid/dist/style.css";
// import "@visualjs/grid/dist/themes/default.css";

import {connect} from '@dtinsight/molecule/esm/react';
import {tradeService} from '@/services';

import type {IDataSourceProps, IPnlProps} from '@/interface';
import type {IDataSourceState} from '@/services/tradeService';
//import './index.scss';


import styled from "styled-components";


import React, { useRef } from 'react';
import { Table, Avatar, Button } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';

const CreateDataSource = styled.div`
    width: 100%;
    height:100%;
    background-color: white;
   overflow: scroll;

`


const columns = [
  {
    title: 'gid',
    dataIndex: 'gid',
    width: 100,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }

   },
  {
    title: 'orderID',
    dataIndex: 'orderID',
    width: 200,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }
  },
   {
    title: 'symbol',
    dataIndex: 'symbol',
    width: 150,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }
  },
  {
    title: 'quantity',
    dataIndex: 'quantity',
    width: 150,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }
  },
 {
    title: 'price',
    dataIndex: 'price',
    width: 150,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }
  },

  {
    title: 'side',
    dataIndex: 'side',
    width: 150,
    Resizable:true,
    render: (text, record, index) => {
      return <div>{text}</div>;
    }
  },

  {
    title: '更新日期',
    dataIndex: 'tradedAt',
    Resizable:true,
    width: 150,
    sorter: (a, b) => (a.tradedAt - b.tradedAt > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const DataSourceView = ({dataSource}: IDataSourceState) => {
  const [data, setData] = useState([]);
  let virtualizedListRef = useRef();
  const scroll = { y: '100%', x: 900 };
  const style = { width: '100%',height:'100%', margin: '0 auto' };
  const handleRow = (record, index) => {
    // 给偶数行设置斑马纹
    if (record.side === "BUY") {
      return {
        style: {
          background: 'rgba(var(--semi-indigo-3), 1)',
        },
      };
    } else {
      return {};
    }
  };
  return (
    <CreateDataSource>
       <Table
        pagination={false}
        onRow={handleRow}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        style={style}
        virtualized
        getVirtualizedListRef={ref => (virtualizedListRef = ref)}
      />
    </CreateDataSource>
  );

  // const formRef = useRef<HTMLElement>(null);
  //
  // const rows: RowData[] = Object.assign({}, dataSource)
  // // for (let i = 0; i < dataSource.length; i++) {
  // //
  // //
  // //   const rowData: RowData =   dataSource[i] ;
  // //
  // //   rows.push(rowData);
  // // }
  //
  // const initGrid = () => {
  //   let container: HTMLElement | null;
  //   // eslint-disable-next-line prefer-const
  //   container =  formRef.current;
  //
  //
  //  // console.log(rows)
  //   // @ts-ignore
  //   const grid = new Grid( container, {
  //     rows:rows,
  //     columns: [
  //       { field: "gid", headerName: "gid", resizable: true, width: 100 },
  //       { field: "exchange", headerName: "exchange", resizable: true, width: 100 },
  //       { field: "side", headerName: "side", resizable: true, width: 100 },
  //       { field: "isFutures", headerName: "isFutures", resizable: true, width: 100 },
  //       { field: "orderID", headerName: "orderID", resizable: true, width: 100, flex: 1 }
  //     ]
  //   });
  // }
  //  initGrid()
  //
  // return (
  //   <CreateDataSource className="dataSource__create">
  //     <div ref={formRef as React.RefObject<HTMLDivElement>} className="v-grid-default-theme grid" >
  //
  //     </div>
  //
  //   </CreateDataSource>
  //
  // );
};

export default connect(tradeService, DataSourceView);
