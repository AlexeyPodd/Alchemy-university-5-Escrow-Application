import Escrow from "./Escrow/Escrow";

export default function Escrows({escrows}) {
  return <div className="existing-contracts">
    <h1> Existing Contracts </h1>

    <div id="container">
      {escrows.map((escrow) => {
        return <Escrow key={escrow.address} {...escrow} />;
      })}
    </div>
  </div>
}