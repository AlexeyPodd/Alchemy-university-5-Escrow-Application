import { approve } from '../ethereumAPI/api';

export default function handleApproveCreator(escrowContract, signer) {
  return async () => {
    escrowContract.on('Approved', () => {
      document.getElementById(escrowContract.address).className =
        'complete';
      document.getElementById(escrowContract.address).innerText =
        "✓ It's been approved!";
    });

    await approve(escrowContract, signer);
  }
}