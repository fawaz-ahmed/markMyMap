## Installation

Tested on android, but with standard running procedures it should also work on ios. Run the following cmds from root of project to complete installation.

PS: Android SDK should be setup on machine prior installation.

```
yarn install
cp sample.env .env
```

Configure google api key and host url in `.env` file.

## Run app in connected devices or simulator

```
yarn start //  this will fire up bundler
yarn android // this will install build on connected devices and simulator
```

## Generate a debug build

Use these cmds, run from root. Close any running bundler before executing them.

```
yarn android:clean
yarn android:assets
yarn android:build
```

## Run tests

```
yarn test -u
```

## Design considerations

Before discussing what decisions I've made to use specific libraries, I'll jot down my assumptions.

The geocoding is done from lat/lng -> address and not viceversa. So a user is expected to input Latitude, Longitude and a Name for that place inorder to add a marker to the map. The address is fetched from geocode api to reveal it's address.

For state management, `redux` is a suitable option, since it provides a rich features of middlewares operating on top of `redux` and will adjust to all our requirements. To keep the app working offline, I've utilized `redux-offline` and also utilized `effects` to make subsequent api calls which handle offline requests out of the box. This keeps app working needless of the server up and running. The store will hydrate when launching and will also try to sync from server and fetch the list of markers from server.

All the configuration options are kept in `.env` file. This will help us generate builds without hassle if config value changes. Also keeping secret keys and sensitive information away from online repository.

## Guidline Questions

### Q. How do you handle configuration values? What if those values change?

All the config values are stored and kept in `environment variables` using `.env` file alongwith `react-native-config`. This allows us to regenerate builds without modifying code and is very helpful if we plan onto use a CI/CD for build generation.
If these values are needed to be changed, another build will be required.
Also it is important to note, that we don't keep these values somewhere inside the app and allow users to change them directly, because these are the hidden configs which users are unaware of.

### Q. What happens if we encounter an error with the third-party API integration?

If third party api fails, it is gracefully handled in the app. Talking about the geocode api, which can fail due to restrictive usage or billing, user will see an error message for a failure while fetching address.

### Q. Will it also break our application, or are they handled accordingly?

No it will not, instead it will prompt the user about the failure.

### Q. Now we will need to change the third-party geocoder API to another one. How can we change our current solution so that we can make this change as seamless as possible? Or how will we change (or refactor) our solution so that any future changes with the third-party integration is only done in isolation ?

There are multiple ways to do that :

1_ Use our internal apis as a bridge to third party apis. In this case, all the data handling will be done on the server side and app will have zero effect of the changes.

2_ Use versioning. Roll out a new version of the app utilizing another geocoder api. However, users having older versions of app may suffer.

3_ Restrict users to use older versions of app and refactor our code in such a way.

We can also have a combination of these options. I would suggest to go with option 1, as it will also allow us room for caching and reduce dependency for third party apis.
