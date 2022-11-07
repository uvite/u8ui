import type { UniqueId } from '@dtinsight/molecule/esm/common/types';
import type { IExtension } from '@dtinsight/molecule/esm/model';
import type { IExtensionService } from '@dtinsight/molecule/esm/services';
// import QuickRunSQLAction from './quickRunSQLAction';
// import QuickSaveTaskAction from './quickSaveTaskAction';
import molecule from '@dtinsight/molecule';

export default class ActionExtensions implements IExtension {
	id: UniqueId = 'actions';
	name = 'actions';
	activate(extensionCtx: IExtensionService): void {
		// extensionCtx.registerAction(QuickRunSQLAction);
		// extensionCtx.registerAction(QuickSaveTaskAction);
    // //
    molecule.activityBar.reset()
     // molecule.activityBar.remove('sidebar.explore.title');
     // molecule.activityBar.remove('sidebar.search.title');

  }
	dispose(): void {
		throw new Error('Method not implemented.');
	}
}
