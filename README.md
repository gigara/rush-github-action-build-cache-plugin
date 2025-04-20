# rush-github-action-build-cache-plugin
[Rush](https://rushjs.io) build-cache plugin for GitHub Actions. This plugin will automatically save and restore the build cache in Github actions. The cache files are stored in GitHub caches.

## Prerequisite

Rush.js >= 5.85.0

## Installation
Please refer to the [official documentation](https://rushjs.io/pages/maintainer/using_rush_plugins/) to use rush plugins.
1. Add the plugin as a dependency in `autoinstaller/rush-plugins/package.json` file to include the plugin.

```
{
  ---
  "dependencies": {
    "@gigara/rush-github-action-build-cache-plugin": "^1.1.1"
  }
  ---
}
```

2. Run the `rush update-autoinstaller --name rush-plugins` command to update the autoinstaller with plugin dependency.

3. In `common/config/rush/rush-plugins.json`, Add the plugin to the plugins array.

```
{
  "plugins": [
    {
      "packageName": "@gigara/rush-github-action-build-cache-plugin",
      "pluginName": "rush-github-action-build-cache-plugin",
      "autoinstallerName": "rush-plugins"
    }
  ]
}
```
6. Run the `rush update` command to install the plugin and update the Rush configuration.

7. Set `cacheProvider` in `common/config/rush/build-cache.json`.
```
"cacheProvider": "github-action-build-cache",
```

## Usage
You need to set `ACTIONS_CACHE_URL` and `ACTIONS_RUNTIME_TOKEN` envs in GitHub actions. Otherwise the plugin will fail to upload/download the cache.

You can use the [rush-cache](https://github.com/marketplace/actions/rush-cache) Github action to set envs.
```
- name: Set cache env
  uses: gigara/rush-cache@v2
```

After you have set up the plugin correctly, `rush build` command in GitHub actions will automatically save and restore the cache.

## Contributing

Contributions are welcome! Please create a pull request on the Github repository.

## License
This project is licensed under the [Apache 2](https://www.apache.org/licenses/LICENSE-2.0.txt) License. See the LICENSE file for details.
