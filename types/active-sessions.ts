export interface ActiveSession {
  id: string;
  deviceName: string;
  lastActive: string;
  location: string;
  icon: string;
  iconAlt: string;
}

export interface ActiveSessionsData {
  sessions: ActiveSession[];
}
