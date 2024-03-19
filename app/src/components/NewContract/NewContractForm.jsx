import { useForm } from 'react-hook-form';
import { DenominationSelect, Input } from './NewContractFormFields';
import { ethers } from 'ethers';
import createEscrow from '../../utils/createEscrow';

export default function NewContractForm({ signer, setEscrows }) {
  const inputs = [
    {
      name: 'arbiter',
      label: 'Arbiter Address',
      default: '',
      isAddress: true
    },
    {
      name: 'beneficiary',
      label: 'Beneficiary Address',
      default: '',
      isAddress: true
    },
    {
      name: 'amount',
      label: 'Deposit Amount',
      default: '',
      isAddress: false
    },
  ]
  const defaultValues = {}
  for (let field in inputs) defaultValues[field.name] = field.default;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    const arbiter = formData.arbiter;
    const beneficiary = formData.beneficiary;
    const wei = ethers.utils.parseUnits(formData.amount, Number(formData.denomination));
    
    let escrow;
    try {
      escrow = await createEscrow(signer, arbiter, beneficiary, wei);
    } catch(error) {
      console.log(error);
    }
     
     if(escrow) setEscrows(prevEscrows => [...prevEscrows, escrow]);
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    {inputs.map(({ name, label, isAddress }) => {
      return <Input
        key={name}
        fieldName={name}
        label={label}
        register={register}
        errors={errors}
        isAddress={isAddress}
      />
    })}
    <DenominationSelect label="Denomination" {...register("denomination")} />
    <button className='button' type="submit">Deploy</button>
  </form>
}