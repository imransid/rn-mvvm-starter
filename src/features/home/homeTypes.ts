
export interface Child {
  child_id: number;
  family_id: number;
  first_name: string;
  birth_date: string;
  gender: "M" | "F" | string;
  avatar_url: string;

  interests: string[];
  favorite_activities: string[];
  special_needs: string[];

  personality: {
    [key: string]: any;
  };

  progress: number;

  cre_date: string;
  mod_date: string;
  del_date: string | null;
  last_mod_by: string;
}




export interface HomeState {
  selectedChild: Child | null;
  loading: boolean;
  error: string | null;
  child: Child | null;
}

export const initialState: HomeState = {
  selectedChild: null,
  loading: false,
  error: null,
  child: null,
};