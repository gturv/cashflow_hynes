import { useState } from "react";
import { Box, Container, FormControl, Center, FormLabel, Image, Tag, Input, Text, Grid, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, GridItem } from "@chakra-ui/react"
import logo from "./hynes.png"
import addComma from "./addComma";

function App() {
    const [purchasePrice, setPurchasePrice] = useState(0)
    const [address, setAddress] = useState('')
    const [mortgageTermYears, setMortgageTermYears] = useState(30)
    const [interest, setInterest] = useState(3.69)
    const [propertyTax, setPropertyTax] = useState(4000)
    const [insurance, setInsurance] = useState(1500)
    const [utilities, setUtilities] = useState(0)
    const [monthlyIncome, setMonthlyIncome] = useState(3000)
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(20)
    const [condoFee, setCondoFee] = useState(0)
    const { totalMortgagePayment, principalPortion, interestPortion } = mortgagePaymentCalc(purchasePrice * (100 - downPaymentPercentage) / 100, interest, (mortgageTermYears * 12))
    const totalMonthlyExpense = propertyTax/12 + insurance/12 + (parseInt(condoFee) || 0) + (parseInt(utilities) || 0)
    const downPayment = downPaymentPercentage * purchasePrice / 100
    const loanAmount = purchasePrice - downPayment

    const monthlyCashflow = monthlyIncome - totalMonthlyExpense - totalMortgagePayment
    
    function mortgagePaymentCalc(loanAmount, rate, months) {
        const adjustedRate = rate / 100/ 12
        const onePlusRate = 1 + adjustedRate
        const numPowerMonths = Math.pow(onePlusRate,months)
        const interestPortion = loanAmount * adjustedRate
        const principalPortion = interestPortion / (numPowerMonths - 1)
        const totalMortgagePayment = loanAmount * adjustedRate * numPowerMonths / (numPowerMonths - 1)
    
        return { totalMortgagePayment, principalPortion, interestPortion }
    }
    
    function capRate(purchasePrice, monthlyIncome, propertyTax, insurance, condoFee, utilities){
        const yearlyIncome = monthlyIncome * 12
        const yearlyExpenses = parseInt(propertyTax) + parseInt(insurance) + (parseInt(condoFee)*12 || 0) + (parseInt(utilities)*12 || 0)
        return (yearlyIncome - yearlyExpenses) / purchasePrice * 100
    }
    
    window.onload = function() {
        document.getElementById("price").focus();
    }  

    return (
        <Container my={15}>
            <Box >
                <Input mb={25} placeholder="Address" id="address" value={address} onChange={(e)=> setAddress(e.target.value)} />
                
            <Box borderWidth='2px' borderRadius='lg' padding={3} mr={-2} >
                <Text mb={5} fontSize="3xl">Cashflow analysis for {address}</Text> 
                <FormControl>
               <Grid  gap={2} mb={8} >
                    <GridItem colSpan={4} >
                        <FormLabel  fontSize={19}  htmlFor="price">Purchase Price</FormLabel>
                        <NumberInput   display="flex" id="price" max={999999999} min={0} step={10000} value={"$" + addComma(purchasePrice)} onFocus={e => e.target.select()} onChange={e => setPurchasePrice(e)} >
                            <NumberInputField fontWeight="bold" />
                        </NumberInput>
                    </GridItem>
                    
                    <GridItem colSpan={1} >
                        <FormLabel htmlFor="downPayment">Down Pay (%)</FormLabel>
                        <NumberInput  id="downPayment" onFocus={e => e.target.select()} max={90} min={5} step={5} value={downPaymentPercentage} onChange={(e)=> setDownPaymentPercentage(e)} >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </GridItem> 
                    
                    <GridItem colSpan={1}>
                        <FormLabel htmlFor="term">Term (Years)</FormLabel>
                        <NumberInput  id="term" onFocus={e => e.target.select()} max={30} min={5} step={5} value={mortgageTermYears} onChange={(e)=>setMortgageTermYears(e)}  >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>     
                        </NumberInput>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormLabel htmlFor="rate">Interest (%)</FormLabel>
                        <NumberInput  onFocus={e => e.target.select()} id="interest" max={10} min={0} step={0.1} value={interest} onChange={(e)=> setInterest(e)}>
                            <NumberInputField p={0} paddingLeft="16%"/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </GridItem>
                    
                    <GridItem colSpan={1} >
                        <FormLabel htmlFor="rate">Tax (Yearly)</FormLabel>
                        <NumberInput  onFocus={e => e.target.select()} id="propertyTax" max={20000} min={0} step={100} value={propertyTax} onChange={(e)=>setPropertyTax(e)} >
                            <NumberInputField p={0} paddingLeft="16%" />
                        </NumberInput>
                    </GridItem>

                    <GridItem colSpan={1}>                   
                        <FormLabel fontSize={14} htmlFor="insurance">Insurance (Yearly)</FormLabel>
                        <NumberInput onFocus={e => e.target.select()} id="insurance" max={9999} min={0} step={100} value={insurance} onChange={(e)=>setInsurance(e)} >
                            <NumberInputField p={0} paddingLeft="16%" />
                        </NumberInput>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormLabel fontSize={14} htmlFor="utilities">Utilities (Monthly)</FormLabel>
                        <NumberInput onFocus={e => e.target.select()}  id="utilities" max={9999} min={0} step={50} value={utilities} onChange={(e)=>setUtilities(e)} >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormLabel fontSize={14} htmlFor="condoFees">Condo Fees</FormLabel>
                        <NumberInput onFocus={e => e.target.select()} id="condoFees" max={2500} min={0} step={25} value={condoFee} onChange={e=>setCondoFee(e)} >
                            <NumberInputField p={0} paddingLeft="16%" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </GridItem>

                    <GridItem colSpan={1} >
                        <FormLabel fontSize={14} htmlFor="rent">Rent (Monthly)</FormLabel>
                        <NumberInput  id="rent" onFocus={e => e.target.select()} max={50000} min={0} step={100} value={monthlyIncome} onChange={e=>setMonthlyIncome(e)}  >
                            <NumberInputField  p={0} paddingLeft="16%" />
                        </NumberInput>
                    </GridItem>
                </Grid>

                {purchasePrice > 10000 ? 
                <Grid  my={10} templateRows='repeat(3, 1fr)' templateColumns='repeat(4, 1fr)' gap={4} >
                <GridItem colSpan={2}>

                    <Text>Down Payment: <Tag fontSize={18} fontWeight="bold">${addComma(downPayment)}</Tag></Text>
                </GridItem>

                <GridItem colSpan={2}>
                    <Text>Mortgage Payment: <Tag fontSize={18} fontWeight="bold">${addComma(totalMortgagePayment.toFixed(2))}</Tag></Text>
                </GridItem>

                <GridItem  colSpan={2}>
                    <Text>Mortgaged: <Tag fontSize={18} fontWeight="bold">${addComma(loanAmount)}</Tag></Text>
                </GridItem>
                
                <GridItem colSpan={2}>
                    <Text>Principal: <Tag fontSize={18} fontWeight="bold">${addComma(principalPortion.toFixed(2))}</Tag></Text>      
                </GridItem>

                <GridItem colSpan={2}>
                    <Text>Monthly Expenses: <Tag fontSize={18} fontWeight="bold">${addComma(totalMonthlyExpense.toFixed(2))}</Tag></Text>
                </GridItem>

                <GridItem colSpan={2}>
                    <Text>Interest: <Tag fontSize={18} fontWeight="bold">${addComma(interestPortion.toFixed(2))}</Tag></Text>
                </GridItem>

                <GridItem colSpan={2}>
                    <Text>Cap Rate: <Tag fontSize={18} fontWeight="bold">{capRate(purchasePrice ,monthlyIncome, propertyTax, insurance, condoFee, utilities).toFixed(2)}%</Tag></Text>
                </GridItem>

                <GridItem colSpan={2}>
                    <Text>Monthly cashflow:<Tag fontSize={18} fontWeight="bold" color={monthlyCashflow > 0 ? 'green' : 'red'}>{addComma(monthlyCashflow.toFixed(2))}</Tag> </Text>
                </GridItem>



                </Grid>
                    

                    : <Box h={48}>
                        <Center ><Text mt={35}>Enter a purchase price...</Text></Center>
                    </Box>}
            </FormControl>



                
                <Image align='center' mb={5}  mx='auto' maxHeight={120} src={logo} objectFit='contain' />
            </Box>
            </Box>
        </Container>
        
    )
}

export default App;