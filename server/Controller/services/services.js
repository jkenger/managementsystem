const fetch = require('node-fetch')
const fetchData = async (url) => {
    const result = await fetch(`http://localhost:3000/${url}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })
    const data = await result.json()
    return data
}


const errorHandler = (err) => {
    const error = { email: '', password: '' }

    if (err.message === 'Invalid email') {
        error.email = err.message
        return error
    }
    if (err.message === 'Invalid password') {
        error.password = err.message
        return error
    }

    if (err.code === 11000) { 
        error.email = 'Email already exist.' 
        return error
    }

    // ATTENDANCE ERRORS
    if(err.message === 'Office hour ended'){
        error.email = err.message
        return error
    }
    if(err.message.includes('You have already logged in for')){
        error.email = err.message
        return error
    }
    if(err.message.includes('You have already logged out for')){
        error.email = err.message
        return error
    }
    if(err.message.includes('shift will end at')){
        error.email = err.message
        return error
    }
    if(err.message.includes('shift ended')){
        error.email = err.message
        return error
    }
    if(err.message === 'Cannot log in. Please try again'){
        error.email = err.message
        return error
    }
    if(err.message === 'Log in time will enable at 8:00:00 AM everyday'){
        error.email = err.message
        return error
    }
    if(err.message === 'Cannot logout, try again later'){
        error.email = err.message
        return error
    }

    if(err.message === 'Office hour will end at 5 PM, try again later'){
        error.email = err.message
        return error
    }
    if(err.message.includes('not recognized by the system!')){
        error.email = err.message
        return error
    }

    if(err.message.includes('Please enter valid employee code!')){
        error.email = err.message
        return error
    }
    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(properties => {
            error[properties.path] = properties.message
        })
    }
    if (err.message.includes('attendances validation failed')) {
        Object.values(err.errors).forEach(properties => {
            error[properties.path] = properties.message
        })
    }
    return error
}

module.exports = {
    fetchData,
    errorHandler
}