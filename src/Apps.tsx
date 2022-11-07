import 'reflect-metadata'
import React from 'react';
import { create, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

const moInstance = create({
  extensions: [],
});

//const App = () => moInstance.render(<Workbench />);
const MoleculeProvider = () => moInstance.render(<Workbench />);

function App()   {
  return(
    <><MoleculeProvider/></>
  )
}
export default App;
