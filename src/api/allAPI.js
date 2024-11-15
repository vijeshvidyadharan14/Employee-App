import commonAPI from './commonAPI'
import serverlink from './serverlink'

// to fetch the data from the api server
export const getAllEmployeeAPI = async () => {
    return await commonAPI("GET",`${serverlink}/employeeDetails`,"")
}

export const saveEmpDetailsAPI = async (empDetails) => {
    return await commonAPI("POST",`${serverlink}/employeeDetails`,empDetails)
}

export const deleteEmployeeAPI  = async (id) => {
    return await commonAPI("DELETE",`${serverlink}/employeeDetails/${id}`,{})
}

export const updateEmployeeAPI = async (id, employeeData) => {
    return await commonAPI("PUT", `${serverlink}/employeeDetails/${id}`, employeeData);
}