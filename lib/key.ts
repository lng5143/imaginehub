
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

const getEncryptionKey = async (): Promise<CryptoKey> => {
    // Check if sessionStorage is available
    if (typeof sessionStorage === 'undefined') {
        throw new Error('Session storage is not available in this environment');
    }

    // Retrieve session ID with error handling
    const sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        throw new Error('No session ID found in storage');
    }

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(sessionId),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    )

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: new TextEncoder().encode('salt'),
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial, 
        { name: ALGORITHM, length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
    )
}

const encryptKey = async (apiKey: string): Promise<string> => {
    const encryptionKey = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: ALGORITHM,
            iv: iv
        },
        encryptionKey,
        new TextEncoder().encode(apiKey)
    )

    const combinedData = new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
    return btoa(String.fromCharCode(...combinedData))
}

const decryptKey = async (encryptedKey: string): Promise<string> => {
    const encryptionKey = await getEncryptionKey();
    const combinedData = new Uint8Array(atob(encryptedKey).split('').map(c => c.charCodeAt(0)));

    const iv = combinedData.slice(0, 12);
    const data = combinedData.slice(12);

    const decryptedData = await crypto.subtle.decrypt(
        {
            name: ALGORITHM,
            iv: iv
        },
        encryptionKey,
        data
    )

    return new TextDecoder().decode(decryptedData);
}