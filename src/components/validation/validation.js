import _ from 'is_js'

export let lastValue = ''

export function isValid(key, value) {
    lastValue = key || ''
    switch (key) {
        case 'name':
            return value.length > 1 && _.capitalized(value)
        case 'lastName':
            return value.length > 1 && _.capitalized(value)
        case 'patronymic':
            return value.length > 1 && _.capitalized(value)
        case 'email':
            return _.email(value)
        case 'password':
            return value.length > 5
        case 'phone':
            return _.number(Number.parseInt(value)) && value.length > 9 && value.length < 12
        case 'status':
            return value !== '' && value !== 'null'
        default:
            return true
    }
}

