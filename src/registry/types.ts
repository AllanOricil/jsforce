/**
 * @file Registry for connection information, cached in local file system
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { Connection } from '../jsforce';
import { Schema } from '../types';

export type ConnectionConfig = {
  instanceUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  loginUrl?: string;
  oauth2?: ClientConfig;
};

export type PersistConnectionConfig = {
  client?: string;
  instanceUrl?: string;
  accessToken?: string;
};

export type ClientConfig = {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  loginUrl?: string;
};

export type RegistryConfig = {
  default?: string;
  clients?: { [name: string]: ClientConfig };
  connections?: { [name: string]: PersistConnectionConfig };
};

/**
 *
 */
export interface Registry {
  getConnectionNames(): Promise<string[]>;
  getConnection<S extends Schema = Schema>(
    name?: string,
  ): Promise<Connection<S> | null | undefined>;
  getConnectionConfig(
    name?: string,
  ): Promise<ConnectionConfig | null | undefined>;
  saveConnectionConfig(
    name: string,
    connConfig: ConnectionConfig,
  ): Promise<void>;
  setDefaultConnection(name: string): Promise<void>;
  removeConnectionConfig(name: string): Promise<void>;
  getClientConfig(name: string): Promise<ClientConfig | null | undefined>;
  getClientNames(): Promise<string[]>;
  registerClientConfig(name: string, clientConfig: ClientConfig): Promise<void>;
}
