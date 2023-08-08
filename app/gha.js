import { writeFileSync } from 'fs'

const htaccessContent = `
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`

writeFileSync('dist/.htaccess', htaccessContent)
