import { container } from 'tsyringe';
import EditorActionBarService from './editorActionBarService';
import ExecuteService from './executeService';
import CatalogueService from './catalogueService';
import BreadcrumbService from './breadcrumbService';
import RightBarService from './rightBarService';
import TaskRenderService from './taskRenderService';
import DataSourceService from './dataSourceService';
import KlineService from './klineService';
import BotsService from './botService';
import PnlService from './pnlService';

const editorActionBarService = container.resolve(EditorActionBarService);
const executeService = container.resolve(ExecuteService);
const catalogueService = container.resolve(CatalogueService);
const breadcrumbService = container.resolve(BreadcrumbService);
const rightBarService = container.resolve(RightBarService);
const taskRenderService = container.resolve(TaskRenderService);
const dataSourceService = container.resolve(DataSourceService);
const klineService = container.resolve(KlineService);
const botsService = container.resolve(BotsService);
const pnlService = container.resolve(PnlService);

export {
	editorActionBarService,
	catalogueService,
	executeService,
	breadcrumbService,
	rightBarService,
	taskRenderService,
  dataSourceService,
  klineService,
  botsService,
  pnlService,
};
