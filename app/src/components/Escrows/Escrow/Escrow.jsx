import EscrowField from "./EscrowField";

export default function Escrow({
  address,
  depositor,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  const escrowFields = {
    Depositor: depositor,
    Arbiter: arbiter,
    Beneficiary: beneficiary,
    Value: value
  }
  return (
    <div className="existing-contract">
      <ul className="fields">
        {Object.keys(escrowFields).map((key) => {
          return <EscrowField key={key} name={key} value={escrowFields[key]} />
        })}
        <div
          className={Number(value) ? "button" : "complete"}
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          {Number(value) ? "Approve" : "✓ It's been approved!"}
        </div>
      </ul>
    </div>
  );
}
