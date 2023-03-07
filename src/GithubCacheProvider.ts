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

import { ICloudBuildCacheProvider } from "@microsoft/rush-lib";
import { ITerminal } from "@rushstack/node-core-library";
import { AbstractGithubCacheProvider } from "./AbstractGithubCacheProvider";
import { GithubActionClient } from "./action/GithubActionClient";

const isCI = process.env.CI === 'true';
export class GithubCacheProvider extends AbstractGithubCacheProvider implements ICloudBuildCacheProvider {
    public get isCacheWriteAllowed(): boolean {
        return isCI;
    }
    tryGetCacheEntryBufferByIdAsync(terminal: ITerminal, cacheId: string): Promise<Buffer | undefined> {
        return isCI ? GithubActionClient.getCache(cacheId, this.rushConfiguration.commonTempFolder) : Promise.resolve(undefined);
    }
    trySetCacheEntryBufferAsync(terminal: ITerminal, cacheId: string, entryBuffer: Buffer): Promise<boolean> {
        return isCI ? GithubActionClient.saveCache(cacheId, this.rushConfiguration.commonTempFolder) : Promise.resolve(false);
    }
}
