/**
 * Copyright (c) 2023, Chamupathi Gigara Hettige. (https://github.com/gigara) All Rights Reserved.
 *
 * Chamupathi Gigara Hettige licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

import { CacheProvider } from "./AbstractCacheProvider";
import { join } from 'path';
import { error, info, notice } from "@actions/core";
import { uploadCache } from "./uploadCache";
import { downloadCache } from "./downloadCache";
const fs = require('fs');

const BUILD_CACHE_FOLDER = "build-cache";

export class GithubActionClient extends CacheProvider {
  static getCache(cacheId: string, cacheRoot: string): Promise<Buffer> {
    const ghCacheId = `${process.platform}-${cacheId}`;
    const cacheFile = join(cacheRoot, BUILD_CACHE_FOLDER, cacheId);

    return new Promise(async function (resolve, reject) {
      await downloadCache(cacheFile, ghCacheId);
      const fileExists = fs.existsSync(cacheFile);
      if (fileExists) {
        return resolve(fs.readFileSync(cacheFile));
      } else {
        notice(`Rush build cache not found with key: ${ghCacheId}.`);
        resolve(undefined);
      }
    });
  }

  static saveCache(cacheId: string, cacheRoot: string): Promise<boolean> {
    const ghCacheId = `${process.platform}-${cacheId}`;
    const cacheFile = join(cacheRoot, BUILD_CACHE_FOLDER, cacheId);
    const fileExists = fs.existsSync(cacheFile);
    return new Promise(async function (resolve, reject) {
      if (!fileExists) {
        error(`Rush build cache not exists with key: ${cacheId}.`);
        reject();
      }
      try {
        const id = await uploadCache(cacheFile, ghCacheId);
        info(`Rush build cache uploaded with key: ${ghCacheId}`);
        resolve(true);
      } catch (e) {
        error(`Rush build cache upload failed with key: ${ghCacheId}. Error: ${e}`);
        reject();
      }
    });
  }
}
