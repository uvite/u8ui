import React from 'react';
import molecule from '@pmker/molecule';
import { Header, Content } from '@pmker/molecule/esm/workbench/sidebar';
import { IActionBarItemProps, ITreeNodeItemProps } from '@pmker/molecule/esm/components';
import { ICollapseItem } from '@pmker/molecule/esm/components/collapse';
import { localize } from '@pmker/molecule/esm/i18n/localize';

import API from '../../api';
import DataSourceDetail from '../../components/bot/detail';
import { AddBotTradeView } from '../../extensions/bbgo/base';


const Tree = molecule.component.TreeView;
const Toolbar = molecule.component.Toolbar;
const Collapse = molecule.component.Collapse;
export class BotSidebarView extends React.Component {

    state = {
        data: [],
        currentDataSource: undefined
    }

    componentDidMount() {
        this.fetchData();
        molecule.event.EventBus.subscribe('addDataSource', () => { this.reload() });
    }

    async fetchData() {
        const res = await API.getTrade();
        if (res.message === 'success') {
            this.setState({
                data: res.data.children || []
            });
        }
    }

    fetchDataSource = async (id: string) => {
        const dataSource = await API.getDataSourceById(id);
        this.setState({ currentDataSource : dataSource });
    }

    reload() {
        this.fetchData();
    }

    create() {
        AddBotTradeView();
    }

    selectedSource = (node: ITreeNodeItemProps) => {
        if (node.isLeaf) {
            this.fetchDataSource(node.id as string);
        }
    }

    renderHeaderToolbar(): IActionBarItemProps[] {
        return [
            {
                icon: 'refresh',
                id: 'reload',
                title: 'Reload',
                onClick: () => this.reload()
            }, {
                icon: 'add',
                id: 'addBot',
                title: 'create bot',
                onClick: () => this.create()
            }
        ]
    }

    renderCollapse(): ICollapseItem[] {
        const dataSource: DataSourceType | undefined = this.state.currentDataSource;
        return [
            {
                id: 'DataSourceList',
                name: 'Catalogue',
                renderPanel: () => {
                    return (
                        <Tree data={this.state.data} onSelect={this.selectedSource}/>
                    )
                }
            }

        ]
    }

    render() {
        return (
            <div className="dataSource" style={{width: '100%', height: '100%' }}>
                <Header title={ localize('demo.botManage', "botManage") } toolbar={
                    <Toolbar data={this.renderHeaderToolbar()} />
                }/>
                <Content>
                    <Collapse data={this.renderCollapse()} />
                </Content>
            </div>
        );
    }
}

export default BotSidebarView;
