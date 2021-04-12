import axios from "axios"

const axiosClient = axios.create()

const token = window.localStorage.getItem("jwt")

axiosClient.defaults.headers.common["Authorization"] = "Bearer " + token

export default axiosClient
