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
### ✅ Currently Supported Methods
#### 🔐 Authentication
```js
client.auth.login(params)

client.auth.register(params)

client.auth.logout()

client.auth.forget_password(params)

client.auth.reset_password(params)
````
#### 🧠 AI Analysis
```js
client.ai.news.dailyAnalysis(params)
client.ai.news.weeklyAnalysis(params)
```
####  Windows Server
```js
client.windows.servers_list(query)
client.windows.server_deploy(payload)
client.windows.server_action(id, params)
client.windows.regions()
client.windows.server_detail(id)
client.widnows.server_delete(id)
```
####  Projects
```js
client.projects.projects_list(query)
client.projects.project_deploy(payload)
```
### Calender
Read the [document](https://docs.tradevps.net/apis/marketplace/calendar) for more detail
```js
const query = {
        date_from: '2025-05-10',
        date_to: '2025-05-15',
        importance: '3',
        country: 'IR',
        per_page: 15,
        sort_by: 'time',
        sort_direction: 'asc',
      };
client.marketplace.calender(query);
```
You can also use our pre-made component for showing calender data
```js
'use client';
import {Client} from '@tradevpsnet/client';
import {EconomicCalendar} from '@tradevpsnet/client';
import React, {useMemo} from 'react';

const EconomicCalendarPage: React.FC = () => {
  const client = useMemo(() => new Client(), []);

  return (
    <div className='w-full h-screen overflow-hidden'>
      <EconomicCalendar client={client} width='100%' height='100%' showFilter={false}/>
    </div>
  );
};
export default EconomicCalendarPage;

```
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
  IResponse,
  IDailyNewsParams, 
  IDailyNewsResponse,
  IWeeklyNewsParams, 
  IWeeklyNewsResponse,
  IRegionsResponse,
  IRegionsParams,
  IRegion,
  IServerActionParams,
  IServerActionResponse,
  IServerDeployParams,
  IServerDeployResponse,
  IServerDetailResponse,
  IServerListQueryParams,
  IListServersResponse,
  IProjectCreateParams,
  IProjectCreateResponse,
  IProjectListQueryParams,
  IListProjectsResponse,
  ICalendarQueryParams,
  ICalendarEvent,
  ICalendarResponse
} from '@tradevpsnet/client';
```
These types cover the implementation flows and ensure you're developing with full TypeScript support.
### ⚠️ Flags
This library depends on [@tradevpsnet/flags](https://www.npmjs.com/package/@tradevpsnet/flags)
 ```js
 import { Client } from '@tradevpsnet/client';

const client = new Client();
 const [GbpFlag] = client.flags.get('gbp');
 return(
  <div>
    {GbpFlag ? <GbpFlag width={20} height={20} /> : 'No flag found'}`.
 </div>
 );
```
### ⚠️ Error Handling

All errors returned from the client system are instances of APIError, a custom error class for handling TradeVPS-specific failures.
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



