## Client-ts
Set of APIs from (TradeVPS), you would typically be interacting with various trading platforms, market data sources, and order execution systems. Below are some core API functionalities that you can expand for use in a trading VPS system:

### 🛠️ Setup


#### Install
Install via npm:
```bash
npm i @tradevpsnet/client
```
#### Example usage
```js
import { Client } from '@tradevpsnet/client';

const client = new Client();

try {
    const loginResponse = await client.auth.login({ email: "user@example.com", password: "password123" });
    console.log('Login successful:', loginResponse);
} catch (error) {
      console.error('Login failed:', error);
}
````
### 📄 Types

To ensure type safety when using the client library, you can import request and response types directly:
```js
import {
  ILoginParams,
  ILoginResponse,
  IRegisterParams,
  IRegisterResponse,
  IForgetPasswordParams,
  IForgetPasswordResponse,
  IResetPasswordParams,
  IResetPasswordResponse,
  ILogoutResponse,
  IResponse
} from '@tradevpsnet/client';
```
These types cover the authentication flows and ensure you're developing with full TypeScript support.
### ⚠️ Error Handling

All errors returned from the authentication system are instances of APIError, a custom error class for handling TradeVPS-specific failures.
```js
import { APIError } from '@tradevpsnet/client';

try {
  await client.auth.login(params);
} catch (error) {
  if (error: APIError) {
    console.error('Handled TradeVPS API error:', error.message, error.statusCode);
  } else {
    console.error('Unknown error:', error);
  }
}
```
### Documentation
The Client documentation is available at [tradevps.net.](https://docs.tradevps.net/)

### Security
info@tradevps.net
### License
Client is distributed Apache-2.0, see [LICENSING.md](https://github.com/tradevpsnet/client-ts/blob/main/LICENSE).



