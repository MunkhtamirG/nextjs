import React, { useContext, useState } from 'react'

export const ReferralContext = React.createContext({
  data: undefined,
  setData: async (data) => null,
})

export const useReferral = () => useContext(ReferralContext)

export const ReferralProvider = ({ children }) => {
  const [Referral, setReferral] = useState()

  return <ReferralContext.Provider value={{ Referral, setReferral }}>{children}</ReferralContext.Provider>
}


