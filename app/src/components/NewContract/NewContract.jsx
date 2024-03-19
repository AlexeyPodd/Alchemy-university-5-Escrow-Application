import NewContractForm from "./NewContractForm";

export default function NewContract(props) {
  return <div className="contract">
    <h1> New Contract </h1>
    <NewContractForm {...props} />
  </div>
}