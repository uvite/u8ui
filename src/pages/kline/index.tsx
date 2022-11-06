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

import { useMemo, useState } from 'react';
import { Empty, message, Modal } from 'antd';
import molecule from '@dtinsight/molecule';
import { ActionBar, Menu, useContextView } from '@dtinsight/molecule/esm/components';
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar';
import { connect } from '@dtinsight/molecule/esm/react';
import { klineService } from '@/services';
import API from '@/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getEventPosition } from '@dtinsight/molecule/esm/common/dom';
import { ID_COLLECTIONS } from '@/constant';
import { DetailInfoModal } from '@/components/detailInfo';
import Search from './search';
import Add from './add';

import TradeView from "@/pages/tradingview/App";

import classNames from 'classnames';
import { DataSourceLinkFailed, DataSourceLinkSuccess } from '@/components/icon';
import type {IAessetProps, IDataSourceProps} from '@/interface';
import type { IDataSourceState } from '@/services/klineService';
import './index.scss';
import {createBrowserHistory } from "history"
const history = createBrowserHistory();
const { confirm } = Modal;

interface IOther {
	search: string;
	dataTypeList: string[];
}

const DataSourceView = ({ dataSource }: IDataSourceState) => {
	const [other, setOther] = useState<IOther>({
		search: '',
		dataTypeList: [],
	});

	const [visible, setVisible] = useState<boolean>(false);
	const [detailView, setView] = useState<IAessetProps | undefined>(undefined);

	const contextView = useContextView();

	// 搜索事件
	const handleSearch = (value: Record<string, any>) => {
		const data = { ...other, ...value };
		setOther(data);
	};

	const handleOpenDetail = (record: IAessetProps) => {
		setVisible(true);
		setView(record);
	};

	// 删除
	const toDelete = async (record: IDataSourceProps) => {
		const { success, message: msg } = await API.dataSourceDelete({
			dataInfoId: record.dataInfoId,
		});

		if (success) {
			message.success('删除成功');
			// 更新表格
			klineService.reloadDataSource();
		} else {
			message.error(`${msg}`);
		}
	};

	const handleMenuClick = (menu: { id: string; name: string }, record: IAessetProps) => {
		contextView.hide();
		switch (menu.id) {
			case 'open':
        //history.push("/kline", { record: record });
        history.push("/kline?the=query", { some: "state" });

					molecule.editor.open({
						id: record.name,
						name: record.name,
						icon: 'edit',
						renderPane: (
							<TradeView record={record}/>
						),
						breadcrumb: [
							{
								id: 'root',
								name: record.name,
							}

						],
					});



				break;

			default:
				break;
		}
	};

	const handleContextmenu = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>,
		record: IAessetProps,
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
						name: '编辑',
					},
					{
						id: 'delete',
						name: '删除',
					},
				]}
			/>
		));
	};

	const handleHeaderBarClick = () => {
		if (molecule.editor.isOpened(ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX)) {
			message.warning('请先保存或关闭新增数据源');
			const groupId = molecule.editor.getGroupIdByTab(
				ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
			)!;
			molecule.editor.setActive(groupId, ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX);
		} else {
			molecule.editor.open({
				id: ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
				name: '新增数据源',
				icon: 'server-process',
				renderPane: (
					<Add
						key={ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX}
						onSubmit={() => klineService.reloadDataSource()}
					/>
				),
				breadcrumb: [
					{
						id: 'root',
						name: '数据源中心',
					},
					{
						id: ID_COLLECTIONS.CREATE_DATASOURCE_PREFIX,
						name: '新增数据源',
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
				title="资产列表"
				toolbar={
					<ActionBar
						data={[

						]}
					/>
				}
			/>
			<Content>
				<Search onSearch={handleSearch} />
				{filterDataSource.length ? (
					<div tabIndex={0} className="datasource-content">
						<ul className="datasource-list">
							{filterDataSource.map((item) => (
								<li
									key={item.id}
									tabIndex={-1}
									className="datasource-record"
									onClick={() => handleMenuClick({id:"open",name:"open"},item)}
									onContextMenu={(e) => handleContextmenu(e, item)}
								>

									<div className="datasource-title">
										<span className="title" title={item.name}>
											{item.name}
										</span>

									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
				<DetailInfoModal
					type="dataSource"
					title="数据源详情"
					visible={visible}
					loading={false}
					onCancel={() => setVisible(false)}
					data={detailView}
				/>
			</Content>
		</div>
	);
};

export default connect(klineService, DataSourceView);
