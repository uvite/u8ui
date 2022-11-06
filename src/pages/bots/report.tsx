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

import {useMemo, useState} from 'react';

import {ActionBar, Menu, useContextView} from '@dtinsight/molecule/esm/components';


import {connect} from '@dtinsight/molecule/esm/react';
import {pnlService} from '@/services';

import type {IDataSourceProps, IPnlProps} from '@/interface';
import type {IDataSourceState} from '@/services/pnlService';
import './index.scss';

import Markdown from "./markdown";
import styled from "styled-components";

const CreateDataSource = styled.div`
    width: 100%;
    height:100%;
    background-color: white;
   overflow: scroll;

`



const DataSourceView = ({dataSource}: IDataSourceState) => {



  return (
    <CreateDataSource>
      <Markdown res={dataSource}></Markdown>
    </CreateDataSource>

  );
};

export default connect(pnlService, DataSourceView);
