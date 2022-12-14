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
import {Empty, message, Modal} from 'antd';
import molecule from '@dtinsight/molecule';
import {ActionBar, Menu, useContextView} from '@dtinsight/molecule/esm/components';
import {Content, Header} from '@dtinsight/molecule/esm/workbench/sidebar';
import {IActivityBarItem, IEditorTab, ISidebarPane, IMenuBarItem} from '@dtinsight/molecule/esm/model';


import {connect} from '@dtinsight/molecule/esm/react';
import {botsService} from '@/services';
import API from '@/api';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {getEventPosition} from '@dtinsight/molecule/esm/common/dom';
import {ID_COLLECTIONS} from '@/constant';
import {DetailInfoModal} from '@/components/detailInfo';
import Search from './search';
import Add from './add';
import classNames from 'classnames';
import {DataSourceLinkFailed, DataSourceLinkSuccess} from '@/components/icon';
import type {IDataSourceProps} from '@/interface';
import type {IDataSourceState} from '@/services/botService';
import './index.scss';
import TradeView from "@pages/tradingview/App";

import GridView from './order';
import Report from "./report";
import TradeVolume from "./tradeVolume";


const {confirm} = Modal;

interface IOther {
  search: string;
  dataTypeList: string[];
}


const DataSourceView = ({dataSource}: IDataSourceState) => {
  const [other, setOther] = useState<IOther>({
    search: '',
    dataTypeList: [],
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [detailView, setView] = useState<IDataSourceProps | undefined>(undefined);

  const contextView = useContextView();

  // ????????????
  const handleSearch = (value: Record<string, any>) => {
    const data = {...other, ...value};
    setOther(data);
  };

  const handleOpenDetail = (record: IDataSourceProps) => {
    setVisible(true);
    setView(record);
  };

  // ??????
  const toDelete = async (record: IDataSourceProps) => {
    const {success, message: msg} = await API.dataSourceDelete({
      dataInfoId: record.dataInfoId,
    });

    if (success) {
      message.success('????????????');
      // ????????????
      botsService.reloadDataSource();
    } else {
      message.error(`${msg}`);
    }
  };

  const handleMenuClick = (menu: { id: string; name: string }, record: IDataSourceProps) => {
    contextView.hide();
    switch (menu.id) {
      case 'open':

        // eslint-disable-next-line no-case-declarations
        const ordersTab: IEditorTab = {
          id: "orders",
          name: '????????????',
          renderPane: () => {
            return <GridView/>;
          }
        }
        const volumeTab: IEditorTab = {
          id: "tradeOrder",
          name: '?????????',
          renderPane: () => {
             return <TradeVolume/>;
          }
        }

        const reportTab: IEditorTab = {
          id: "report",
          name: '????????????',
          renderPane: () => {

            return <Report/>;
          }
        }

        molecule.editor.open(reportTab);
        molecule.editor.open(volumeTab);
        molecule.editor.open(ordersTab);

        // molecule.editor.open({
        //   id: record.name,
        //   name: record.name,
        //   icon: 'edit',
        //   renderPane: (
        //     <TradeView record={record}/>
        //   ),
        //   breadcrumb: [
        //     {
        //       id: 'root',
        //       name: record.name,
        //     }
        //
        //   ],
        // });
        break;
      case 'delete':
        confirm({
          title: '???????????????????????????',
          icon: <ExclamationCircleOutlined/>,
          okText: '??????',
          okType: 'danger',
          cancelText: '??????',
          onOk() {
            toDelete(record);
          },
          onCancel() {
          },
        });
        break;
      default:
        break;
    }
  };

  const handleContextmenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    record: IDataSourceProps,
  ) => {
    e.preventDefault();
    e.currentTarget.focus();
    contextView.show(getEventPosition(e), () => (
      <Menu
        role="menu"
        onClick={(_: any, item: any) => handleMenuClick(item, record)}
        data={[
          {
            id: 'edit',
            name: '??????',
          },
          {
            id: 'delete',
            name: '??????',
          },
        ]}
      />
    ));
  };

  const handleHeaderBarClick = () => {
    if (molecule.editor.isOpened(ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX)) {
      message.warning('????????????????????????????????????');
      const groupId = molecule.editor.getGroupIdByTab(
        ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
      )!;
      molecule.editor.setActive(groupId, ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX);
    } else {
      molecule.editor.open({
        id: ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
        name: '???????????????',
        icon: 'server-process',
        renderPane: (
          <Add
            key={ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX}
            onSubmit={() => botsService.reloadDataSource()}
          />
        ),
        breadcrumb: [
          {
            id: 'root',
            name: '???????????????',
          },
          {
            id: ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
            name: '???????????????',
          },
        ],
      });
    }
  };

  const renderFilterDataSource = (item: IDataSourceProps) => {
    if (other.search) {
      return item.dataName.includes(other.search);
    }

    if (other.dataTypeList?.length) {
      return other.dataTypeList.includes(item.dataType);
    }

    return true;
  };

  const filterDataSource = useMemo(
    () => dataSource.filter(renderFilterDataSource),
    [dataSource, other],
  );

  return (
    <div className="datasource-container">
      <Header
        title="????????????"
        toolbar={
          <ActionBar
            data={[]}
          />
        }
      />
      <Content>
        <Search onSearch={handleSearch}/>
        {filterDataSource.length ? (
          <div tabIndex={0} className="datasource-content">
            <ul className="datasource-list">
              {filterDataSource.map((item) => (
                <li
                  key={item.id}
                  tabIndex={-1}
                  className="datasource-record"
                  onClick={() => handleMenuClick({id: "open", name: "open"}, item)}
                  onContextMenu={(e) => handleContextmenu(e, item)}
                >

                  <div className="datasource-title">
										<span className="title" title={item.name}>
											{item.name}({item.dataType}
                      {item.dataVersion || ''})
										</span>
                    <span className={classNames('desc')}>
											{item.dataDesc || '--'}
										</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        )}
        <DetailInfoModal
          type="dataSource"
          title="???????????????"
          visible={visible}
          loading={false}
          onCancel={() => setVisible(false)}
          data={detailView}
        />
      </Content>
    </div>
  );
};

export default connect(botsService, DataSourceView);
