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

import { RushConfiguration } from "@microsoft/rush-lib";
import { ITerminal } from "@rushstack/node-core-library";

export abstract class AbstractGithubCacheProvider {
    rushConfiguration: RushConfiguration;

    constructor(rushConfiguration: RushConfiguration) {
        this.rushConfiguration = rushConfiguration;
    }
    
    public get isCacheWriteAllowed(): boolean {
        return false;
    }

    tryGetCacheEntryBufferByIdAsync(terminal: ITerminal, cacheId: string): Promise<Buffer | undefined> {
        throw new Error("Method not implemented.");
    }
    trySetCacheEntryBufferAsync(terminal: ITerminal, cacheId: string, entryBuffer: Buffer): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateCachedCredentialAsync(terminal: ITerminal, credential: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateCachedCredentialInteractiveAsync(terminal: ITerminal): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteCachedCredentialsAsync(terminal: ITerminal): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
