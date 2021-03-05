const axios = require('axios')
const apiUrl = "http://demodex.wandevs.org:9000/api/v1/"

/// error types
// net error
// http error
// api error
// timeout error
// exception error

async function getUrl(url) {
  const res = await axios.get(url)
  if (res.status === 200) {
    return {data: res.data}
  } else {
    console.warn(JSON.stringify(res, null, 2))
    return {error: `${url} exception: ${res.status} ${res.statusText}`}
  }
}

async function getBackendApi(url) {
  try {
    const res = await axios.get(apiUrl + url)
    if (res.status === 200) {
      if (res.data && res.data.success) {
        console.info(JSON.stringify(res.data.data, null, 2))
        return {data: res.data.data}
      } else {
        console.warn(JSON.stringify(res.data, null, 2))
        return {error: `${url} api failed: data = ${res.data}`}
      }
    } else {
      console.warn(JSON.stringify(res, null, 2))
      return {error: `${url} wrong status: ${res.status} ${res.statusText}`}
    }
  } catch (e) {
    console.error(`${url} exception : ` + e)
    return {error: `${url} exception : ${e}`}
  }
}

export async function getFee() {
  const result = await getBackendApi('fee')
  if (!result.error) {
    console.info(JSON.stringify(result.data, null, 2))
    console.info(typeof result.data.gasFee.USDT)
    return result.data.gasFee.USDT
  } else {
    return result.error
  }
}

export async function getTimeStamp() {
  const res = await getUrl('http://demodex.wandevs.org:9000/api/health')
  console.info(JSON.stringify(res, null, 2))
  console.info(typeof res.data.timestamp)
  return res.data.timestamp
}