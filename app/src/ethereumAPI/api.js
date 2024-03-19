import { ethers } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';

export async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

export async function getContract(address, provider) {
  return new ethers.Contract(address, Escrow.abi, provider);
}

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}