import { getContract } from '../ethereumAPI/api';
import provider from '../ethereumAPI/provider';
import handleApproveCreator from './handleApproveCreator';


export default async function getEscrow(address, signer) {
  const escrowContract = await getContract(address, provider);
  const depositor = await escrowContract.depositor();
  const arbiter = await escrowContract.arbiter();
  const beneficiary = await escrowContract.beneficiary();
  const value = await provider.getBalance(address);

  const escrow = {
    address,
    depositor,
    arbiter,
    beneficiary,
    value: value.toString(),
    handleApprove: handleApproveCreator(escrowContract, signer),
  };

  return escrow;
}