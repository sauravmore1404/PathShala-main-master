import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { catalogData } from "../apis"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  console.log("Category ID:", categoryId)
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }
    )
    console.log("API Response:", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Category page data.")
    }
    result = response?.data
  } catch (error) {
    console.error("CATALOGPAGEDATA_API API ERROR:", error)
    if (error.response) {
      console.error("Response Data:", error.response.data)
      console.error("Response Status:", error.response.status)
      console.error("Response Headers:", error.response.headers)
    } else if (error.request) {
      console.error("Request Data:", error.request)
    } else {
      console.error("Error Message:", error.message)
    }
    toast.error(error.message)
    result = error.response?.data || { message: error.message }
  }
  toast.dismiss(toastId)
  return result
}
