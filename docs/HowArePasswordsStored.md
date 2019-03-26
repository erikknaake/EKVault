For your passwords we store, we use AES-256 encryption with CBC mode and PKCS5 padding from the [CryptoJS](https://www.npmjs.com/package/crypto-js) module to encrypt your passwords.
Those encrypted passwords are stored in local storage and can be imported and exported from the settings panel.
Your passwords are never send over the [internet](VerifyNoInternet.md).

Your passwords are stored in the following way:
```AES(paddingLength + paddTo256Multiple({domain, password, username}))```

Where paddingLength always is 3 bytes telling how many padding bytes where added to your data.
And paddTo256Multiple adds random bytes until your data is 256 bits long.