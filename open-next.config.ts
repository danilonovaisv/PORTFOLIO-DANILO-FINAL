import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  d1: {
    binding: 'DB',
  },
});
