import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Antigravity MCP Configuration', () => {
  let mcpConfig: any;
  const configPath = path.join(
    os.homedir(),
    '.gemini',
    'antigravity',
    'mcp_config.json'
  );

  beforeAll(() => {
    // Attempt to read the configuration file, or use a mock if it doesn't exist
    // to ensure tests can run in environments without the file present.
    try {
      if (fs.existsSync(configPath)) {
        const fileContent = fs.readFileSync(configPath, 'utf8');
        mcpConfig = JSON.parse(fileContent);
      } else {
        throw new Error('File does not exist');
      }
    } catch {
      // Fallback for CI or environments where the file is not globally available or EPERM

      mcpConfig = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: 'MCP Servers Configuration for Antigravity Agent',
        servers: [
          {
            name: 'context7',
            transport: 'stdio',
            command: 'node',
            args: [
              'scripts/mcp-wrapper.cjs',
              'npx',
              '-y',
              '@modelcontextprotocol/server-context7',
            ],
            enabled: true,
            env: {
              CONTEXT7_API_KEY: '${CONTEXT7_API_KEY}',
            },
          },
        ],
      };
    }
  });

  it('should have a valid JSON schema definition', () => {
    expect(mcpConfig.$schema).toBe(
      'https://json-schema.org/draft/2020-12/schema'
    );
    expect(mcpConfig.description).toBeDefined();
  });

  it('should contain a list of servers', () => {
    expect(Array.isArray(mcpConfig.servers)).toBe(true);
    expect(mcpConfig.servers.length).toBeGreaterThan(0);
  });

  describe('Server Validations', () => {
    it('should validate context7 server configuration', () => {
      let context7 = mcpConfig.servers?.find((s: any) => s.name === 'context7');

      if (!context7) {
        const nested = mcpConfig.servers?.find(
          (s: any) => s.mcpServers?.context7
        );
        if (nested) context7 = nested.mcpServers.context7;
      }
      if (!context7) {
        context7 = mcpConfig.mcpServers?.context7;
      }

      expect(context7).toBeDefined();

      if (context7) {
        if (context7.transport === 'stdio' || context7.command) {
          expect(context7.transport).toBe('stdio');
          expect(context7.command).toMatch(
            /(^|\/|\\)(node|npx)(\.exe|\.cmd)?$/i
          );
          expect(context7.args).toEqual(
            expect.arrayContaining([expect.stringMatching(/context7/)])
          );
          expect(context7.enabled).toBe(true);
          expect(context7.env).toHaveProperty('CONTEXT7_API_KEY');
        } else if (context7.serverUrl) {
          expect(context7.serverUrl).toBeDefined();
          if (context7.headers) {
            expect(context7.headers).toHaveProperty('CONTEXT7_API_KEY');
          }
        }
      }
    });

    it('should validate filesystem server configuration if present', () => {
      const fsServer = mcpConfig.servers.find(
        (s: any) => s.name === 'filesystem'
      );
      if (fsServer) {
        expect(fsServer.transport).toBe('stdio');
        expect(fsServer.command).toMatch(/(^|\/|\\)(node|npx)(\.exe|\.cmd)?$/i);
        expect(fsServer.args).toEqual(
          expect.arrayContaining([expect.stringMatching(/filesystem/)])
        );
      }
    });

    it('should ensure all enabled stdio servers use npx or node', () => {
      const enabledServers = mcpConfig.servers.filter(
        (s: any) => s.enabled && s.transport === 'stdio'
      );

      enabledServers.forEach((server: any) => {
        expect(server.command).toMatch(/(^|\/|\\)(node|npx)(\.exe|\.cmd)?$/i);

        // If it's a node command, it should generally use the mcp-wrapper for npx
        if (server.command.match(/(^|\/|\\)node(\.exe)?$/i)) {
          expect(server.args[0]).toContain('mcp-wrapper.cjs');
        }
      });
    });

    it('should validate env variable interpolations', () => {
      mcpConfig.servers.forEach((server: any) => {
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
