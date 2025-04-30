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
import { Client } from 'client-ts';

const client = new Client();

try {
    const loginResponse = await client.auth.login({ "user@example.com", "password123" });
    console.log('Login successful:', loginResponse);
} catch (error) {
      console.error('Login failed:', error);
}
````
### Documentation
The Client documentation is available at [tradevps.net.](https://docs.tradevps.net/)

### Security
info@tradevps.net
### License
Client is distributed Apache-2.0, see [LICENSING.md](https://github.com/tradevpsnet/client-ts/blob/main/LICENSE).



