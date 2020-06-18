The NodeJS app should include three pages:

1. Single window with an input panel (nothing else). Maybe a submit button.
2. An error page providing instructions to contact someone
3. A success window that displays the final payload, along with instructions on how to use

Workflow:

1. User provides auth token to the NodeJS app
  - If there is an error in authentication, display error page
  - If successful, move to step 2
2. Vault returns payload with session token (client_token)
  - Parse client_token
  - If there is no client_token, display error page
  - If successful move to step 3
3. NodeJS app uses session token to retrieve secret
4. Vault returns payload – which includes secret
5. NodeJS app provides display of the payload (nicely formatted)

We use a GitHub personal token to login to Vault. The objective is to have Vault authenticate the user and confirm the identity. The Vault server is located at:

    http://${VAULT_ADDR}:8200

The token value for the test is the following:

    65fa29d416909e9867c794ae6792999f2d251aaa

_(Please note: This is not a real token anymore)_

Use Vault terminology to express that variable:

    export VAULT_TOKEN="65fa29d416909e9867c794ae6792999f2d251aaa"


Here is a simple example of the curl command that allows for the call-in.

    curl \ 
    --data '{"token": $VAULT_TOKEN}' \
    --request POST \
    http://${VAULT_ADDR}:8200/v1/auth/github/login


This is a sample of the expected payload returned by the Vault server. The importance of this payload is the client_tokenas it allows for the next operation.

    {
	    request_id: b7c7b5c5-e7be-29f7-e1ab-fabf3ebf5daf,
	    lease_id: ,
	    renewable: false,
	    lease_duration: 0,
	    data: null,
	    wrap_info: null,
	    warnings: null,
	    auth: {
		client_token: s.j21DuIQZGnCWTbXwu2uD2kGq,
		accessor: QWLtt05sTFB8sdSvrgrujLh7,
		policies: [
			default,
			dev - policy
		],
		token_policies: [
			default
		],

		identity_policies: [
			dev - policy
		],

		metadata: {
			org: interrupt - software,
			username: gcdata - admin
		},

		lease_duration: 2764800,
		renewable: true,
		entity_id: 8 dea795e - 7 f86 - 8 dc9 - 3e3 b - 2 c19ae49a833,
		token_type: service,
		orphan: true
        }
    }

Given the client_token in the operation, the application is now able to request the secret located in the vault. The endpoint for that secret is different than above. The following is a sample curlcommand to retrieve the secret:

    curl \
    --header "X-Vault-Token: s.j21DuIQZGnCWTbXwu2uD2kGq" \
    http://${VAULT_ADDR}:8200/v1/secret/nodejs-app

This is the final payload to be displayed on page two of the NodeJS application:

    {
	  request_id: b379471f - a2ef - 03 a0 - 0b 4 f - 949745e62225,
	  lease_id: ,
	  renewable: false,
	  lease_duration: 2764800,
	  data: {
		secret: OrgvU84XLJ6vnPrT50xyao05
	},

	wrap_info: null,
	warnings: null,
	auth: null
	}