import { supabase } from './supabase';
import type { Json } from '@/types/supabase';

export type Theme = 'light' | 'dark' | 'system';
export type WidgetPosition = { x: number; y: number };

export async function getPreferences(id: string) {
  const { data, error } = await supabase.from('user_preferences').select().eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function updatePreferences(
  id: string,
  preferences: {
    theme?: Theme;
    widget_position?: WidgetPosition;
  }
) {
  const { error } = await supabase.from('user_preferences').upsert({
    id,
    ...preferences,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function trackEvent(event_type: string, event_data: Record<string, Json>) {
  const { error } = await supabase.from('analytics_events').insert({
    event_type,
    event_data,
  });

  if (error) throw error;
}
