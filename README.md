# SignAlive API - Usage Demo

This is a simple demo that gets you started on working with the SignAlive API. Using this demo, you will be able to switch the channels of a registered device, with simple button-clicks from a web UI. You will be also able to update the datasource dynamically and be able to show real-time-configured content on your device

Requirements for running this demo:

- You must own a user in SignAlive system
- You user must be tied to an account as administrator
- Your user must have an api-key (Currently this api-key is assigned manually. Please contact us.)
- NodeJS framework in your computer. (node v4.2.2+)

This demo assumes that you already have:

- A device registered in SignAlive
- 3 different channels that serve 3 different contents
- A simple datasource (basic key-value pair)
- One of the contents should use the datasource actively


## Installation

```
    git clone https://github.com/signalive/webapi-demo.git
    cd webapi-demo
    npm install
```

## Configuration

You should navigate in our panel:

- To the devices page, into the registered device, and record the device id in url.
- To the channels page, and record the channel ids.
- To the datasource, and record both the datasource id and the datasource token.

You will use these id's in your calls to the SignAlive API. Open the `server.js` file in your text-editor, and fix the `config` object with your recorded ids and the datasource token. **Do not forget to update the api-key field as well**

Your config should look similar to:

```
    const config = {
        PORT: 9090,
        signalive: {
            url: 'https://api.signalive.io/v1/',
            token: 'abcde1234abcd1234',
            channelIds: {
                datasource: 123,
                hdmi: 456,
                slideshow: 789
            },
            deviceId: 1234,
            datasourceId: 123,
            datasourceToken: 'aaaaabbbbb88888cccccdfd2222a1111faaa22eeff138fb743dcd7da7d9aaaaa'
        }
    };
```

## Run

Navigate to the sdfd directory and run node.

```
    cd webapi-demo
    node server.js
```

Then, go to your favourite browser and go to link `localhost:9090`

If you have further questions, feel free to contact us @ `tech@softalive.io`