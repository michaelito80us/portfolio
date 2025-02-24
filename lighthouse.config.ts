interface LighthouseConfig {
  ci: {
    collect: {
      startServerCommand: string;
      url: string[];
      numberOfRuns: number;
      settings?: {
        throttling?: {
          cpuSlowdownMultiplier?: number;
        };
        maxWaitForLoad?: number;
      };
    };
    assert: {
      preset: string;
      assertions: Record<string, [string, { minScore?: number; maxNumericValue?: number }]>;
    };
    upload: {
      target: string;
    };
  };
}

const config: LighthouseConfig = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        throttling: {
          cpuSlowdownMultiplier: 4,
        },
        maxWaitForLoad: 60000,
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        interactive: ['error', { maxNumericValue: 3500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

export default config;
