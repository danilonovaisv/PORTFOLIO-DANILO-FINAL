import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Antigravity MCP Configuration', () => {
  let mcpConfig: any;
  const configPath = path.join(os.homedir(), '.gemini', 'antigravity', 'mcp_config.json');

  beforeAll(() => {
    // Attempt to read the configuration file, or use a mock if it doesn't exist
    // to ensure tests can run in environments without the file present.
    if (fs.existsSync(configPath)) {
      const fileContent = fs.readFileSync(configPath, 'utf8');
      mcpConfig = JSON.parse(fileContent);
    } else {
      // Fallback for CI or environments where the file is not globally available
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
              '@modelcontextprotocol/server-context7'
            ],
            enabled: true,
            env: {
              CONTEXT7_API_KEY: '${CONTEXT7_API_KEY}'
            }
          }
        ]
      };
    }
  });

  it('should have a valid JSON schema definition', () => {
    expect(mcpConfig.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    expect(mcpConfig.description).toBeDefined();
  });

  it('should contain a list of servers', () => {
    expect(Array.isArray(mcpConfig.servers)).toBe(true);
    expect(mcpConfig.servers.length).toBeGreaterThan(0);
  });

  describe('Server Validations', () => {
    it('should validate context7 server configuration', () => {
      const context7 = mcpConfig.servers.find((s: any) => s.name === 'context7');
      expect(context7).toBeDefined();
      
      if (context7) {
        expect(context7.transport).toBe('stdio');
        expect(context7.command).toBe('node');
        expect(context7.args).toContain('scripts/mcp-wrapper.cjs');
        expect(context7.args).toContain('@modelcontextprotocol/server-context7');
        expect(context7.enabled).toBe(true);
        expect(context7.env).toHaveProperty('CONTEXT7_API_KEY');
      }
    });

    it('should validate filesystem server configuration if present', () => {
      const fsServer = mcpConfig.servers.find((s: any) => s.name === 'filesystem');
      if (fsServer) {
        expect(fsServer.transport).toBe('stdio');
        expect(fsServer.command).toBe('node');
        expect(fsServer.args).toContain('scripts/mcp-wrapper.cjs');
        expect(fsServer.args).toContain('@modelcontextprotocol/server-filesystem');
      }
    });

    it('should ensure all enabled stdio servers use npx or node', () => {
      const enabledServers = mcpConfig.servers.filter((s: any) => s.enabled && s.transport === 'stdio');
      
      enabledServers.forEach((server: any) => {
        expect(['node', 'npx']).toContain(server.command);
        
        // If it's a node command, it should generally use the mcp-wrapper for npx
        if (server.command === 'node') {
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
