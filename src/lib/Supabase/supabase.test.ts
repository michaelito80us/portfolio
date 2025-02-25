describe('Supabase Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should be configured with environment variables', async () => {
    const { supabase } = await import('./supabase');
    expect(supabase).toBeDefined();
    expect(supabase.from('user_preferences')).toBeDefined();
    expect(supabase.from('analytics_events')).toBeDefined();
  });

  it('should have auth disabled', async () => {
    const { supabase } = await import('./supabase');
    const { data } = await supabase.auth.getSession();
    expect(data.session).toBeNull();
  });

  it('should throw error if SUPABASE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    await expect(import('./supabase')).rejects.toThrow('Missing env.NEXT_PUBLIC_SUPABASE_URL');
  });

  it('should throw error if SUPABASE_ANON_KEY is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    await expect(import('./supabase')).rejects.toThrow('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });
});
