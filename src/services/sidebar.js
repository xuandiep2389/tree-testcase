import axios from 'axios';

export async function getProjectByCode(projectCode) {
    console.log("getProjectByCode running")
    return axios
    .get(`http://localhost:8080/testcase/api/v1/project/${projectCode}`).then(response => response.data);
}

export async function getSuiteByCode(suiteCode) {
    console.log("getSuiteByCode running")
    return axios
    .get(`http://localhost:8080/testcase/api/v1/suite/${suiteCode}`).then(response => response.data);
}