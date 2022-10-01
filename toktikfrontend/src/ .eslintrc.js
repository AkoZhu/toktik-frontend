module.exports = {
    rules: {
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    }
}
