import { supabase } from './supabase';

describe('Supabase Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should be configured with environment variables', () => {
    expect(supabase).toBeDefined();
    expect(supabase.from('user_preferences')).toBeDefined();
    expect(supabase.from('analytics_events')).toBeDefined();
  });

  it('should have auth disabled', async () => {
    const { data } = await supabase.auth.getSession();
    expect(data.session).toBeNull();
  });

  it('should throw error if SUPABASE_URL is missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(() => {
      jest.isolateModules(() => {
        require('./supabase');
      });
    }).toThrow('Missing env.NEXT_PUBLIC_SUPABASE_URL');
  });

  it('should throw error if SUPABASE_ANON_KEY is missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => {
      jest.isolateModules(() => {
        require('./supabase');
      });
    }).toThrow('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });
});
