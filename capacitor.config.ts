import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flowtask.wellbeing',
  appName: 'FlowTask Wellbeing',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
