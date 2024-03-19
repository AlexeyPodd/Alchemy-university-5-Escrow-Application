import { deploy } from '../ethereumAPI/api';
import serverAPI from '../serverAPI/api';
import handleApproveCreator from './handleApproveCreator';

export default async function createEscrow(signer, arbiterAddr, beneficiaryAddr, value) {
  const depositor = await signer.getAddress();
  const escrowContract = await deploy(signer, arbiterAddr, beneficiaryAddr, value);
  escrowContract.deployTransaction.wait();

  await serverAPI.addContractAddress(escrowContract.address);

  const escrow = {
    address: escrowContract.address,
    depositor,
    arbiter: arbiterAddr,
    beneficiary: beneficiaryAddr,
    value: value.toString(),
    handleApprove: handleApproveCreator(escrowContract, signer),
  };
  return escrow;
}