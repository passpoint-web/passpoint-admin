import axios from "axios"
import { getToken } from "./localService"
// import cookies from '@/plugins/cookies';
// import { Redirect } from 'next';
const restAgent = axios.create({
  // baseURL: "https://api.jessecoders.com/passpointGo/v1/",
  // headers: {
  // 	"Content-Type": "application/json",
  // },
  baseURL: "https://webapi.mypasspoint.com/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})

const getRequestConfig = () => {
  return {
    headers: {},
    params: {},
  }
}

restAgent.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response ? error.response.status : null
  console.log("Inte", statusCode)
  if (
    statusCode &&
    statusCode === 401
    // ||
    // (statusCode && statusCode === 403)
  ) {
    if (!window.location.pathname.includes("/auth/login")) {
      window.location.href = `/auth/login?fallBackUrl=${window.location.pathname}`
    }
  }
  return Promise.reject(error)
})

export const setConfig = () => {
  // console.log(cookies.get('token'))
  const config = getRequestConfig()
  return config
}

const setTravelConfig = () => {
  // const token = getToken()
  // console.log(cookies.get('token'))
  const config = getRequestConfig()
  config.headers.Authorization = `Bearer 123`
  return config
}

export const registerUser = (path, data) => {
  return restAgent.post(path, data)
}

export const kyc = {
  getKycDetails: () => {
    return restAgent.get("getKycDetails", setConfig())
  },
  getKycDashboardStats: () => {
    return restAgent.get("kycStats", setConfig())
  },
  getUnapprovedUsers: () => {
    return restAgent.post("getUnapprovedUsers", setConfig())
  },
  getKycSingleDetails: (userId) => {
    return restAgent.post(
      "getKycSingleDetails",
      { userId: Number(userId) },
      setConfig()
    )
  },
  approveKYC: (userId) => {
    return restAgent.post("approveKyc", { userId }, setConfig())
  },
  rejectKYC: (userId) => {
    return restAgent.post("rejectKyc", { userId }, setConfig())
  },
  uploadKycIdentity: (data) => {
    return restAgent.post("kycProofCooperateIdentity", data, setConfig())
  },
  uploadKycAddress: (data) => {
    return restAgent.post("kycProofCooperateAddress", data, setConfig())
  },
  uploadKycBusiness: (data) => {
    return restAgent.post("kycProofCooperateURL", data, setConfig())
  },
  uploadKycOwnership: (data) => {
    return restAgent.post("kycProofCooperateOwnership", data, setConfig())
  },
  uploadIndIdentity: (data) => {
    return restAgent.post("kycProofIndividualIdentity", data, setConfig())
  },
  uploadIndAddress: (data) => {
    return restAgent.post("kycProofIndividualAddress", data, setConfig())
  },
}
