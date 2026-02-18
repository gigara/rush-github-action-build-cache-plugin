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

let saveCache: any;
let info: (msg: string) => void;
let error: (msg: string) => void;

if (process.env.GITHUB_ACTIONS === 'true') {
  // Use actual GitHub Actions toolkit in GH environment
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const actionsCache = require('@actions/cache');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const core = require('@actions/core');
  saveCache = actionsCache.saveCache;
  info = core.info;
  error = core.error;
} else {
  // No-op fallbacks for local runs
  saveCache = async () => undefined;
  info = (m: string) => console.log(m);
  error = (m: string) => console.error(m);
}

export async function uploadCache(cacheFile: string, cacheId: string): Promise<number> {
    try {
        const id = await saveCache([cacheFile], cacheId);
        info(`Rush build cache uploaded with key: ${cacheId}`);
        return id;
      } catch (e) {
        error(`Rush build cache upload failed with key: ${cacheId}. Error: ${e}`);
      }
}
