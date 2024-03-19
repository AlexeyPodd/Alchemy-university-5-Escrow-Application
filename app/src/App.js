import { useEffect, useState } from 'react';
import Escrows from './components/Escrows/Escrows';
import provider from './ethereumAPI/provider';
import getEscrow from './utils/getEcrow';
import serverAPI from './serverAPI/api';
import NewContract from './components/NewContract/NewContract';

function App() {
  const [escrows, setEscrows] = useState([]);
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      await provider.send('eth_requestAccounts', []);
      setSigner(provider.getSigner());
    }
    getAccounts();
  }, []);

  useEffect(() => {
    async function getEscrows() {
      const escrows = []
      const { data: { contracts: addresses } } = await serverAPI.getContractAddresses();
      for (let address of addresses) {
        const escrow = await getEscrow(address, signer);
        escrows.push(escrow)
      }
      setEscrows(escrows);
    }

    getEscrows();

  }, [signer]);

  return (
    <div>
      <NewContract signer={signer} setEscrows={setEscrows} />
      <Escrows escrows={escrows} />
    </div>
  );
}

export default App;
