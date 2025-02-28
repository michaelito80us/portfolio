import { getPreferences, updatePreferences, trackEvent } from './preferences';
import { supabase } from './supabase';

// Mock Supabase client
jest.mock('./supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockPreferences, error: null })),
        })),
      })),
      upsert: jest.fn(() => Promise.resolve({ error: null })),
      insert: jest.fn(() => Promise.resolve({ error: null })),
    })),
  },
}));

const mockPreferences = {
  id: 'test-id',
  theme: 'dark',
  widget_position: { x: 100, y: 100 },
  created_at: '2024-02-24T00:00:00Z',
  updated_at: '2024-02-24T00:00:00Z',
};

describe('Preferences Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPreferences', () => {
    it('should fetch user preferences', async () => {
      const preferences = await getPreferences('test-id');
      expect(preferences).toEqual(mockPreferences);
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });

    it('should throw an error when fetch fails', async () => {
      // Mock the error case
      const mockError = new Error('Database error');
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: null, error: mockError })),
          })),
        })),
      }));

      await expect(getPreferences('test-id')).rejects.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      await updatePreferences('test-id', {
        theme: 'light',
        widget_position: { x: 200, y: 200 },
      });
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });

    it('should update only theme preferences', async () => {
      await updatePreferences('test-id', {
        theme: 'light',
      });
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });

    it('should update only widget position preferences', async () => {
      await updatePreferences('test-id', {
        widget_position: { x: 200, y: 200 },
      });
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });

    it('should throw an error when update fails', async () => {
      // Mock the error case
      const mockError = new Error('Database error');
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        upsert: jest.fn(() => Promise.resolve({ error: mockError })),
      }));

      await expect(updatePreferences('test-id', { theme: 'light' })).rejects.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('user_preferences');
    });
  });

  describe('trackEvent', () => {
    it('should track analytics events', async () => {
      await trackEvent('test_event', { value: 'test' });
      expect(supabase.from).toHaveBeenCalledWith('analytics_events');
    });

    it('should throw an error when tracking fails', async () => {
      // Mock the error case
      const mockError = new Error('Database error');
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        insert: jest.fn(() => Promise.resolve({ error: mockError })),
      }));

      await expect(trackEvent('test_event', { value: 'test' })).rejects.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('analytics_events');
    });

    it('should handle complex event data', async () => {
      const complexData = {
        userId: 'user123',
        action: 'click',
        metadata: {
          page: 'home',
          component: 'button',
          timestamp: new Date().toISOString(),
        },
        metrics: {
          loadTime: 1200,
          interactionTime: 350,
        },
      };

      await trackEvent('complex_event', complexData);
      expect(supabase.from).toHaveBeenCalledWith('analytics_events');
    });
  });
});
