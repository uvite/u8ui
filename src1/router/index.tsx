import React, { lazy, FC } from 'react'
import { RouteObject } from 'react-router'
import { useRoutes } from 'react-router-dom'
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config'
import LoginPage from '@pages/login'
import LayoutPage from '@pages/layout'
import Empty from '@components/empty'

const DashboardWorkbeach = lazy(() => import('@src/pages/dashboard/workbeach'))
const DashboardAnlyanis = lazy(() => import('@src/pages/dashboard/anlyanis'))
const DashboardMonitor = lazy(() => import('@src/pages/dashboard/monitor'))

const FormBasic = lazy(() => import('@src/pages/form/basic'))
const FormStep = lazy(() => import('@src/pages/form/step'))
const FormAdvanced = lazy(() => import('@src/pages/form/advanced'))

const ListSearch = lazy(() => import('@src/pages/list/search'))
const ListInquire = lazy(() => import('@src/pages/list/inquire'))
const ListStandard = lazy(() => import('@src/pages/list/standard'))
const ListCard = lazy(() => import('@src/pages/list/card'))

const DetailBasic = lazy(() => import('@src/pages/detail/basic'))
const DetailAdvanced = lazy(() => import('@src/pages/detail/advanced'))

const ResultSuccess = lazy(() => import('@src/pages/result/success'))
const ResultFailed = lazy(() => import('@src/pages/result/failed'))

const Abnormal403 = lazy(() => import('@src/pages/abnormal/403'))
const Abnormal404 = lazy(() => import('@src/pages/abnormal/404'))
const Abnormal500 = lazy(() => import('@src/pages/abnormal/500'))

const UserCenter = lazy(() => import('@src/pages/user/center'))
const UserSettings = lazy(() => import('@src/pages/user/settings'))

import { create, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

const moInstance = create({
    extensions: [],
});

const App = () => moInstance.render(<Workbench />);

const routeList: RouteObject[] = [
	{
		path: '/',
		element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
		children: [
			{
				path: 'dashboard/workbeach',
				element: <WrapperRouteComponent element={<DashboardWorkbeach />} titleId="?????????" auth />
			},
			{
				path: 'dashboard/anlyanis',
				element: <WrapperRouteComponent element={<DashboardAnlyanis />} titleId="?????????" auth />
			},
			{
				path: 'dashboard/monitor',
				element: <WrapperRouteComponent element={<App />} titleId="?????????" auth />
			},
			{
				path: 'form/basic',
				element: <WrapperRouteComponent element={<FormBasic />} titleId="???????????????" auth />
			},
			{
				path: 'form/step',
				element: <WrapperRouteComponent element={<FormStep />} titleId="???????????????" auth />
			},
			{
				path: 'form/advanced',
				element: <WrapperRouteComponent element={<FormAdvanced />} titleId="???????????????" auth />
			},
			{
				path: 'list/search',
				element: <WrapperRouteComponent element={<ListSearch />} titleId="???????????????" auth />
			},
			{
				path: 'list/inquire',
				element: <WrapperRouteComponent element={<ListInquire />} titleId="???????????????" auth />
			},
			{
				path: 'list/standard',
				element: <WrapperRouteComponent element={<ListStandard />} titleId="???????????????" auth />
			},
			{
				path: 'list/card',
				element: <WrapperRouteComponent element={<ListCard />} titleId="???????????????" auth />
			},
			{
				path: 'detail/basic',
				element: <WrapperRouteComponent element={<DetailBasic />} titleId="???????????????" auth />
			},
			{
				path: 'detail/advanced',
				element: <WrapperRouteComponent element={<DetailAdvanced />} titleId="???????????????" auth />
			},
			{
				path: 'result/success',
				element: <WrapperRouteComponent element={<ResultSuccess />} titleId="???????????????" auth />
			},
			{
				path: 'result/failed',
				element: <WrapperRouteComponent element={<ResultFailed />} titleId="???????????????" auth />
			},

			{
				path: 'abnormal/403',
				element: <WrapperRouteComponent element={<Abnormal403 />} titleId="403" auth />
			},
			{
				path: 'abnormal/404',
				element: <WrapperRouteComponent element={<Abnormal404 />} titleId="404" auth />
			},
			{
				path: 'abnormal/500',
				element: <WrapperRouteComponent element={<Abnormal500 />} titleId="500" auth />
			},
			{
				path: 'user/center',
				element: <WrapperRouteComponent element={<UserCenter />} titleId="???????????????" auth />
			},
			{
				path: 'user/settings',
				element: <WrapperRouteComponent element={<UserSettings />} titleId="???????????????" auth />
			}
		]
	},
	{
		path: 'login',
		element: <WrapperRouteWithOutLayoutComponent element={<LoginPage />} titleId="??????" />
	},
	{
		path: '*',
		element: (
			<WrapperRouteWithOutLayoutComponent
				element={<Empty title="????????????" description="?????????????????????~" type="404" />}
				titleId="404"
			/>
		)
	}
]

const RenderRouter: FC = () => {
	const element = useRoutes(routeList)
	return element
}

export default RenderRouter
