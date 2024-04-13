import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '../../config.json';

const supabase = createClient(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  }
)

export default supabase