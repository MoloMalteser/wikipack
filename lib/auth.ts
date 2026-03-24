import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateProfile = async () => {
  // Wir nutzen LocalStorage als einfachen "Fingerprint"
  let fingerprint = localStorage.getItem('wiki_user_fingerprint');
  
  if (!fingerprint) {
    fingerprint = uuidv4();
    localStorage.setItem('wiki_user_fingerprint', fingerprint);
  }

  // Profil in Supabase suchen oder erstellen
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('fingerprint', fingerprint)
    .single();

  if (!data) {
    const { data: newProfile } = await supabase
      .from('profiles')
      .insert([{ fingerprint, gems: 500 }])
      .select()
      .single();
    return newProfile;
  }

  return data;
};
