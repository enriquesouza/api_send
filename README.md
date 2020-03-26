# api_send
This API is only to send via NODE.

You must create a .ENV file or just create ENV Vars in your systems.

###### If you encrypted your KEY with an key, then Just define it here
> ENCRYPTION_KEY=""

###### This is the secret to generate the JWT TOKEN.
> JWT_SECRET=""

###### Define a API KEY and an API SECRET so you can protect your API from any other APP.
> JWT_API_KEY=""
> JWT_API_SECRET=""

When you post to your API you must send the following body
## Body
```
{
	"api_key":"MY_API_KEY",
	"api_secret":"MY_API_SECRET",
    	"amount": 0.02,
    	"from": "MY_PLAIN_TEXT_ADDRESS",
    	"key": "MY_ENCRYPTED_PRIVATE_KEY",
    	"to": "ADDRESS_WHICH_YOU_WANT_TO_SEND"
}
```
## Return
```
{
    "txid": "ce723e4f6f36aacfb17cc3fc62d8da94a026291f6b3717efb5e9f1acf962de41"
}
```
