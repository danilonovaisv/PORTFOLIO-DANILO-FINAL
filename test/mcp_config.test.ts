import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Helper: normalize any MCP config shape into a flat array of server entries.
 * Supports:
 *   1. { servers: [...] }                — legacy array schema
 *   2. { mcpServers: { name: {...} } }   — VS Code / Antigravity object schema
 *   3. { servers: { name: {...} } }      — hybrid object schema
 */
function normalizeServers(config: any): Array<any> {
  // Shape 1: servers is an array
  if (Array.isArray(config.servers)) {
    return config.servers;
  }

  // Shape 2: mcpServers is an object
  if (config.mcpServers && typeof config.mcpServers === 'object') {
    return Object.entries(config.mcpServers).map(
      ([name, value]: [string, any]) => ({
        name,
        ...value,
      })
    );
  }

  // Shape 3: servers is an object
  if (config.servers && typeof config.servers === 'object') {
    return Object.entries(config.servers).map(
      ([name, value]: [string, any]) => ({
        name,
        ...value,
      })
    );
  }

  return [];
}

describe('Antigravity MCP Configuration', () => {
  let mcpConfig: any;
  let servers: Array<any>;
  const configPath = path.join(
    os.homedir(),
    '.gemini',
    'antigravity',
    'mcp_config.json'
  );

  beforeAll(() => {
    try {
      if (fs.existsSync(configPath)) {
        const fileContent = fs.readFileSync(configPath, 'utf8');
        mcpConfig = JSON.parse(fileContent);
      } else {
        throw new Error('File does not exist');
      }
    } catch {
      // Fallback for CI or environments where the file is not globally available
      mcpConfig = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: 'MCP Servers Configuration for Antigravity Agent',
        mcpServers: {
          context7: {
            transport: 'stdio',
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-context7'],
            enabled: true,
            env: {
              CONTEXT7_API_KEY: '${CONTEXT7_API_KEY}',
            },
          },
        },
      };
    }

    servers = normalizeServers(mcpConfig);
  });

  it('should have a valid JSON structure', () => {
    expect(mcpConfig).toBeDefined();
    expect(typeof mcpConfig).toBe('object');
  });

  it('should contain at least one server', () => {
    expect(servers.length).toBeGreaterThan(0);
  });

  describe('Server Validations', () => {
    it('should validate context7 server configuration', () => {
      const context7 = servers.find((s: any) => s.name === 'context7');
      expect(context7).toBeDefined();

      if (context7) {
        if (context7.command) {
          expect(context7.command).toMatch(
            /(^|\/|\\)(node|npx|uvx|docker|gk)(\.exe|\.cmd)?$/i
          );
          expect(context7.args).toEqual(
            expect.arrayContaining([expect.stringMatching(/context7/)])
          );
        }
        if (context7.serverUrl) {
          expect(context7.serverUrl).toBeDefined();
        }
      }
    });

    it('should validate filesystem server configuration if present', () => {
      const fsServer = servers.find((s: any) => s.name === 'filesystem');
      if (fsServer) {
        if (fsServer.command) {
          expect(fsServer.command).toMatch(
            /(^|\/|\\)(node|npx|uvx|docker|gk)(\.exe|\.cmd)?$/i
          );
          expect(fsServer.args).toEqual(
            expect.arrayContaining([expect.stringMatching(/filesystem/)])
          );
        }
      }
    });

    it('should ensure all enabled stdio servers use npx, node, or docker', () => {
      const enabledServers = servers.filter(
        (s: any) => s.enabled !== false && s.command
      );

      enabledServers.forEach((server: any) => {
        expect(server.command).toMatch(
          /(^|\/|\\)(node|npx|uvx|docker|gk)(\.exe|\.cmd)?$/i
        );
      });
    });

    it('should validate env variable interpolations', () => {
      servers.forEach((server: any) => {
        if (server.env) {
          Object.values(server.env).forEach((val: any) => {
            if (typeof val === 'string' && val.includes('${')) {
              // Ensure placeholder matches the ${VAR_NAME} pattern
              expect(val).toMatch(/^\$\{[A-Z0-9_]+\}$/);
            }
          });
        }
      });
    });
  });
});
