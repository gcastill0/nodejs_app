The NodeJS app should include three pages:

1. Single window with an input panel (nothing else). Maybe a submit button.
2. An error page providing instructions to contact someone
3. A success window that displays the final payload, along with instructions on how to use

Workflow:

1. User provides auth token to the NodeJS app
  1. If there is an error in authentication, display error page
  2. If successful, move to step 2
2. Vault returns payload with session token (client\_token)
  1. Parse client\_token
  2. If there is no client\_token, display error page
  3. If successful move to step 3
3. NodeJS app uses session token to retrieve secret
4. Vault returns payload – which includes secret
5. NodeJS app provides display of the payload (nicely formatted)

We use a GitHub personal token to login to Vault. The objective is to have Vault authenticate the user and confirm the identity. The Vault server is located at:

http://35.196.17.47:8200

The token value for the test is the following:

65fa29d416909e9867c794ae6792999f2d251aaa

Here is a simple example of the curl command that allows for the call-in.

| curl \ --request POST \--data &#39;{&quot;token&quot;: &quot;65fa29d416909e9867c794ae6792999f2d251aaa&quot;}&#39; \[http://35.196.17.47:8200/v1/auth/github/login](http://35.196.17.47:8200/v1/auth/github/login) |
| --- |

This is a sample of the expected payload returned by the Vault server. The importance of this payload is the client\_tokenas it allows for the next operation.

{

&quot;request\_id&quot;: &quot;b7c7b5c5-e7be-29f7-e1ab-fabf3ebf5daf&quot;,

&quot;lease\_id&quot;: &quot;&quot;,

&quot;renewable&quot;: false,

&quot;lease\_duration&quot;: 0,

&quot;data&quot;: null,

&quot;wrap\_info&quot;: null,

&quot;warnings&quot;: null,

&quot;auth&quot;: {

&quot;client\_token&quot;: &quot;s.j21DuIQZGnCWTbXwu2uD2kGq&quot;,

&quot;accessor&quot;: &quot;QWLtt05sTFB8sdSvrgrujLh7&quot;,

&quot;policies&quot;: [

&quot;default&quot;,

&quot;dev-policy&quot;

],

&quot;token\_policies&quot;: [

&quot;default&quot;

],

&quot;identity\_policies&quot;: [

&quot;dev-policy&quot;

],

&quot;metadata&quot;: {

&quot;org&quot;: &quot;interrupt-software&quot;,

&quot;username&quot;: &quot;gcdata-admin&quot;

},

&quot;lease\_duration&quot;: 2764800,

&quot;renewable&quot;: true,

&quot;entity\_id&quot;: &quot;8dea795e-7f86-8dc9-3e3b-2c19ae49a833&quot;,

&quot;token\_type&quot;: &quot;service&quot;,

&quot;orphan&quot;: true

}

}

Given the client\_token in the operation, the application is now able to request the secret located in the vault. The endpoint for that secret is different than above. The following is a sample curlcommand to retrieve the secret:

| curl \--header &quot;X-Vault-Token: s.j21DuIQZGnCWTbXwu2uD2kGq&quot; \[http://35.196.17.47:8200/v1/secret/nodejs-app](http://35.196.17.47:8200/v1/secret/nodejs-app) |
| --- |

This is the final payload to be displayed on page two of the NodeJS application.

{

&quot;request\_id&quot;: &quot;b379471f-a2ef-03a0-0b4f-949745e62225&quot;,

&quot;lease\_id&quot;: &quot;&quot;,

&quot;renewable&quot;: false,

&quot;lease\_duration&quot;: 2764800,

&quot;data&quot;: {

&quot;secret&quot;: &quot;OrgvU84XLJ6vnPrT50xyao05&quot;

},

&quot;wrap\_info&quot;: null,

&quot;warnings&quot;: null,

&quot;auth&quot;: null

}
