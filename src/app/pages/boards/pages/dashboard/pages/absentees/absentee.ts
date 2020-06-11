export interface Absentee {
  full_name: string;
  email: string;
  profile: Profile;
}

export interface Profile{
  abbreviation: string;
  status: Status;
}

export interface Status {
  status: string;
  until: string;
}
