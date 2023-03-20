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

import { restoreCache } from "@actions/cache";
import { error, info } from "@actions/core";

export async function downloadCache(cacheFile: string, cacheId: string) {
    try {
        const rushCacheHit = await restoreCache([cacheFile], cacheId, [cacheId]);
        if (rushCacheHit) {
            info(`Rush build cache downloaded with key: ${cacheId}`);
        }
    } catch (e) {
        error(`Rush build cache download failed with key: ${cacheId}. Error: ${e}`);
    }
}
