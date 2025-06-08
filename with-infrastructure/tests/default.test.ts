import { describe, it, expect, beforeEach } from 'vitest'

// Импорты функций (если вынесешь функции в модули)
import { validateEmail, validatePassword, saveDataIfRemembered } from '../script'

describe('Validation functions', () => {
    it('validateEmail should return true for correct email', () => {
        expect(validateEmail('user@example.com')).toBe(true)
    })

    it('validateEmail should return false for incorrect email', () => {
        expect(validateEmail('invalid-email')).toBe(false)
    })

    it('validatePassword should return true if length >= 6', () => {
        expect(validatePassword('123456')).toBe(true)
    })

    it('validatePassword should return false if length < 6', () => {
        expect(validatePassword('123')).toBe(false)
    })
})

describe('saveDataIfRemembered function', () => {
    beforeEach(() => {
        localStorage.clear() // чистим localStorage перед каждым тестом
    })

    it('saves data to localStorage if remember is true', () => {
        saveDataIfRemembered('test@example.com', '123456', true)
        const saved = JSON.parse(localStorage.getItem('authData') || '{}')
        expect(saved.email).toBe('test@example.com')
        expect(saved.password).toBe('123456')
    })

    it('removes data from localStorage if remember is false', () => {
        localStorage.setItem('authData', JSON.stringify({ email: 'x', password: 'y' }))
        saveDataIfRemembered('test@example.com', '123456', false)
        expect(localStorage.getItem('authData')).toBeNull()
    })
})
