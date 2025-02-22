import { makeStyles } from '@material-ui/core/styles'
import { useMemo } from 'react'

import { styles } from './style'
import Divider from 'src/components/Divider'
import GnoForm from 'src/components/forms/GnoForm'
import Block from 'src/components/layout/Block'
import Hairline from 'src/components/layout/Hairline'
import SafeInfo from 'src/routes/safe/components/Balances/SendModal/SafeInfo'
import Buttons from './Buttons'
import ContractABI from './ContractABI'
import { EthAddressInput } from './EthAddressInput'
import FormErrorMessage from './FormErrorMessage'
import { MethodsDropdown } from './MethodsDropdown'
import { RenderInputParams } from './RenderInputParams'
import { RenderOutputParams } from './RenderOutputParams'
import { createTxObject, formMutators, handleSubmitError, isReadMethod, ensResolver } from './utils'
import { TransactionReviewType } from './Review'
import { NativeCoinValue } from './NativeCoinValue'
import { ModalHeader } from '../ModalHeader'
import { getStepTitle } from 'src/routes/safe/components/Balances/SendModal/utils'
import useSafeAddress from 'src/logic/currentSession/hooks/useSafeAddresses'

const useStyles = makeStyles(styles)

export interface CreatedTx {
  contractAddress: string
  data: string
  selectedMethod: TransactionReviewType
  value: string | number
}

export type DeployNFTContractTx = {
  contractAddress?: string
}

export interface DeployNFTContractProps {
  contractAddress?: string
  initialValues: DeployNFTContractTx
  onClose: () => void
  onNext: (tx: CreatedTx, submit: boolean) => void
}

const DeployNFTContract: React.FC<DeployNFTContractProps> = ({ contractAddress, initialValues, onClose, onNext }) => {
  const classes = useStyles()
  const { safeAddress } = useSafeAddress()
  let setCallResults

  useMemo(() => {
    if (contractAddress) {
      initialValues.contractAddress = contractAddress
    }
  }, [contractAddress, initialValues])

  const handleSubmit = async (
    { contractAddress, selectedMethod, value, ...values },
    submit = true,
  ): Promise<void | Record<string, string>> => {
    if (value || (contractAddress && selectedMethod)) {
      try {
        const txObject = createTxObject(selectedMethod, contractAddress, values)
        const data = txObject.encodeABI()

        if (isReadMethod(selectedMethod) && submit) {
          const result = await txObject.call({ from: safeAddress })
          setCallResults(result)

          // this was a read method, so we won't go to the 'review' screen
          return
        }

        onNext({ ...values, contractAddress, data, selectedMethod, value }, submit)
      } catch (error) {
        return handleSubmitError(error, values)
      }
    }
  }

  return (
    <>
      <ModalHeader onClose={onClose} subTitle={getStepTitle(1, 2)} title="Deploy NFT Contract" />
      <Hairline />
      <GnoForm
        decorators={[ensResolver]}
        formMutators={formMutators}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        subscription={{ submitting: true, pristine: true, values: true }}
      >
        {(submitting, validating, rest, mutators) => {
          setCallResults = mutators.setCallResults
          return (
            <>
              <Block className={classes.formContainer}>
                <SafeInfo />
                <Divider withArrow />
                <EthAddressInput
                  name="contractAddress"
                  onScannedValue={mutators.setContractAddress}
                  text="Contract address*"
                />
                <ContractABI />
                <MethodsDropdown onChange={mutators.setSelectedMethod} />
                <NativeCoinValue onSetMax={mutators.setMax} />
                <RenderInputParams />
                <RenderOutputParams />
                <FormErrorMessage />
              </Block>
              <Buttons onClose={onClose} requiresMethod />
            </>
          )
        }}
      </GnoForm>
    </>
  )
}

export default DeployNFTContract
